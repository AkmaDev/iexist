import { supabase } from "@/lib/supabaseClient";
import { defaultFormData } from "@/app/utils/defaultFormData";

export default function SeedButton() {
  async function handleSeed() {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("Vous devez être connecté pour pré-remplir un profil.");
      return;
    }

    const { error } = await supabase.from("profiles").insert([
      {
        user_id: user.id,
        username: "testuser",
        data: defaultFormData,
      },
    ]);

    if (error) {
      alert("Erreur : " + error.message);
    } else {
      alert("Profil inséré !");
    }
  }

  return (
    <button
      onClick={handleSeed}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Pré-remplir profil test
    </button>
  );
}
