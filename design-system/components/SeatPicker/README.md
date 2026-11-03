# SeatPicker

Denah mobil dari atas untuk memilih kursi saat naik. Pengemudi duduk di depan kanan, karena mobil di Indonesia bersetir kanan.

- Props: `layout` (jumlah kursi per baris dari depan ke belakang; default `[2, 3, 2]` untuk MPV tujuh kursi, `[2, 3]` untuk sedan), `driverSide`, `value`, `taken` (kursi ke nama penumpang; string kosong bila tanpa nama), `onChange`, `name`, `legend`.
- Tiap kursi adalah radio asli, jadi keyboard dan pembaca layar bisa langsung memakainya. Tinggi kursi minimal 64px.
- Kursi pengemudi selalu nonaktif dengan ikon setir. Kursi terisi bergaris putus-putus dan menampilkan nama penumpang atau "Terisi". Kursi terpilih diisi amber, diberi centang, dan bertuliskan "Kursimu".
- Nama kursi dihitung `seatLabel()`: Depan, Tengah kiri, Tengah, Tengah kanan, Belakang kiri, Belakang kanan.
