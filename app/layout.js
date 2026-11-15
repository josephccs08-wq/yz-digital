import "./globals.css";

export const metadata = { title: "Yz Digital Payment", description: "Payment gateway QRIS" };

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
