// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

import { CVHeader } from "@/components/cv/CVHeader";
import { CVSection } from "@/components/cv/CVSection";
import { SkillsSection } from "@/components/cv/SkillsSection";
import { ExperienceItem } from "@/components/cv/ExperienceItem";
import { EducationItem } from "@/components/cv/EducationItem";
import { Button } from "@/components/ui/button";

import type { FormData } from "@/app/types/types"; // adapter si ton chemin de types est différent
import { SettingsIcon } from "lucide-react";

type ProfileData = {
  username: string;
  data: FormData;
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    async function loadUserAndProfile() {
      const { data } = await supabase.auth.getSession();

      if (!data?.session) {
        router.push("/auth");
        return;
      }

      if (!mounted) return;
      setUser(data.session.user);

      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("username, data")
        .eq("user_id", data.session.user.id)
        .single();

      if (error) {
        console.error("Erreur chargement profil:", error.message);
        setProfile(null);
      } else {
        // caster au type attendu
        setProfile(profileData as unknown as ProfileData);
      }

      if (mounted) setLoading(false);
    }

    loadUserAndProfile();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.push("/login");
        } else {
          setUser(session.user);
        }
      }
    );

    return () => {
      mounted = false;
      listener?.subscription.unsubscribe();
    };
  }, [router]);

  function editProfile() {
    router.push("/editProfile");
  }
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) return <div>Chargement...</div>;
  if (!user) return null;

  if (!profile || !profile.data) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold">Bienvenue, {user.email}</h1>
        <p>Profil non trouvé.</p>
        <Button variant="destructive" onClick={handleLogout} className="w-full">
          Déconnexion
        </Button>
      </main>
    );
  }

  const d = profile.data;

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header (photo, nom, titre, contacts) */}
      <div className="flex ">
        <CVHeader data={d} />
        <div className="pt-2 text-center">
          <Button variant="outline" onClick={editProfile}>
            Modifier <SettingsIcon className=" h-4 w-4" />
          </Button>
        </div>
      </div>
      {/* Mini-section profil / infos basiques */}
      <CVSection title="Informations personnelles">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>Nom d&apos;utilisateur</strong>
            <div>{profile.username}</div>
          </div>
          <div>
            <strong>Ville / Pays</strong>
            <div>
              {d.personalInfo.city}, {d.personalInfo.country}
            </div>
          </div>

          <div>
            <strong>Téléphone</strong>
            <div>
              +{d.personalInfo.phoneCountryCode} {d.personalInfo.phone}
            </div>
          </div>

          <div>
            <strong>Date de naissance</strong>
            <div>{d.personalInfo.dob}</div>
          </div>
        </div>
      </CVSection>

      {/* Compétences */}
      <CVSection title="Compétences">
        <SkillsSection skills={d.personalSkills} />
      </CVSection>

      {/* Expériences */}
      <CVSection title="Expériences professionnelles">
        {d.workExperiences.length === 0 && (
          <p>Aucune expérience enregistrée.</p>
        )}
        {d.workExperiences.map((we, i) => (
          <ExperienceItem
            key={i}
            jobTitle={we.jobTitle}
            employer={we.employer}
            city={we.city}
            country={we.country}
            fromDate={we.fromDate}
            toDate={we.toDate}
            ongoing={we.ongoing}
            mainActivities={we.mainActivities}
            moreDetails={we.moreDetails}
          />
        ))}
      </CVSection>

      {/* Formations */}
      <CVSection title="Formations">
        {d.educationTrainings.length === 0 && (
          <p>Aucune formation enregistrée.</p>
        )}
        {d.educationTrainings.map((ed, i) => (
          <EducationItem
            key={i}
            qualification={ed.qualification}
            organisation={ed.organisation}
            website={ed.website}
            city={ed.city}
            country={ed.country}
            fromDate={ed.fromDate}
            toDate={ed.toDate}
            ongoing={ed.ongoing}
            moreDetails={ed.moreDetails}
          />
        ))}
      </CVSection>

      <Button variant="destructive" onClick={handleLogout} className="w-full">
        Déconnexion
      </Button>
    </main>
  );
}
