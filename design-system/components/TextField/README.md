# TextField

Kolom teks persegi untuk jawaban pendek, seperti nama panggilan saat naik, setinggi 56px dengan teks 17px.

- Props: `id` (wajib), `label`, `value`, `onChange`, `placeholder`, `hint`, `maxLength`, `type`, `autoComplete`, `enterKeyHint`.
- Label selalu terlihat dan ditulis kapital. Placeholder hanya contoh isi, bukan pengganti label.
- Keterangan yang penting masuk ke `hint`. Teksnya tampil di bawah kolom dan dibacakan pembaca layar lewat `aria-describedby`.
- Teks 17px mencegah Safari iOS memperbesar layar saat kolom disentuh.
- Bentuknya persegi dengan `radius-art-lg`, supaya tidak tertukar dengan SearchField yang berbentuk pil.
- Untuk nama panggilan, batasi `maxLength` sekitar 20 karakter supaya muat di SeatTag.
