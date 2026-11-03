Passenger adalah web app untuk penumpang di mobil pribadi. Penumpang memindai kode QR atau menempelkan ponsel ke tag NFC di mobil, memilih kursi, lalu menambah lagu ke antrean dan memakai kontrol pemutar di akun Spotify pengemudi yang terhubung ke mobil. Penumpang tidak perlu akun Spotify. Rasanya seperti lampu dasbor di malam hari: redup, hangat, mudah dibaca, dan tidak mencuri perhatian pengemudi.

## Prinsip

- **Pengemudi tidak menyentuh ponsel saat mobil berjalan.** Di jalan, semua kontrol dipegang penumpang. Layar pengemudi (menghubungkan Spotify, memulai dan mengakhiri perjalanan, izin, persetujuan penumpang) dipakai saat mobil berhenti.
- **Malam dulu.** Layar terang di kabin gelap memantul ke kaca dan mengganggu pandangan pengemudi. Tema Malam (`dark`) adalah default, dan area terang terbesar di satu layar adalah satu tombol `primary`.
- **Satu jempol, mobil bergoyang.** Target sentuh minimal `tap-min` (48px). Kontrol yang dipakai saat mobil berjalan memakai `tap-drive` (64px), dan tombol putar/jeda memakai `tap-hero` (80px). Volume diatur bertahap, bukan dengan slider.
- **Spotify memutar, Passenger mengatur.** Passenger hanya menawarkan yang bisa dilakukan Web API Spotify: menambah ke antrean, membaca antrean, putar/jeda, lewati, sebelumnya, dan volume. Antrean tidak bisa dihapus atau diubah urutannya.

## Bahasa dan tulisan

- Tulis dalam bahasa Indonesia sehari-hari dan sapa penumpang dengan "kamu". Sebut orang di balik setir "pengemudi", bukan "sopir" atau "driver".
- Pakai kalimat pendek dengan huruf kalimat biasa, tanpa tanda seru dan tanpa emoji.
- Tombol diawali kata kerja: "Tambah ke antrean", "Lewati", "Pilih kursi ini", "Mulai perjalanan", "Akhiri perjalanan", "Turun".
- Pesan galat menyebut apa yang terjadi dan apa yang bisa dilakukan, tanpa minta maaf: "Spotify di mobil belum aktif. Minta pengemudi memutar lagu di Spotify dulu."
- Tulis durasi lagu seperti di pemutar musik (`3:48`), jam dengan titik sesuai EYD (`18.00`), dan desimal dengan koma (`85,6 mm`).
- Lagu, artis, dan nama penumpang di pratinjau adalah contoh rekaan.

| Istilah | Artinya | Hindari |
| --- | --- | --- |
| Naik | Bergabung ke perjalanan setelah memindai kartu | gabung, login |
| Turun | Keluar dari perjalanan | logout, keluar akun |
| Perjalanan | Sesi yang dibuka pengemudi; kontrol hanya ada selama perjalanan aktif | sesi, room |
| Antrean | Lagu-lagu berikutnya di Spotify | queue, playlist |
| Sedang diputar | Lagu yang terdengar sekarang | now playing |
| Kursi | Identitas penumpang selama perjalanan | akun, user |
| Pengemudi | Pemilik akun Spotify di mobil | sopir, driver, admin |

## Warna

- Semua warna adalah token dengan dua tema: Malam (`dark`, default dan tema pertama) dan Siang (`light`). Ganti tema berdasarkan jam, bukan setelan ponsel: Siang pukul 06.00–18.00, Malam di luar jam itu. Indonesia dekat khatulistiwa, jadi matahari terbit dan terbenam hampir di jam yang sama sepanjang tahun. Penumpang tetap boleh memilih tema sendiri.
- Latar halaman memakai `cabin`. Kartu, baris, dan input memakai `cabin-raised`. Jalur progres dan kursi kosong memakai `cabin-high`.
- Teks memakai `ink` dan keterangan memakai `ink-muted`. Keduanya terbaca di ketiga permukaan kabin pada kedua tema.
- `amber` adalah lampu dasbor: isi tombol utama dan kursi terpilih. Teks di atasnya selalu `on-amber`. Untuk teks atau ikon berwarna amber, pakai `amber-text`, karena di Siang `amber` terlalu terang untuk dibaca sebagai teks.
- `meter` mengisi semua yang menunjukkan jumlah: progres lagu, level volume, dan sakelar yang menyala.
- `signal` (biru) berarti berhasil atau info, misalnya sudah naik atau lagu masuk antrean. `stop` (merah lampu rem) berarti galat atau mengakhiri sesuatu. Warna status selalu ditemani ikon dan kata. `signal` sengaja biru, bukan hijau, supaya tidak tertukar dengan merah bagi pembaca buta warna.
- Jangan pakai hijau sebagai warna merek atau aksen. Passenger tidak boleh terlihat seperti aplikasi resmi Spotify.
- `line` untuk garis pemisah hiasan; `line-strong` untuk batas kontrol.
- Semua pasangan teks yang disebut di catatan token memenuhi kontras 4,5:1. Batas kontrol, cincin fokus, dan `meter` memenuhi 3:1. Keduanya berlaku di kedua tema.

## Tipografi

- `display` (Barlow Condensed) dipakai untuk judul layar (`hero`), judul lagu di NowPlaying (`track-title`), judul bagian (`section`), dan kode mobil (`code`). Barlow berangkat dari plat nomor dan rambu jalan, dan versi condensed-nya memuat judul lagu yang panjang di layar ponsel.
- `sans` (Barlow) dipakai untuk semua teks lain: `body`, `row-title`, `meta`, dan `label`.
- Teks dasar 17px dan tidak pernah di bawah 13px. Input memakai 17px, karena Safari iOS memperbesar layar bila teks input di bawah 16px.
- `label` selalu ditulis kapital.
- Angka yang berubah atau disusun berderet (durasi, progres, volume, kode) memakai `font-variant-numeric: tabular-nums`.
- Muat kedua keluarga dari Google Fonts: `https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@400;500;600;700&display=swap`.

