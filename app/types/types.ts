export type FormData = {
  language: string;
  dateFormat: string;

  personalInfo: {
    firstName: string;
    lastName: string;
    passportId?: string;
    workPermit?: string;
    dob: string; // yyyy-mm-dd
    placeOfBirth: string;
    placeOfBirthCountry: string;
    gender: string;
    nationality: string;

    email: string;
    phone: string;
    phoneCountryCode: string;

    addressType: string;
    addressLine1: string;
    addressLine2?: string;
    postalCode: string;
    city: string;
    country: string;
  };

  workExperiences: {
    jobTitle: string;
    employer: string;
    city: string;
    country: string;
    addressDetails?: string;
    fromDate: string; // yyyy-mm-dd
    toDate?: string; // yyyy-mm-dd or empty if ongoing
    ongoing: boolean;
    mainActivities: string;
    moreDetails?: string;
  }[];

  educationTrainings: {
    qualification: string;
    organisation: string;
    website?: string;
    eqfLevel?: string;
    city: string;
    country: string;
    addressDetails?: string;
    fromDate: string;
    toDate?: string;
    ongoing: boolean;
    moreDetails?: string;
  }[];

  personalSkills: {
    motherTongues: string[];
    otherLanguages: { language: string; level: string }[];
    skills: { category: string; skill: string }[];
  };
};