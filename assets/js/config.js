/* =========================================================
   Bilgastro site settings — edit this file, no coding needed.
   ========================================================= */
window.BILGASTRO_CONFIG = {
  clubName: "Bilgastro",
  fullName: "Bilkent University Gastronomy Society",
  tagline: "We find Ankara's best plates, cups and corners, try them together, and tell you honestly.",

  // Instagram handle (without @) → https://www.instagram.com/bil.gastro/
  instagram: "bil.gastro",
  // Optional contact email. Leave "" to hide it.
  email: "",

  // Used to calculate "km from campus" for every place.
  campus: { name: "Bilkent University", lat: 39.8686, lng: 32.7486 },

  // The club's Google Sheet (share it as "Anyone with the link → Viewer", never Editor).
  // While it has no approved reviews, the site shows the sample places from data/sample-places.js.
  sheetCsvUrl: "https://docs.google.com/spreadsheets/d/1UUkZhF0Mnomt0IartSXhi9-yzyLbey7-BmFAD9V2tls/edit?usp=sharing",

  // Upcoming club visits. Past dates are hidden automatically.
  events: [
    {
      date: "2026-11-21",
      time: "11:00",
      title: "The Great Simit Hunt",
      where: "Meet at Bilkent Main Gate",
      description: "Five bakeries, one morning, one winner. Bring an appetite and a few coins — we split everything.",
      emoji: "🥯"
    },
    {
      date: "2026-12-05",
      time: "18:30",
      title: "Winter Soup Night",
      where: "Ulus & Hamamönü",
      description: "Mercimek, ezogelin, işkembe for the brave. A warm walk through old Ankara's best soup spots.",
      emoji: "🍲"
    }
  ],

  // About page — PLACEHOLDER names, replace with the real board.
  board: [
    { name: "Name Surname", role: "President", emoji: "👩‍🍳" },
    { name: "Name Surname", role: "Vice President", emoji: "🧑‍🍳" },
    { name: "Name Surname", role: "Reviews Editor", emoji: "✍️" },
    { name: "Name Surname", role: "Events & Trips", emoji: "🗺️" }
  ]
};
