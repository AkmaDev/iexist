import { supabase } from "@/lib/supabaseClient";
import { defaultFormData } from "@/app/utils/defaultFormData";

async function seedProfile() {
  const { data, error } = await supabase.from("profiles").insert([
    {
      user_id: "id_utilisateur_test",
      username: "testuser",
      data: defaultFormData,
    },
  ]);

  if (error) {
    console.error("Erreur insertion:", error);
  } else {
    console.log("Profil inséré:", data);
  }
}

seedProfile();
