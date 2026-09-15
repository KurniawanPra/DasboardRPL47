import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

await mkdir('artifacts', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
try {
  await page.goto(process.env.QA_URL || 'http://127.0.0.1:5173', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.scene-loading').waitFor({ state: 'detached' });
  const pause = page.getByRole('button', { name: 'Jeda animasi 3D' });
  if (await pause.isVisible()) await pause.click();
  await page.screenshot({ path: 'artifacts/desktop-hero.png' });
  for (const section of ['tentang', 'pengurus', 'anggota']) {
    await page.evaluate((id) => document.getElementById(id).scrollIntoView({ behavior: 'instant' }), section);
    // Tunggu transisi visual selesai agar gambar QA merekam keadaan akhir.
    await page.waitForTimeout(1300);
    await page.screenshot({ path: `artifacts/desktop-${section}.png` });
  }
  const imageStats = await page.locator('img').evaluateAll((images) => ({ total: images.length, loaded: images.filter((img) => img.complete && img.naturalWidth > 0).length }));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'artifacts/mobile-hero.png' });
  await page.evaluate(() => document.getElementById('anggota').scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'artifacts/mobile-anggota.png' });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  await writeFile('artifacts/visual-report.json', JSON.stringify({ errors, imageStats, mobileOverflow: overflow }, null, 2));
  console.log(JSON.stringify({ errors, imageStats, mobileOverflow: overflow }));
} finally {
  await browser.close();
}
