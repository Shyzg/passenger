# TripNotice

Kotak status perjalanan dan Spotify berisi ikon, judul, dan satu kalimat yang memberi tahu apa yang harus dilakukan.

- Props: `preset`, atau gabungan `tone`, `icon` dan `title`. `children` mengganti isi preset; `action` biasanya sebuah Button.
- Ada empat nada: `info` (biru `signal`), `wait` (amber), `stop` (merah `stop`) dan `neutral`. Nada tidak pernah menjadi satu-satunya penanda, karena judul selalu menyebut keadaannya.
- `stop` langsung diumumkan ke pembaca layar (`role="alert"`); nada lain memakai `role="status"`.

| preset | kapan dipakai |
| --- | --- |
| `joined` | Penumpang baru saja naik dan sudah boleh memilih lagu. |
| `waiting` | Pengemudi menyalakan persetujuan dan belum menyetujui penumpang ini. |
| `no-device` | Spotify tidak punya perangkat aktif, sehingga antrean dan kontrol gagal. |
| `rate-limited` | Spotify menjawab 429; coba lagi setelah jeda yang diminta. |
| `locked` | Penumpang menyentuh kontrol yang dimatikan pengemudi. |
| `no-trip` | Kartu dipindai saat tidak ada perjalanan aktif. |
| `premium` | Akun pengemudi bukan Premium. Pesan ini untuk layar pengemudi. |
| `ended` | Pengemudi mengakhiri perjalanan. |
