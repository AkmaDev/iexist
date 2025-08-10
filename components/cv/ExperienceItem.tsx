import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

interface ExperienceItemProps {
  jobTitle: string;
  employer: string;
  city: string;
  country: string;
  fromDate: string;
  toDate?: string;
  ongoing: boolean;
  mainActivities: string;
  moreDetails?: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
}

export function ExperienceItem({
  jobTitle,
  employer,
  city,
  country,
  fromDate,
  toDate,
  ongoing,
  mainActivities,
  moreDetails,
}: ExperienceItemProps) {
  const startDate = formatDate(fromDate);
  const endDate = ongoing ? "Présent" : toDate ? formatDate(toDate) : "";

  return (
    <Card className="mb-6 border-cv-border shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-cv-heading mb-1">
              {jobTitle}
            </h3>
            <h4 className="text-lg text-cv-subheading font-medium mb-2">
              {employer}
            </h4>
          </div>

          <div className="flex flex-col lg:items-end gap-2">
            {ongoing && (
              <Badge
                variant="secondary"
                className="bg-cv-accent-light text-cv-accent w-fit"
              >
                En cours
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-cv-light-text mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>
              {startDate} - {endDate}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>
              {city}, {country}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-cv-text leading-relaxed">{mainActivities}</p>

          {moreDetails && (
            <p className="text-cv-light-text text-sm italic">{moreDetails}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
