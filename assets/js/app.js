/* Bilgastro — page rendering (no frameworks, no build step). */
(function () {
  const B = window.Bilgastro;
  const cfg = window.BILGASTRO_CONFIG || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- helpers ---------- */
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmtScore = (s) => (isFinite(s) ? (Math.round(s * 10) / 10).toFixed(1) : "–");
  const fmtDate = (iso) => {
    const d = new Date(iso + "T12:00:00");
    return isNaN(d) ? "" : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };
  const fmtKm = (km) => (isFinite(km) ? (km < 10 ? km.toFixed(1) : Math.round(km)) + " km from campus" : "");
  const priceHtml = (n) =>
    `<span class="price" aria-label="Price level ${n} of 4">${"₺".repeat(n)}<span class="dim">${"₺".repeat(4 - n)}</span></span>`;
  B.verdict = (s) =>
    s >= 9 ? { label: "Must go", cls: "v-top" }
    : s >= 8 ? { label: "Highly recommended", cls: "v-great" }
    : s >= 7 ? { label: "Worth a try", cls: "v-good" }
    : s >= 6 ? { label: "It's okay", cls: "v-ok" }
    : { label: "Skip it", cls: "v-low" };
  const placeUrl = (p) => `place.html?id=${encodeURIComponent(p.id)}`;
  const igUrl = cfg.instagram ? `https://www.instagram.com/${encodeURIComponent(cfg.instagram)}/` : "";
  const IG_ICON = `<svg class="ig-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" class="ig-dot"/></svg>`;
  const igLink = (cls, label) =>
    igUrl ? `<a class="${cls}" href="${igUrl}" target="_blank" rel="noopener" aria-label="Bilgastro on Instagram (@${esc(cfg.instagram)})">${IG_ICON}${label ? `<span>${label}</span>` : ""}</a>` : "";
  const params = new URLSearchParams(location.search);

  // Image with a warm fallback if the photo link is broken.
  const photo = (src, alt, emoji, extra = "") =>
    `<div class="ph ${extra}" data-emoji="${esc(emoji || "🍴")}">${
      src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" onerror="this.remove()">` : ""
    }</div>`;

  /* ---------- shared layout ---------- */
  const NAV = [
    ["index.html", "Home", "home"],
    ["places.html", "Reviews", "places"],
    ["map.html", "Food map", "map"],
    ["rankings.html", "Rankings", "rankings"],
    ["about.html", "About", "about"]
  ];

  function renderChrome(source) {
    const page = document.body.dataset.page;
    const header = $("#site-header");
    if (header) {
      header.innerHTML = `
        ${source === "sample" ? `<div class="demo-strip">Demo preview · every place and review here is a made-up sample</div>` : ""}
        <div class="nav wrap">
          <a class="brand" href="index.html" aria-label="Bilgastro home">
            <img class="brand-mark" src="assets/img/logo-mark.png" alt="">
            <span class="brand-word">bilgastro</span>
          </a>
          <button class="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
          <nav id="nav-links" class="nav-links">
            ${NAV.map(([href, label, key]) => `<a href="${href}" ${key === page || (page === "place" && key === "places") ? 'aria-current="page"' : ""}>${label}</a>`).join("")}
          </nav>
          ${igLink("ig-btn", "@" + esc(cfg.instagram))}
        </div>`;
      const t = $(".nav-toggle", header);
      t.addEventListener("click", () => {
        const open = header.classList.toggle("open");
        t.setAttribute("aria-expanded", open);
      });
    }
    const footer = $("#site-footer");
    if (footer) {
      footer.innerHTML = `
        <div class="wrap footer-grid">
          <div>
            <a class="footer-brand" href="index.html"><span class="logo-tile"><img src="assets/img/logo.png" alt="Bilgastro logo"></span></a>
            <p class="footer-blurb">${esc(cfg.fullName)}. ${esc(cfg.tagline)}</p>
          </div>
          <div>
            <h4>Explore</h4>
            ${NAV.map(([h, l]) => `<a href="${h}">${l}</a>`).join("")}
          </div>
          <div>
            <h4>Say hi</h4>
            ${igUrl ? `<a href="${igUrl}" target="_blank" rel="noopener">Instagram · @${esc(cfg.instagram)}</a>` : ""}
            ${cfg.email ? `<a href="mailto:${esc(cfg.email)}">${esc(cfg.email)}</a>` : ""}
            <a href="about.html#join">Join the club</a>
          </div>
        </div>
        <div class="wrap footer-bottom">
          <span>© ${new Date().getFullYear()} Bilgastro · Bilkent University</span>
          <span>${source === "sample" ? "Sample photos from Unsplash" : "We pay for every meal we review."}</span>
        </div>`;
    }
  }

  /* ---------- cards ---------- */
  function card(p) {
    const v = B.verdict(p.overall);
    return `
      <a class="card" href="${placeUrl(p)}">
        <div class="card-media">
          ${photo(p.photos[0], p.name, B.categoryEmoji(p.category))}
          <span class="pill pill-cat">${B.categoryEmoji(p.category)} ${esc(p.category)}</span>
          <span class="score-badge ${v.cls}" title="${v.label}">${fmtScore(p.overall)}</span>
          ${p.sample ? `<span class="sample-tag">Sample</span>` : ""}
        </div>
        <div class="card-body">
          <h3 class="card-title">${esc(p.name)}</h3>
          <p class="card-meta">${esc(p.area)}${isFinite(p.distanceKm) ? ` · ${p.distanceKm.toFixed(1)} km` : ""} · ${priceHtml(p.price)}</p>
          ${p.headline ? `<p class="card-quote">“${esc(p.headline)}”</p>` : ""}
          ${p.mustTry.length ? `<p class="card-musttry"><span>Must try</span>${esc(p.mustTry[0])}</p>` : ""}
        </div>
      </a>`;
  }

  /* ---------- HOME ---------- */
  function home(places) {
    const main = $("#main");
    const byScore = [...places].sort((a, b) => b.overall - a.overall);
    const star = byScore[0];
    const heroPics = [star, ...places.filter((p) => p !== star)].filter((p) => p && p.photos[0]).slice(0, 3);
    const avg = places.length ? places.reduce((s, p) => s + (p.overall || 0), 0) / places.length : 0;
    const cats = B.CATEGORIES.map((c) => ({ ...c, n: places.filter((p) => p.category === c.key).length }));
    const featured = places.find((p) => p.featured && p !== star) || byScore[1] || star;
    const today = new Date().toISOString().slice(0, 10);
    const events = (cfg.events || []).filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));

    main.innerHTML = `
      <section class="hero">
        <div class="wrap hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">${esc(cfg.fullName)}</p>
            <h1>Ankara, <em>one bite</em> at a time.</h1>
            <p class="lead">${esc(cfg.tagline)}</p>
            <div class="hero-cta">
              <a class="btn btn-primary" href="places.html">Browse reviews</a>
              <a class="btn btn-ghost" href="map.html">Open the food map</a>
            </div>
            ${igLink("ig-inline", `Follow <b>@${esc(cfg.instagram)}</b> for photos & next tastings`)}
            <dl class="hero-stats">
              <div><dt>Places tasted</dt><dd>${places.length}</dd></div>
              <div><dt>Average score</dt><dd>${fmtScore(avg)}</dd></div>
              <div><dt>Must-try dishes</dt><dd>${places.reduce((s, p) => s + p.mustTry.length, 0)}</dd></div>
            </dl>
          </div>
          <div class="hero-art" aria-hidden="true">
            ${heroPics.map((p, i) => `<div class="hero-photo hp-${i}">${photo(p.photos[0], "", B.categoryEmoji(p.category))}</div>`).join("")}
            ${star ? `
            <a class="sticker sticker-score" href="${placeUrl(star)}" tabindex="-1">
              <b>${fmtScore(star.overall)}</b><span>${esc(B.verdict(star.overall).label)}</span><small>${esc(star.name)}</small>
            </a>
            ${star.mustTry[0] ? `<div class="sticker sticker-try">🍴 Must try: <b>${esc(star.mustTry[0])}</b></div>` : ""}` : ""}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="wrap">
          <div class="section-head">
            <div><p class="eyebrow">What are you craving?</p><h2>Pick a mood</h2></div>
          </div>
          <div class="cat-row">
            ${cats.map((c) => `
              <a class="cat-tile" href="places.html?cat=${encodeURIComponent(c.key)}">
                <span class="cat-emoji">${c.emoji}</span>
                <span class="cat-name">${esc(c.key)}</span>
                <span class="cat-count">${c.n} ${c.n === 1 ? "place" : "places"}</span>
              </a>`).join("")}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="wrap">
          <div class="section-head">
            <div><p class="eyebrow">Fresh from the table</p><h2>Latest reviews</h2></div>
            <a class="link-arrow" href="places.html">All reviews →</a>
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
              <p class="eyebrow">Club favourite</p>
              <h2>${esc(featured.name)}</h2>
              <p class="feature-meta">${esc(featured.cuisine)} · ${esc(featured.area)} · ${priceHtml(featured.price)}</p>
              <p class="feature-quote">“${esc(featured.headline)}”</p>
              <div class="feature-foot">
                <span class="score-badge big ${B.verdict(featured.overall).cls}">${fmtScore(featured.overall)}</span>
                <span class="feature-try">${featured.mustTry.slice(0, 3).map((m) => `<span class="chip">${esc(m)}</span>`).join("")}</span>
              </div>
              <span class="link-arrow">Read the full review →</span>
            </div>
          </a>
        </div>
      </section>` : ""}

      ${events.length ? `
      <section class="section">
        <div class="wrap">
          <div class="section-head"><div><p class="eyebrow">Come hungry</p><h2>Next club visits</h2></div></div>
          <div class="events">
            ${events.slice(0, 3).map((e) => {
              const d = new Date(e.date + "T12:00:00");
              return `
              <article class="event">
                <div class="event-date"><b>${d.getDate()}</b><span>${d.toLocaleDateString("en-GB", { month: "short" })}</span></div>
                <div class="event-body">
                  <h3>${esc(e.emoji || "")} ${esc(e.title)}</h3>
                  <p class="event-meta">${d.toLocaleDateString("en-GB", { weekday: "long" })}${e.time ? " · " + esc(e.time) : ""}${e.where ? " · " + esc(e.where) : ""}</p>
                  <p>${esc(e.description)}</p>
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
              <h2>Hungry for more?</h2>
              <p>Behind-the-scenes tastings, polls on where we go next, and photos that will make you skip the dining hall.</p>
            </div>
            <a class="btn btn-light btn-ig" href="${igUrl}" target="_blank" rel="noopener">${IG_ICON} Follow @${esc(cfg.instagram)}</a>
          </div>
        </div>
      </section>` : ""}
    `;
  }

  /* ---------- REVIEWS LIST ---------- */
  function placesPage(places) {
    const main = $("#main");
    const areas = [...new Set(places.map((p) => p.area).filter(Boolean))].sort((a, b) => a.localeCompare(b, "tr"));
    const state = {
      q: params.get("q") || "",
      cat: params.get("cat") || "",
      area: params.get("area") || "",
      price: params.get("price") || "",
      min: params.get("min") || "",
      sort: params.get("sort") || "newest"
    };

    main.innerHTML = `
      <section class="page-head">
        <div class="wrap">
          <p class="eyebrow">Every place we've tried</p>
          <h1>The reviews</h1>
          <p class="lead">Honest scores out of 10, the dish to order, and the one to skip.</p>
        </div>
      </section>
      <section class="wrap">
        <div class="filters" role="search">
          <label class="search">
            <span class="sr-only">Search</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
            <input id="f-q" type="search" placeholder="Search a place, dish or area… try “künefe”" value="${esc(state.q)}">
          </label>
          <div class="chips" id="f-cat">
            <button data-cat="" class="chip-btn">All</button>
            ${B.CATEGORIES.map((c) => `<button data-cat="${esc(c.key)}" class="chip-btn">${c.emoji} ${esc(c.key)}</button>`).join("")}
          </div>
          <div class="selects">
            <label>Area<select id="f-area"><option value="">Anywhere</option>${areas.map((a) => `<option>${esc(a)}</option>`).join("")}</select></label>
            <label>Price<select id="f-price"><option value="">Any price</option><option value="1">₺ only</option><option value="2">Up to ₺₺</option><option value="3">Up to ₺₺₺</option></select></label>
            <label>Score<select id="f-min"><option value="">Any score</option><option value="9">9+ Must go</option><option value="8">8+ Highly recommended</option><option value="7">7+ Worth a try</option></select></label>
            <label>Sort<select id="f-sort"><option value="newest">Newest first</option><option value="score">Highest score</option><option value="cheap">Cheapest first</option><option value="near">Closest to campus</option></select></label>
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
        if (q) {
          const hay = norm([p.name, p.category, p.cuisine, p.area, p.headline, p.review, p.mustTry.join(" "), p.tags.join(" ")].join(" "));
          if (!q.split(" ").every((w) => hay.includes(w))) return false;
        }
        return true;
      });
      const sorters = {
        newest: (a, b) => (b.visitDate || "").localeCompare(a.visitDate || ""),
        score: (a, b) => b.overall - a.overall,
        cheap: (a, b) => a.price - b.price || b.overall - a.overall,
        near: (a, b) => (a.distanceKm || 999) - (b.distanceKm || 999)
      };
      list.sort(sorters[state.sort] || sorters.newest);

      $$("#f-cat .chip-btn").forEach((b) => b.setAttribute("aria-pressed", b.dataset.cat === state.cat));
      $("#count").textContent = `${list.length} ${list.length === 1 ? "place" : "places"}`;
      $("#results").innerHTML = list.length
        ? list.map(card).join("")
        : `<div class="empty"><span>🍽️</span><h3>Nothing on the menu matches that.</h3><p>Try fewer filters — or tell us where we should go next!</p><button class="btn btn-ghost" id="reset">Clear filters</button></div>`;
      const r = $("#reset");
      if (r) r.onclick = () => { Object.assign(state, { q: "", cat: "", area: "", price: "", min: "" }); $("#f-q").value = ""; ["area", "price", "min"].forEach((k) => ($("#f-" + k).value = "")); apply(); };

      const qs = new URLSearchParams(Object.entries(state).filter(([k, v]) => v && !(k === "sort" && v === "newest")));
      history.replaceState(null, "", qs.toString() ? "?" + qs : location.pathname);
    }

    $("#f-q").addEventListener("input", (e) => { state.q = e.target.value; apply(); });
    $("#f-cat").addEventListener("click", (e) => {
      const b = e.target.closest(".chip-btn");
      if (b) { state.cat = b.dataset.cat; apply(); }
    });
    ["area", "price", "min", "sort"].forEach((k) => $("#f-" + k).addEventListener("change", (e) => { state[k] = e.target.value; apply(); }));
    apply();
  }

  /* ---------- SINGLE PLACE ---------- */
  function placePage(places) {
    const main = $("#main");
    const p = places.find((x) => x.id === params.get("id"));
    if (!p) {
      main.innerHTML = `<section class="page-head"><div class="wrap"><div class="empty"><span>🤔</span><h3>We couldn't find that place.</h3><p>It may have been renamed or removed.</p><a class="btn btn-primary" href="places.html">See all reviews</a></div></div></section>`;
      return;
    }
    document.title = `${p.name} · Bilgastro`;
    const v = B.verdict(p.overall);
    const scoreRows = [["taste", "Taste"], ["service", "Service"], ["atmosphere", "Atmosphere"], ["value", "Value for money"]]
      .filter(([k]) => isFinite(p.scores[k]))
      .map(([k, l]) => `
        <div class="bar-row">
          <span>${l}</span>
          <div class="bar"><i style="width:${p.scores[k] * 10}%"></i></div>
          <b>${fmtScore(p.scores[k])}</b>
        </div>`).join("");
    const paras = p.review.split(/\n\s*\n/).map((t) => `<p>${esc(t)}</p>`).join("");
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
          <a class="back" href="places.html">← All reviews</a>
          <div class="place-pills">
            <span class="pill pill-cat">${B.categoryEmoji(p.category)} ${esc(p.category)}</span>
            ${p.sample ? `<span class="pill pill-sample">Sample review</span>` : ""}
          </div>
          <h1>${esc(p.name)}</h1>
          <p class="place-sub">${esc(p.cuisine)}${p.area ? " · " + esc(p.area) : ""} · ${priceHtml(p.price)}</p>
          ${p.headline ? `<p class="place-headline">“${esc(p.headline)}”</p>` : ""}
        </div>
      </section>

      <div class="wrap place-layout">
        <article class="place-main">
          ${p.photos.length > 1 ? `<div class="thumbs">${p.photos.map((src, i) => `<button class="thumb" aria-label="Show photo ${i + 1}" data-i="${i}" aria-pressed="${i === 0}">${photo(src, "", B.categoryEmoji(p.category))}</button>`).join("")}</div>` : ""}
          <h2 class="h-serif">Our verdict</h2>
          <div class="review-text">${paras}</div>

          <div class="callouts">
            ${p.mustTry.length ? `
            <div class="callout callout-try">
              <h3>🍴 Must try</h3>
              <ul>${p.mustTry.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
            </div>` : ""}
            ${p.skip ? `
            <div class="callout callout-skip">
              <h3>🙅 Maybe skip</h3>
              <p>${esc(p.skip)}</p>
            </div>` : ""}
          </div>

          ${p.tags.length ? `<div class="tags">${p.tags.map((t) => `<a class="chip" href="places.html?q=${encodeURIComponent(t)}">${esc(t)}</a>`).join("")}</div>` : ""}

          <p class="byline">
            Reviewed by <b>${esc(p.reviewers.join(", ") || "the Bilgastro team")}</b>${p.visitDate ? ` · visited ${fmtDate(p.visitDate)}` : ""}
          </p>
        </article>

        <aside class="place-side">
          <div class="panel score-panel">
            <div class="score-ring ${v.cls}" style="--pct:${(p.overall || 0) * 10}">
              <div><b>${fmtScore(p.overall)}</b><span>/ 10</span></div>
            </div>
            <p class="verdict ${v.cls}">${v.label}</p>
            <div class="bars">${scoreRows}</div>
          </div>
          <div class="panel info-panel">
            <dl>
              <div><dt>Price</dt><dd>${priceHtml(p.price)}</dd></div>
              ${p.area ? `<div><dt>Area</dt><dd>${esc(p.area)}</dd></div>` : ""}
              ${isFinite(p.distanceKm) ? `<div><dt>Distance</dt><dd>${fmtKm(p.distanceKm)}</dd></div>` : ""}
              ${p.address ? `<div><dt>Address</dt><dd>${esc(p.address)}</dd></div>` : ""}
            </dl>
            ${isFinite(p.lat) ? `<div class="mini-map" id="mini-map"></div>` : ""}
            <a class="btn btn-primary btn-block" href="${gmaps}" target="_blank" rel="noopener">Get directions</a>
          </div>
          ${igLink("panel ig-card", `<b>More photos on Instagram</b><small>@${esc(cfg.instagram)}</small>`)}
        </aside>
      </div>

      ${similar.length ? `
      <section class="section">
        <div class="wrap">
          <div class="section-head"><div><p class="eyebrow">Still hungry?</p><h2>You might also like</h2></div></div>
          <div class="grid">${similar.map(card).join("")}</div>
        </div>
      </section>` : ""}`;

    $$(".thumb").forEach((t) =>
      t.addEventListener("click", () => {
        $("#hero-media").innerHTML = photo(p.photos[+t.dataset.i], p.name, B.categoryEmoji(p.category));
        $$(".thumb").forEach((x) => x.setAttribute("aria-pressed", x === t));
      })
    );

    if (isFinite(p.lat) && window.L) {
      const m = makeMap("mini-map", { zoomControl: false, scrollWheelZoom: false, dragging: !matchMedia("(pointer:coarse)").matches });
      m.setView([p.lat, p.lng], 14);
      L.marker([p.lat, p.lng], { icon: pinIcon(p) }).addTo(m);
    }
  }

  /* ---------- MAP ---------- */
  function makeMap(id, opts) {
    const m = L.map(id, { attributionControl: true, ...opts });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(m);
    return m;
  }
  function pinIcon(p) {
    return L.divIcon({
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
    let cat = params.get("cat") || "";

    main.innerHTML = `
      <section class="map-page">
        <aside class="map-side">
          <div class="map-side-head">
            <p class="eyebrow">Where we've eaten</p>
            <h1>The food map</h1>
            <div class="chips chips-tight" id="m-cat">
              <button data-cat="" class="chip-btn">All</button>
              ${B.CATEGORIES.map((c) => `<button data-cat="${esc(c.key)}" class="chip-btn" title="${esc(c.key)}">${c.emoji} ${esc(c.key)}</button>`).join("")}
            </div>
          </div>
          <ol class="map-list" id="m-list"></ol>
        </aside>
        <div class="map-wrap"><div id="big-map"></div></div>
      </section>`;

    if (!window.L) {
      $("#big-map").innerHTML = `<div class="empty"><span>🗺️</span><h3>The map couldn't load.</h3><p>Check your internet connection and refresh.</p></div>`;
      return;
    }
    const m = makeMap("big-map", {});
    const campus = L.marker([cfg.campus.lat, cfg.campus.lng], {
      icon: L.divIcon({ className: "", html: `<div class="pin-campus"><img src="assets/img/logo-mark.png" alt=""></div>`, iconSize: [46, 46], iconAnchor: [23, 23] }),
      zIndexOffset: 1000
    }).addTo(m).bindPopup(`<b>${esc(cfg.campus.name)}</b><br>Home base`);

    const markers = new Map();
    located.forEach((p) => {
      const mk = L.marker([p.lat, p.lng], { icon: pinIcon(p) }).bindPopup(`
        <a class="popup" href="${placeUrl(p)}">
          ${photo(p.photos[0], p.name, B.categoryEmoji(p.category), "popup-ph")}
          <span class="popup-body">
            <b>${esc(p.name)}</b>
            <span>${esc(p.cuisine)} · ${priceHtml(p.price)}</span>
            <span class="popup-score ${B.verdict(p.overall).cls}">${fmtScore(p.overall)} · ${B.verdict(p.overall).label}</span>
          </span>
        </a>`, { maxWidth: 260, minWidth: 220 });
      markers.set(p.id, mk);
    });

    function draw(fit) {
      const list = located.filter((p) => !cat || p.category === cat).sort((a, b) => b.overall - a.overall);
      markers.forEach((mk, id) => (list.some((p) => p.id === id) ? mk.addTo(m) : mk.remove()));
      $$("#m-cat .chip-btn").forEach((b) => b.setAttribute("aria-pressed", b.dataset.cat === cat));
      $("#m-list").innerHTML = list.length
        ? list.map((p) => `
          <li><button class="map-item" data-id="${esc(p.id)}">
            ${photo(p.photos[0], "", B.categoryEmoji(p.category), "map-item-ph")}
            <span class="map-item-body"><b>${esc(p.name)}</b><span>${esc(p.area)} · ${isFinite(p.distanceKm) ? p.distanceKm.toFixed(1) + " km" : ""}</span></span>
            <span class="score-badge sm ${B.verdict(p.overall).cls}">${fmtScore(p.overall)}</span>
          </button></li>`).join("")
        : `<li class="map-empty">No places in this category yet.</li>`;
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
    void campus;
  }

  /* ---------- RANKINGS ---------- */
  function rankingsPage(places) {
    const main = $("#main");
    const by = (k) => (a, b) => (b.scores[k] || 0) - (a.scores[k] || 0) || b.overall - a.overall;
    const lists = [
      { title: "Top of the table", sub: "Our highest overall scores", emoji: "🏆", items: [...places].sort((a, b) => b.overall - a.overall), metric: (p) => p.overall, metricLabel: "overall" },
      { title: "Best coffee", sub: "Cafés ranked by overall score", emoji: "☕", items: places.filter((p) => p.category === "Café").sort((a, b) => b.overall - a.overall), metric: (p) => p.overall, metricLabel: "overall" },
      { title: "Best bang for your lira", sub: "Highest value-for-money scores", emoji: "💸", items: [...places].sort(by("value")), metric: (p) => p.scores.value, metricLabel: "value" },
      { title: "Sweet tooth", sub: "Desserts, bakeries and breakfast", emoji: "🍰", items: places.filter((p) => ["Dessert", "Breakfast & Bakery"].includes(p.category)).sort((a, b) => b.overall - a.overall), metric: (p) => p.overall, metricLabel: "overall" },
      { title: "Best study spots", sub: "Tagged “Study spot”, ranked by atmosphere", emoji: "📚", items: places.filter((p) => p.tags.includes("Study spot")).sort(by("atmosphere")), metric: (p) => p.scores.atmosphere, metricLabel: "atmosphere" },
      { title: "Best atmosphere", sub: "Where the room is half the meal", emoji: "🕯️", items: [...places].sort(by("atmosphere")), metric: (p) => p.scores.atmosphere, metricLabel: "atmosphere" },
      { title: "Late-night saviours", sub: "Open when the library closes", emoji: "🌙", items: places.filter((p) => p.tags.includes("Late night")).sort((a, b) => b.overall - a.overall), metric: (p) => p.overall, metricLabel: "overall" }
    ].filter((l) => l.items.length);

    main.innerHTML = `
      <section class="page-head">
        <div class="wrap">
          <p class="eyebrow">The leaderboard</p>
          <h1>Rankings</h1>
          <p class="lead">The club's favourites, sliced every way we could think of.</p>
        </div>
      </section>
      <section class="wrap rank-grid">
        ${lists.map((l, li) => `
          <article class="panel rank ${li === 0 ? "rank-wide" : ""}">
            <header><span class="rank-emoji">${l.emoji}</span><div><h2>${esc(l.title)}</h2><p>${esc(l.sub)}</p></div></header>
            <ol>
              ${l.items.slice(0, li === 0 ? 5 : 3).map((p, i) => `
                <li><a href="${placeUrl(p)}">
                  <span class="rank-no n${i + 1}">${i + 1}</span>
                  ${photo(p.photos[0], "", B.categoryEmoji(p.category), "rank-ph")}
                  <span class="rank-body"><b>${esc(p.name)}</b><span>${esc(p.cuisine)} · ${esc(p.area)}</span></span>
                  <span class="rank-score"><b>${fmtScore(l.metric(p))}</b><small>${l.metricLabel}</small></span>
                </a></li>`).join("")}
            </ol>
          </article>`).join("")}
      </section>`;
  }

  /* ---------- ABOUT ---------- */
  function aboutPage(places) {
    const main = $("#main");
    main.innerHTML = `
      <section class="page-head about-head">
        <div class="wrap about-intro">
          <div>
            <p class="eyebrow">About us</p>
            <h1>We eat, we argue, we write it down.</h1>
            <p class="lead">Bilgastro is ${esc(cfg.fullName)}. Every few weeks a group of us picks a restaurant, café, tea house or bakery around Ankara, orders far too much, and scores it together. This site is where those notes live.</p>
          </div>
          <div class="about-logo"><img src="assets/img/logo.png" alt="Bilgastro logo"></div>
        </div>
      </section>

      <section class="section">
        <div class="wrap">
          <div class="section-head"><div><p class="eyebrow">How we review</p><h2>Four scores, one honest verdict</h2></div></div>
          <div class="how-grid">
            <div class="panel how"><span>😋</span><h3>Taste <small>40%</small></h3><p>The food or drink itself. Flavour, freshness, and whether we'd order it again tomorrow.</p></div>
            <div class="panel how"><span>🤝</span><h3>Service <small>20%</small></h3><p>Warmth, speed, and how they handle a table of eight hungry students.</p></div>
            <div class="panel how"><span>🕯️</span><h3>Atmosphere <small>20%</small></h3><p>Light, noise, comfort — could you stay for a chat, a date, or an exam-week study session?</p></div>
            <div class="panel how"><span>💸</span><h3>Value <small>20%</small></h3><p>Is it worth the money on a student budget? Cheap and great beats pricey and fine.</p></div>
          </div>
          <div class="scale">
            ${[[9, "Must go"], [8, "Highly recommended"], [7, "Worth a try"], [6, "It's okay"], [0, "Skip it"]].map(([s, l]) => `<span class="scale-item ${B.verdict(s).cls}"><b>${s ? s + "+" : "< 6"}</b>${l}</span>`).join("")}
          </div>
          <p class="note">We always pay for our own meals, and we visit as regular customers. No free food, no sponsored scores.</p>
        </div>
      </section>

      <section class="section">
        <div class="wrap">
          <div class="section-head"><div><p class="eyebrow">The people behind the forks</p><h2>The board</h2></div></div>
          <div class="board">
            ${(cfg.board || []).map((m) => `
              <div class="panel member"><span class="avatar">${esc(m.emoji || "🍴")}</span><b>${esc(m.name)}</b><span>${esc(m.role)}</span></div>`).join("")}
          </div>
        </div>
      </section>

      <section class="section" id="join">
        <div class="wrap">
          <div class="cta-band">
            <div>
              <h2>Pull up a chair.</h2>
              <p>Any Bilkent student can join — no cooking skills required, just curiosity and an appetite. ${places.length} places down, the whole city to go.</p>
            </div>
            ${igUrl ? `<a class="btn btn-light btn-ig" href="${igUrl}" target="_blank" rel="noopener">${IG_ICON} DM us on Instagram</a>` : ""}
          </div>
        </div>
      </section>`;
  }

  /* ---------- boot ---------- */
  const PAGES = { home, places: placesPage, place: placePage, map: mapPage, rankings: rankingsPage, about: aboutPage };
  document.addEventListener("DOMContentLoaded", async () => {
    const { places, source } = await B.loadPlaces();
    renderChrome(source);
    const fn = PAGES[document.body.dataset.page];
    if (fn) fn(places);
    document.body.classList.add("ready");
  });
})();
