// /app/utils/defaultFormData.ts

import type { FormData } from "@/app/types/types";

export const defaultFormData: FormData = {
  language: "English",
  dateFormat: "DD/MM/YYYY",

  personalInfo: {
    firstName: "",
    lastName: "",
    passportId: "",
    workPermit: "",
    dob: "",
    placeOfBirth: "",
    placeOfBirthCountry: "",
    gender: "",
    nationality: "",

    email: "",
    phone: "",
    phoneCountryCode: "",

    addressType: "",
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    city: "",
    country: "",
  },

  workExperiences: [],

  educationTrainings: [],

  personalSkills: {
    motherTongues: [],
    otherLanguages: [],
    skills: [],
  },
};
