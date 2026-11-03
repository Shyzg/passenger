# TrackRow

Satu lagu di antrean atau di hasil pencarian: sampul kecil, judul, artis, durasi, siapa yang menambahkan, dan tombol tambah.

- Props: `title`, `artist`, `art`, `durationMs`, `explicit`, `position`, `addedBy`, `status` (`idle`, `adding`, `added`, `playing`), `onAdd`.
- Bungkus baris dalam `<ol class="ps-list">` untuk antrean (urutannya bermakna) atau `<ul class="ps-list">` untuk hasil pencarian, satu `<li>` per baris.
- Antrean Spotify hanya bisa ditambah dan dibaca. Tidak ada hapus, geser, atau ubah urutan, jadi jangan beri baris antrean tombol hapus atau pegangan seret.
- `position` 1 berarti diputar berikutnya. Urutan akhirnya diatur Spotify, jadi setelah menambah lagu, baca ulang antrean dari API sebelum menampilkan nomornya.
- Status `added` ("Masuk antrean") bertahan sampai pencarian berikutnya, supaya penumpang tidak menambah lagu yang sama dua kali. Selama `adding`, tombol nonaktif dan ikonnya berdenyut pelan.
- Judul dan nama artis masing-masing satu baris dengan elipsis. Lagu eksplisit diberi lencana E.
