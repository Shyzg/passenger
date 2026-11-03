# TripHeader

Kepala setiap layar penumpang: kursimu di kiri dan tombol Turun di kanan.

- Props: `seat`, `name`, `layout`, `driverSide`, `onLeave`, `leaveLabel` (default "Turun").
- Kursi tampil sebagai SeatTag ukuran `md`. Pembaca layar membacanya "Kursimu: …".
- Tombol Turun adalah Button `ghost` dengan ikon `leave`, dan hanya muncul bila `onLeave` diberikan. Turun berarti keluar dari perjalanan.
- Letakkan paling atas di layar penumpang. Tingginya minimal 48px.
