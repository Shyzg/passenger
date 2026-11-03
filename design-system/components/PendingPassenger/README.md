# PendingPassenger

Baris penumpang yang menunggu persetujuan pengemudi, dengan tombol Setujui dan Tolak.

- Props: `seat`, `name`, `layout`, `driverSide`, `onApprove`, `onDecline`.
- Dipakai di layar pengemudi saat izin "Setujui penumpang baru" menyala, dan hanya saat mobil berhenti. Penumpang yang menunggu melihat TripNotice `waiting`.
- Isi kartu di mobil tidak pernah berubah, jadi persetujuan inilah yang mencegah orang di luar mobil ikut mengontrol musik. Berikan `onDecline` supaya pengemudi bisa menolak orang yang tidak dikenalnya.
- Pembaca layar membaca tombolnya lengkap dengan penumpangnya, misalnya "Setujui Rani".
- Susun beberapa baris berurutan; garis pemisahnya sudah diatur stylesheet.
