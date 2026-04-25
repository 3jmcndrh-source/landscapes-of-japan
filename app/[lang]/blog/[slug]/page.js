import { notFound } from "next/navigation";
import { LANGS, HREFLANG, SITE_URL } from "../../../i18n-meta.js";
import { POSTS, POST_SLUGS, getPost, getPostTitle, getPostExcerpt, getPostBody } from "../../../content/blog/posts.js";
import { PREFECTURES, getPrefName, getLocName, cldUrl } from "../../../data.js";
import { PREF_SLUGS, LOC_SLUGS } from "../../../slugs.js";
import { TR } from "../../../data.js";

export const dynamicParams = false;

export function generateStaticParams() {
  const params = [];
  for (const lang of LANGS) for (const slug of POST_SLUGS) params.push({ lang, slug });
  return params;
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const title = getPostTitle(post, lang);
  const description = getPostExcerpt(post, lang);
  const fullTitle = `${title} | Landscapes of Japan`;
  const ogImage = post.hero ? cldUrl(post.hero, 1200) : `${SITE_URL}/og-image.jpg`;

  const languages = {};
  for (const l of LANGS) languages[HREFLANG[l]] = `${SITE_URL}/${l}/blog/${slug}`;
  languages["x-default"] = `${SITE_URL}/en/blog/${slug}`;

  return {
    title: fullTitle, description,
    alternates: { canonical: `${SITE_URL}/${lang}/blog/${slug}`, languages },
    openGraph: {
      title: fullTitle, description, type: "article",
      url: `${SITE_URL}/${lang}/blog/${slug}`, siteName: "Landscapes of Japan",
      publishedTime: post.date,
      authors: ["Landscapes of Japan"],
      images: [{ url: ogImage, width: 1200, height: 800, alt: title }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage] },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

export default async function BlogPost({ params }) {
  const { lang, slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const title = getPostTitle(post, lang);
  const excerpt = getPostExcerpt(post, lang);
  const body = getPostBody(post, lang);

  // 関連写真: 該当 locs の写真から最大8枚
  const locSet = new Set(post.locs);
  const relatedPhotos = [];
  for (const pf of PREFECTURES) {
    for (const photo of pf.photos) {
      if (photo.loc && locSet.has(photo.loc)) {
        relatedPhotos.push({ ...photo, pref: pf.pref });
        if (relatedPhotos.length >= 8) break;
      }
    }
    if (relatedPhotos.length >= 8) break;
  }

  const blogTitle = lang === "ja" ? "ブログ" : lang === "zh" ? "博客" : lang === "zh-tw" ? "部落格" : lang === "ko" ? "블로그" : "Blog";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/${lang}/blog/${slug}`,
    headline: title,
    description: excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: HREFLANG[lang] || lang,
    url: `${SITE_URL}/${lang}/blog/${slug}`,
    ...(post.hero && { image: cldUrl(post.hero, 1200) }),
    author: { "@type": "Person", name: "Landscapes of Japan", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Landscapes of Japan", url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${lang}/blog/${slug}` },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Landscapes of Japan", item: `${SITE_URL}/${lang}` },
      { "@type": "ListItem", position: 2, name: blogTitle, item: `${SITE_URL}/${lang}/blog` },
      { "@type": "ListItem", position: 3, name: title, item: `${SITE_URL}/${lang}/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <div style={{ background: "#0a0a0a", color: "#e8e4df", minHeight: "100vh", fontFamily: "'Cormorant Garamond',Georgia,serif" }}>
        <div className="top-bar scrolled">
          <div className="top-langs">
            {Object.entries(TR).map(([c]) => (
              <a key={c} href={`/${c}/blog/${slug}`} className={"top-lang-btn" + (lang === c ? " active" : "")}>{TR[c].name}</a>
            ))}
          </div>
          <div className="top-nav">
            <a className="top-nav-link" href={`/${lang}/blog`}>← {blogTitle}</a>
          </div>
        </div>

        <article style={{ maxWidth: 820, margin: "0 auto", padding: "100px 24px 80px" }}>
          <nav aria-label="breadcrumb" style={{ fontSize: 13, color: "rgba(232,228,223,.55)", marginBottom: 24, letterSpacing: ".05em" }}>
            <a href={`/${lang}`} style={{ color: "inherit", textDecoration: "none" }}>Landscapes of Japan</a>
            <span style={{ margin: "0 10px" }}>›</span>
            <a href={`/${lang}/blog`} style={{ color: "inherit", textDecoration: "none" }}>{blogTitle}</a>
          </nav>

          <header style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: 14, color: "rgba(220,190,100,.75)", marginBottom: 10 }}>{post.date}</div>
            <h1 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: "clamp(28px,4vw,42px)", margin: 0, color: "#f2ece2", lineHeight: 1.25 }}>{title}</h1>
            {excerpt && (
              <p style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 17, lineHeight: 1.7, color: "rgba(232,228,223,.8)", marginTop: 18 }}>{excerpt}</p>
            )}
          </header>

          {post.hero && (
            <figure style={{ margin: "0 0 32px", borderRadius: 4, overflow: "hidden", background: "#111" }}>
              <img src={cldUrl(post.hero, 1200)} alt={title} draggable="false"
                   style={{ width: "100%", height: "auto", display: "block" }} />
            </figure>
          )}

          {body ? (
            <div style={{ fontFamily: "var(--font-zen-kaku),'Noto Sans JP',sans-serif", fontSize: 17, lineHeight: 1.9, color: "rgba(232,228,223,.92)" }}>
              {body.split(/\n\n+/).map((para, i) => (
                <p key={i} style={{ margin: "0 0 22px" }}>{para}</p>
              ))}
            </div>
          ) : (
            <p style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 15, color: "rgba(232,228,223,.55)", fontStyle: "italic" }}>
              {lang === "ja" ? "本文準備中。関連する撮影地と写真をご覧ください。" : "Article body coming soon. Browse related locations and photos below."}
            </p>
          )}

          {relatedPhotos.length > 0 && (
            <section style={{ marginTop: 56 }}>
              <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13, letterSpacing: ".25em", textTransform: "uppercase", color: "rgba(220,190,100,.65)", marginBottom: 20 }}>
                {lang === "ja" ? "関連写真" : "Related Photos"}
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8 }}>
                {relatedPhotos.map((p) => {
                  const prefSlug = PREF_SLUGS[p.pref];
                  const locSlug = LOC_SLUGS[p.loc];
                  if (!prefSlug || !locSlug) return null;
                  return (
                    <a key={p.id} href={`/${lang}/${prefSlug}/${locSlug}/${p.id}`}
                       style={{ position: "relative", aspectRatio: "3/2", overflow: "hidden", borderRadius: 4, background: "#111", display: "block" }}>
                      <img src={cldUrl(p.id, 600)} alt={`${getLocName(p.loc, lang)} - ${getPrefName(p.pref, lang)}`}
                           loading="lazy" draggable="false"
                           style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </a>
                  );
                })}
              </div>
            </section>
          )}
        </article>
      </div>
    </>
  );
}
