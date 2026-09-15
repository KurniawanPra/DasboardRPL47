import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const siswa = JSON.parse(readFileSync(new URL('../src/data/siswa.json', import.meta.url), 'utf8').replace(/^\uFEFF/, ''));

test.beforeEach(async ({ page }) => {
  // Simulasikan foto privat: semua fitur harus tetap bekerja lewat avatar fallback.
  await page.route('https://lh3.googleusercontent.com/**', (route) => route.abort());
});

test('35 anggota, enam pengurus, dan pencarian/filter yang dapat direset', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('KelasXII-1 RPL.');
  await expect(page.locator('.officer-card')).toHaveCount(6);
  await expect(page.locator('.member-card')).toHaveCount(35);
  await page.getByRole('button', { name: /Perempuan/ }).click();
  await expect(page.locator('.member-card')).toHaveCount(siswa.filter((s) => s.jk === 'P').length);
  await page.getByRole('searchbox', { name: 'Cari nama teman' }).fill('aBeL');
  await expect(page.locator('.member-card')).toHaveCount(1);
  await expect(page.locator('.member-card h3')).toHaveText('Abel Farentiara Simanjuntak');
  await page.getByRole('button', { name: /Laki-laki/ }).click();
  await expect(page.locator('.empty-state')).toBeVisible();
  await page.getByRole('button', { name: 'Tampilkan semua teman' }).click();
  await expect(page.locator('.member-card')).toHaveCount(35);
  await expect(page.getByRole('searchbox')).toHaveValue('');
  await page.getByRole('combobox', { name: 'Urutkan anggota' }).selectOption('az');
  const names = await page.locator('.member-card h3').allTextContents();
  expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, 'id')));
});

test('profil bisa dibuka dan ditutup dengan keyboard, fokus kembali ke kartu', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const card = page.locator('.officer-grid').getByRole('button', { name: /M Rinko Wing Kurniawan/ });
  await card.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog').getByRole('heading')).toHaveText('M Rinko Wing Kurniawan');
  await expect(page.getByRole('dialog')).toContainText('28 April 2009');
  await expect(page.getByRole('button', { name: 'Tutup profil' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(card).toBeFocused();
  await card.click();
  await page.getByRole('button', { name: 'Tutup profil' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('foto gagal dan reduced motion tetap memberikan halaman lengkap', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.scene-placeholder.is-static')).toBeVisible();
  await expect(page.locator('canvas')).toHaveCount(0);
  expect(await page.evaluate(() => performance.getEntriesByType('resource').filter((resource) => /three-(core|renderer)|react-three/.test(resource.name)).length)).toBe(0);
  await expect(page.locator('.hero-social-proof .avatar-fallback[role="img"]')).toHaveCount(4);
  await page.locator('#anggota').scrollIntoViewIfNeeded();
  await expect(page.locator('.member-card').first()).toBeVisible();
  await expect(page.locator('.member-card').first().getByRole('img')).toHaveAttribute('aria-label', 'Avatar Abel Farentiara Simanjuntak');
  expect(errors).toEqual([]);
});

test('adegan 3D aktif, kontrol jeda bekerja dan preferensi dapat berubah', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('canvas')).toBeVisible();
  await expect(page.getByText('Menyiapkan ruang kreatif…')).toHaveCount(0);
  await page.getByRole('button', { name: 'Jeda animasi 3D' }).click();
  await expect(page.getByRole('button', { name: 'Putar animasi 3D' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Putar animasi 3D' }).click();
  await expect(page.getByRole('button', { name: 'Jeda animasi 3D' })).toHaveAttribute('aria-pressed', 'false');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('canvas')).toHaveCount(0);
  await expect(page.locator('.scene-placeholder.is-static')).toBeVisible();
  expect(errors).toEqual([]);
});

test('kegagalan WebGL menggunakan ilustrasi statis', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (['webgl', 'webgl2', 'experimental-webgl'].includes(type)) return null;
      return original.call(this, type, ...args);
    };
  });
  await page.goto('/');
  await expect(page.locator('.scene-placeholder.is-static')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Kenalan, yuk!' })).toBeVisible();
  await expect(page.locator('.member-card')).toHaveCount(35);
});

test('navigasi mobile, pencarian, dan profil tanpa overflow horizontal', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Buka navigasi' });
  await menu.click();
  await expect(page.getByRole('navigation')).toBeVisible();
  await page.getByRole('navigation').getByRole('link', { name: 'Anggota', exact: true }).click();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByRole('searchbox')).toBeInViewport();
  await page.getByRole('searchbox').fill('Rinko');
  await expect(page.locator('.member-card')).toHaveCount(1);
  await page.locator('.member-card').click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Tutup profil' }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.setViewportSize({ width: 320, height: 740 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('tautan Instagram dan navigasi antarbagian valid', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const external = page.locator('a[href^="https://"]');
  for (const link of await external.all()) {
    await expect(link).toHaveAttribute('href', 'https://www.instagram.com/classpplg1_/');
    await expect(link).toHaveAttribute('rel', 'noreferrer');
  }
  const anchors = await page.locator('a[href^="#"]').evaluateAll((links) => links.map((link) => link.getAttribute('href')));
  for (const anchor of new Set(anchors)) await expect(page.locator(anchor)).toHaveCount(1);
  await page.getByRole('navigation').getByRole('link', { name: 'Pengurus' }).click();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Pengurus' })).toHaveAttribute('aria-current', 'location');
});
