import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Languages, Code } from "lucide-react";
import { FormData } from "@/app/types/types";

interface SkillsSectionProps {
  skills: FormData["personalSkills"];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Languages */}
      <Card className="border-cv-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-cv-heading text-lg">
            <Languages className="w-5 h-5 text-cv-accent" />
            Langues
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-medium text-cv-subheading mb-2">
              Langue maternelle
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills.motherTongues.map((language, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-cv-accent-light text-cv-accent"
                >
                  {language}
                </Badge>
              ))}
            </div>
          </div>

          {skills.otherLanguages.length > 0 && (
            <div>
              <h4 className="font-medium text-cv-subheading mb-2">
                Autres langues
              </h4>
              <div className="space-y-2">
                {skills.otherLanguages.map((lang, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-cv-text">{lang.language}</span>
                    <Badge variant="outline" className="text-xs">
                      {lang.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Technical Skills */}
      <Card className="border-cv-border shadow-sm md:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-cv-heading text-lg">
            <Code className="w-5 h-5 text-cv-accent" />
            Compétences techniques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            {skills.skills.map((skillGroup, index) => (
              <div key={index}>
                <h4 className="font-medium text-cv-subheading mb-2">
                  {skillGroup.category}
                </h4>
                <p className="text-cv-text text-sm leading-relaxed">
                  {skillGroup.skill}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
