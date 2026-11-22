/* Loads reviews (sample data now, Google Sheet later) and cleans them up. */
(function () {
  const B = (window.Bilgastro = window.Bilgastro || {});
  const cfg = window.BILGASTRO_CONFIG || {};

  B.CATEGORIES = [
    { key: "Restaurant", tr: "Restoran", emoji: "🍽️" },
    { key: "Café", tr: "Kafe", emoji: "☕" },
    { key: "Tea House", tr: "Çay Bahçesi", emoji: "🫖" },
    { key: "Dessert", tr: "Tatlıcı", emoji: "🍰" },
    { key: "Breakfast & Bakery", tr: "Kahvaltı & Fırın", emoji: "🥐" },
    { key: "Street Food", tr: "Sokak Lezzetleri", emoji: "🌯" }
  ];
  B.categoryEmoji = (c) => (B.CATEGORIES.find((x) => x.key === c) || {}).emoji || "🍴";

  // Separate "friendly" categories — a place can be in either, both or none, on top of its type.
  B.FLAGS = [
    { key: "student", field: "studentFriendly", label: "Student friendly", tr: "Öğrenci dostu", emoji: "🎓" },
    { key: "veg", field: "veganFriendly", label: "Vegan/vegetarian friendly", tr: "Vegan/vejetaryen dostu", emoji: "🌱" }
  ];

  // Overall score = average of taste and service (both out of 10).
  const WEIGHTS = { taste: 0.5, service: 0.5 };

  const TR = { ç: "c", ğ: "g", ı: "i", İ: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u", "&": "and" };
  B.slugify = (s) =>
    String(s || "")
      .toLowerCase()
      .replace(/[çğıİöşüâîû&]/g, (ch) => TR[ch] || ch)
      .normalize("NFKD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  // Lists: "a; b; c" or one per line. Tags/reviewers may also use commas (Google Forms checkboxes do).
  function toList(v, allowComma) {
    if (Array.isArray(v)) return v.map((s) => String(s).trim()).filter(Boolean);
    if (v == null || v === "") return [];
    return String(v).split(allowComma ? /[;\n|,]/ : /[;\n|]/).map((s) => s.trim()).filter(Boolean);
  }
  // "39.9352, 32.8641" (Google Maps → right-click → copy) or a long Google Maps link with @lat,lng
  function parseCoords(v) {
    const s = String(v || "");
    const at = s.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/) || s.match(/(-?\d+\.\d+)\s*[,; ]\s*(-?\d+\.\d+)/);
    return at ? [parseFloat(at[1]), parseFloat(at[2])] : [NaN, NaN];
  }
  // Accepts 2026-11-02, 2.11.2026 (TR) or 11/2/2026 (US) → 2026-11-02
  function normDate(v) {
    const s = String(v || "").trim();
    let m;
    if ((m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/))) return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
    if ((m = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})/))) return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
    if ((m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/))) return `${m[3]}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}`;
    return s;
  }
  function num(v) {
    if (typeof v === "number") return v;
    if (v == null || v === "") return NaN;
    return parseFloat(String(v).replace(",", "."));
  }
  function truthy(v) {
    return /^(true|yes|y|1|x|✓|✔|evet|approved)$/i.test(String(v || "").trim());
  }

  // "500-600" / "500 - 600 TL" / "500–600₺" → "500–600 TL"
  function formatSpend(v) {
    let s = String(v || "").trim();
    if (!s) return "";
    s = s.replace(/\s*(tl|₺)\s*$/i, "").replace(/\s*[-–—]\s*/g, "–");
    return /\d/.test(s) ? s + " TL" : s;
  }

  // Google Drive share links -> direct image links
  function photoUrl(url) {
    const m = String(url).match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/);
    return m ? `https://lh3.googleusercontent.com/d/${m[1]}=w1400` : url;
  }

  function distanceKm(lat, lng) {
    if (!isFinite(lat) || !isFinite(lng) || !cfg.campus) return NaN;
    const R = 6371, rad = Math.PI / 180;
    const dLat = (lat - cfg.campus.lat) * rad, dLng = (lng - cfg.campus.lng) * rad;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(cfg.campus.lat * rad) * Math.cos(lat * rad) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  }

  function normalize(raw, i, isSample) {
    const p = {};
    p.name = String(raw.name || "").trim();
    p.id = raw.id ? B.slugify(raw.id) : B.slugify(p.name) || "place-" + i;
    p.category = String(raw.category || "Restaurant").trim();
    const cs = B.slugify(p.category);
    const known = B.CATEGORIES.find((c) => B.slugify(c.key) === cs || B.slugify(c.tr) === cs);
    if (known) p.category = known.key; // "cafe"/"Kafe" → "Café", "Çay Bahçesi" → "Tea House"
    p.cuisine = String(raw.cuisine || "").trim();
    p.area = String(raw.area || "").trim();
    p.address = String(raw.address || "").trim();
    p.lat = num(raw.lat);
    p.lng = num(raw.lng);
    if (!isFinite(p.lat) || !isFinite(p.lng)) [p.lat, p.lng] = parseCoords(raw.coordinates);
    // Price: 1–3 (₺, ₺₺, ₺₺₺). Also accepts "₺₺" typed directly.
    const pr = /₺/.test(String(raw.price)) ? (String(raw.price).match(/₺/g) || []).length : Math.round(num(raw.price));
    p.price = Math.min(3, Math.max(1, pr || 2));
    p.spend = formatSpend(raw.spend);
    p.scores = {};
    let sum = 0, wsum = 0;
    for (const k of Object.keys(WEIGHTS)) {
      const s = num(raw[k]);
      if (isFinite(s)) { p.scores[k] = s; sum += s * WEIGHTS[k]; wsum += WEIGHTS[k]; }
    }
    const given = num(raw.overall);
    p.overall = isFinite(given) ? given : wsum ? Math.round((sum / wsum) * 10) / 10 : NaN;
    p.headline = String(raw.headline || "").trim();
    p.review = String(raw.review || "").trim();
    p.mustTry = toList(raw.mustTry);
    p.skip = String(raw.skip || "").trim();
    // Optional Turkish versions (the site shows whichever language the visitor picked, falling back to the other)
    p.reviewTr = String(raw.reviewTr || "").trim();
    p.cuisineTr = String(raw.cuisineTr || "").trim();
    p.headlineTr = String(raw.headlineTr || "").trim();
    p.skipTr = String(raw.skipTr || "").trim();
    p.mustTryTr = toList(raw.mustTryTr);
    p.tags = toList(raw.tags, true);
    const tagText = p.tags.join(" ").toLowerCase();
    p.studentFriendly = raw.studentFriendly === true || truthy(raw.studentFriendly) || /student/.test(tagText);
    p.veganFriendly = raw.veganFriendly === true || truthy(raw.veganFriendly) || /vegan|vegetarian/.test(tagText);
    p.reviewers = toList(raw.reviewers, true);
    p.visitDate = normDate(raw.visitDate);
    p.photos = toList(raw.photos).map(photoUrl);
    p.featured = raw.featured === true || truthy(raw.featured);
    p.sample = !!isSample;
    p.distanceKm = distanceKm(p.lat, p.lng);
    return p;
  }

  // ---- CSV (Google Sheets "Publish to web" → CSV) ----
  function parseCSV(text) {
    const rows = [];
    let row = [], field = "", q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) {
        if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; }
        else field += c;
      } else if (c === '"') q = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(field); rows.push(row); row = []; field = "";
      } else field += c;
    }
    if (field !== "" || row.length) { row.push(field); rows.push(row); }
    return rows.filter((r) => r.some((x) => x.trim() !== ""));
  }

  const HEADER_ALIASES = {
    must_try: "mustTry", musttry: "mustTry", visit_date: "visitDate", visitdate: "visitDate", date: "visitDate",
    latitude: "lat", longitude: "lng", lon: "lng", location: "coordinates", coords: "coordinates", google_maps_coordinates: "coordinates", photo: "photos", photo_links: "photos", reviewer: "reviewers",
    avg_spend: "spend", average_spend: "spend", spend_per_person: "spend", price_range: "spend", avg_price: "spend", average_price: "spend",
    student_friendly: "studentFriendly", student: "studentFriendly",
    vegan_vegetarian_friendly: "veganFriendly", vegan_friendly: "veganFriendly", vegetarian_friendly: "veganFriendly",
    vegan_vegetarian: "veganFriendly", vegan: "veganFriendly", vegetarian: "veganFriendly",
    paragraph: "review", review_paragraph: "review", review_en: "review", cuisine_en: "cuisine", must_try_en: "mustTry",
    review_tr: "reviewTr", yorum: "reviewTr", turkish_review: "reviewTr", review_turkish: "reviewTr",
    cuisine_tr: "cuisineTr", mutfak: "cuisineTr", must_try_tr: "mustTryTr", musttry_tr: "mustTryTr",
    headline_tr: "headlineTr", skip_tr: "skipTr",
    maybe_skip: "skip", value_score: "value", atmosphere_score: "atmosphere", value_for_money: "value", taste_score: "taste", service_score: "service"
  };
  function rowsToObjects(rows) {
    const head = rows[0].map((h) => {
      const k = h.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
      return HEADER_ALIASES[k] || k;
    });
    return rows.slice(1).map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ""])));
  }

  // Accepts a normal Google Sheets link (…/spreadsheets/d/ID/edit…) and turns it into a CSV link.
  // The sheet must be shared as "Anyone with the link → Viewer".
  // "Publish to web" CSV links (…/d/e/…/pub?output=csv) and plain .csv paths also work.
  function csvUrl(url) {
    const m = String(url).match(/docs\.google\.com\/spreadsheets\/d\/(?!e\/)([\w-]+)/);
    if (!m) return url;
    const gid = (String(url).match(/[#&?]gid=(\d+)/) || [])[1];
    // Without a gid, Google exports the first tab.
    return `https://docs.google.com/spreadsheets/d/${m[1]}/export?format=csv${gid ? "&gid=" + gid : ""}`;
  }

  let cache = null;
  B.loadPlaces = function () {
    if (cache) return cache;
    cache = (async () => {
      if (cfg.sheetCsvUrl) {
        try {
          const res = await fetch(csvUrl(cfg.sheetCsvUrl), { cache: "no-store" });
          if (!res.ok) throw new Error("HTTP " + res.status);
          const rows = parseCSV(await res.text());
          let objs = rows.length ? rowsToObjects(rows) : [];
          if (objs.length && "approved" in objs[0]) objs = objs.filter((o) => truthy(o.approved));
          const places = objs.filter((o) => o.name).map((o, i) => normalize(o, i, false));
          if (places.length) return { places: sortNewest(places), source: "sheet" };
          console.info("Bilgastro: the Google Sheet has no approved reviews yet, showing sample data.");
        } catch (e) {
          console.warn("Bilgastro: could not load the Google Sheet, showing sample data instead.", e);
        }
      }
      const places = (window.BILGASTRO_SAMPLE_PLACES || []).map((o, i) => normalize(o, i, true));
      return { places: sortNewest(places), source: "sample" };
    })();
    return cache;
  };

  function sortNewest(list) {
    return list.sort((a, b) => (b.visitDate || "").localeCompare(a.visitDate || ""));
  }
})();
