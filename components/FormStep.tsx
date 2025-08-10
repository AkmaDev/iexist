import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FormStepProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function FormStep({ title, description, children }: FormStepProps) {
  return (
    <Card className="border-cv-border shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl text-cv-heading">{title}</CardTitle>
        {description && <p className="text-cv-light-text">{description}</p>}
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  );
}
