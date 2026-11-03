// Single source for contact details and WhatsApp links.

export const SOCIAL = {
  instagram: "https://www.instagram.com/ebservicesks/",
  facebook: "https://www.facebook.com/profile.php?id=61595662852645",
} as const;

export const EMAIL = "ebserviceks@gmail.com";
export const PHONE = "+383 45 181 836";
const WA_NUMBER = "38345181836";

export const MESSAGES = {
  hello: "Hi EB Services, I'd like to know more about your services.",
  helloSq: "Përshëndetje EB Services, dëshiroj më shumë informacion për shërbimet tuaja.",
  demo: "Hi EB Services! I'd like to book a free 15-minute chatbot demo.",
} as const;

export function waLink(text: string = MESSAGES.hello) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}
