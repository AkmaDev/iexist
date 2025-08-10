// /[username]/page.tsx

// import { supabase } from "@/lib/supabaseClient";
// import type { FormData } from "@/app/types/types";
// import { defaultFormData } from "@/app/utils/defaultFormData";

// interface ProfilRecord {
//   user_id: string;
//   username: string;
//   data: FormData;
//   created_at: string;
//   updated_at: string;
// }

// interface ProfilPageProps {
//   params: { username: string };
// }

// export default async function ProfilPage({ params }: ProfilPageProps) {
//   const resolvedParams = await params;
//   const username = decodeURIComponent(resolvedParams.username);
//   console.log("username reçu en param:", username);

//   const { data, error } = await supabase
//     .from("profiles")
//     .select("user_id, username, data, created_at, updated_at")
//     .eq("username", username)
//     .single();

//   if (error || !data) {
//     console.log("username reçu en param:", username);
//     return <p className="p-6 text-center text-red-600">Profil non trouvé.</p>;
//   }

//   // Ici on cast data en ProfilRecord
//   const profile = data as ProfilRecord;
//   const profilData = profile.data ?? defaultFormData;

//   // Utilisation du fallback pour éviter undefined et erreurs
//   //   const profilData = (data.data ?? defaultFormData) as FormData;
//   return (
//     <>
//       <head>
//         <title>
//           {profilData.personalInfo.firstName && profilData.personalInfo.lastName
//             ? `${profilData.personalInfo.firstName} ${profilData.personalInfo.lastName}`
//             : profile.username}{" "}
//           - Profil professionnel
//         </title>
//         <meta
//           name="description"
//           content={
//             profilData.personalInfo
//               ? `Profil de ${profilData.personalInfo.firstName} ${profilData.personalInfo.lastName}`
//               : "Profil professionnel"
//           }
//         />
//       </head>
//       <main className="max-w-3xl mx-auto p-6 space-y-6">
//         <h1 className="text-4xl font-bold">
//           {profilData.personalInfo
//             ? `${profilData.personalInfo.firstName} ${profilData.personalInfo.lastName}`
//             : profile.username}
//         </h1>

//         <section>
//           <h2 className="text-2xl font-semibold mb-2">
//             Informations personnelles
//           </h2>
//           <p>
//             <strong>Email:</strong>{" "}
//             <a
//               href={`mailto:${profilData.personalInfo.email}`}
//               className="text-blue-600 underline"
//             >
//               {profilData.personalInfo.email}
//             </a>
//           </p>
//           <p>
//             <strong>Téléphone:</strong>{" "}
//             {profilData.personalInfo.phoneCountryCode}{" "}
//             {profilData.personalInfo.phone}
//           </p>
//           <p>
//             <strong>Adresse:</strong> {profilData.personalInfo.addressLine1}
//             {profilData.personalInfo.addressLine2
//               ? `, ${profilData.personalInfo.addressLine2}`
//               : ""}
//             , {profilData.personalInfo.postalCode}{" "}
//             {profilData.personalInfo.city}, {profilData.personalInfo.country}
//           </p>
//           <p>
//             <strong>Date de naissance:</strong> {profilData.personalInfo.dob} à{" "}
//             {profilData.personalInfo.placeOfBirth},{" "}
//             {profilData.personalInfo.placeOfBirthCountry}
//           </p>
//           <p>
//             <strong>Nationalité:</strong> {profilData.personalInfo.nationality}
//           </p>
//         </section>

//         {profilData.workExperiences.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-semibold mb-2">
//               Expériences professionnelles
//             </h2>
//             {profilData.workExperiences.map(
//               (exp: FormData["workExperiences"][number], i: number) => (
//                 <article key={i} className="mb-4">
//                   <h3 className="font-bold">
//                     {exp.jobTitle} chez {exp.employer}
//                   </h3>
//                   <p className="italic text-gray-700">
//                     {exp.fromDate} - {exp.ongoing ? "Présent" : exp.toDate}
//                   </p>
//                   <p>{exp.mainActivities}</p>
//                   {exp.moreDetails && <p>{exp.moreDetails}</p>}
//                 </article>
//               )
//             )}
//           </section>
//         )}

//         {profilData.educationTrainings.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-semibold mb-2">
//               Éducation et formations
//             </h2>
//             {profilData.educationTrainings.map(
//               (edu: FormData["educationTrainings"][number], i: number) => (
//                 <article key={i} className="mb-4">
//                   <h3 className="font-bold">{edu.qualification}</h3>
//                   <p className="italic text-gray-700">
//                     {edu.fromDate} - {edu.ongoing ? "Présent" : edu.toDate}
//                   </p>
//                   <p>{edu.organisation}</p>
//                   {edu.moreDetails && <p>{edu.moreDetails}</p>}
//                 </article>
//               )
//             )}
//           </section>
//         )}

//         <section>
//           <h2 className="text-2xl font-semibold mb-2">
//             Compétences personnelles
//           </h2>
//           <p>
//             <strong>Langues maternelles:</strong>{" "}
//             {profilData.personalSkills.motherTongues.join(", ")}
//           </p>

//           {profilData.personalSkills.otherLanguages.length > 0 && (
//             <>
//               <strong>Autres langues:</strong>
//               <ul className="list-disc list-inside">
//                 {profilData.personalSkills.otherLanguages.map(
//                   (
//                     lang: FormData["personalSkills"]["otherLanguages"][number],
//                     idx: number
//                   ) => (
//                     <li key={idx}>
//                       {lang.language} ({lang.level})
//                     </li>
//                   )
//                 )}
//               </ul>
//             </>
//           )}

