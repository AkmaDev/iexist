// import { useState: } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus } from "lucide-react";

interface MultiInputProps {
  label: string;
  placeholder?: string;
  values: string[];
  onChange: (values: string[]) => void;
}

interface LanguageSkill {
  language: string;
  level: string;
}

interface LanguageInputProps {
  label: string;
  values: LanguageSkill[];
  onChange: (values: LanguageSkill[]) => void;
}

interface SkillGroup {
  category: string;
  skill: string;
}

interface SkillInputProps {
  label: string;
  values: SkillGroup[];
  onChange: (values: SkillGroup[]) => void;
}

export function MultiInput({
  label,
  placeholder,
  values,
  onChange,
}: MultiInputProps) {
  const addItem = () => onChange([...values, ""]);

  const updateItem = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;
    onChange(newValues);
  };

  const removeItem = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Label className="text-cv-subheading font-medium mb-3 block">
        {label}
      </Label>
      <div className="space-y-2">
        {values.map((value, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder={placeholder}
              value={value}
              onChange={(e) => updateItem(index, e.target.value)}
              className="border-cv-border focus:border-cv-accent focus:ring-cv-accent/20"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeItem(index)}
              className="border-cv-border text-cv-light-text hover:text-red-600 hover:border-red-300"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addItem}
          className="border-cv-accent text-cv-accent hover:bg-cv-accent hover:text-white"
        >
          <Plus className="w-4 h-4 mr-1" />
          Ajouter
        </Button>
      </div>
    </div>
  );
}

export function LanguageInput({ label, values, onChange }: LanguageInputProps) {
  const addLanguage = () => onChange([...values, { language: "", level: "" }]);

  const updateLanguage = (
    index: number,
    field: keyof LanguageSkill,
    value: string
  ) => {
    const newValues = [...values];
    newValues[index][field] = value;
    onChange(newValues);
  };

  const removeLanguage = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Label className="text-cv-subheading font-medium mb-3 block">
        {label}
      </Label>
      <div className="space-y-3">
        {values.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 border border-cv-border rounded-lg"
          >
            <div>
              <Label className="text-sm text-cv-light-text">Langue</Label>
              <Input
                placeholder="Ex: Anglais"
                value={item.language}
                onChange={(e) =>
                  updateLanguage(index, "language", e.target.value)
                }
                className="border-cv-border focus:border-cv-accent focus:ring-cv-accent/20"
              />
            </div>
            <div>
              <Label className="text-sm text-cv-light-text">Niveau</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Ex: Courant (C1)"
                  value={item.level}
                  onChange={(e) =>
                    updateLanguage(index, "level", e.target.value)
                  }
                  className="border-cv-border focus:border-cv-accent focus:ring-cv-accent/20"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeLanguage(index)}
                  className="border-cv-border text-cv-light-text hover:text-red-600 hover:border-red-300"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addLanguage}
          className="border-cv-accent text-cv-accent hover:bg-cv-accent hover:text-white"
        >
          <Plus className="w-4 h-4 mr-1" />
          Ajouter une langue
        </Button>
      </div>
    </div>
  );
}

export function SkillInput({ label, values, onChange }: SkillInputProps) {
  const addSkill = () => onChange([...values, { category: "", skill: "" }]);

  const updateSkill = (
    index: number,
    field: keyof SkillGroup,
    value: string
  ) => {
    const newValues = [...values];
    newValues[index][field] = value;
    onChange(newValues);
  };

  const removeSkill = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Label className="text-cv-subheading font-medium mb-3 block">
        {label}
      </Label>
      <div className="space-y-3">
        {values.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 border border-cv-border rounded-lg"
          >
            <div>
              <Label className="text-sm text-cv-light-text">Catégorie</Label>
              <Input
                placeholder="Ex: Frontend"
                value={item.category}
                onChange={(e) => updateSkill(index, "category", e.target.value)}
                className="border-cv-border focus:border-cv-accent focus:ring-cv-accent/20"
              />
            </div>
            <div>
              <Label className="text-sm text-cv-light-text">Compétences</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Ex: React, Vue.js, Angular"
                  value={item.skill}
                  onChange={(e) => updateSkill(index, "skill", e.target.value)}
                  className="border-cv-border focus:border-cv-accent focus:ring-cv-accent/20"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeSkill(index)}
                  className="border-cv-border text-cv-light-text hover:text-red-600 hover:border-red-300"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addSkill}
          className="border-cv-accent text-cv-accent hover:bg-cv-accent hover:text-white"
        >
          <Plus className="w-4 h-4 mr-1" />
          Ajouter une compétence
        </Button>
      </div>
    </div>
  );
}
