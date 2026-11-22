/* Bilgastro — page rendering (no frameworks, no build step). */
(function () {
  const B = window.Bilgastro;
  const cfg = window.BILGASTRO_CONFIG || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* =========================================================
     Translations — English / Türkçe
     ========================================================= */
  const STR = {
    en: {
      "title.home": "Bilgastro · Bilkent Gastronomy Society", "title.places": "Reviews · Bilgastro", "title.map": "Food map · Bilgastro", "title.about": "About · Bilgastro",
      "nav.home": "Home", "nav.places": "Reviews", "nav.map": "Food map", "nav.about": "About", "nav.menu": "Menu", "lang.label": "Language",
      "demo": "Demo preview · every place and review here is a made-up sample",
      "demo.mixed": "Preview · places tagged “Sample” are made-up examples, the rest are our real reviews",
      "footer.explore": "Explore", "footer.sayhi": "Say hi", "footer.join": "Join the club", "footer.uni": "Bilkent University",
      "footer.photos": "Sample photos from Unsplash", "footer.pay": "We pay for every meal we review.",
      "sample": "Sample", "mustTry": "Must try", "places.n1": "{n} place", "places.n": "{n} places",
      "price.aria": "Price level {n} of 3",
      "hero.title": "Ankara, <em>one bite</em> at a time.", "hero.browse": "Browse reviews", "hero.map": "Open the food map",
      "hero.ig": "Follow <b>@{ig}</b> for photos & next tastings",
      "stats.places": "Places tasted", "stats.avg": "Average score", "stats.student": "Student friendly",
      "moods.eyebrow": "What are you craving?", "moods.title": "Pick a mood",
      "latest.eyebrow": "Fresh from the table", "latest.title": "Latest reviews", "allReviews": "All reviews →",
      "spot.eyebrow": "In the spotlight", "readFull": "Read the full review →",
      "events.eyebrow": "Come hungry", "events.title": "Next club visits",
      "cta.title": "Hungry for more?", "cta.text": "Behind-the-scenes tastings, polls on where we go next, and photos that will make you skip the dining hall.", "cta.follow": "Follow @{ig}",
      "list.eyebrow": "Every place we've tried", "list.title": "The reviews",
      "list.lead": "Taste and service out of 10, what you'll spend, and a few honest words about every place we visited.",
      "search": "Search", "search.ph": "Search a place, dish or area… try “künefe”", "all": "All",
      "f.area": "Area", "f.anywhere": "Anywhere", "f.price": "Price", "f.anyPrice": "Any price", "f.price1": "₺ only", "f.price2": "Up to ₺₺",
      "f.score": "Score", "f.anyScore": "Any score", "f.sort": "Sort", "s.newest": "Newest first", "s.score": "Highest score", "s.cheap": "Cheapest first", "s.near": "Closest to campus",
      "empty.title": "Nothing on the menu matches that.", "empty.text": "Try fewer filters — or tell us where we should go next!", "empty.reset": "Clear filters",
      "nf.title": "We couldn't find that place.", "nf.text": "It may have been renamed or removed.", "nf.btn": "See all reviews",
      "back": "← All reviews", "sampleReview": "Sample review", "showPhoto": "Show photo {n}", "verdict": "Our verdict", "skip": "Maybe skip",
      "reviewedBy": "Reviewed by", "team": "the Bilgastro team", "visited": "visited {d}",
      "taste": "Taste", "service": "Service", "price": "Price", "perPerson": "{s} per person",
      "area": "Area", "distance": "Distance", "kmFrom": "{km} km from campus", "address": "Address", "directions": "Get directions",
      "igMore": "More photos on Instagram", "similar.eyebrow": "Still hungry?", "similar.title": "You might also like",
      "map.eyebrow": "Where we've eaten", "map.title": "The food map", "map.failT": "The map couldn't load.", "map.failX": "Check your internet connection and refresh.",
      "map.home": "Home base", "map.empty": "No places in this category yet.",
      "about.eyebrow": "About us", "about.title": "We eat, we argue, we write it down.",
      "about.lead": "Bilgastro is {name}. Every few weeks a group of us picks a restaurant, café, tea house or bakery around Ankara, orders far too much, and scores it together. This site is where those notes live.",
      "how.eyebrow": "How we review", "how.title": "Taste, service and price",
      "how.taste": "The food or drink itself: flavour, freshness, and whether we'd order it again. Our members' average score.",
      "how.service": "Warmth, speed, and how they treat a table of hungry students. Also our members' average score.",
      "how.price": "From ₺ (easy on a student budget) to ₺₺₺ (a treat), always with what one person usually spends, e.g. (500–600 TL).",
      "how.note": "The big score on every place is the average of taste and service. Every place also gets a short paragraph from the members who went, and 🎓 student friendly or 🌱 vegan/vegetarian friendly badges when they fit.",
      "pay.note": "We always pay for our own meals, and we visit as regular customers. No free food, no sponsored scores.",
      "board.eyebrow": "The people behind the forks", "board.title": "The board",
      "join.title": "Pull up a chair.", "join.text": "Any Bilkent student can join — no cooking skills required, just curiosity and an appetite. {n} places down, the whole city to go.",
      "join.dm": "DM us on Instagram",
      "v.top": "Must go", "v.great": "Highly recommended", "v.good": "Worth a try", "v.ok": "It's okay", "v.low": "Not for us"
    },
    tr: {
      "title.home": "Bilgastro · Bilkent Gastronomi Topluluğu", "title.places": "Mekanlar · Bilgastro", "title.map": "Lezzet haritası · Bilgastro", "title.about": "Hakkımızda · Bilgastro",
      "nav.home": "Ana sayfa", "nav.places": "Mekanlar", "nav.map": "Lezzet haritası", "nav.about": "Hakkımızda", "nav.menu": "Menü", "lang.label": "Dil",
      "demo": "Demo önizleme · buradaki tüm mekanlar ve yorumlar örnek amaçlıdır",
      "demo.mixed": "Önizleme · “Örnek” etiketli mekanlar uydurmadır, diğerleri gerçek yorumlarımızdır",
      "footer.explore": "Keşfet", "footer.sayhi": "Bize ulaşın", "footer.join": "Kulübe katıl", "footer.uni": "Bilkent Üniversitesi",
      "footer.photos": "Örnek fotoğraflar: Unsplash", "footer.pay": "Yorumladığımız her yemeğin parasını kendimiz öderiz.",
      "sample": "Örnek", "mustTry": "Mutlaka deneyin", "places.n1": "{n} mekan", "places.n": "{n} mekan",
      "price.aria": "Fiyat seviyesi {n}/3",
      "hero.title": "Ankara, <em>lokma lokma</em>.", "hero.browse": "Yorumlara göz at", "hero.map": "Lezzet haritasını aç",
      "hero.ig": "Fotoğraflar ve sıradaki tadımlar için <b>@{ig}</b> hesabımızı takip edin",
      "stats.places": "Denenen mekan", "stats.avg": "Ortalama puan", "stats.student": "Öğrenci dostu",
      "moods.eyebrow": "Canınız ne çekiyor?", "moods.title": "Bir seçim yapın",
      "latest.eyebrow": "Sofradan taze", "latest.title": "Son yorumlar", "allReviews": "Tüm yorumlar →",
      "spot.eyebrow": "Öne çıkan", "readFull": "Yorumun tamamını okuyun →",
      "events.eyebrow": "Aç gelin", "events.title": "Sıradaki kulüp buluşmaları",
      "cta.title": "Daha fazlasını mı istiyorsunuz?", "cta.text": "Perde arkası tadımlar, sıradaki mekan anketleri ve yemekhaneyi unutturacak fotoğraflar.", "cta.follow": "@{ig} hesabını takip et",
      "list.eyebrow": "Denediğimiz tüm mekanlar", "list.title": "Yorumlar",
      "list.lead": "Lezzet ve hizmet 10 üzerinden, kişi başı ortalama harcama ve gittiğimiz her mekan hakkında birkaç samimi söz.",
      "search": "Ara", "search.ph": "Mekan, yemek veya semt arayın… örn. “künefe”", "all": "Tümü",
      "f.area": "Semt", "f.anywhere": "Her yer", "f.price": "Fiyat", "f.anyPrice": "Tüm fiyatlar", "f.price1": "Sadece ₺", "f.price2": "En fazla ₺₺",
      "f.score": "Puan", "f.anyScore": "Tüm puanlar", "f.sort": "Sırala", "s.newest": "En yeni", "s.score": "En yüksek puan", "s.cheap": "En uygun fiyat", "s.near": "Kampüse en yakın",
      "empty.title": "Aradığınıza uyan bir mekan yok.", "empty.text": "Daha az filtre deneyin — ya da bize sıradaki mekanı önerin!", "empty.reset": "Filtreleri temizle",
      "nf.title": "Bu mekanı bulamadık.", "nf.text": "Adı değişmiş ya da kaldırılmış olabilir.", "nf.btn": "Tüm yorumları gör",
      "back": "← Tüm yorumlar", "sampleReview": "Örnek yorum", "showPhoto": "{n}. fotoğrafı göster", "verdict": "Yorumumuz", "skip": "Belki atlayın",
      "reviewedBy": "Yorumlayan", "team": "Bilgastro ekibi", "visited": "ziyaret: {d}",
      "taste": "Lezzet", "service": "Hizmet", "price": "Fiyat", "perPerson": "kişi başı {s}",
      "area": "Semt", "distance": "Uzaklık", "kmFrom": "kampüse {km} km", "address": "Adres", "directions": "Yol tarifi al",
      "igMore": "Daha fazla fotoğraf Instagram'da", "similar.eyebrow": "Hâlâ aç mısınız?", "similar.title": "Bunları da sevebilirsiniz",
      "map.eyebrow": "Nerelerde yedik", "map.title": "Lezzet haritası", "map.failT": "Harita yüklenemedi.", "map.failX": "İnternet bağlantınızı kontrol edip sayfayı yenileyin.",
      "map.home": "Kampüsümüz", "map.empty": "Bu kategoride henüz mekan yok.",
      "about.eyebrow": "Hakkımızda", "about.title": "Yiyoruz, tartışıyoruz, yazıya döküyoruz.",
      "about.lead": "Biz Bilgastro'yuz: {name}. Birkaç haftada bir Ankara'da bir restoran, kafe, çay bahçesi ya da fırın seçiyor, fazlasıyla sipariş veriyor ve birlikte puanlıyoruz. Bu site, o notların evi.",
      "how.eyebrow": "Nasıl değerlendiriyoruz", "how.title": "Lezzet, hizmet ve fiyat",
      "how.taste": "Yemeğin ya da içeceğin kendisi: lezzet, tazelik ve tekrar sipariş eder miydik. Üyelerimizin ortalama puanı.",
      "how.service": "Güler yüz, hız ve bir masa dolusu aç öğrenciye nasıl davrandıkları. Bu da üyelerimizin ortalama puanı.",
      "how.price": "₺ (öğrenci bütçesine uygun) ile ₺₺₺ (kendinize bir ödül) arası; her zaman kişi başı ortalama harcamayla birlikte, örn. (500–600 TL).",
      "how.note": "Her mekandaki büyük puan, lezzet ve hizmet puanlarının ortalamasıdır. Her mekan için giden üyelerden kısa bir paragraf ve uygunsa 🎓 öğrenci dostu ya da 🌱 vegan/vejetaryen dostu rozetleri ekliyoruz.",
      "pay.note": "Yemeklerimizin parasını her zaman kendimiz öder, mekanlara sıradan müşteri olarak gideriz. Bedava yemek yok, sponsorlu puan yok.",
      "board.eyebrow": "Çatalların arkasındaki ekip", "board.title": "Yönetim kurulu",
      "join.title": "Bir sandalye de size.", "join.text": "Her Bilkent öğrencisi katılabilir — yemek yapmayı bilmenize gerek yok, merak ve iştah yeterli. {n} mekan geride, koca şehir önümüzde.",
      "join.dm": "Instagram'dan bize yazın",
      "v.top": "Mutlaka gidin", "v.great": "Çok tavsiye ederiz", "v.good": "Denemeye değer", "v.ok": "Fena değil", "v.low": "Bize göre değil"
    }
  };

  const LANG_KEY = "bilgastro-lang";
  function initialLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "tr" || q === "en") return q;
    try { const s = localStorage.getItem(LANG_KEY); if (s === "tr" || s === "en") return s; } catch (e) { /* storage blocked */ }
    return /^tr\b/i.test(navigator.language || "") ? "tr" : "en";
  }
  let lang = initialLang();
  const t = (key, vars) => {
    let s = (STR[lang] && STR[lang][key]) ?? STR.en[key] ?? key;
    if (vars) for (const k in vars) s = s.split("{" + k + "}").join(vars[k]);
    return s;
  };
  // Config values can be plain text or { en: "...", tr: "..." }
  const L = (v) => (v && typeof v === "object" ? v[lang] || v.en || v.tr || "" : v || "");
  const locale = () => (lang === "tr" ? "tr-TR" : "en-GB");

  // Review fields written in one or both languages (falls back to whichever exists)
  const pick = (p, en, tr) => (lang === "tr" ? (isEmpty(p[tr]) ? p[en] : p[tr]) : isEmpty(p[en]) ? p[tr] : p[en]);
  const isEmpty = (v) => v == null || v === "" || (Array.isArray(v) && !v.length);
  const rv = (p) => pick(p, "review", "reviewTr") || "";
  const cuisineOf = (p) => pick(p, "cuisine", "cuisineTr") || "";
  const mustTryOf = (p) => pick(p, "mustTry", "mustTryTr") || [];
  const headlineOf = (p) => pick(p, "headline", "headlineTr") || "";
  const skipOf = (p) => pick(p, "skip", "skipTr") || "";
  const catLabel = (key) => { const c = B.CATEGORIES.find((x) => x.key === key); return c ? (lang === "tr" ? c.tr : c.key) : key; };
  const flagLabel = (f) => (lang === "tr" ? f.tr : f.label);

  /* ---------- helpers ---------- */
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmtScore = (s) => (isFinite(s) ? (Math.round(s * 10) / 10).toFixed(1) : "–");
  const fmtDate = (iso) => {
    const d = new Date(iso + "T12:00:00");
    return isNaN(d) ? "" : d.toLocaleDateString(locale(), { day: "numeric", month: "short", year: "numeric" });
  };
  const fmtKm = (km) => (isFinite(km) ? t("kmFrom", { km: km < 10 ? km.toFixed(1) : Math.round(km) }) : "");
  const priceHtml = (n) =>
    `<span class="price" aria-label="${t("price.aria", { n })}">${"₺".repeat(n)}<span class="dim">${"₺".repeat(3 - n)}</span></span>`;
  // "₺₺ (500–600 TL)"
  const priceSpend = (p) => `${priceHtml(p.price)}${p.spend ? ` <span class="spend">(${esc(p.spend)})</span>` : ""}`;
  const badges = (p) =>
    B.FLAGS.filter((f) => p[f.field]).map((f) => `<span class="badge badge-${f.key}">${f.emoji} ${esc(flagLabel(f))}</span>`).join("");
  const subline = (p) => esc(cuisineOf(p) || catLabel(p.category));
  const excerpt = (p, n = 130) => {
    const s = rv(p).replace(/\s+/g, " ").trim();
    return s.length > n ? s.slice(0, s.lastIndexOf(" ", n)) + "…" : s;
  };
  const countPlaces = (n) => t(n === 1 ? "places.n1" : "places.n", { n });
  B.verdict = (s) =>
    s >= 9 ? { label: t("v.top"), cls: "v-top" }
    : s >= 8 ? { label: t("v.great"), cls: "v-great" }
    : s >= 7 ? { label: t("v.good"), cls: "v-good" }
    : s >= 6 ? { label: t("v.ok"), cls: "v-ok" }
    : { label: t("v.low"), cls: "v-low" };
  const placeUrl = (p) => `place.html?id=${encodeURIComponent(p.id)}`;
  const igUrl = cfg.instagram ? `https://www.instagram.com/${encodeURIComponent(cfg.instagram)}/` : "";
  const IG_ICON = `<svg class="ig-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" class="ig-dot"/></svg>`;
  const igLink = (cls, label) =>
    igUrl ? `<a class="${cls}" href="${igUrl}" target="_blank" rel="noopener" aria-label="Instagram @${esc(cfg.instagram)}">${IG_ICON}${label ? `<span>${label}</span>` : ""}</a>` : "";
  const P = () => new URLSearchParams(location.search); // always read the current URL (filters live there)

  // Image with a warm fallback if the photo link is broken.
  const photo = (src, alt, emoji, extra = "") =>
    `<div class="ph ${extra}" data-emoji="${esc(emoji || "🍴")}">${
      src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" onerror="this.remove()">` : ""
    }</div>`;

  /* ---------- shared layout ---------- */
  const NAV = [
    ["index.html", "nav.home", "home"],
    ["places.html", "nav.places", "places"],
    ["map.html", "nav.map", "map"],
    ["about.html", "nav.about", "about"]
  ];

  function renderChrome(source) {
    const page = document.body.dataset.page;
    const header = $("#site-header");
    if (header) {
      header.classList.remove("open");
      header.innerHTML = `
        ${source === "sample" ? `<div class="demo-strip">${t("demo")}</div>` : source === "mixed" ? `<div class="demo-strip">${t("demo.mixed")}</div>` : ""}
        <div class="nav wrap">
          <a class="brand" href="index.html" aria-label="Bilgastro">
            <img class="brand-mark" src="assets/img/logo-mark.png" alt="">
            <span class="brand-word">bilgastro</span>
          </a>
          <button class="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="${t("nav.menu")}">
            <span></span><span></span><span></span>
          </button>
          <nav id="nav-links" class="nav-links">
            ${NAV.map(([href, key, id]) => `<a href="${href}" ${id === page || (page === "place" && id === "places") ? 'aria-current="page"' : ""}>${t(key)}</a>`).join("")}
          </nav>
          <div class="lang-switch" role="group" aria-label="${t("lang.label")}">
            <button type="button" data-lang="tr" aria-pressed="${lang === "tr"}" lang="tr" title="Türkçe">TR</button>
            <button type="button" data-lang="en" aria-pressed="${lang === "en"}" lang="en" title="English">EN</button>
          </div>
          ${igLink("ig-btn", "@" + esc(cfg.instagram))}
        </div>`;
      const tog = $(".nav-toggle", header);
      tog.addEventListener("click", () => {
        const open = header.classList.toggle("open");
        tog.setAttribute("aria-expanded", open);
      });
      $(".lang-switch", header).addEventListener("click", (e) => {
        const b = e.target.closest("button[data-lang]");
        if (b && b.dataset.lang !== lang) setLang(b.dataset.lang);
      });
    }
    const footer = $("#site-footer");
    if (footer) {
      footer.innerHTML = `
        <div class="wrap footer-grid">
          <div>
            <a class="footer-brand" href="index.html"><span class="logo-tile"><img src="assets/img/logo.png" alt="Bilgastro logo"></span></a>
            <p class="footer-blurb">${esc(L(cfg.fullName))}. ${esc(L(cfg.tagline))}</p>
          </div>
          <div>
            <h4>${t("footer.explore")}</h4>
            ${NAV.map(([h, key]) => `<a href="${h}">${t(key)}</a>`).join("")}
          </div>
          <div>
            <h4>${t("footer.sayhi")}</h4>
            ${igUrl ? `<a href="${igUrl}" target="_blank" rel="noopener">Instagram · @${esc(cfg.instagram)}</a>` : ""}
            ${cfg.email ? `<a href="mailto:${esc(cfg.email)}">${esc(cfg.email)}</a>` : ""}
            <a href="about.html#join">${t("footer.join")}</a>
          </div>
        </div>
        <div class="wrap footer-bottom">
          <span>© ${new Date().getFullYear()} Bilgastro · ${t("footer.uni")}</span>
          <span>${source === "sheet" ? t("footer.pay") : t("footer.photos")}</span>
        </div>`;
    }
  }

  /* ---------- cards ---------- */
  function card(p) {
    const v = B.verdict(p.overall);
    const head = headlineOf(p);
    const must = mustTryOf(p);
    return `
      <a class="card" href="${placeUrl(p)}">
        <div class="card-media">
          ${photo(p.photos[0], p.name, B.categoryEmoji(p.category))}
          <span class="pill pill-cat">${B.categoryEmoji(p.category)} ${esc(catLabel(p.category))}</span>
          <span class="score-badge ${v.cls}" title="${esc(v.label)}">${fmtScore(p.overall)}</span>
          ${p.sample ? `<span class="sample-tag">${t("sample")}</span>` : ""}
        </div>
        <div class="card-body">
          <h3 class="card-title">${esc(p.name)}</h3>
          <p class="card-meta">${esc(p.area)}${isFinite(p.distanceKm) ? ` · ${p.distanceKm.toFixed(1)} km` : ""}</p>
          <p class="card-price">${priceSpend(p)}</p>
          ${head ? `<p class="card-quote">“${esc(head)}”</p>` : rv(p) ? `<p class="card-excerpt">${esc(excerpt(p))}</p>` : ""}
          ${badges(p) ? `<div class="badges">${badges(p)}</div>` : ""}
          ${must.length ? `<p class="card-musttry"><span>${t("mustTry")}</span>${esc(must[0])}</p>` : ""}
        </div>
      </a>`;
  }

  /* ---------- HOME ---------- */
  function home(places) {
    const main = $("#main");
    const real = places.filter((p) => !p.sample);
    const pool = real.length ? real : places; // real reviews take priority over samples
    const byScore = [...pool].sort((a, b) => b.overall - a.overall);
    const star = byScore[0];
    // Places with photos first; places without photos still get a warm placeholder tile.
    const heroPics = [star, ...places.filter((p) => p !== star)].filter(Boolean)
      .sort((a, b) => !!b.photos[0] - !!a.photos[0]).slice(0, 3);
    const avg = pool.length ? pool.reduce((s, p) => s + (p.overall || 0), 0) / pool.length : 0;
    const cats = [
      ...B.CATEGORIES.map((c) => ({ label: catLabel(c.key), emoji: c.emoji, href: `places.html?cat=${encodeURIComponent(c.key)}`, n: places.filter((p) => p.category === c.key).length })),
      ...B.FLAGS.map((f) => ({ label: flagLabel(f), emoji: f.emoji, special: "cat-flag-" + f.key, href: `places.html?${f.key}=1`, n: places.filter((p) => p[f.field]).length }))
    ];
    const featured = pool.find((p) => p.featured) || places.find((p) => p.featured && p !== star) || byScore[1] || star;
    const today = new Date().toISOString().slice(0, 10);
    const events = (cfg.events || []).filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
    const starTry = star ? mustTryOf(star)[0] : "";

    main.innerHTML = `
      <section class="hero">
        <div class="wrap hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">${esc(L(cfg.fullName))}</p>
            <h1>${t("hero.title")}</h1>
            <p class="lead">${esc(L(cfg.tagline))}</p>
            <div class="hero-cta">
              <a class="btn btn-primary" href="places.html">${t("hero.browse")}</a>
              <a class="btn btn-ghost" href="map.html">${t("hero.map")}</a>
            </div>
            ${igLink("ig-inline", t("hero.ig", { ig: esc(cfg.instagram) }))}
            <dl class="hero-stats">
              <div><dt>${t("stats.places")}</dt><dd>${pool.length}</dd></div>
              <div><dt>${t("stats.avg")}</dt><dd>${fmtScore(avg)}</dd></div>
              <div><dt>${t("stats.student")}</dt><dd>${pool.filter((p) => p.studentFriendly).length}</dd></div>
            </dl>
          </div>
          <div class="hero-art" aria-hidden="true">
            ${heroPics.map((p, i) => `<div class="hero-photo hp-${i}">${photo(p.photos[0], "", B.categoryEmoji(p.category))}</div>`).join("")}
            ${star ? `
            <a class="sticker sticker-score" href="${placeUrl(star)}" tabindex="-1">
              <b>${fmtScore(star.overall)}</b><span>${esc(B.verdict(star.overall).label)}</span><small>${esc(star.name)}</small>
            </a>
            ${starTry ? `<div class="sticker sticker-try">🍴 ${t("mustTry")}: <b>${esc(starTry)}</b></div>` : ""}` : ""}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="wrap">
          <div class="section-head">
            <div><p class="eyebrow">${t("moods.eyebrow")}</p><h2>${t("moods.title")}</h2></div>
          </div>
          <div class="cat-row">
            ${cats.map((c) => `
              <a class="cat-tile${c.special ? " " + c.special : ""}" href="${c.href}">
                <span class="cat-emoji">${c.emoji}</span>
                <span class="cat-name">${esc(c.label)}</span>
                <span class="cat-count">${countPlaces(c.n)}</span>
              </a>`).join("")}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="wrap">
          <div class="section-head">
            <div><p class="eyebrow">${t("latest.eyebrow")}</p><h2>${t("latest.title")}</h2></div>
            <a class="link-arrow" href="places.html">${t("allReviews")}</a>
          </div>
          <div class="grid">${places.slice(0, 6).map(card).join("")}</div>
        </div>
      </section>

      ${featured ? `
      <section class="section">
        <div class="wrap">
          <a class="feature" href="${placeUrl(featured)}">
            <div class="feature-media">${photo(featured.photos[1] || featured.photos[0], featured.name, B.categoryEmoji(featured.category))}</div>
            <div class="feature-body">
              <p class="eyebrow">${t("spot.eyebrow")}</p>
              <h2>${esc(featured.name)}</h2>
              <p class="feature-meta">${subline(featured)} · ${esc(featured.area)} · ${priceSpend(featured)}</p>
              <p class="feature-quote">${headlineOf(featured) ? `“${esc(headlineOf(featured))}”` : esc(excerpt(featured, 180))}</p>
              ${badges(featured) ? `<div class="badges">${badges(featured)}</div>` : ""}
              <div class="feature-foot">
                <span class="score-badge big ${B.verdict(featured.overall).cls}">${fmtScore(featured.overall)}</span>
                <span class="feature-try">${mustTryOf(featured).slice(0, 3).map((m) => `<span class="chip">${esc(m)}</span>`).join("")}</span>
              </div>
              <span class="link-arrow">${t("readFull")}</span>
            </div>
          </a>
        </div>
      </section>` : ""}

      ${events.length ? `
      <section class="section">
        <div class="wrap">
          <div class="section-head"><div><p class="eyebrow">${t("events.eyebrow")}</p><h2>${t("events.title")}</h2></div></div>
          <div class="events">
            ${events.slice(0, 3).map((e) => {
              const d = new Date(e.date + "T12:00:00");
              const where = L(e.where);
              return `
              <article class="event">
                <div class="event-date"><b>${d.getDate()}</b><span>${d.toLocaleDateString(locale(), { month: "short" })}</span></div>
                <div class="event-body">
                  <h3>${esc(e.emoji || "")} ${esc(L(e.title))}</h3>
                  <p class="event-meta">${d.toLocaleDateString(locale(), { weekday: "long" })}${e.time ? " · " + esc(e.time) : ""}${where ? " · " + esc(where) : ""}</p>
                  <p>${esc(L(e.description))}</p>
                </div>
              </article>`;
            }).join("")}
          </div>
        </div>
      </section>` : ""}

      ${igUrl ? `
      <section class="section">
        <div class="wrap">
          <div class="cta-band">
            <div>
              <h2>${t("cta.title")}</h2>
              <p>${t("cta.text")}</p>
            </div>
            <a class="btn btn-light btn-ig" href="${igUrl}" target="_blank" rel="noopener">${IG_ICON} ${t("cta.follow", { ig: esc(cfg.instagram) })}</a>
          </div>
        </div>
      </section>` : ""}
    `;
  }

  /* ---------- REVIEWS LIST ---------- */
  function placesPage(places) {
    const main = $("#main");
    const params = P();
    const areas = [...new Set(places.map((p) => p.area).filter(Boolean))].sort((a, b) => a.localeCompare(b, "tr"));
    const state = {
      q: params.get("q") || "",
      cat: params.get("cat") || "",
      area: params.get("area") || "",
      price: params.get("price") || "",
      min: params.get("min") || "",
      sort: params.get("sort") || "newest",
      student: params.get("student") === "1",
      veg: params.get("veg") === "1"
    };
    const vl = (s) => B.verdict(s).label;

    main.innerHTML = `
      <section class="page-head">
        <div class="wrap">
          <p class="eyebrow">${t("list.eyebrow")}</p>
          <h1>${t("list.title")}</h1>
          <p class="lead">${t("list.lead")}</p>
        </div>
      </section>
      <section class="wrap">
        <div class="filters" role="search">
          <label class="search">
            <span class="sr-only">${t("search")}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
            <input id="f-q" type="search" placeholder="${esc(t("search.ph"))}" value="${esc(state.q)}">
          </label>
          <div class="chips" id="f-cat">
            <button data-cat="" class="chip-btn">${t("all")}</button>
            ${B.CATEGORIES.map((c) => `<button data-cat="${esc(c.key)}" class="chip-btn">${c.emoji} ${esc(catLabel(c.key))}</button>`).join("")}
          </div>
          <div class="chips chips-flags" id="f-flags">
            ${B.FLAGS.map((f) => `<button data-flag="${f.key}" class="chip-btn chip-flag chip-${f.key}">${f.emoji} ${esc(flagLabel(f))}</button>`).join("")}
          </div>
          <div class="selects">
            <label>${t("f.area")}<select id="f-area"><option value="">${t("f.anywhere")}</option>${areas.map((a) => `<option>${esc(a)}</option>`).join("")}</select></label>
            <label>${t("f.price")}<select id="f-price"><option value="">${t("f.anyPrice")}</option><option value="1">${t("f.price1")}</option><option value="2">${t("f.price2")}</option></select></label>
            <label>${t("f.score")}<select id="f-min"><option value="">${t("f.anyScore")}</option><option value="9">9+ ${vl(9)}</option><option value="8">8+ ${vl(8)}</option><option value="7">7+ ${vl(7)}</option></select></label>
            <label>${t("f.sort")}<select id="f-sort"><option value="newest">${t("s.newest")}</option><option value="score">${t("s.score")}</option><option value="cheap">${t("s.cheap")}</option><option value="near">${t("s.near")}</option></select></label>
          </div>
        </div>
        <p class="result-count" id="count" aria-live="polite"></p>
        <div class="grid" id="results"></div>
      </section>`;

    $("#f-area").value = state.area;
    $("#f-price").value = state.price;
    $("#f-min").value = state.min;
    $("#f-sort").value = state.sort;

    const norm = (s) => B.slugify(s).replace(/-/g, " ");
    function apply() {
      const q = norm(state.q);
      let list = places.filter((p) => {
        if (state.cat && p.category !== state.cat) return false;
        if (state.area && p.area !== state.area) return false;
        if (state.price && p.price > +state.price) return false;
        if (state.min && !(p.overall >= +state.min)) return false;
        if (state.student && !p.studentFriendly) return false;
        if (state.veg && !p.veganFriendly) return false;
        if (q) {
          const c = B.CATEGORIES.find((x) => x.key === p.category);
          const flagText = B.FLAGS.filter((f) => p[f.field]).map((f) => `${f.label} ${f.tr} ${f.key === "veg" ? "vegan vegetarian vejetaryen" : "ogrenci"}`).join(" ");
          const hay = norm([
            p.name, p.category, c ? c.tr : "", p.cuisine, p.cuisineTr, p.area, p.headline, p.headlineTr, p.review, p.reviewTr,
            p.mustTry.join(" "), (p.mustTryTr || []).join(" "), p.tags.join(" "), flagText
          ].join(" "));
          if (!q.split(" ").every((w) => hay.includes(w))) return false;
        }
        return true;
      });
      const sorters = {
        newest: (a, b) => a.sample - b.sample || (b.visitDate || "").localeCompare(a.visitDate || ""), // real reviews first
        score: (a, b) => b.overall - a.overall,
        cheap: (a, b) => a.price - b.price || b.overall - a.overall,
        near: (a, b) => (a.distanceKm || 999) - (b.distanceKm || 999)
      };
      list.sort(sorters[state.sort] || sorters.newest);

      $$("#f-cat .chip-btn").forEach((b) => b.setAttribute("aria-pressed", b.dataset.cat === state.cat));
      $$("#f-flags .chip-btn").forEach((b) => b.setAttribute("aria-pressed", !!state[b.dataset.flag]));
      $("#count").textContent = countPlaces(list.length);
      $("#results").innerHTML = list.length
        ? list.map(card).join("")
        : `<div class="empty"><span>🍽️</span><h3>${t("empty.title")}</h3><p>${t("empty.text")}</p><button class="btn btn-ghost" id="reset">${t("empty.reset")}</button></div>`;
      const r = $("#reset");
      if (r) r.onclick = () => { Object.assign(state, { q: "", cat: "", area: "", price: "", min: "", student: false, veg: false }); $("#f-q").value = ""; ["area", "price", "min"].forEach((k) => ($("#f-" + k).value = "")); apply(); };

      const qs = new URLSearchParams(
        Object.entries(state).filter(([k, v]) => v && !(k === "sort" && v === "newest")).map(([k, v]) => [k, v === true ? "1" : v])
      );
      history.replaceState(null, "", qs.toString() ? "?" + qs : location.pathname);
    }

    $("#f-q").addEventListener("input", (e) => { state.q = e.target.value; apply(); });
    $("#f-cat").addEventListener("click", (e) => {
      const b = e.target.closest(".chip-btn");
      if (b) { state.cat = b.dataset.cat; apply(); }
    });
    $("#f-flags").addEventListener("click", (e) => {
      const b = e.target.closest(".chip-btn");
      if (b) { state[b.dataset.flag] = !state[b.dataset.flag]; apply(); }
    });
    ["area", "price", "min", "sort"].forEach((k) => $("#f-" + k).addEventListener("change", (e) => { state[k] = e.target.value; apply(); }));
    apply();
  }

  /* ---------- SINGLE PLACE ---------- */
  function placePage(places) {
    const main = $("#main");
    const p = places.find((x) => x.id === P().get("id"));
    if (!p) {
      main.innerHTML = `<section class="page-head"><div class="wrap"><div class="empty"><span>🤔</span><h3>${t("nf.title")}</h3><p>${t("nf.text")}</p><a class="btn btn-primary" href="places.html">${t("nf.btn")}</a></div></div></section>`;
      return;
    }
    document.title = `${p.name} · Bilgastro`;
    const v = B.verdict(p.overall);
    const scoreRows = [["taste", t("taste")], ["service", t("service")]]
      .filter(([k]) => isFinite(p.scores[k]))
      .map(([k, l]) => `
        <div class="bar-row">
          <span>${l}</span>
          <div class="bar"><i style="width:${p.scores[k] * 10}%"></i></div>
          <b>${fmtScore(p.scores[k])}</b>
        </div>`).join("");
    const paras = rv(p).split(/\n\s*\n/).filter(Boolean).map((x) => `<p>${esc(x)}</p>`).join("");
    const must = mustTryOf(p);
    const skip = skipOf(p);
    const head = headlineOf(p);
    const similar = places
      .filter((x) => x !== p)
      .sort((a, b) => (b.category === p.category) - (a.category === p.category) || b.overall - a.overall)
      .slice(0, 3);
    const gmaps = isFinite(p.lat) ? `https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + " " + p.area + " Ankara")}`;

    main.innerHTML = `
      <section class="place-hero">
        <div class="place-hero-media" id="hero-media">${photo(p.photos[0], p.name, B.categoryEmoji(p.category))}</div>
        <div class="place-hero-shade"></div>
        <div class="wrap place-hero-copy">
          <a class="back" href="places.html">${t("back")}</a>
          <div class="place-pills">
            <span class="pill pill-cat">${B.categoryEmoji(p.category)} ${esc(catLabel(p.category))}</span>
            ${B.FLAGS.filter((f) => p[f.field]).map((f) => `<span class="pill pill-flag">${f.emoji} ${esc(flagLabel(f))}</span>`).join("")}
            ${p.sample ? `<span class="pill pill-sample">${t("sampleReview")}</span>` : ""}
          </div>
          <h1>${esc(p.name)}</h1>
          <p class="place-sub">${subline(p)}${p.area ? " · " + esc(p.area) : ""} · ${priceSpend(p)}</p>
          ${head ? `<p class="place-headline">“${esc(head)}”</p>` : ""}
        </div>
      </section>

      <div class="wrap place-layout">
        <article class="place-main">
          ${p.photos.length > 1 ? `<div class="thumbs">${p.photos.map((src, i) => `<button class="thumb" aria-label="${t("showPhoto", { n: i + 1 })}" data-i="${i}" aria-pressed="${i === 0}">${photo(src, "", B.categoryEmoji(p.category))}</button>`).join("")}</div>` : ""}
          <h2 class="h-serif">${t("verdict")}</h2>
          <div class="review-text">${paras}</div>

          <div class="callouts">
            ${must.length ? `
            <div class="callout callout-try">
              <h3>🍴 ${t("mustTry")}</h3>
              <ul>${must.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
            </div>` : ""}
            ${skip ? `
            <div class="callout callout-skip">
              <h3>🙅 ${t("skip")}</h3>
              <p>${esc(skip)}</p>
            </div>` : ""}
          </div>

          ${p.tags.length ? `<div class="tags">${p.tags.map((x) => `<a class="chip" href="places.html?q=${encodeURIComponent(x)}">${esc(x)}</a>`).join("")}</div>` : ""}

          <p class="byline">
            ${t("reviewedBy")} <b>${esc(p.reviewers.join(", ") || t("team"))}</b>${p.visitDate ? ` · ${t("visited", { d: fmtDate(p.visitDate) })}` : ""}
          </p>
        </article>

        <aside class="place-side">
          <div class="panel score-panel">
            <div class="score-ring ${v.cls}" style="--pct:${(p.overall || 0) * 10}">
              <div><b>${fmtScore(p.overall)}</b><span>/ 10</span></div>
            </div>
            <p class="verdict ${v.cls}">${esc(v.label)}</p>
            <div class="bars">${scoreRows}</div>
            <div class="price-row">
              <span>${t("price")}</span>
              <b>${priceHtml(p.price)}</b>
              ${p.spend ? `<small>${t("perPerson", { s: esc(p.spend) })}</small>` : ""}
            </div>
            ${badges(p) ? `<div class="badges badges-center">${badges(p)}</div>` : ""}
          </div>
          <div class="panel info-panel">
            <dl>
              ${p.area ? `<div><dt>${t("area")}</dt><dd>${esc(p.area)}</dd></div>` : ""}
              ${isFinite(p.distanceKm) ? `<div><dt>${t("distance")}</dt><dd>${fmtKm(p.distanceKm)}</dd></div>` : ""}
              ${p.address ? `<div><dt>${t("address")}</dt><dd>${esc(p.address)}</dd></div>` : ""}
            </dl>
            ${isFinite(p.lat) ? `<div class="mini-map" id="mini-map"></div>` : ""}
            <a class="btn btn-primary btn-block" href="${gmaps}" target="_blank" rel="noopener">${t("directions")}</a>
          </div>
          ${igLink("panel ig-card", `<b>${t("igMore")}</b><small>@${esc(cfg.instagram)}</small>`)}
        </aside>
      </div>

      ${similar.length ? `
      <section class="section">
        <div class="wrap">
          <div class="section-head"><div><p class="eyebrow">${t("similar.eyebrow")}</p><h2>${t("similar.title")}</h2></div></div>
          <div class="grid">${similar.map(card).join("")}</div>
        </div>
      </section>` : ""}`;

    $$(".thumb").forEach((b) =>
      b.addEventListener("click", () => {
        $("#hero-media").innerHTML = photo(p.photos[+b.dataset.i], p.name, B.categoryEmoji(p.category));
        $$(".thumb").forEach((x) => x.setAttribute("aria-pressed", x === b));
      })
    );

    if (isFinite(p.lat) && window.L) {
      const m = makeMap("mini-map", { zoomControl: false, scrollWheelZoom: false, dragging: !matchMedia("(pointer:coarse)").matches });
      m.setView([p.lat, p.lng], 14);
      L_marker([p.lat, p.lng], pinIcon(p)).addTo(m);
    }
  }

  /* ---------- MAP ---------- */
  const L_marker = (ll, icon) => window.L.marker(ll, { icon });
  function makeMap(id, opts) {
    const m = window.L.map(id, { attributionControl: true, ...opts });
    window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(m);
    return m;
  }
  function pinIcon(p) {
    return window.L.divIcon({
      className: "",
      html: `<div class="pin ${B.verdict(p.overall).cls}"><span>${B.categoryEmoji(p.category)}</span></div>`,
      iconSize: [40, 48],
      iconAnchor: [20, 46],
      popupAnchor: [0, -42]
    });
  }

  function mapPage(places) {
    const main = $("#main");
    const located = places.filter((p) => isFinite(p.lat) && isFinite(p.lng));
    let cat = P().get("cat") || "";

    main.innerHTML = `
      <section class="map-page">
        <aside class="map-side">
          <div class="map-side-head">
            <p class="eyebrow">${t("map.eyebrow")}</p>
            <h1>${t("map.title")}</h1>
            <div class="chips chips-tight" id="m-cat">
              <button data-cat="" class="chip-btn">${t("all")}</button>
              ${B.CATEGORIES.map((c) => `<button data-cat="${esc(c.key)}" class="chip-btn">${c.emoji} ${esc(catLabel(c.key))}</button>`).join("")}
              ${B.FLAGS.map((f) => `<button data-cat="${f.key}" class="chip-btn chip-flag chip-${f.key}">${f.emoji} ${esc(flagLabel(f))}</button>`).join("")}
            </div>
          </div>
          <ol class="map-list" id="m-list"></ol>
        </aside>
        <div class="map-wrap"><div id="big-map"></div></div>
      </section>`;

    if (!window.L) {
      $("#big-map").innerHTML = `<div class="empty"><span>🗺️</span><h3>${t("map.failT")}</h3><p>${t("map.failX")}</p></div>`;
      return;
    }
    const m = makeMap("big-map", {});
    window.L.marker([cfg.campus.lat, cfg.campus.lng], {
      icon: window.L.divIcon({ className: "", html: `<div class="pin-campus"><img src="assets/img/logo-mark.png" alt=""></div>`, iconSize: [46, 46], iconAnchor: [23, 23] }),
      zIndexOffset: 1000
    }).addTo(m).bindPopup(`<b>${esc(L(cfg.campus.name))}</b><br>${t("map.home")}`);

    const markers = new Map();
    located.forEach((p) => {
      const mk = L_marker([p.lat, p.lng], pinIcon(p)).bindPopup(`
        <a class="popup" href="${placeUrl(p)}">
          ${photo(p.photos[0], p.name, B.categoryEmoji(p.category), "popup-ph")}
          <span class="popup-body">
            <b>${esc(p.name)}</b>
            <span>${subline(p)} · ${priceSpend(p)}</span>
            <span class="popup-score ${B.verdict(p.overall).cls}">${fmtScore(p.overall)} · ${esc(B.verdict(p.overall).label)}</span>
          </span>
        </a>`, { maxWidth: 260, minWidth: 220 });
      markers.set(p.id, mk);
    });

    function draw(fit) {
      const flag = B.FLAGS.find((f) => f.key === cat);
      const list = located
        .filter((p) => !cat || (flag ? p[flag.field] : p.category === cat))
        .sort((a, b) => (a.distanceKm || 999) - (b.distanceKm || 999)); // nearest to campus first
      markers.forEach((mk, id) => (list.some((p) => p.id === id) ? mk.addTo(m) : mk.remove()));
      $$("#m-cat .chip-btn").forEach((b) => b.setAttribute("aria-pressed", b.dataset.cat === cat));
      $("#m-list").innerHTML = list.length
        ? list.map((p) => `
          <li><button class="map-item" data-id="${esc(p.id)}">
            ${photo(p.photos[0], "", B.categoryEmoji(p.category), "map-item-ph")}
            <span class="map-item-body"><b>${esc(p.name)}</b><span>${esc(p.area)} · ${isFinite(p.distanceKm) ? p.distanceKm.toFixed(1) + " km" : ""}</span></span>
            <span class="score-badge sm ${B.verdict(p.overall).cls}">${fmtScore(p.overall)}</span>
          </button></li>`).join("")
        : `<li class="map-empty">${t("map.empty")}</li>`;
      if (fit) {
        const pts = list.map((p) => [p.lat, p.lng]).concat([[cfg.campus.lat, cfg.campus.lng]]);
        m.fitBounds(pts, { paddingTopLeft: [50, 70], paddingBottomRight: [60, 30], maxZoom: 14 });
      }
    }
    $("#m-cat").addEventListener("click", (e) => {
      const b = e.target.closest(".chip-btn");
      if (b) { cat = b.dataset.cat; draw(true); }
    });
    $("#m-list").addEventListener("click", (e) => {
      const b = e.target.closest(".map-item");
      if (!b) return;
      const p = located.find((x) => x.id === b.dataset.id);
      m.flyTo([p.lat, p.lng], 15, { duration: 0.6 });
      markers.get(p.id).openPopup();
      if (matchMedia("(max-width: 860px)").matches) $(".map-wrap").scrollIntoView({ behavior: "smooth" });
    });
    draw(true);
  }

  /* ---------- ABOUT ---------- */
  function aboutPage(places) {
    const main = $("#main");
    main.innerHTML = `
      <section class="page-head about-head">
        <div class="wrap about-intro">
          <div>
            <p class="eyebrow">${t("about.eyebrow")}</p>
            <h1>${t("about.title")}</h1>
            <p class="lead">${t("about.lead", { name: esc(L(cfg.fullName)) })}</p>
          </div>
          <div class="about-logo"><img src="assets/img/logo.png" alt="Bilgastro logo"></div>
        </div>
      </section>

      <section class="section">
        <div class="wrap">
          <div class="section-head"><div><p class="eyebrow">${t("how.eyebrow")}</p><h2>${t("how.title")}</h2></div></div>
          <div class="how-grid">
            <div class="panel how"><span>😋</span><h3>${t("taste")} <small>/ 10</small></h3><p>${t("how.taste")}</p></div>
            <div class="panel how"><span>🤝</span><h3>${t("service")} <small>/ 10</small></h3><p>${t("how.service")}</p></div>
            <div class="panel how"><span>💸</span><h3>${t("price")} <small>₺ – ₺₺₺</small></h3><p>${t("how.price")}</p></div>
          </div>
          <p class="note how-note">${t("how.note")}</p>
          <div class="scale">
            ${[9, 8, 7, 6, 0].map((s) => `<span class="scale-item ${B.verdict(s).cls}"><b>${s ? s + "+" : "< 6"}</b>${esc(B.verdict(s).label)}</span>`).join("")}
          </div>
          <p class="note">${t("pay.note")}</p>
        </div>
      </section>

      <section class="section">
        <div class="wrap">
          <div class="section-head"><div><p class="eyebrow">${t("board.eyebrow")}</p><h2>${t("board.title")}</h2></div></div>
          <div class="board">
            ${(cfg.board || []).map((m) => `
              <div class="panel member"><span class="avatar">${esc(m.emoji || "🍴")}</span><b>${esc(L(m.name))}</b><span>${esc(L(m.role))}</span></div>`).join("")}
          </div>
        </div>
      </section>

      <section class="section" id="join">
        <div class="wrap">
          <div class="cta-band">
            <div>
              <h2>${t("join.title")}</h2>
              <p>${t("join.text", { n: places.filter((p) => !p.sample).length || places.length })}</p>
            </div>
            ${igUrl ? `<a class="btn btn-light btn-ig" href="${igUrl}" target="_blank" rel="noopener">${IG_ICON} ${t("join.dm")}</a>` : ""}
          </div>
        </div>
      </section>`;
  }

  /* ---------- boot ---------- */
  const PAGES = { home, places: placesPage, place: placePage, map: mapPage, about: aboutPage };
  let loaded = null;

  function render() {
    const page = document.body.dataset.page;
    document.documentElement.lang = lang;
    if (STR[lang]["title." + page]) document.title = t("title." + page);
    renderChrome(loaded.source);
    const fn = PAGES[page];
    if (fn) fn(loaded.places);
  }

  function setLang(next) {
    lang = next;
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* storage blocked: still switches for this page */ }
    const q = P();
    if (q.has("lang")) { q.delete("lang"); history.replaceState(null, "", q.toString() ? "?" + q : location.pathname); }
    const y = window.scrollY;
    render();
    window.scrollTo(0, Math.min(y, document.documentElement.scrollHeight));
  }

  document.addEventListener("DOMContentLoaded", async () => {
    document.documentElement.lang = lang;
    loaded = await B.loadPlaces();
    render();
    document.body.classList.add("ready");
  });
})();
