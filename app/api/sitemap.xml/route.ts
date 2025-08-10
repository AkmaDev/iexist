import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const { data: profiles, error } = await supabase.from("profiles").select("username");

  if (error) return new Response("Erreur serveur", { status: 500 });

  const baseUrl = "https://manasseakpovi.com";

  const urls = profiles
    ?.map((p) => `<url><loc>${baseUrl}/${p.username}</loc></url>`)
    .join("") ?? "";

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
