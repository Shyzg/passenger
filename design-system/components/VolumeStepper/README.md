# VolumeStepper

Pengatur volume dalam langkah 10% dengan tombol − dan + berukuran 64px, karena slider sulit digeser dengan tepat di mobil yang bergoyang.

- Props: `value` (0–100), `step` (default 10), `onChange`, `locked`.
- Tampilkan hanya bila perangkat aktif melaporkan `supports_volume: true`. Banyak pemutar mobil tidak mengizinkan volume diatur dari luar.
- Meternya 10 segmen; satu segmen sama dengan satu ketukan.
- Bila `locked` (pengemudi mematikan izin volume), kedua tombol nonaktif dan muncul kalimat "Pengemudi mengunci volume."
