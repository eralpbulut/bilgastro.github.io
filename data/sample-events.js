/* =========================================================
   SAMPLE ACTIVITIES — made-up club events for the demo.
   Shown (tagged "Sample") while showSamples is true in assets/js/config.js.
   Real activities come from the "Events" tab of the club's Google Sheet.
   Dates before today appear under "Past activities", the rest under "Coming up".
   place: id or name of a reviewed place → adds a "Read the review" link.
   ========================================================= */
(function () {
  const u = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1000&q=70`;

  window.BILGASTRO_SAMPLE_EVENTS = [
    // ---------- upcoming ----------
    {
      date: "2026-12-05", time: "18:30", emoji: "🍲",
      title: "Winter Soup Night", titleTr: "Kış Çorbası Gecesi",
      where: "Ulus & Hamamönü",
      description: "Mercimek, ezogelin, işkembe for the brave. A warm walk through old Ankara's soup spots, ending with tea.",
      descriptionTr: "Mercimek, ezogelin, cesurlar için işkembe. Eski Ankara'nın çorbacılarında sıcacık bir yürüyüş, sonunda çay."
    },
    {
      date: "2026-12-13", time: "10:30", emoji: "🍳",
      title: "Sunday Breakfast Club", titleTr: "Pazar Kahvaltı Kulübü",
      where: "Çayyolu", whereTr: "Çayyolu",
      description: "A long serpme breakfast for new and old members. We book the big table — just bring yourself.",
      descriptionTr: "Yeni ve eski üyelerle uzun bir serpme kahvaltı. Büyük masayı biz ayırtıyoruz, siz sadece gelin."
    },
    {
      date: "2026-12-19", time: "15:00", emoji: "🍰",
      title: "Holiday Dessert Crawl", titleTr: "Yılbaşı Tatlı Turu",
      where: "Tunalı Hilmi",
      description: "Four patisseries, one afternoon. We share every slice so everyone can taste everything.",
      descriptionTr: "Dört pastane, tek öğleden sonra. Her dilimi paylaşıyoruz, herkes her şeyi tadabilsin diye."
    },

    // ---------- past ----------
    {
      date: "2026-11-21", time: "11:00", emoji: "🥯",
      title: "The Great Simit Hunt", titleTr: "Büyük Simit Avı",
      where: "Kızılay", whereTr: "Kızılay",
      description: "Five bakeries, one morning. Twelve members, a lot of sesame, and one clear favourite.",
      descriptionTr: "Beş fırın, tek sabah. On iki üye, bolca susam ve net bir favori.",
      photo: u("1509440159596-0249088772ff"),
      place: "hamur-ve-halka"
    },
    {
      date: "2026-11-08", time: "16:00", emoji: "🍰",
      title: "Dessert Tasting Afternoon", titleTr: "Tatlı Tadım Öğleden Sonrası",
      where: "Tunalı Hilmi",
      description: "We shared six desserts between ten people and argued about every single one. Worth it.",
      descriptionTr: "On kişi altı tatlıyı paylaştık ve her biri hakkında tartıştık. Kesinlikle değdi.",
      photo: u("1578985545062-69928b1d9587"),
      place: "lokum-lab"
    },
    {
      date: "2026-10-30", time: "19:30", emoji: "🔥",
      title: "Ocakbaşı Night", titleTr: "Ocakbaşı Gecesi",
      where: "Bahçelievler",
      description: "Seats at the grill, the usta's show, and the best ezme of the semester.",
      descriptionTr: "Ocağın başında yerler, ustanın şovu ve dönemin en iyi ezmesi.",
      photo: u("1555939594-58d7cb561ad1"),
      place: "kirmizi-kor-ocakbasi"
    },
    {
      date: "2026-10-11", time: "19:00", emoji: "🍕",
      title: "Welcome Pizza Night", titleTr: "Hoş Geldin Pizza Gecesi",
      where: "Ümitköy",
      description: "Our first dinner of the year with 25 new members — and the bill split eight ways without a sigh.",
      descriptionTr: "25 yeni üyeyle yılın ilk akşam yemeği — hesap sekize bölündü, kimse şikayet etmedi.",
      photo: u("1513104890138-7c749659a591"),
      place: "odun-firini-pizza-co"
    },
    {
      date: "2026-09-24", time: "12:00", emoji: "🎪",
      title: "Club Fair Stand", titleTr: "Kulüp Tanıtım Günleri Standı",
      where: "Bilkent Main Campus", whereTr: "Bilkent Ana Kampüs",
      description: "Homemade cookies, a 'guess the spice' game, and more than 80 sign-ups in two days.",
      descriptionTr: "Ev yapımı kurabiyeler, 'baharatı tahmin et' oyunu ve iki günde 80'den fazla kayıt.",
      photo: u("1414235077428-338989a2e8c0")
    }
  ];
})();
