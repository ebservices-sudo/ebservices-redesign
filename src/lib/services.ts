export type Bi = { en: string; sq: string };

export type Service = {
  slug: string;
  name: Bi;
  short: Bi;
  intro: Bi[];
  blocks: { t: Bi; d: Bi }[];
  pricing: Bi;
  notes: Bi[];
  metaTitle: string;
  metaDescription: string;
};

const serviceList: Service[] = [
  {
    slug: "meta-ads-management",
    name: { en: "Meta Ads", sq: "Reklama në Meta" },
    short: {
      en: "Facebook and Instagram ads that bring messages and customers. Planned, run and improved every week, with a clear monthly report.",
      sq: "Reklama në Facebook dhe Instagram që sjellin mesazhe dhe klientë. I planifikojmë, i menaxhojmë dhe i përmirësojmë çdo javë, me raport të qartë mujor.",
    },
    intro: [
      {
        en: "We plan and run your Facebook and Instagram ads: the strategy, the campaign setup and the audiences. Every week we check the results and improve what isn't working.",
        sq: "Ne planifikojmë dhe menaxhojmë reklamat tuaja në Facebook dhe Instagram: strategjinë, ndërtimin e fushatave dhe audiencat. Çdo javë i kontrollojmë rezultatet dhe përmirësojmë atë që nuk funksionon.",
      },
      {
        en: "We judge ads by real messages and customers, not likes. The ad budget is paid by you, directly to Meta, on your own card.",
        sq: "Reklamat i vlerësojmë sipas mesazheve dhe klientëve realë, jo sipas pëlqimeve. Buxhetin e reklamave e paguani ju, direkt te Meta, me kartën tuaj.",
      },
    ],
    blocks: [
      {
        t: { en: "Strategy", sq: "Strategji" },
        d: {
          en: "What to advertise, to whom, and what result we aim for.",
          sq: "Çfarë reklamojmë, për kë dhe çfarë rezultati synojmë.",
        },
      },
      {
        t: { en: "Campaign setup", sq: "Ndërtimi i fushatave" },
        d: {
          en: "We build and launch your campaigns.",
          sq: "I ndërtojmë dhe i lansojmë fushatat tuaja.",
        },
      },
      {
        t: { en: "Audiences", sq: "Audiencat" },
        d: {
          en: "Your ads reach the people most likely to buy.",
          sq: "Reklamat arrijnë te njerëzit që ka më shumë gjasa të blejnë.",
        },
      },
      {
        t: { en: "Weekly optimisation", sq: "Optimizim javor" },
        d: {
          en: "We check the numbers every week and adjust.",
          sq: "I kontrollojmë numrat çdo javë dhe bëjmë ndryshime.",
        },
      },
      {
        t: { en: "Monthly report", sq: "Raport mujor" },
        d: {
          en: "What ran, what it cost and what it brought, in plain words.",
          sq: "Çfarë u publikua, sa kushtoi dhe çfarë solli, me fjalë të thjeshta.",
        },
      },
    ],
    pricing: {
      en: "Monthly fee for management. Message us for an offer.",
      sq: "Pagesë mujore për menaxhimin. Na shkruani për ofertë.",
    },
    notes: [
      {
        en: "Nothing goes live without your approval.",
        sq: "Asgjë nuk publikohet pa miratimin tuaj.",
      },
    ],
    metaTitle: "Meta Ads Management (Facebook & Instagram) | EB Services",
    metaDescription:
      "Facebook and Instagram ads managed by EB Services: strategy, setup, audiences, weekly optimisation and a monthly report.",
  },
  {
    slug: "ad-designs",
    name: { en: "Ad Design & Social Posts", sq: "Dizajn reklamash & postime" },
    short: {
      en: "Posts, stories and carousels in your brand's colours and fonts, sized for feed (4:5) and stories (9:16).",
      sq: "Postime, story dhe karusele me ngjyrat dhe fontet e brendit tuaj, në madhësi për feed (4:5) dhe story (9:16).",
    },
    intro: [
      {
        en: "We design posts, stories and carousels that look like your brand, with your colours and your fonts.",
        sq: "Dizajnojmë postime, story dhe karusele që duken si brendi juaj, me ngjyrat dhe fontet tuaja.",
      },
      {
        en: "Minimal text and real photos, so your content looks like your business, not like a template.",
        sq: "Pak tekst dhe fotografi reale, që përmbajtja të duket si biznesi juaj, jo si shabllon.",
      },
    ],
    blocks: [
      {
        t: { en: "Feed posts (4:5)", sq: "Postime për feed (4:5)" },
        d: {
          en: "Sized for Facebook and Instagram feeds.",
          sq: "Në madhësi për feed në Facebook dhe Instagram.",
        },
      },
      {
        t: { en: "Stories & reels (9:16)", sq: "Story & reels (9:16)" },
        d: {
          en: "Full-screen designs for stories and reels.",
          sq: "Dizajne në ekran të plotë për story dhe reels.",
        },
      },
      {
        t: { en: "Carousels", sq: "Karusele" },
        d: {
          en: "Several slides to show more in one post.",
          sq: "Disa faqe për të treguar më shumë në një postim.",
        },
      },
      {
        t: { en: "Your brand style", sq: "Stili i brendit tuaj" },
        d: {
          en: "Your colours and fonts in every design.",
          sq: "Ngjyrat dhe fontet tuaja në çdo dizajn.",
        },
      },
    ],
    pricing: {
      en: "Priced per design. Message us for an offer.",
      sq: "Çmimi për çdo dizajn. Na shkruani për ofertë.",
    },
    notes: [
      {
        en: "Nothing is published without your approval.",
        sq: "Asgjë nuk publikohet pa miratimin tuaj.",
      },
    ],
    metaTitle: "Ad Design & Social Media Posts | EB Services",
    metaDescription:
      "Posts, stories and carousels in your brand colours and fonts, sized 4:5 for feeds and 9:16 for stories and reels.",
  },
  {
    slug: "websites",
    name: { en: "Websites", sq: "Websites" },
    short: {
      en: "Fast, mobile-ready websites with WhatsApp and contact buttons, so visitors reach you in one tap.",
      sq: "Websites të shpejta dhe të përshtatura për telefon, me butona për WhatsApp dhe kontakt, që klientët t'ju gjejnë me një prekje.",
    },
    intro: [
      {
        en: "We design and build your website from start to finish. It works well on phones, where most of your visitors are.",
        sq: "E dizajnojmë dhe e ndërtojmë website-in tuaj nga fillimi deri në fund. Funksionon mirë në telefon, ku janë shumica e vizitorëve tuaj.",
      },
      {
        en: "WhatsApp and contact buttons are built in, so a visitor can message or call you in one tap.",
        sq: "Butonat për WhatsApp dhe kontakt janë të përfshirë, që vizitori t'ju shkruajë ose t'ju telefonojë me një prekje.",
      },
    ],
    blocks: [
      {
        t: { en: "Design", sq: "Dizajn" },
        d: {
          en: "A clean design that fits your business.",
          sq: "Dizajn i pastër që i përshtatet biznesit tuaj.",
        },
      },
      {
        t: { en: "Build and launch", sq: "Ndërtim dhe publikim" },
        d: {
          en: "We build it and put it online. No technical knowledge needed.",
          sq: "E ndërtojmë dhe e publikojmë. Nuk ju duhen njohuri teknike.",
        },
      },
      {
        t: { en: "Mobile-ready", sq: "Gati për telefon" },
        d: {
          en: "Looks right on phones, tablets and computers.",
          sq: "Duket mirë në telefon, tablet dhe kompjuter.",
        },
      },
      {
        t: { en: "WhatsApp & contact buttons", sq: "Butona për WhatsApp & kontakt" },
        d: {
          en: "One tap to message or call you.",
          sq: "Një prekje për t'ju shkruar ose telefonuar.",
        },
      },
    ],
    pricing: {
      en: "One-off price. Domain and hosting are a yearly extra. Message us for an offer.",
      sq: "Çmim i njëhershëm. Domeni dhe hostingu paguhen veçmas çdo vit. Na shkruani për ofertë.",
    },
    notes: [
      {
        en: "Nothing goes live without your approval.",
        sq: "Asgjë nuk publikohet pa miratimin tuaj.",
      },
    ],
    metaTitle: "Website Design & Build | EB Services",
    metaDescription:
      "Fast, mobile-ready websites with WhatsApp and contact buttons, designed and built by EB Services.",
  },
  {
    slug: "ai-receptionist",
    name: { en: "AI Receptionist", sq: "Recepsionist me AI" },
    short: {
      en: "A chatbot that answers your clients on WhatsApp, Instagram and Messenger 24/7 and books appointments for you.",
      sq: "Një chatbot që u përgjigjet klientëve tuaj në WhatsApp, Instagram dhe Messenger 24/7 dhe rezervon takime për ju.",
    },
    intro: [
      {
        en: "Your clients get an answer at any time of day: about your services, prices, opening hours and bookings. The average reply comes in under 10 seconds.",
        sq: "Klientët tuaj marrin përgjigje në çdo orë të ditës: për shërbimet, çmimet, orarin dhe rezervimet. Përgjigjja mesatare vjen për më pak se 10 sekonda.",
      },
      {
        en: "When a question needs a person, the chatbot passes it to you. It works for any type of business.",
        sq: "Kur një pyetje kërkon një person, chatbot-i jua kalon juve. Funksionon për çdo lloj biznesi.",
      },
    ],
    blocks: [
      {
        t: { en: "Answers 24/7", sq: "Përgjigjet 24/7" },
        d: {
          en: "Day, night and weekends, on WhatsApp, Instagram and Messenger.",
          sq: "Ditë, natë dhe fundjavë, në WhatsApp, Instagram dhe Messenger.",
        },
      },
      {
        t: { en: "Prices and hours", sq: "Çmime dhe orare" },
        d: {
          en: "Answers the questions your clients ask most.",
          sq: "U përgjigjet pyetjeve që klientët bëjnë më shpesh.",
        },
      },
      {
        t: { en: "Bookings", sq: "Rezervime" },
        d: {
          en: "Books appointments straight from the chat.",
          sq: "Rezervon takime direkt nga biseda.",
        },
      },
      {
        t: { en: "Hand-off to you", sq: "Kalim te ju" },
        d: {
          en: "Complex questions go to you or your team.",
          sq: "Pyetjet e ndërlikuara vijnë te ju ose ekipi juaj.",
        },
      },
    ],
    pricing: {
      en: "Monthly fee. Message us for an offer.",
      sq: "Pagesë mujore. Na shkruani për ofertë.",
    },
    notes: [
      {
        en: "Try it first: free 15-minute demo.",
        sq: "Provojeni fillimisht: demo falas 15-minutëshe.",
      },
    ],
    metaTitle: "AI Receptionist for WhatsApp, Instagram & Messenger | EB Services",
    metaDescription:
      "A chatbot that answers your clients on WhatsApp, Instagram and Messenger 24/7 and books appointments. Free 15-minute demo.",
  },
];

/** The AI receptionist is the main service, so it always comes first (lists, numbering, footer). */
export const services: Service[] = [
  ...serviceList.filter((s) => s.slug === "ai-receptionist"),
  ...serviceList.filter((s) => s.slug !== "ai-receptionist"),
];
