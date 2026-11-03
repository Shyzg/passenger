# Button

Tombol berbentuk pil dengan target sentuh minimal 48px; varian `primary` (isi amber) dipakai paling banyak satu kali per layar, untuk hal yang dituju layar itu.

- Props: `variant` (`primary`, `secondary` sebagai default, `ghost`, `danger`), `size` (`md` 48px, `lg` 64px untuk kontrol yang dipakai saat mobil berjalan, `hero` 80px khusus putar/jeda), `icon`, `iconOnly`, dan semua atribut `<button>`.
- Label diawali kata kerja dan ditulis dalam kalimat biasa: "Tambah ke antrean", "Mulai perjalanan", "Akhiri perjalanan". Tanpa tanda seru.
- Pada `iconOnly`, tulis label lengkap sebagai children. Teksnya tersembunyi tetapi tetap dibacakan pembaca layar.
- `danger` hanya untuk mengakhiri sesuatu: perjalanan, atau mengeluarkan penumpang.
- Teks di atas isi amber selalu `on-amber`, tidak pernah putih.
- Tombol menyusut 4% saat ditekan supaya sentuhan terasa di mobil yang bergoyang. Efek ini mati saat pengguna memilih gerak dikurangi.
