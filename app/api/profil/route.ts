// import { NextResponse } from "next/server";
// import { supabase } from "@/lib/supabaseClient";
// import type { FormData } from "@/app/types/types";

// export async function POST(req: Request) {
//   try {
//     const body: { userId: string; username: string; data: FormData } = await req.json();

//     const { userId, username, data } = body;

//     if (!userId || !username || !data) {
//       return NextResponse.json(
//         { success: false, error: "userId, username et data sont requis" },
//         { status: 400 }
//       );
//     }

//     // Vérifier si profil existe déjà
//     const { data: existingProfiles, error: fetchError } = await supabase
//       .from("profiles")
//       .select("id")
//       .eq("user_id", userId);

//     if (fetchError) {
//       return NextResponse.json({ success: false, error: fetchError.message }, { status: 500 });
//     }

//     if (existingProfiles && existingProfiles.length > 0) {
//       // Update
//       const profileId = existingProfiles[0].id;
//       const { error: updateError } = await supabase
//         .from("profiles")
//         .update({ username, data })
//         .eq("id", profileId);

//       if (updateError) {
//         return NextResponse.json({ success: false, error: updateError.message }, { status: 500 });
//       }

//       return NextResponse.json({ success: true, message: "Profil mis à jour" });
//     } else {
//       // Insert
//       const { error: insertError } = await supabase.from("profiles").insert([
//         {
//           user_id: userId,
//           username,
//           data,
//         },
//       ]);

//       if (insertError) {
//         return NextResponse.json({ success: false, error: insertError.message }, { status: 500 });
//       }

//       return NextResponse.json({ success: true, message: "Profil créé" });
//     }
//   } catch (err) {
//     if (err instanceof Error) {
//       return NextResponse.json({ success: false, error: err.message }, { status: 500 });
//     }
//     return NextResponse.json({ success: false, error: "Erreur inconnue" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import type { FormData } from "@/app/types/types";

export async function POST(req: Request) {
  try {
    const body: { userId: string; username: string; data: FormData } = await req.json();
    const { userId, username, data } = body;

    if (!userId || !username || !data) {
      return NextResponse.json(
        { success: false, error: "userId, username et data sont requis" },
        { status: 400 }
      );
    }

    // Chercher un profil existant (single = on veut 1 seul résultat)
    const { data: existingProfile, error: fetchError } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", userId)
      .single();

    // Gestion erreur fetch
    if (fetchError && fetchError.code !== "PGRST116") {
      // PGRST116 = pas de ligne trouvée, c’est OK si nouveau profil
      return NextResponse.json({ success: false, error: fetchError.message }, { status: 500 });
    }

    if (existingProfile) {
      // Mise à jour
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ username, data })
        .eq("id", existingProfile.id);

      if (updateError) {
        return NextResponse.json({ success: false, error: updateError.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: "Profil mis à jour" });
    } else {
      // Insertion nouveau profil
      const { error: insertError } = await supabase.from("profiles").insert([
        {
          user_id: userId,
          username,
          data,
        },
      ]);

      if (insertError) {
        return NextResponse.json({ success: false, error: insertError.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: "Profil créé" });
    }
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: "Erreur inconnue" }, { status: 500 });
  }
}
