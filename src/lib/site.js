const DEFAULT_SITE_URL = "https://www.dsnenterprises.in";

export const SITE_URL = (process.env.SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");

export function getSiteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}