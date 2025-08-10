"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BackgroundLines } from "./ui/background-lines";

const Hero = () => {
  const router = useRouter();
  function handleClick() {
    router.push("/login");
  }

  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Créateur de profils <br />
        professionnels uniques.
      </h1>

      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        Construisez votre profil professionnel en ligne facilement et
        partagez-le avec le monde. Démarrez dès maintenant en créant votre
        compte.
      </p>

      <Button
        size="lg"
        onClick={() => handleClick()}
        className="group inline-flex items-center mt-10 relative z-50"
      >
        <span>Commencer</span>
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Button>
    </BackgroundLines>
  );
};

export default Hero;
