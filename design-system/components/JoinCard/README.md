# JoinCard

Kartu cetak berukuran ID-1 (85,6 × 53,98 mm, seukuran kartu ATM) yang ditaruh di mobil, berisi kode QR dan tag NFC menuju halaman naik.

- Props: `qr` (elemen SVG kode QR), `url` (URL pendek untuk diketik manual), `code`, `title`.
- Kartu selalu tampil dan dicetak dalam tema Siang (`data-theme="light"`), karena pemindai butuh modul gelap di atas dasar terang. Jangan membalik warna kode QR.
- Kode QR memakai koreksi galat Q (25%) karena kartu bisa tergores, zona sepi 4 modul, dan sisi minimal 25 mm.
- Untuk NFC, pakai kartu PVC NTAG213/215 ukuran ID-1 dan tulis URL yang sama sebagai rekaman NDEF URI. iPhone XS ke atas membacanya tanpa aplikasi; di Android, NFC harus dinyalakan.
- Cetak pada skala 100%; ukuran kartu ditulis dalam milimeter di CSS.
- Isi kartu tidak pernah berubah, jadi siapa pun yang memotretnya bisa membuka halaman naik. Kontrol hanya boleh terbuka selama perjalanan aktif (lihat TripNotice `no-trip`).
