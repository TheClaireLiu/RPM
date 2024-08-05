import { defaultLocale, locales } from "@/constants/locales";

export const i18n = {
  defaultLocale,
  locales: locales.map((l)=>l.locale),
} as const;

export type Local = (typeof i18n)["locales"][number];


