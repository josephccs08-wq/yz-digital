import { getSettings } from "@/lib/server";
import CreateForm from "./CreateForm";

export const dynamic = "force-dynamic";

export default async function Home() {
  const s = await getSettings();
  return (
    <main className="wrap">
      <header className="topbar">
        <div className="brand"><span className="logo">Yz</span>{s.site_name}</div>
        <a className="muted" href="/admin">Admin</a>
      </header>
      <section className="hero">
        <h1>{s.tagline}</h1>
        <p className="muted">Scan QRIS, status pembayaran diperbarui otomatis.</p>
      </section>
      <CreateForm
        settings={{ minAmount: Number(s.min_amount), maxAmount: Number(s.max_amount), expiry: s.expiry_minutes }}
      />
      <footer className="foot">{s.footer_text}</footer>
    </main>
  );
}
