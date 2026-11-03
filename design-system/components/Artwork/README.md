# Artwork

Sampul album dari Spotify, ditampilkan utuh tanpa dipotong, diburamkan, atau ditimpa teks.

- `src`: URL dari `album.images` Spotify. Pilih ukuran terdekat: 64px untuk baris, 300px atau 640px untuk NowPlaying.
- `alt`: kosongkan bila judul lagu sudah tertulis di sebelahnya (TrackRow). Di NowPlaying isi "Sampul album …".
- Tanpa `src`, komponen menggambar ubin tanpa sampul berikon piringan. Ubin ini untuk lagu lokal di ponsel pengemudi (yang tidak punya sampul dari Spotify) dan untuk gambar yang sedang dimuat. `tone` (`neutral`, `amber`, `signal`) hanya mewarnai ubin ini.
- Radius mengikuti aturan sampul Spotify: `radius-art-sm` di ukuran `row`, `radius-art-lg` di `hero`.
