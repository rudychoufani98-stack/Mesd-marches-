import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/supabase/server";

/** Export des données d'une personne (droit d'accès / portabilité), au format JSON. */
export async function GET(request: NextRequest) {
  const { supabase, email: admin } = await requireAdmin();
  const parsed = z.email().safeParse(request.nextUrl.searchParams.get("email")?.trim());
  if (!parsed.success) return NextResponse.json({ error: "Adresse e-mail invalide." }, { status: 400 });

  const { data, error } = await supabase
    .from("requests")
    .select("reference, kind, name, email, data, status, consent_at, consent_version, created_at")
    .ilike("email", parsed.data.replace(/[\\%_]/g, (c) => `\\${c}`))
    .order("created_at");
  if (error) return NextResponse.json({ error: "Export impossible." }, { status: 500 });

  await supabase.from("privacy_log").insert({
    action: "export",
    details: `${data.length} demande(s) exportée(s) à la demande d'une personne (droit d'accès)`,
    performed_by: admin,
  });

  const body = {
    exportedAt: new Date().toISOString(),
    controller: "MesDémarches",
    note: "Données personnelles détenues par MesDémarches concernant cette adresse e-mail.",
    requests: data,
  };
  return new NextResponse(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="mesdemarches-export-${new Date().toISOString().slice(0, 10)}.json"`,
      "Cache-Control": "no-store",
    },
  });
}
