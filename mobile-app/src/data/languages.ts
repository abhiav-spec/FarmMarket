export type Language = {
  key: string;
  name: string;
};

export const LANGUAGES: readonly Language[] = [
  { key: "english", name: "English" },
  { key: "tamil", name: "தமிழ்" },
  { key: "malayalam", name: "മലയാളം" },
  { key: "telugu", name: "తెలుగు" },
  { key: "kannada", name: "ಕನ್ನಡ" },
  { key: "hindi", name: "हिन्दी" },
  { key: "bengali", name: "বাংলা" },
  { key: "marathi", name: "मराठी" },
  { key: "gujarati", name: "ગુજરાતી" },
  { key: "punjabi", name: "ਪੰਜਾਬੀ" },
  { key: "odia", name: "ଓଡ଼ିଆ" },
  { key: "assamese", name: "অসমীয়া" },
  { key: "urdu", name: "اردو" },
  { key: "nepali", name: "नेपाली" },
  { key: "sanskrit", name: "संस्कृतम्" },
] as const;

export function getLanguageName(key: string): string {
  return LANGUAGES.find((lang) => lang.key === key)?.name ?? key;
}

export default LANGUAGES;
