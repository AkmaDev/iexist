"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

import {
  InputField,
  TextareaField,
  SelectField,
  CheckboxField,
} from "@/components/FormFields";
import { FormStepper } from "@/components/FormStepper";
import { FormStep } from "@/components/FormStep";
import {
  MultiInput,
  LanguageInput,
  SkillInput,
} from "@/components/MultiInputs";

import { FormData } from "@/app/types/types";
import Hero from "@/components/Hero";
import { EyeIcon } from "lucide-react";

const genders = ["Male", "Female", "Other", "Prefer not to say"];
const languagesList = [
  "English",
  "French",
  "Spanish",
  "German",
  "Chinese",
  "Arabic",
  "Russian",
  "Portuguese",
];
const dateFormats = ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"];
const eqfLevels = [
  "Level 1",
  "Level 2",
  "Level 3",
  "Level 4",
  "Level 5",
  "Level 6",
  "Level 7",
  "Level 8",
];

const DEFAULT_VALUES: FormData = {
  language: "English",
  dateFormat: "DD/MM/YYYY",
  personalInfo: {
    firstName: "",
    lastName: "",
    passportId: "",
    workPermit: "",
    dob: "",
    placeOfBirth: "",
    placeOfBirthCountry: "",
    gender: "",
    nationality: "",
    email: "",
    phone: "",
    phoneCountryCode: "",
    addressType: "",
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    city: "",
    country: "",
  },
  workExperiences: [
    {
      jobTitle: "",
      employer: "",
      city: "",
      country: "",
      addressDetails: "",
      fromDate: "",
      toDate: "",
      ongoing: false,
      mainActivities: "",
      moreDetails: "",
    },
  ],
  educationTrainings: [
    {
      qualification: "",
      organisation: "",
      website: "",
      eqfLevel: "",
      city: "",
      country: "",
      addressDetails: "",
      fromDate: "",
      toDate: "",
      ongoing: false,
      moreDetails: "",
    },
  ],
  personalSkills: {
    motherTongues: [],
    otherLanguages: [],
    skills: [],
  },
};

