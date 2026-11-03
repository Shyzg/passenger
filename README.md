# passenger

## Design system

Folder [`design-system/`](design-system/) berisi design system Passenger:

- buku panduan di [`design-system/README.md`](design-system/README.md)
- token di `tokens.json`
- 13 komponen React di `components/`:
  - `bundle.js` dan `bundle.css`
  - tipe props di `index.d.ts`
  - panduan per komponen di `components/<Komponen>/README.md`

Sumber utamanya adalah artifact Design System "Passenger" di claude.ai (privat): <https://claude.ai/artifact/MW9gFUXBwsBXUV4vAgwf3n>. Folder ini adalah salinan versi `1793700947-cd95` (3 November 2026), dengan jalur yang sama seperti folder `project/` di artifact. Ubah desainnya di artifact, lalu perbarui salinan ini.

### Memakai

Urutan memuat file ada di bagian [Memakai sistem ini](design-system/README.md#memakai-sistem-ini) di buku panduan. Semua komponen tersedia di `window.Passenger`.

### tokens.css

`design-system/tokens.css` dibuat dari `tokens.json`, jadi jangan diubah langsung. Setiap kali `tokens.json` berubah, jalankan:

```bash
node scripts/build-tokens.mjs
```

Isinya disusun sama seperti `tokens.css` yang dibuat halaman artifact:

- satu blok per tema (`data-theme="dark"` atau `"light"`)
- ukuran dan font di `:root`
- satu kelas per gaya teks (`.hero`, `.body`, `.label`, dan seterusnya)

### Pratinjau

File `components/<Komponen>/preview.html` hanya tampil di halaman artifact, karena halaman itulah yang menyisipkan `tokens.css`, `bundle.css`, React, dan `bundle.js` ke tiap pratinjau. Kalau dibuka langsung dari folder ini, halamannya kosong.

### Memperbarui dari artifact

1. Kosongkan `design-system/`, lalu salin semua file `project/` dari artifact ke sana dengan jalur yang sama, misalnya `project/components/bundle.js` ke `design-system/components/bundle.js`. Dengan begitu, komponen yang sudah dihapus di artifact juga hilang dari sini. Claude Code bisa melakukannya dengan membaca artifact di atas.
2. Jalankan `node scripts/build-tokens.mjs`.
3. Ganti nomor versi dan tanggal di bagian ini.

`design-system.json` adalah indeks milik halaman artifact. File ini ikut disalin hanya supaya jalurnya sama persis.
