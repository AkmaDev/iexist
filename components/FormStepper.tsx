import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface StepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const steps = [
  { id: 0, title: "Informations personnelles", description: "Données de base" },
  { id: 1, title: "Expériences", description: "Parcours professionnel" },
  { id: 2, title: "Formation", description: "Éducation et certifications" },
  { id: 3, title: "Compétences", description: "Langues et aptitudes" },
];

export function FormStepper({ currentStep, onStepClick }: StepperProps) {
  return (
    <Card className="mb-8 border-cv-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-cv-heading text-center">
          Création de votre profil professionnel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {steps.map((step) => (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepClick(step.id)}
              className={`
                flex flex-col items-center p-3 rounded-lg border transition-all
                ${
                  currentStep === step.id
                    ? "bg-cv-accent text-white border-cv-accent shadow-md"
                    : currentStep > step.id
                    ? "bg-cv-accent-light text-cv-accent border-cv-accent-light hover:bg-cv-accent hover:text-white"
                    : "bg-cv-section border-cv-border text-cv-light-text hover:border-cv-accent hover:text-cv-accent"
                }
              `}
            >
              <div className="flex items-center gap-2 mb-1">
                {currentStep > step.id ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <div
                    className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold
                    ${
                      currentStep === step.id
                        ? "border-white"
                        : "border-current"
                    }
                  `}
                  >
                    {step.id + 1}
                  </div>
                )}
                <span className="font-medium text-sm md:text-base">
                  {step.title}
                </span>
              </div>
              <span className="text-xs opacity-75">{step.description}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