## Ruang, ukuran, dan bentuk

- Spasi berbasis 4px, dari `space-1` sampai `space-8`. Gutter samping layar memakai `space-4`, jarak antarbagian `space-6`, dan jarak NowPlaying ke antrean `space-8`.
- Target sentuh: `tap-min` (48px) untuk semua kontrol, `tap-drive` (64px) untuk kontrol yang dipakai saat mobil berjalan, dan `tap-hero` (80px) hanya untuk putar/jeda.
- Tombol, kolom cari, SeatTag, dan sakelar berbentuk pil (`radius-pill`). Kartu, TripNotice, dan kursi memakai `radius-card`.
- Sampul album memakai `radius-art-sm` (4px) di ukuran kecil dan `radius-art-lg` (8px) di ukuran besar. Tampilkan sampul utuh; jangan dipotong, diburamkan, atau ditimpa teks maupun gradien.
- Bayangan (`shadow-raised`) hanya untuk benda yang melayang. Di Malam, elevasi dibantu garis terang tipis di tepi atas.
- Fokus keyboard memakai `focus-ring`: celah 2px warna latar, lalu cincin 2px warna `focus`.

## Gerak

- Gerak hanya dipakai sebagai umpan balik: tombol menyusut saat ditekan (120 ms), sakelar bergeser (150 ms), dan bar "sedang diputar" bergerak pelan.
- Tidak ada yang berkedip atau menyala-nyala. Cahaya berkedip di kabin bisa dikira lampu peringatan oleh pengemudi.
- Hormati `prefers-reduced-motion`: bila aktif, semua animasi berhenti.

## Ikon

- Ikon memakai set sendiri di komponen `Icon`: grid 24px dan garis 2px berujung bulat, sedangkan ikon pemutar diisi penuh. Warnanya mengikuti teks (`currentColor`).
- `tap` (NFC) dan `qr` adalah gambar umum, bukan merek dagang NFC Forum atau EMVCo.
- Tidak ada emoji.

## Spotify

- Pengemudi menghubungkan akun Spotify Premium. Antrean, putar/jeda, lewati, dan volume hanya bisa dipakai dengan Premium (scope `user-modify-playback-state`; membaca antrean dan status butuh `user-read-playback-state`). Tanpa Premium, tampilkan TripNotice `premium` di layar pengemudi.
- Perintah dikirim ke perangkat Spotify yang sedang aktif. Bila tidak ada perangkat aktif, tampilkan TripNotice `no-device`.
- Antrean hanya bisa ditambah dan dibaca, jadi jangan sediakan hapus, geser, atau ubah urutan.
- Spotify tidak mencatat siapa yang menambah lagu. Passenger menyimpan kursi penumpang untuk setiap lagu yang ditambahkannya; lagu lain di antrean tampil tanpa SeatTag.
- Tampilkan kontrol sesuai field `actions` di playback state (tombol yang ditolak masuk `unavailable`), dan tampilkan volume hanya bila `device.supports_volume` bernilai true.
- Judul, artis, dan sampul dari Spotify wajib diberi atribusi berupa logo resmi Spotify dan tautan kembali ke Spotify. Logo tidak disertakan di sistem ini: unduh dari panduan desain developer Spotify dan ikuti aturan ukurannya. Jangan menggambar ulang logo Spotify.
- Bila Spotify menjawab 429, tampilkan `rate-limited` dan tunggu sesuai header `Retry-After`.

## Kursi

- Penumpang dikenali dari kursinya, bukan dari akun. Saat naik, penumpang memilih kursi di SeatPicker dan boleh menambahkan nama panggilan.
- Kursi ditulis "baris-kolom": baris 1 di depan, dan kolom 1 di kiri bila mobil dilihat dari atas menghadap ke depan. Default-nya `[2, 3, 2]`, MPV tujuh kursi yang paling umum di Indonesia; sedan memakai `[2, 3]`.
- Mobil Indonesia bersetir kanan, jadi pengemudi duduk di `1-2` dan penumpang depan di `1-1`.

## Kartu QR dan NFC

- Mobil berisi satu kartu ID-1 (85,6 × 53,98 mm) dengan kode QR dan tag NFC yang memuat URL yang sama (JoinCard). Cetak dalam tema Siang dengan skala 100%.
- Kode QR memakai koreksi galat Q dan zona sepi 4 modul, sisinya minimal 25 mm, dan modulnya gelap di atas dasar terang.
- Isi kartu tidak pernah berubah, jadi halaman naik hanya memberi kontrol selama perjalanan aktif; di luar itu, tampilkan `no-trip`. Bila persetujuan penumpang dinyalakan, pengemudi menyetujui saat mobil berhenti, dan penumpang yang naik di tengah jalan menunggu dengan status `waiting`.

## Memakai sistem ini

- Muat dengan urutan ini: font Google, `tokens.css`, `components/bundle.css`, React 18 dan ReactDOM 18, lalu `components/bundle.js`. Semua komponen ada di `window.Passenger`.
- Pasang `data-theme="dark"` atau `data-theme="light"` di `<html>`. Tanpa atribut ini, token memakai nilai Malam.
- Komponen hanya menggambar. Data Spotify, polling, catatan kursi, dan izin pengemudi disediakan oleh aplikasi.
