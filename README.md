# XII-1 RPL — Website Profil Kelas

Website statis baru untuk SMK Swasta Al Washliyah 2 Perdagangan, dibangun dengan React + Vite, Three.js / React Three Fiber, Drei, GSAP ScrollTrigger, dan CSS murni.

## Jalankan

Gunakan Node.js 22.12+ atau Node.js 24 LTS.

```bash
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan Vite.

```bash
npm run build
npm run preview
```

Unggah **isi folder `dist/`** ke hosting statis. Tidak memerlukan backend, database, environment variable, maupun layanan proyek sebelumnya. `base: './'` mendukung hosting dalam subfolder. Tautan navigasi memakai anchor, jadi tidak membutuhkan aturan fallback routing.

## Isi dan struktur

- `src/data/siswa.json`: 35 data siswa dari prompt. Ubah nama, foto, jabatan, dan informasi lahir di sini. URL foto M Rinko Wing Kurniawan sementara dikosongkan sesuai permintaan; nilai `foto` kosong langsung menampilkan avatar inisial.
- `src/data/kelas.js`: deskripsi yang bisa diganti, sekolah, Instagram, dan angkatan. Angkatan kosong tidak ditampilkan.
- `src/components/Hero.jsx`: judul dan pengelolaan pemuatan / fallback 3D.
- `src/components/Scene3D.jsx`: objek 3D buatan kode, lampu, dan respons kursor.
- `src/components/About.jsx`, `Pengurus.jsx`, `MemberGrid.jsx`, `MemberCard.jsx`, `Footer.jsx`: bagian halaman.
- `src/components/MemberDialog.jsx`: profil siswa dengan fokus keyboard dan tombol Escape.
- `src/hooks/useReveal.js`: animasi masuk GSAP, dibersihkan ketika filter berubah.
- `src/styles.css`: warna, layout, responsivitas, dan reduced motion.
- `src/assets/`: tempat aset tambahan.

## Interaksi dan performa

- 35 anggota termasuk 6 pengurus; pencarian nama, filter jenis kelamin, dan urutan nomor / nama.
- Foto dimuat bertahap menggunakan URL asli. Jika akses ditolak atau URL gagal, kartu menampilkan avatar inisial. Font disertakan dalam build.
- Adegan 3D dimuat terpisah dari halaman; placeholder langsung terlihat. Geometri dan resolusi render dikurangi di ponsel.
- Render 3D berhenti saat hero tidak terlihat atau tab disembunyikan. Pengguna bisa menekan Jeda.
- Preferensi `prefers-reduced-motion` mengganti adegan dengan ilustrasi CSS statis dan menonaktifkan animasi masuk / smooth scroll. Kegagalan WebGL juga memakai fallback.
- Navigasi sticky memiliki indikator section aktif dan menu mobile. Semua kontrol dapat digunakan dengan keyboard.
- NIS dan alamat tersimpan sesuai sumber data, tetapi antarmuka profil hanya menampilkan informasi yang diminta: foto, nama, jabatan, tempat dan tanggal lahir.

## Verifikasi

```bash
npm run lint
npm run build
npm test
```

Tes browser memakai Microsoft Edge yang terpasang secara lokal. Untuk sistem lain, hapus `channel: 'msedge'` di `playwright.config.js` lalu jalankan `npx playwright install chromium`.
