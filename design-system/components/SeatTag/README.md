# SeatTag

Penanda siapa yang memilih lagu: denah kursi mini dengan kursi orang itu menyala, ditambah nama kursi atau nama panggilannya.

- Props: `seat` (format "baris-kolom", misalnya `2-1`), `name` (opsional), `layout` (default `[2, 3, 2]`), `driverSide` (default `right`), `size` (`sm` di TrackRow dan NowPlaying, `md` di tempat lain).
- Penumpang dikenali dari kursinya, bukan dari akun. Nama panggilan boleh diisi; bila diisi, nama kursi tetap dibacakan untuk pembaca layar.
- Di denah mini, kursi pengemudi digambar sebagai kotak kosong supaya arah depan mobil terbaca.
