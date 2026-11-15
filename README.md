# Yz Digital Payment

Payment gateway QRIS berbasis Next.js, siap dijalankan di Vercel.

## Setup

1. Buat database Postgres (Vercel Marketplace: Neon, atau Vercel Postgres). Salin connection string.
2. Daftar Midtrans, ambil **Server Key** (sandbox untuk uji coba).
3. Di Midtrans Dashboard, isi **Payment Notification URL** dengan:
   `https://DOMAIN-ANDA/api/webhook/midtrans`
4. Copy `.env.example` menjadi variabel environment di Vercel (Project Settings > Environment Variables):
   `DATABASE_URL`, `MIDTRANS_SERVER_KEY`, `MIDTRANS_IS_PRODUCTION`, `ADMIN_PASSWORD`, `ADMIN_SECRET`.
5. Deploy: `vercel` atau push repo ke GitHub lalu import di Vercel.

Tabel database dibuat otomatis saat request pertama.

## Menjalankan lokal

```
npm install
cp .env.example .env.local   # isi nilainya
npm run dev
```

## Alur

- Pembeli isi nominal di `/`, sistem memanggil Midtrans Core API (charge `qris`), lalu menampilkan QR di `/pay/[id]`.
- Halaman bayar polling status tiap 5 detik. Status juga dikoreksi ke Midtrans saat halaman dibuka.
- Midtrans mengirim notifikasi ke `/api/webhook/midtrans`. Signature SHA512 diverifikasi, lalu status dicek ulang ke API Midtrans.
- Admin di `/admin` untuk melihat transaksi, mengubah status manual, dan mengatur situs.

## Catatan

- QRIS di Midtrans produksi memerlukan akun merchant yang sudah aktif.
- Di sandbox, pembayaran bisa disimulasikan lewat simulator di Midtrans Dashboard.
- Struktur respons Midtrans (`actions` berisi `generate-qr-code`) sebaiknya dicek sekali di sandbox sebelum produksi.
