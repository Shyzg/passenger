# TransportControls

Tombol sebelumnya, putar/jeda, dan lewati dalam ukuran untuk mobil yang bergerak: 64px di samping dan 80px di tengah.

- Props: `isPlaying`, `onPrevious`, `onPlayPause`, `onNext`, `locked`, `unavailable`.
- `locked` berisi tombol yang dimatikan pengemudi untuk penumpang. Tombol ini tampil nonaktif dengan gembok, ditambah kalimat "Pengemudi mengunci tombol …".
- `unavailable` berisi tombol yang sedang ditolak Spotify, menurut field `actions` di playback state (misalnya `skipping_prev`). Tombol ini tampil nonaktif tanpa gembok, karena bukan keputusan pengemudi.
- Semua kontrol butuh akun Premium pengemudi. Tanpa Premium, sembunyikan komponen ini dan tampilkan TripNotice `premium`.
