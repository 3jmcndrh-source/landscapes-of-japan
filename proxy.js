import { NextResponse } from "next/server";

const LANGS = ["ja","en","zh","zh-tw","ko","es","fr","de","pt","it","ru","ar","hi","th","vi","id","tr","nl","pl","sv","fa","he","bn","tl","uk"];
const LANG_SET = new Set(LANGS);
const DEFAULT_LANG = "en";

function detectLang(acceptLanguage) {
  if (!acceptLanguage) return DEFAULT_LANG;
  const prefs = acceptLanguage
    .split(",")
    .map((s) => {
      const [code, q] = s.trim().split(";q=");
      return { code: code.toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const p of prefs) {
    if (LANG_SET.has(p.code)) return p.code;
    if (p.code === "zh-hk" || p.code === "zh-mo") return "zh-tw";
    const primary = p.code.split("-")[0];
    if (LANG_SET.has(primary)) return primary;
  }
  return DEFAULT_LANG;
}

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const firstSeg = pathname.split("/")[1];
  if (LANG_SET.has(firstSeg)) return NextResponse.next();

  const lang = detectLang(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${lang}` : `/${lang}${pathname}`;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
