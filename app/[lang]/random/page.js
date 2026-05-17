import RandomRedirect from "./RandomRedirect.js";
import { LANGS } from "../../i18n-meta.js";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata = {
  title: "Random Photo | Landscapes of Japan",
  description: "Discover a random photograph from across Japan.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <RandomRedirect />;
}
