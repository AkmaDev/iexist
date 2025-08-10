"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, MapPin } from "lucide-react";
import { FormData } from "@/app/types/types";
// import profilePhoto from "@/assets/profile-photo.jpg";

interface CVHeaderProps {
  data: FormData;
}

export function CVHeader({ data }: CVHeaderProps) {
  const { personalInfo } = data;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;
  const initials = `${personalInfo.firstName[0]}${personalInfo.lastName[0]}`;

  return (
    <header className="text-center mb-12 pt-8">
      <div className="flex flex-col items-center mb-6">
        <Avatar className="w-32 h-32 mb-4 border-4 border-cv-border shadow-lg">
          {/* <AvatarImage src="/assets/profile-photo.jpg" alt={fullName} /> */}
          <AvatarFallback className="text-2xl font-semibold bg-cv-accent-light text-cv-accent">
            {initials}
          </AvatarFallback>
        </Avatar>

        <h1 className="text-4xl font-bold text-cv-heading mb-2">{fullName}</h1>

        {/* Job title from most recent experience */}
        {data.workExperiences.length > 0 && (
          <h2 className="text-xl text-cv-subheading mb-4 font-medium">
            {data.workExperiences[0].jobTitle}
          </h2>
        )}

        <p className="text-cv-text max-w-2xl leading-relaxed">
          Développeuse passionnée avec une expertise dans la création
          d&apos;applications web modernes et intuitives.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 text-cv-light-text">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-cv-accent" />
          <span>{personalInfo.email}</span>
        </div>

        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-cv-accent" />
          <span>{personalInfo.phone}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-cv-accent" />
          <span>
            {personalInfo.city}, {personalInfo.country}
          </span>
        </div>
      </div>
    </header>
  );
}
