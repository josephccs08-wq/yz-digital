"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { rupiah } from "@/lib/format";

const PRESETS = [10000, 25000, 50000, 100000];

export default function CreateForm({ settings }) {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amount), description, customerName, customerEmail }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Gagal membuat pembayaran");
      router.push(`/pay/${data.payment.id}`);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <form className="card stack" onSubmit={submit}>
      <div>
        <div className="muted" style={{ marginBottom: 8 }}>Nominal cepat</div>
        <div className="chips">
          {PRESETS.map(p => (
            <button type="button" key={p} className="chip" onClick={() => setAmount(String(p))}>{rupiah(p)}</button>
          ))}
        </div>
      </div>
      <label>Nominal (IDR)
        <input type="number" min={settings.minAmount} max={settings.maxAmount} required value={amount}
          onChange={e => setAmount(e.target.value)} placeholder={`Min ${rupiah(settings.minAmount)}`} />
      </label>
      <label>Keterangan
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Contoh: Invoice #123" maxLength={200} />
      </label>
      <label>Nama (opsional)
        <input value={customerName} onChange={e => setCustomerName(e.target.value)} maxLength={100} />
      </label>
      <label>Email (opsional)
        <input type="email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} maxLength={150} />
      </label>
      {error && <p className="error">{error}</p>}
      <button className="btn" disabled={busy}>{busy ? "Membuat QRIS…" : "Lanjut bayar via QRIS"}</button>
      <p className="muted" style={{ margin: 0, fontSize: 13 }}>Berlaku {settings.expiry} menit setelah dibuat.</p>
    </form>
  );
}
