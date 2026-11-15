import { handleWebhook } from "@/lib/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await handleWebhook(await req.json());
    return Response.json({ ok: true });
  } catch (e) {
    console.error("midtrans webhook:", e.message);
    return Response.json({ ok: false, error: e.message }, { status: e.status || 500 });
  }
}

export async function GET() {
  return Response.json({ ok: true, service: "yz-digital-payment webhook" });
}
