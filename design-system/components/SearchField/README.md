# SearchField

Kolom cari lagu dan artis di katalog Spotify, setinggi 56px dengan teks 17px.

- Props: `value`, `onChange`, `onClear`, `placeholder`, `label`, `busy`, `id`.
- Teks 17px mencegah Safari iOS memperbesar layar saat kolom disentuh, yang terjadi bila teks input di bawah 16px.
- Tunda pencarian sekitar 300 ms setelah ketikan terakhir dan batalkan permintaan yang lama, supaya tidak kena batas laju Spotify.
- Label default "Cari lagu" hanya untuk pembaca layar. Placeholder-nya "Cari lagu atau artis".
- Tombol hapus muncul hanya bila kolom terisi dan `onClear` diberikan.
