/* =========================================================
   SAMPLE DATA — made-up places for the demo.
   These are NOT real businesses or real reviews.
   The site only shows these while the Google Sheet has no approved reviews.

   taste, service: members' average score out of 10.
   Overall = average of taste and service (calculated automatically).
   price: 1 = ₺, 2 = ₺₺, 3 = ₺₺₺.  spend: what one person usually spends.
   ========================================================= */
(function () {
  const u = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w || 1200}&q=70`;

  window.BILGASTRO_SAMPLE_PLACES = [
    {
      id: "fincan-and-fern",
      name: "Fincan & Fern",
      category: "Café",
      cuisine: "Specialty coffee",
      area: "Bilkent",
      address: "Near Bilkent Center (sample address)",
      lat: 39.8832, lng: 32.7578,
      taste: 9, service: 8.5,
      price: 2, spend: "250-350",
      studentFriendly: true, veganFriendly: true,
      review: "A short ride from campus and easily the cosiest coffee stop we've found. The cortado was silky and sweet, the pistachio cookie came out warm, and the quiet back room with plenty of sockets is made for exam season. Oat milk and a couple of vegan bakes are always on the counter.",
      mustTry: ["Cortado", "Pistachio cookie"],
      reviewers: ["Deniz", "Ece"],
      visitDate: "2026-11-02",
      photos: [u("1509042239860-f550ce710b93"), u("1501339847302-ac426a4a7cbb"), u("1495474472287-4d71bcdd2085")],
      featured: true
    },
    {
      id: "semaver-garden",
      name: "Semaver Garden",
      category: "Tea House",
      cuisine: "Turkish tea & gözleme",
      area: "Hamamönü",
      address: "Old town lanes, Hamamönü (sample address)",
      lat: 39.9352, lng: 32.8641,
      taste: 8, service: 7.5,
      price: 1, spend: "150-250",
      studentFriendly: true, veganFriendly: true,
      review: "A restored courtyard under grapevines, low stools, and a samovar that never runs dry. The potato-and-cheese gözleme arrived blistered and buttery, the spinach one is a good vegetarian pick, and the whole group ate for less than one restaurant main. Service slows down at weekends, but nobody comes here to rush.",
      mustTry: ["Potato & cheese gözleme", "Samovar tea"],
      reviewers: ["Kerem", "Selin", "Mert"],
      visitDate: "2026-10-18",
      photos: [u("1544787219-7f47ccb76574"), u("1576092768241-dec231879fc3")]
    },
    {
      id: "kirmizi-kor-ocakbasi",
      name: "Kırmızı Kor Ocakbaşı",
      category: "Restaurant",
      cuisine: "Grill & kebab",
      area: "Bahçelievler",
      address: "Off 7. Cadde, Bahçelievler (sample address)",
      lat: 39.9216, lng: 32.8228,
      taste: 9, service: 8,
      price: 3, spend: "900-1200",
      studentFriendly: false, veganFriendly: false,
      review: "Ask for a seat at the counter and watch the usta work the coals. The Adana was juicy and properly smoky, and the meze spread — fiery ezme, garlicky haydari — was a highlight. It's loud and pricier than our usual spots, so we'd save it for a celebration dinner.",
      mustTry: ["Adana kebab", "Acılı ezme"],
      reviewers: ["Zeynep", "Kerem"],
      visitDate: "2026-10-30",
      photos: [u("1555939594-58d7cb561ad1"), u("1544025162-d76694265947"), u("1414235077428-338989a2e8c0")]
    },
    {
      id: "hamur-ve-halka",
      name: "Hamur & Halka",
      category: "Breakfast & Bakery",
      cuisine: "Bakery & Turkish breakfast",
      area: "Kızılay",
      address: "Side street near Kızılay square (sample address)",
      lat: 39.9199, lng: 32.8538,
      taste: 8.5, service: 7,
      price: 1, spend: "100-200",
      studentFriendly: true, veganFriendly: true,
      review: "A no-frills neighbourhood bakery with the best simit we tried in Kızılay: shattering crust, dark toasted sesame, soft inside. The breakfast plate with cheeses, olives, honey and kaymak and unlimited tea is a steal. Seating is tight before 9, so go early or take it to go.",
      mustTry: ["Simit with kaymak & honey", "Olive poğaça"],
      reviewers: ["Mert"],
      visitDate: "2026-09-27",
      photos: [u("1509440159596-0249088772ff"), u("1555507036-ab1f4038808a"), u("1493770348161-369560ae357d")]
    },
    {
      id: "lokum-lab",
      name: "Lokum Lab",
      category: "Dessert",
      cuisine: "Patisserie & desserts",
      area: "Tunalı Hilmi",
      address: "Tunalı Hilmi Caddesi area (sample address)",
      lat: 39.9035, lng: 32.8612,
      taste: 9.5, service: 8,
      price: 2, spend: "400-550",
      studentFriendly: false, veganFriendly: true,
      review: "Turkish flavours in French-style desserts. The dark chocolate cake with a thin layer of sour cherry was rich without being too sweet, and the tahini-and-pekmez tart was a group favourite. Slices are small for the price, so share a few and taste everything. There's always one vegan cake in the window.",
      mustTry: ["Chocolate & sour cherry cake", "Tahini-pekmez tart"],
      reviewers: ["Ece", "Selin"],
      visitDate: "2026-11-08",
      photos: [u("1578985545062-69928b1d9587"), u("1488477181946-6428a0291777"), u("1551024601-bec78aea704b")]
    },
    {
      id: "odun-firini-pizza-co",
      name: "Odun Fırını Pizza Co.",
      category: "Restaurant",
      cuisine: "Wood-fired pizza",
      area: "Ümitköy",
      address: "Ümitköy (sample address)",
      lat: 39.8932, lng: 32.7036,
      taste: 8, service: 9,
      price: 2, spend: "450-600",
      studentFriendly: true, veganFriendly: true,
      review: "The wood oven sits right by the door and the 48-hour dough shows: airy, chewy, nicely charred. The sucuk pizza with hot honey won the table, and the vegetable pizza without cheese works well for vegan friends. Staff split the bill eight ways without a sigh, which makes it a great post-exam group dinner.",
      mustTry: ["Sucuk & hot honey pizza", "Margherita"],
      reviewers: ["Deniz", "Zeynep", "Mert"],
      visitDate: "2026-10-11",
      photos: [u("1513104890138-7c749659a591"), u("1565299624946-b28f40a0ae38"), u("1574071318508-1cdbab80d002")]
    },
    {
      id: "yesil-kase",
      name: "Yeşil Kâse",
      category: "Restaurant",
      cuisine: "Bowls & salads",
      area: "Çayyolu",
      address: "Çayyolu (sample address)",
      lat: 39.8800, lng: 32.6800,
      taste: 7.5, service: 8,
      price: 2, spend: "350-500",
      studentFriendly: false, veganFriendly: true,
      review: "Big, colourful bowls on bulgur, rice or greens, with toppings that change with the season. The roasted pumpkin bowl with walnut tarator was the standout. Some bowls need the house chilli oil, so ask for it. Everything is clearly labelled vegan or vegetarian, which our members loved.",
      mustTry: ["Roasted pumpkin & tarator bowl"],
      reviewers: ["Selin"],
      visitDate: "2026-09-20",
      photos: [u("1512621776951-a57141f2eefd"), u("1546069901-ba9599a7e63c"), u("1540189549336-e6e99c3679fe")]
    },
    {
      id: "gece-kusu-burger",
      name: "Gece Kuşu Burger",
      category: "Street Food",
      cuisine: "Smash burgers & fries",
      area: "Bilkent",
      address: "Close to the east campus gate (sample address)",
      lat: 39.8752, lng: 32.7625,
      taste: 8.5, service: 6.5,
      price: 2, spend: "300-400",
      studentFriendly: true, veganFriendly: false,
      review: "Open late and close to the dorms, so it's already a legend. The double smash burger has crispy, lacy edges and a sharp pickle sauce, and the hand-cut fries come with a garlic mayo you'll want twice. It's tiny with a midnight queue, so takeaway is the move.",
      mustTry: ["Double smash burger", "Fries with garlic mayo"],
      reviewers: ["Kerem", "Deniz"],
      visitDate: "2026-11-10",
      photos: [u("1568901346375-23c9450c58cd"), u("1550547660-d9450f859349"), u("1573080496219-bb080dd4f877")]
    }
  ];
})();