export default function EuropassLikeForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const { register, control, handleSubmit, watch, setValue } =
    useForm<FormData>({
      defaultValues: DEFAULT_VALUES,
    });

  const {
    fields: workFields,
    append: workAppend,
    remove: workRemove,
  } = useFieldArray({ control, name: "workExperiences" });

  const {
    fields: eduFields,
    append: eduAppend,
    remove: eduRemove,
  } = useFieldArray({ control, name: "educationTrainings" });

  // watched arrays to disable toDate when ongoing is checked
  const watchWork = watch("workExperiences");
  const watchEdu = watch("educationTrainings");

  const onSubmit = async (data: FormData) => {
    // get current authenticated user
    const { data: userData } = await supabase.auth.getUser();
    const currentUser = userData?.user;

    if (!currentUser) {
      alert("Utilisateur non connecté");
      return;
    }

    try {
      const response = await fetch("/api/profil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          username: currentUser.email,
          data,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message || "Profil sauvegardé");
        router.push("/dashboard");
      } else {
        alert("Erreur: " + (result.error || "Erreur inconnue"));
      }
    } catch (error) {
      console.error(error);
      alert("Erreur réseau");
    }
  };

  function goToDashboard() {
    router.push("/dashboard");
  }

  // useEffect(() => {
  //   async function loadUserAndProfile() {
  //     const { data: sessionData } = await supabase.auth.getSession();
  //     if (!sessionData?.session) {
  //       router.push("/login");
  //       return;
  //     }
  //     const currentUser = sessionData.session.user;
  //     setUser(currentUser);

  //     // Charger le profil existant depuis la table 'profiles' (suppose : user_id, username, data json)
  //     const { data: profileData, error } = await supabase
  //       .from("profiles")
  //       .select("username, data")
  //       .eq("user_id", currentUser.id)
  //       .single();

  //     if (!error && profileData?.data) {
  //       const profile = profileData.data as FormData;

  //       // On setValue explicitement pour chaque partie (plus sûr)
  //       if (profile.language) setValue("language", profile.language);
  //       if (profile.dateFormat) setValue("dateFormat", profile.dateFormat);
  //       if (profile.personalInfo)
  //         setValue("personalInfo", profile.personalInfo);
  //       if (profile.workExperiences)
  //         setValue("workExperiences", profile.workExperiences);
  //       if (profile.educationTrainings)
  //         setValue("educationTrainings", profile.educationTrainings);
  //       if (profile.personalSkills)
  //         setValue("personalSkills", profile.personalSkills);
  //     }

  //     setLoading(false);
  //   }

  //   loadUserAndProfile();
  // }, [router, setValue]);

  // if (loading) return <div>Chargement...</div>;
  // if (!user) return null;

  // useEffect(() => {
  //   async function loadUserAndProfile() {
  //     const { data: sessionData } = await supabase.auth.getSession();
  //     if (!sessionData?.session) {
  //       // Pas connecté, on affiche Hero (user=null)
  //       setUser(null);
  //       setLoading(false);
  //       return;
  //     }

  //     const currentUser = sessionData.session.user;
  //     setUser(currentUser);

  //     // Charger le profil s’il existe
  //     const { data: profileData, error } = await supabase
  //       .from("profiles")
  //       .select("username, data")
  //       .eq("user_id", currentUser.id)
  //       .single();

  //     if (!error && profileData?.data) {
  //       const profile = profileData.data as FormData;

  //       if (profile.language) setValue("language", profile.language);
  //       if (profile.dateFormat) setValue("dateFormat", profile.dateFormat);
  //       if (profile.personalInfo)
  //         setValue("personalInfo", profile.personalInfo);
  //       if (profile.workExperiences)
  //         setValue("workExperiences", profile.workExperiences);
  //       if (profile.educationTrainings)
  //         setValue("educationTrainings", profile.educationTrainings);
  //       if (profile.personalSkills)
  //         setValue("personalSkills", profile.personalSkills);
  //     }

  //     setLoading(false);
  //   }

  //   loadUserAndProfile();
  // }, [router, setValue]);

  useEffect(() => {
    async function loadUserAndProfile() {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) {
        // Pas connecté, on affiche Hero (user=null)
        setUser(null);
        setLoading(false);
        return;
      }

      const currentUser = sessionData.session.user;
      setUser(currentUser);

      // Charger le profil s’il existe
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("username, data")
        .eq("user_id", currentUser.id)
        .single();

      if (!error && profileData?.data) {
        const profile = profileData.data as FormData;

        // Si prénom ou nom renseigné, on redirige vers dashboard directement
        if (profile.personalInfo.firstName || profile.personalInfo.lastName) {
          router.push("/dashboard");
          return; // stop la suite
        }

        if (profile.language) setValue("language", profile.language);
        if (profile.dateFormat) setValue("dateFormat", profile.dateFormat);
        if (profile.personalInfo)
          setValue("personalInfo", profile.personalInfo);
        if (profile.workExperiences)
          setValue("workExperiences", profile.workExperiences);
        if (profile.educationTrainings)
          setValue("educationTrainings", profile.educationTrainings);
        if (profile.personalSkills)
          setValue("personalSkills", profile.personalSkills);
      }

      setLoading(false);
    }

    loadUserAndProfile();
  }, [router, setValue]);

  if (loading) return <div>Chargement...</div>;
  if (!user) return <Hero />;
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex gap-6 justify-center">
        <h1 className="text-4xl font-bold text-center">
          Créer votre profil, {user.email}
        </h1>
        <div className="pt-2 text-center">
          <Button variant="outline" onClick={goToDashboard}>
            Voir le résultat <EyeIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        <FormStepper currentStep={currentStep} onStepClick={setCurrentStep} />

        {/* Step 0 : Informations personnelles */}
        {currentStep === 0 && (
          <FormStep
            title="Informations personnelles"
            description="Données de base"
          >
            <div className="flex gap-6 max-w-md">
              <SelectField
                label="Langue du profil"
                id="language"
                register={register}
                path={"language" as Path<FormData>}
                options={languagesList}
              />
              <SelectField
                label="Format de date"
                id="dateFormat"
                register={register}
                path={"dateFormat" as Path<FormData>}
                options={dateFormats}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              <InputField
                label="Prénom"
                id="firstName"
                register={register}
                path={"personalInfo.firstName" as Path<FormData>}
                required
              />
              <InputField
                label="Nom"
                id="lastName"
                register={register}
                path={"personalInfo.lastName" as Path<FormData>}
                required
              />

              <InputField
                label="Numéro de passeport / ID"
                id="passportId"
                register={register}
                path={"personalInfo.passportId" as Path<FormData>}
              />
              <InputField
                label="Permis de travail"
                id="workPermit"
                register={register}
                path={"personalInfo.workPermit" as Path<FormData>}
              />

              <InputField
                label="Date de naissance"
                id="dob"
                type="date"
                register={register}
                path={"personalInfo.dob" as Path<FormData>}
                required
              />
              <InputField
                label="Lieu de naissance (ville)"
                id="placeOfBirth"
                register={register}
                path={"personalInfo.placeOfBirth" as Path<FormData>}
                required
              />
              <InputField
                label="Pays de naissance"
                id="placeOfBirthCountry"
                register={register}
                path={"personalInfo.placeOfBirthCountry" as Path<FormData>}
                required
              />

              <SelectField
                label="Genre"
                id="gender"
                register={register}
                path={"personalInfo.gender" as Path<FormData>}
                options={genders}
              />
              <InputField
                label="Nationalité"
                id="nationality"
                register={register}
                path={"personalInfo.nationality" as Path<FormData>}
                required
              />

              <InputField
                label="Email"
                id="email"
                type="email"
                register={register}
                path={"personalInfo.email" as Path<FormData>}
                required
              />
              <InputField
                label="Indicatif téléphone"
                id="phoneCountryCode"
                register={register}
                path={"personalInfo.phoneCountryCode" as Path<FormData>}
              />
              <InputField
                label="Téléphone"
                id="phone"
                register={register}
                path={"personalInfo.phone" as Path<FormData>}
              />

              <SelectField
                label="Type d'adresse"
                id="addressType"
                register={register}
                path={"personalInfo.addressType" as Path<FormData>}
                options={["Domicile", "Travail", "Autre"]}
              />
              <InputField
                label="Adresse ligne 1"
                id="addressLine1"
                register={register}
                path={"personalInfo.addressLine1" as Path<FormData>}
                required
              />
              <InputField
                label="Adresse ligne 2"
                id="addressLine2"
                register={register}
                path={"personalInfo.addressLine2" as Path<FormData>}
              />
              <InputField
                label="Code postal"
                id="postalCode"
                register={register}
                path={"personalInfo.postalCode" as Path<FormData>}
                required
              />
              <InputField
                label="Ville"
                id="city"
                register={register}
                path={"personalInfo.city" as Path<FormData>}
                required
              />
              <InputField
                label="Pays"
                id="country"
                register={register}
                path={"personalInfo.country" as Path<FormData>}
                required
              />
            </div>
          </FormStep>
        )}

        {/* Step 1 : Expériences */}
        {currentStep === 1 && (
          <FormStep title="Expériences professionnelles" description="Parcours">
            {workFields.map((field, i) => (
              <div key={field.id} className="p-4 border rounded-md space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Expérience #{i + 1}</h3>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => workRemove(i)}
                  >
                    Supprimer
                  </Button>
                </div>

                <InputField
                  label="Poste"
                  id={`jobTitle-${i}`}
                  register={register}
                  path={`workExperiences.${i}.jobTitle` as Path<FormData>}
                  required
                />
                <InputField
                  label="Employeur"
                  id={`employer-${i}`}
                  register={register}
                  path={`workExperiences.${i}.employer` as Path<FormData>}
                />
                <InputField
                  label="Ville"
                  id={`city-${i}`}
                  register={register}
                  path={`workExperiences.${i}.city` as Path<FormData>}
                />
                <InputField
                  label="Pays"
                  id={`country-${i}`}
                  register={register}
                  path={`workExperiences.${i}.country` as Path<FormData>}
                />
                <InputField
                  label="Détails adresse"
                  id={`addressDetails-${i}`}
                  register={register}
                  path={`workExperiences.${i}.addressDetails` as Path<FormData>}
                />

                <div className="flex gap-4">
                  <InputField
                    label="Date début"
                    type="date"
                    id={`fromDate-${i}`}
                    register={register}
                    path={`workExperiences.${i}.fromDate` as Path<FormData>}
                  />
                  <InputField
                    label="Date fin"
                    type="date"
                    id={`toDate-${i}`}
                    register={register}
                    path={`workExperiences.${i}.toDate` as Path<FormData>}
                    disabled={!!watchWork?.[i]?.ongoing}
                  />
                  <CheckboxField
                    label="En cours"
                    id={`ongoing-${i}`}
                    register={register}
                    path={`workExperiences.${i}.ongoing` as Path<FormData>}
                  />
                </div>

                <TextareaField
                  label="Activités principales"
                  id={`mainActivities-${i}`}
                  register={register}
                  path={`workExperiences.${i}.mainActivities` as Path<FormData>}
                />
                <TextareaField
                  label="Plus de détails"
                  id={`moreDetails-${i}`}
                  register={register}
                  path={`workExperiences.${i}.moreDetails` as Path<FormData>}
                />
              </div>
            ))}

            <Button
              onClick={() =>
                workAppend({
                  jobTitle: "",
                  employer: "",
                  city: "",
                  country: "",
                  addressDetails: "",
                  fromDate: "",
                  toDate: "",
                  ongoing: false,
                  mainActivities: "",
                  moreDetails: "",
                })
              }
            >
              + Ajouter une expérience
            </Button>
          </FormStep>
        )}

        {/* Step 2 : Éducation */}
        {currentStep === 2 && (
          <FormStep
            title="Éducation et formation"
            description="Diplômes et formation"
          >
            {eduFields.map((field, i) => (
              <div key={field.id} className="p-4 border rounded-md space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Formation #{i + 1}</h3>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => eduRemove(i)}
                  >
                    Supprimer
                  </Button>
                </div>

                <InputField
                  label="Titre du diplôme / qualification"
                  id={`qualification-${i}`}
                  register={register}
                  path={
                    `educationTrainings.${i}.qualification` as Path<FormData>
                  }
                  required
                />
                <InputField
                  label="Organisation"
                  id={`organisation-${i}`}
                  register={register}
                  path={
                    `educationTrainings.${i}.organisation` as Path<FormData>
                  }
                />
                <InputField
                  label="Site web"
                  id={`website-${i}`}
                  register={register}
                  path={`educationTrainings.${i}.website` as Path<FormData>}
                />
                <SelectField
                  label="Niveau EQF"
                  id={`eqfLevel-${i}`}
                  register={register}
                  path={`educationTrainings.${i}.eqfLevel` as Path<FormData>}
                  options={eqfLevels}
                />

                <InputField
                  label="Ville"
                  id={`eduCity-${i}`}
                  register={register}
                  path={`educationTrainings.${i}.city` as Path<FormData>}
                />
                <InputField
                  label="Pays"
                  id={`eduCountry-${i}`}
                  register={register}
                  path={`educationTrainings.${i}.country` as Path<FormData>}
                />
                <InputField
                  label="Détails adresse"
                  id={`eduAddressDetails-${i}`}
                  register={register}
                  path={
                    `educationTrainings.${i}.addressDetails` as Path<FormData>
                  }
                />

                <div className="flex gap-4">
                  <InputField
                    label="Date début"
                    type="date"
                    id={`eduFromDate-${i}`}
                    register={register}
                    path={`educationTrainings.${i}.fromDate` as Path<FormData>}
                  />
                  <InputField
                    label="Date fin"
                    type="date"
                    id={`eduToDate-${i}`}
                    register={register}
                    path={`educationTrainings.${i}.toDate` as Path<FormData>}
                    disabled={!!watchEdu?.[i]?.ongoing}
                  />
                  <CheckboxField
                    label="En cours"
                    id={`eduOngoing-${i}`}
                    register={register}
                    path={`educationTrainings.${i}.ongoing` as Path<FormData>}
                  />
                </div>

                <TextareaField
                  label="Plus de détails"
                  id={`eduMoreDetails-${i}`}
                  register={register}
                  path={`educationTrainings.${i}.moreDetails` as Path<FormData>}
                />
              </div>
            ))}

            <Button
              onClick={() =>
                eduAppend({
                  qualification: "",
                  organisation: "",
                  website: "",
                  eqfLevel: "",
                  city: "",
                  country: "",
                  addressDetails: "",
                  fromDate: "",
                  toDate: "",
                  ongoing: false,
                  moreDetails: "",
                })
              }
            >
              + Ajouter une formation
            </Button>
          </FormStep>
        )}

        {/* Step 3 : Compétences personnelles */}
        {currentStep === 3 && (
          <FormStep
            title="Compétences personnelles"
            description="Langues, compétences"
          >
            <div className="space-y-6 max-w-4xl">
              <MultiInput
                label="Langue maternelle"
                placeholder="Ex: Français"
                values={watch("personalSkills.motherTongues") || []}
                onChange={(vals) =>
                  setValue("personalSkills.motherTongues", vals)
                }
              />

              <div>
                <LanguageInput
                  label="Autres langues"
                  values={watch("personalSkills.otherLanguages") || []}
                  onChange={(vals) =>
                    setValue("personalSkills.otherLanguages", vals)
                  }
                />
              </div>

              <div>
                <SkillInput
                  label="Compétences"
                  values={watch("personalSkills.skills") || []}
                  onChange={(vals) => setValue("personalSkills.skills", vals)}
                />
              </div>
            </div>
          </FormStep>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 max-w-3xl mx-auto">
          {currentStep > 0 ? (
            <Button
              variant="outline"
              onClick={() => setCurrentStep((s) => s - 1)}
            >
              Précédent
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <Button onClick={() => setCurrentStep((s) => s + 1)}>
              Suivant
            </Button>
          ) : (
            <Button type="submit">Sauvegarder</Button>
          )}
        </div>
      </form>
    </main>
  );
}
