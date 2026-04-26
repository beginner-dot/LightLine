export type DailyDevotionEntry = {
  dayOfYear: number;
  kjvAnchor: {
    reference: string;
    text: string;
  };
  exposition: [string, string, string, string?];
  reflectionQuestion: string;
  yourTurn: string;
};

type SeedEntry = Omit<DailyDevotionEntry, "dayOfYear">;

const seededDevotions: SeedEntry[] = [
  {
    kjvAnchor: {
      reference: "Matthew 5:16",
      text: "Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven."
    },
    exposition: [
      "Jesus describes your faith as light. Light does not need to force attention. It simply shines and changes the space around it.",
      "This verse is not about performance. It is about walking with Christ so your words and choices naturally point to God's character.",
      "In SDA thought, obedience is fruit, not payment. God saves first, then teaches us to live in a way that reflects His love and truth.",
      "Your witness today may be quiet but powerful: patience in conflict, honesty in pressure, and kindness when no one expects it."
    ],
    reflectionQuestion: "Where can I let Christ's light be visible in one practical way today?",
    yourTurn: "Speak to God in your own words about one moment coming today where you want His light to be seen through you."
  },
  {
    kjvAnchor: {
      reference: "Proverbs 3:5",
      text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding."
    },
    exposition: [
      "Trust does not mean you never feel uncertain. It means you choose who you rely on while uncertainty is still present.",
      "We naturally lean on what we can predict. Scripture calls us to lean on God's wisdom, which sees far beyond our limited view.",
      "SDA believers value prayerful dependence on God through Scripture and the Holy Spirit's guidance in daily decisions.",
      "When you place your choices in God's hands, peace begins to grow because you are no longer carrying tomorrow by yourself."
    ],
    reflectionQuestion: "What decision am I still trying to control instead of trusting God with?",
    yourTurn: "Tell God plainly what decision feels heavy, and ask Him to guide your next faithful step."
  },
  {
    kjvAnchor: {
      reference: "Philippians 4:13",
      text: "I can do all things through Christ which strengtheneth me."
    },
    exposition: [
      "Paul wrote this during hardship, so this promise is deeper than motivation. It is strength for real pressure.",
      "Christ may not remove every challenge immediately, but He does provide power to endure, obey, and keep moving in faith.",
      "SDA discipleship highlights daily surrender, Scripture, prayer, and mission as ways we stay connected to Christ's strength.",
      "When you feel empty, this verse reminds you that your source is not willpower. Your source is Jesus Himself."
    ],
    reflectionQuestion: "Where do I need Christ's strength instead of pretending I can manage alone?",
    yourTurn: "Have an honest conversation with God about your weakness today and ask for strength for the next right step."
  },
  {
    kjvAnchor: {
      reference: "Psalm 46:10",
      text: "Be still, and know that I am God."
    },
    exposition: [
      "Stillness is not inactivity. It is a deliberate turning of your attention back to God when life feels loud.",
      "Knowing God means more than ideas. It means trusting His character when outcomes are not yet clear.",
      "Sabbath truth in SDA teaching reinforces this rhythm: stop, remember, worship, and rest in God's presence.",
      "When anxiety rises, stillness becomes a faith choice. You remind your soul that God is still on the throne."
    ],
    reflectionQuestion: "What noise do I need to quiet so I can hear God clearly?",
    yourTurn: "Pause and talk to God naturally, from your heart, about what is making your mind restless today."
  },
  {
    kjvAnchor: {
      reference: "Psalm 119:105",
      text: "Thy word is a lamp unto my feet, and a light unto my path."
    },
    exposition: [
      "A lamp gives enough light for the step in front of you. God often guides this way to teach daily trust.",
      "Scripture is not only information. It is direction for thoughts, actions, relationships, and priorities.",
      "SDA doctrine holds the Bible as the final authority in faith and practice, so God's Word shapes conscience and conduct.",
      "When you feel unsure, open Scripture before assumptions. God still leads ordinary people through His Word."
    ],
    reflectionQuestion: "Which part of my day needs biblical direction before I act?",
    yourTurn: "Tell God you want to follow His Word today, and ask Him to make one truth clear and practical."
  },
  {
    kjvAnchor: {
      reference: "1 Peter 5:7",
      text: "Casting all your care upon him; for he careth for you."
    },
    exposition: [
      "This verse is deeply personal. God does not tolerate your burdens from a distance. He invites you to hand them over.",
      "Casting your care is an active habit. You name the burden, release it to God, and repeat that surrender as needed.",
      "SDA hope in Christ's ongoing ministry in heaven reminds us we are seen, represented, and never forgotten.",
      "You are not failing because you need help. You are responding in faith when you bring your whole heart to God."
    ],
    reflectionQuestion: "What burden have I kept carrying that God is asking me to release?",
    yourTurn: "Tell God exactly what hurts, then ask Him to carry what you cannot carry alone."
  },
  {
    kjvAnchor: {
      reference: "Psalm 23:1",
      text: "The LORD is my shepherd; I shall not want."
    },
    exposition: [
      "David calls God a Shepherd, not a distant force. The image is relational, tender, and personal.",
      "To say 'I shall not want' means confidence in God's care, not denial of real needs or hard seasons.",
      "SDA faith keeps Christ central as Shepherd and Saviour who leads His people by truth, grace, and mission.",
      "When the future feels unclear, this verse anchors your heart: the Shepherd knows the road and will lead you."
    ],
    reflectionQuestion: "Where do I need to trust the Shepherd's care over my fear?",
    yourTurn: "Speak with God as your Shepherd today and share your needs in your own words, openly and honestly."
  }
];

const placeholderEntry = (dayOfYear: number): DailyDevotionEntry => ({
  dayOfYear,
  kjvAnchor: {
    reference: "",
    text: ""
  },
  exposition: ["", "", ""],
  reflectionQuestion: "",
  yourTurn: ""
});

export const dailyDevotions: DailyDevotionEntry[] = Array.from({ length: 365 }, (_, index) => {
  const dayOfYear = index + 1;
  const seeded = seededDevotions[index];
  if (seeded) {
    return {
      dayOfYear,
      ...seeded
    };
  }

  return placeholderEntry(dayOfYear);
});

export const getDevotionByDayOfYear = (dayOfYear: number): DailyDevotionEntry => {
  const clamped = Math.min(365, Math.max(1, Math.floor(dayOfYear)));
  return dailyDevotions[clamped - 1];
};
