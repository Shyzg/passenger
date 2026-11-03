# NowPlaying

Panel lagu yang sedang diputar: sampul besar, judul, artis, siapa yang memilih, posisi lagu, lalu kontrol pemutar.

- Konsumen memberi `track` (`title`, `artist`, `album`, `art`, `durationMs`, `explicit`) dari playback state Spotify, `progressMs`, `isPlaying`, `addedBy` dan `attribution`. `TransportControls` diletakkan sebagai children.
- `addedBy` berasal dari catatan Passenger sendiri, karena antrean Spotify tidak menyimpan siapa yang menambahkan lagu. Lagu dari daftar putar pengemudi tidak punya `addedBy`; jangan tampilkan apa pun untuk lagu seperti itu.
- `attribution` wajib diisi dengan logo resmi Spotify dan tautan untuk membuka lagu di Spotify. Logo tidak disertakan di sistem ini; unduh dari panduan desain developer Spotify.
- Di antara dua polling, majukan `progressMs` di klien berdasarkan waktu sejak `timestamp` playback state, supaya bar tidak meloncat.
- Judul dibatasi dua baris. Label atas berbunyi "Sedang diputar" atau "Dijeda".
