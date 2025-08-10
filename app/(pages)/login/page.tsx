// "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// export default function AuthPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isRegister, setIsRegister] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const router = useRouter();

//   async function handleAuth() {
//     setLoading(true);
//     setErrorMsg("");
//     try {
//       if (isRegister) {
//         const { error } = await supabase.auth.signUp({ email, password });
//         if (error) throw error;
//         alert("Inscription réussie, vérifiez votre mail !");
//       } else {
//         const { error } = await supabase.auth.signInWithPassword({
//           email,
//           password,
//         });
//         if (error) throw error;
//         alert("Connexion réussie !");
//         router.push("/da"); // redirection après login
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         setErrorMsg(error.message);
//       } else {
//         setErrorMsg("Une erreur inconnue est survenue");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <main className="max-w-md mx-auto p-6 space-y-4">
//       <h1 className="text-2xl font-bold">
//         {isRegister ? "Register" : "Login"}
//       </h1>

//       {errorMsg && <div className="text-red-600">{errorMsg}</div>}

//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="input"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="input"
//       />

//       <button onClick={handleAuth} disabled={loading} className="btn-primary">
//         {loading ? "Loading..." : isRegister ? "Register" : "Login"}
//       </button>

//       <p>
//         {isRegister ? "Already registered?" : "No account yet?"}{" "}
//         <button
//           onClick={() => setIsRegister(!isRegister)}
//           className="text-blue-600 underline"
//         >
//           {isRegister ? "Login here" : "Register here"}
//         </button>
//       </p>
//     </main>
//   );
// }

"use client";
import { LoginForm } from "@/components/login-form";
export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
