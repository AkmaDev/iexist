// app/[username]/page.tsx
import { supabase } from "@/lib/supabaseClient";
import type { FormData } from "@/app/types/types";
import { defaultFormData } from "@/app/utils/defaultFormData";

import { CVHeader } from "@/components/cv/CVHeader";
import { CVSection } from "@/components/cv/CVSection";
import { SkillsSection } from "@/components/cv/SkillsSection";
import { ExperienceItem } from "@/components/cv/ExperienceItem";
import { EducationItem } from "@/components/cv/EducationItem";

import type { Metadata } from "next";

interface ProfilRecord {
  user_id: string;
  username: string;
  data: FormData;
  created_at: string;
  updated_at: string;
}

// On ne définit plus l'interface à part, on met le type inline dans les fonctions

// Fonction pour générer le metadata SEO classique
export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const username = decodeURIComponent(params.username);

  const { data, error } = await supabase
    .from("profiles")
    .select("user_id, username, data")
    .eq("username", username)
    .single();

  if (error || !data) {
    return {
      title: "Profil non trouvé",
      description: "Le profil demandé n'existe pas.",
    };
  }

  const profile = data as ProfilRecord;
  const profilData = profile.data ?? defaultFormData;

  const fullName =
    profilData.personalInfo.firstName && profilData.personalInfo.lastName
      ? `${profilData.personalInfo.firstName} ${profilData.personalInfo.lastName}`
      : profile.username;

  const description =
    profilData.personalInfo.firstName && profilData.personalInfo.lastName
      ? `Découvrez le profil professionnel de ${fullName}, incluant ses expériences, formations et compétences.`
      : `Profil professionnel de ${profile.username}`;

  return {
    title: `${fullName} - Profil professionnel`,
    description,
    openGraph: {
      type: "profile",
      url: `https://manasseakpovi.com/${profile.username}`,
      title: `${fullName} - Profil professionnel`,
      description,
      images: [
        {
          url: "https://manasseakpovi.com/default-profile.jpg",
          alt: `${fullName} - Photo de profil`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullName,
      description,
      images: ["https://manasseakpovi.com/default-profile.jpg"],
    },
    metadataBase: new URL("https://manasseakpovi.com"),
    icons: {
      icon: "/favicon.ico",
    },
  };
}

// Composant de la page profil utilisateur
export default async function ProfilPage({
  params,
}: {
  params: { username: string };
}) {
  const username = decodeURIComponent(params.username);

  const { data, error } = await supabase
    .from("profiles")
    .select("user_id, username, data, created_at, updated_at")
    .eq("username", username)
    .single();

  if (error || !data) {
    return <p className="p-6 text-center text-red-600">Profil non trouvé.</p>;
  }

  const profile = data as ProfilRecord;
  const profilData = profile.data ?? defaultFormData;

  const fullName =
    profilData.personalInfo.firstName && profilData.personalInfo.lastName
      ? `${profilData.personalInfo.firstName} ${profilData.personalInfo.lastName}`
      : profile.username;

  return (
    <>
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <CVHeader data={profilData} />

        {profilData.workExperiences.length > 0 && (
          <CVSection title="Expériences professionnelles">
            {profilData.workExperiences.map((exp, i) => (
              <ExperienceItem key={i} {...exp} />
            ))}
          </CVSection>
        )}

        {profilData.educationTrainings.length > 0 && (
          <CVSection title="Éducation et formations">
            {profilData.educationTrainings.map((edu, i) => (
              <EducationItem key={i} {...edu} />
            ))}
          </CVSection>
        )}

        <CVSection title="Compétences personnelles">
          <SkillsSection skills={profilData.personalSkills} />
        </CVSection>
      </main>

      {/* JSON-LD pour SEO avancé, injecté directement dans le DOM */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: fullName,
            url: `https://manasseakpovi.com/${profile.username}`,
            jobTitle:
              profilData.workExperiences.length > 0
                ? profilData.workExperiences[0].jobTitle
                : undefined,
            worksFor:
              profilData.workExperiences.length > 0
                ? {
                    "@type": "Organization",
                    name: profilData.workExperiences[0].employer,
                  }
                : undefined,
            address: {
              "@type": "PostalAddress",
              addressLocality: profilData.personalInfo.city,
              addressCountry: profilData.personalInfo.country,
            },
          }),
        }}
      />
    </>
  );
}
