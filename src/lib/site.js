const DEFAULT_SITE_URL = "https://www.dsnenterprises.in";

export const SITE_URL = (process.env.SITE_URL || DEFAULT_SITE_URL).replace(
	/\/+$/,
	"",
);

export const PHONE_DISPLAY = "+91 93631 22005";
export const PHONE_TEL = "+919363122005";
export const PHONE_SCHEMA = "+91-93631-22005";
export const EMAIL = "info@dsnenterprises.com";
export const NAP_LOCALITY = "Coimbatore";
export const NAP_REGION = "Tamil Nadu";
export const NAP_COUNTRY = "IN";
export const NAP_LINE = "Coimbatore, Tamil Nadu, India";
export const LINKEDIN_URL = "https://www.linkedin.com/company/dsn-enterprises/";

export function getSiteUrl(path = "/") {
	return new URL(path, `${SITE_URL}/`).toString();
}

/**
 * WhatsApp deep link to the same number the phone links use.
 *
 * The business already answers WhatsApp — it is the channel the admin
 * notification email points customers at — but the site had no such link, so
 * the Google Ads "WhatsApp" conversion action could never fire. Kept next to
 * the phone constants so the two cannot drift.
 */
export function whatsappUrl(text = "") {
	const base = `https://wa.me/${PHONE_TEL.replace(/\D/g, "")}`;
	return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
