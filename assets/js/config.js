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
  sheetCsvUrl: "https://docs.google.com/spreadsheets/d/1UUkZhF0Mnomt0IartSXhi9-yzyLbey7-BmFAD9V2tls/edit?usp=sharing",

  // Upcoming club visits. Past dates are hidden automatically.
  events: [
    {
      date: "2026-11-21",
      time: "11:00",
      title: { en: "The Great Simit Hunt", tr: "Büyük Simit Avı" },
      where: { en: "Meet at Bilkent Main Gate", tr: "Buluşma: Bilkent Ana Kapı" },
      description: {
        en: "Five bakeries, one morning. Bring an appetite and a few coins — we split everything.",
        tr: "Beş fırın, tek sabah. İştahınızı ve biraz bozukluk getirin — her şeyi paylaşıyoruz."
      },
      emoji: "🥯"
    },
    {
      date: "2026-12-05",
      time: "18:30",
      title: { en: "Winter Soup Night", tr: "Kış Çorbası Gecesi" },
      where: "Ulus & Hamamönü",
      description: {
        en: "Mercimek, ezogelin, işkembe for the brave. A warm walk through old Ankara's soup spots.",
        tr: "Mercimek, ezogelin, cesurlar için işkembe. Eski Ankara'nın çorbacılarında sıcacık bir yürüyüş."
      },
      emoji: "🍲"
    }
  ],

  // About page — PLACEHOLDER names, replace with the real board.
  board: [
    { name: "Name Surname", role: { en: "President", tr: "Başkan" }, emoji: "👩‍🍳" },
    { name: "Name Surname", role: { en: "Vice President", tr: "Başkan Yardımcısı" }, emoji: "🧑‍🍳" },
    { name: "Name Surname", role: { en: "Reviews Editor", tr: "Yorum Editörü" }, emoji: "✍️" },
    { name: "Name Surname", role: { en: "Events & Trips", tr: "Etkinlik & Geziler" }, emoji: "🗺️" }
  ]
};
