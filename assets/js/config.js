/* =========================================================
   Bilgastro site settings — edit this file, no coding needed.
   Text can be written in both languages: { en: "...", tr: "..." }
   ========================================================= */
window.BILGASTRO_CONFIG = {
  clubName: "Bilgastro",
  fullName: { en: "Bilkent University Gastronomy Society", tr: "Bilkent Üniversitesi Gastronomi Topluluğu" },
  tagline: {
    en: "We find lovely places to eat and drink around Ankara, try them together, and tell you honestly.",
    tr: "Ankara'da yiyip içmek için güzel mekanlar buluyor, birlikte deniyor ve size dürüstçe anlatıyoruz."
  },

  // Instagram handle (without @) → https://www.instagram.com/bil.gastro/
  instagram: "bil.gastro",
  // Optional contact email. Leave "" to hide it.
  email: "",

  // Used to calculate "km from campus" for every place.
  campus: { name: { en: "Bilkent University", tr: "Bilkent Üniversitesi" }, lat: 39.8686, lng: 32.7486 },

  // The club's Google Sheet (share it as "Anyone with the link → Viewer", never Editor).
  // While it has no approved reviews, the site shows the sample places from data/sample-places.js.
  sheetCsvUrl: "https://docs.google.com/spreadsheets/d/1ahTM4ZDyYlEKFFfPC19Vsz_ga2Y3w1WvSNxrjhWKQqA/edit?usp=sharing",

  // true  = show the made-up sample places (tagged "Sample") next to your real reviews.
  // false = show only your real reviews. Switch to false once you have enough real places.
  showSamples: true,

  // Activities (past & upcoming) are posted in the "Events" tab of the Google Sheet above.
  // Sample activities live in data/sample-events.js and follow showSamples.

  // About page — PLACEHOLDER names, replace with the real board.
  board: [
    { name: "Name Surname", role: { en: "President", tr: "Başkan" }, emoji: "👩‍🍳" },
    { name: "Name Surname", role: { en: "Vice President", tr: "Başkan Yardımcısı" }, emoji: "🧑‍🍳" },
    { name: "Name Surname", role: { en: "Reviews Editor", tr: "Yorum Editörü" }, emoji: "✍️" },
    { name: "Name Surname", role: { en: "Events & Trips", tr: "Etkinlik & Geziler" }, emoji: "🗺️" }
  ]
};