//           {profilData.personalSkills.skills.length > 0 && (
//             <>
//               <strong>Compétences:</strong>
//               <ul className="list-disc list-inside">
//                 {profilData.personalSkills.skills.map(
//                   (
//                     skill: FormData["personalSkills"]["skills"][number],
//                     idx: number
//                   ) => (
//                     <li key={idx}>
//                       {skill.category} : {skill.skill}
//                     </li>
//                   )
//                 )}
//               </ul>
//             </>
//           )}
//         </section>
//       </main>
//     </>
//   );
// }

// app/[username]/page.tsx
// app/[username]/page.tsx

// import { supabase } from "@/lib/supabaseClient";
// import type { FormData } from "@/app/types/types";
// import { defaultFormData } from "@/app/utils/defaultFormData";

// import { CVHeader } from "@/components/cv/CVHeader";
// import { CVSection } from "@/components/cv/CVSection";
// import { SkillsSection } from "@/components/cv/SkillsSection";
// import { ExperienceItem } from "@/components/cv/ExperienceItem";
// import { EducationItem } from "@/components/cv/EducationItem";
// import Head from "next/head";

// interface ProfilRecord {
//   user_id: string;
//   username: string;
//   data: FormData;
//   created_at: string;
//   updated_at: string;
// }

// interface ProfilPageProps {
//   params: { username: string };
// }

// export default async function ProfilPage({ params }: ProfilPageProps) {
//   const resolvedParams = await params;
//   const username = decodeURIComponent(resolvedParams.username);
//   console.log("username reçu en param:", username);

//   const { data, error } = await supabase
//     .from("profiles")
//     .select("user_id, username, data, created_at, updated_at")
//     .eq("username", username)
//     .single();

//   if (error || !data) {
//     console.log("username reçu en param:", username);
//     return <p className="p-6 text-center text-red-600">Profil non trouvé.</p>;
//   }

//   // Ici on cast data en ProfilRecord
//   const profile = data as ProfilRecord;
//   const profilData = profile.data ?? defaultFormData;

//   return (
//     <>
//       <Head>
//         <title>
//           {profilData.personalInfo.firstName && profilData.personalInfo.lastName
//             ? `${profilData.personalInfo.firstName} ${profilData.personalInfo.lastName} - Profil professionnel`
//             : `${profile.username} - Profil professionnel`}
//         </title>
//         <meta
//           name="description"
//           content={
//             profilData.personalInfo.firstName &&
//             profilData.personalInfo.lastName
//               ? `Découvrez le profil professionnel de ${profilData.personalInfo.firstName} ${profilData.personalInfo.lastName}, incluant ses expériences, formations et compétences.`
//               : `Profil professionnel de ${profile.username}`
//           }
//         />

//         {/* Open Graph */}
//         <meta property="og:type" content="profile" />
//         <meta
//           property="og:title"
//           content={`${profilData.personalInfo.firstName} ${profilData.personalInfo.lastName} - Profil professionnel`}
//         />
//         <meta
//           property="og:description"
//           content={`Profil professionnel de ${profilData.personalInfo.firstName} ${profilData.personalInfo.lastName}`}
//         />
//         <meta
//           property="og:url"
//           content={`https://manasseakpovi.com/${profile.username}`}
//         />
//         <meta
//           property="og:image"
//           content="https://manasseakpovi.com/default-profile.jpg"
//         />

//         {/* Twitter Card */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta
//           name="twitter:title"
//           content={`${profilData.personalInfo.firstName} ${profilData.personalInfo.lastName}`}
//         />
//         <meta
//           name="twitter:description"
//           content={`Profil professionnel de ${profilData.personalInfo.firstName} ${profilData.personalInfo.lastName}`}
//         />
//         <meta
//           name="twitter:image"
//           content="https://manasseakpovi.com/default-profile.jpg"
//         />

//         {/* JSON-LD (Schema.org) */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               "@context": "https://schema.org",
//               "@type": "Person",
//               name: `${profilData.personalInfo.firstName} ${profilData.personalInfo.lastName}`,
//               url: `https://manasseakpovi.com/${profile.username}`,
//               jobTitle:
//                 profilData.workExperiences.length > 0
//                   ? profilData.workExperiences[0].jobTitle
//                   : "",
//               worksFor:
//                 profilData.workExperiences.length > 0
//                   ? {
//                       "@type": "Organization",
//                       name: profilData.workExperiences[0].employer,
//                     }
//                   : undefined,
//               address: {
//                 "@type": "PostalAddress",
//                 addressLocality: profilData.personalInfo.city,
//                 addressCountry: profilData.personalInfo.country,
//               },
//             }),
//           }}
//         />
//       </Head>

//       <main className="max-w-4xl mx-auto p-6 space-y-6">
//         {/* Header similaire à dashboard */}
//         <CVHeader data={profilData} />

//         {profilData.workExperiences.length > 0 && (
//           <CVSection title="Expériences professionnelles">
//             {profilData.workExperiences.map((exp, i) => (
//               <ExperienceItem key={i} {...exp} />
//             ))}
//           </CVSection>
//         )}

//         {profilData.educationTrainings.length > 0 && (
//           <CVSection title="Éducation et formations">
//             {profilData.educationTrainings.map((edu, i) => (
//               <EducationItem key={i} {...edu} />
//             ))}
//           </CVSection>
//         )}

//         <CVSection title="Compétences personnelles">
//           <SkillsSection skills={profilData.personalSkills} />
//         </CVSection>
//       </main>
//     </>
//   );
// }

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

interface ProfilPageProps {
  params: { username: string };
}

// Fonction pour générer le metadata SEO classique
export async function generateMetadata({
  params,
}: ProfilPageProps): Promise<Metadata> {
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
export default async function ProfilPage({ params }: ProfilPageProps) {
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
