# Icon

Set ikon Passenger: grid 24px dengan garis 2px berujung bulat, sedangkan ikon pemutar (play, pause, next, previous) diisi penuh supaya terbaca sekilas.

- Konsumen memberi `name` (daftarnya ada di `Passenger.iconNames`), `size` (default 24) dan `label`, tetapi `label` hanya diisi bila ikon berdiri sendiri tanpa teks. Tanpa `label`, ikon disembunyikan dari pembaca layar.
- Ikon mengikuti `color` induknya (`currentColor`), jadi warnai lewat token teks: `ink`, `ink-muted`, `amber-text`, `signal`, `stop`.
- `tap` dan `qr` adalah gambar umum. Jangan menggantinya dengan N-Mark NFC Forum atau simbol contactless EMVCo, karena keduanya merek dagang.
- Ikon baru digambar di grid yang sama: garis 2px, sudut dan ujung bulat, tanpa isi kecuali untuk kontrol pemutar.
- Jangan pakai emoji sebagai ikon.
