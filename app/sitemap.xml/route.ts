// app/sitemap.xml/route.ts
import { supabase } from "@/lib/supabaseClient";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // On récupère tous les usernames depuis Supabase
  const { data: profiles } = await supabase
    .from("profiles")
    .select("username");

  // Domaine de base
  const baseUrl = "https://manasseakpovi.com";

  // Génération des URLs
  const urls =
    profiles?.map((p) => ({
      url: `${baseUrl}/${p.username}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })) || [];

  // Tu peux aussi ajouter d'autres pages statiques ici
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
  ];

  return [...staticUrls, ...urls];
}
