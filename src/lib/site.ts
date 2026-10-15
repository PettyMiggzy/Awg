export const shop = {
  name: "AWG Custom Designs",
  short: "AWG",
  phoneDisplay: "(317) 300-4641",
  phoneTel: "+13173004641",
  street: "6269 Coffman Rd",
  city: "Indianapolis",
  region: "IN",
  postal: "46268",
  established: 2024,
  instagram: "https://www.instagram.com/mr.awg/",
  instagramHandle: "@mr.awg",
  tiktok: "https://www.tiktok.com/@mrawg1",
  tiktokHandle: "@mrawg1",
  maps: "https://maps.google.com/?q=6269+Coffman+Rd,+Indianapolis,+IN+46268",
} as const;

export const addressLine = `${shop.street}, ${shop.city}, ${shop.region} ${shop.postal}`;

export const instagramPosts = [
  {
    src: "/images/instagram/ports.jpg",
    alt: "Bronze slide with cross-shaped ports, held in a black glove",
    title: "Cross ports",
    caption: "A 19X with cross ports.",
    href: "https://www.instagram.com/p/DcuM9l_B-rM/",
  },
  {
    src: "/images/instagram/mirror.jpg",
    alt: "Mirror-polished pistol slide reflecting the shop",
    title: "Mirror polish",
    caption: "A slide brought to a mirror before the engraving.",
    href: "https://www.instagram.com/p/DeUqxOQMQk5/",
  },
  {
    src: "/images/instagram/scroll.jpg",
    alt: "Scroll engraving in progress on a polished slide",
    title: "Scroll engraving",
    caption: "A full engraving, still on the bench in the reel.",
    href: "https://www.instagram.com/p/DeFdJnuPcbF/",
  },
  {
    src: "/images/instagram/optic.jpg",
    alt: "FDE slide with a fresh optic cut, in front of the Mr. AWG sign",
    title: "Optic cut",
    caption: "A DeltaPoint Pro cut the shop turned in a day.",
    href: "https://www.instagram.com/p/DdWpVNdSt5B/",
  },
  {
    src: "/images/instagram/stipple.jpg",
    alt: "Stippled grip on a Bodyguard 2.0 in front of the shop sign",
    title: "Stipple",
    caption: "Grip texture on a Bodyguard 2.0.",
    href: "https://www.instagram.com/p/DdxXd2aRT-K/",
  },
  {
    src: "/images/instagram/bench.jpg",
    alt: "Sparks coming off a slide being ported on the bench",
    title: "On the wheel",
    caption: "Porting in the shop. The reel calls it a one-day job.",
    href: "https://www.instagram.com/p/Dcwf-V4BR_3/",
  },
] as const;

export type PriceKind = "flat" | "deposit" | "starting" | "quote";
export type ServiceCategory = "Machining" | "Cerakote" | "Engraving" | "Shop";

export type Service = {
  slug: string;
  name: string;
  category: ServiceCategory;
  priceKind: PriceKind;
  price: number | null;
  summary: string;
  details: string[];
  notes: string[];
  image?: string;
  imageAlt?: string;
  imageNote?: string;
  limited?: boolean;
};

export type Firearm = {
  slug: string;
  name: string;
  price: number;
  condition: string;
  summary: string;
  specs: { label: string; value: string }[];
  includes: string[];
  images: { src: string; alt: string }[];
};

export type WorkPiece = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  href: string;
  aspect: string;
};

export const shippingNote =
  "If you ship a project in, send the tracking number once it is on the way. The shop recommends UPS.";

export const services: Service[] = [
  {
    slug: "next-day-ports",
    name: "Next Day Ports",
    category: "Machining",
    priceKind: "flat",
    price: 175,
    limited: true,
    summary:
      "Special pricing on a quick-turnaround porting job, for a limited time.",
    details: [
      "Ports are cut for a faster turnaround than a full custom build.",
      "Book the session so the shop can hold the turnaround.",
    ],
    notes: [shippingNote],
    image: "/images/ports.jpg",
    imageAlt: "Ported handgun slide with a gold barrel and a mounted optic",
  },
  {
    slug: "optic-cuts",
    name: "Optic Cuts",
    category: "Machining",
    priceKind: "flat",
    price: 175,
    summary: "Direct-mount optic cut for Glock and HK slides only.",
    details: [
      "A cut lets a red dot mount to the slide itself, lower than an adapter plate stacked on the factory pattern.",
      "Glock and HK slides only. Other patterns are a separate conversation.",
    ],
    notes: [shippingNote],
    image: "/images/optic.jpg",
    imageAlt: "Gold handgun slide milled with an optic pocket",
  },
  {
    slug: "stippling-compact",
    name: "Stippling, compact",
    category: "Machining",
    priceKind: "flat",
    price: 250,
    summary: "Grip stippling for a compact frame.",
    details: [
      "Texture is cut into the grip so the gun stays put in the hand.",
      "Bring the frame, or ship it and send tracking.",
    ],
    notes: [shippingNote],
    image: "/images/stipple.jpg",
    imageAlt: "Stippled pistol grip with a small Mr. AWG medallion",
  },
  {
    slug: "stippling-full-size",
    name: "Stippling, full size",
    category: "Machining",
    priceKind: "flat",
    price: 300,
    summary: "Grip stippling for a full-size frame.",
    details: [
      "Same grip work as the compact service, laid out for a larger frame.",
      "The listed price is the published figure for the job.",
    ],
    notes: [shippingNote],
    image: "/images/stipple-2.jpg",
    imageAlt: "Close-up of a stippled pistol grip",
  },
  {
    slug: "polishing",
    name: "Polishing",
    category: "Machining",
    priceKind: "starting",
    price: 300,
    summary: "Mirror polishing. The final price depends on the firearm.",
    details: [
      "Published starting price is $300.",
      "Flats, rounds, and engraving all change how long the metal spends on the wheel.",
    ],
    notes: [shippingNote],
    image: "/images/polish.jpg",
    imageAlt: "Mirror-polished slide with scroll engraving",
  },
  {
    slug: "cerakote-handgun-slide",
    name: "Cerakote handgun slide",
    category: "Cerakote",
    priceKind: "deposit",
    price: 150,
    summary: "Durable Cerakote on a handgun slide. Color and pattern are part of the quote.",
    details: [
      "Cerakote is a baked coating used here for color and a harder wearing surface.",
      "The published $150 is a deposit. The job is priced per project.",
    ],
    notes: ["Shipping is calculated from your location.", shippingNote],
    image: "/images/cerakote-slide.jpg",
    imageAlt: "Handgun with a tan engraved slide and black frame",
  },
  {
    slug: "cerakote-rifle-barrel",
    name: "Cerakote rifle barrel",
    category: "Cerakote",
    priceKind: "deposit",
    price: 200,
    summary: "Cerakote on a rifle barrel. The published $200 is a deposit.",
    details: [
      "Barrel coating is priced per job after the shop sees the barrel and the color.",
      "Shipping is added based on location.",
    ],
    notes: [shippingNote],
    image: "/images/brand/coated-barrel.jpg",
    imageAlt: "Bronze ceramic finish on an unbranded rifle barrel",
    imageNote:
      "A finish study made for the site, not a customer barrel and not a gun for sale. The deposit is still based on the barrel you send.",
  },
  {
    slug: "cerakote-shotgun-receiver",
    name: "Cerakote shotgun receiver",
    category: "Cerakote",
    priceKind: "deposit",
    price: 300,
    summary: "Cerakote on a shotgun receiver. The published $300 is a deposit.",
    details: [
      "Color, coverage, and the receiver itself set the final price.",
      "This is custom work, confirmed before coating starts.",
    ],
    notes: ["Shipping is calculated from your location.", shippingNote],
    image: "/images/brand/coated-receiver.jpg",
    imageAlt: "Bronze ceramic finish on an unbranded receiver",
    imageNote:
      "A finish study made for the site, not a customer receiver and not a gun for sale. The job is still quoted from the receiver you send.",
  },
  {
    slug: "engraved-pistol",
    name: "Custom engraved pistol",
    category: "Engraving",
    priceKind: "deposit",
    price: 350,
    summary: "Laser engraving on a pistol. The published $350 is a deposit.",
    details: [
      "Designs can start from an idea or from artwork you have the right to use.",
      "The shop does not copy copyrighted artwork or trademarks without authorization.",
    ],
    notes: ["Shipping is calculated from your location.", shippingNote],
    image: "/images/engraved-pistol.jpg",
    imageAlt: "Engraved Beretta pistol with a matching engraved magazine",
  },
  {
    slug: "engraved-shotgun-receiver",
    name: "Engraved shotgun receiver",
    category: "Engraving",
    priceKind: "deposit",
    price: 300,
    summary: "Laser engraving on a shotgun receiver. The published $300 is a deposit.",
    details: [
      "Coverage and the artwork decide the final price.",
      "Send photos with the inquiry so the estimate is based on the actual receiver.",
    ],
    notes: ["Shipping is calculated from your location.", shippingNote],
  },
  {
    slug: "engraved-rifle",
    name: "Engraved rifle",
    category: "Engraving",
    priceKind: "deposit",
    price: 400,
    summary: "Laser engraving on a rifle stock or receiver. The published $400 is a deposit.",
    details: [
      "AWG lists this as an engraved rifle stock. Receivers and magazines are part of the same conversation.",
      "The job is priced per project.",
    ],
    notes: ["Shipping is calculated from your location.", shippingNote],
    image: "/images/rifle-stock.jpg",
    imageAlt: "Engraved rifle handguard and receiver with an AWG magazine",
  },
  {
    slug: "gift-engraving",
    name: "Engraving beyond the firearm",
    category: "Engraving",
    priceKind: "quote",
    price: null,
    summary: "Laser work on metal, wood, acrylic, leather, glass, slate, tumblers, knives, flasks, wallets, and keychains.",
    details: [
      "Bring the item if it can take a laser. The shop will say so if it cannot.",
      "There is no single published price. Send a photo for a quote.",
    ],
    notes: ["Eligible engraved goods can ship inside the United States."],
  },
  {
    slug: "custom-case-insert",
    name: "Custom case foam insert",
    category: "Shop",
    priceKind: "deposit",
    price: 150,
    summary: "A foam insert cut for a case. The published $150 is a deposit.",
    details: [
      "Inserts are cut to the case and the contents, so the price is per job.",
      "Presentation cases with engraving are quoted from photos.",
    ],
    notes: ["Shipping is calculated from your location.", shippingNote],
    image: "/images/foam.jpg",
    imageAlt: "Open presentation case holding an engraved pistol, a tag, and an engraved magazine",
  },
  {
    slug: "full-custom",
    name: "Full custom build",
    category: "Shop",
    priceKind: "quote",
    price: null,
    summary: "Engraving, Cerakote, and machining planned as one firearm instead of a single line item.",
    details: [
      "The shop quotes the whole build after a look at the gun and the idea.",
      "Turnaround follows the workload and is estimated when the order is accepted.",
    ],
    notes: [
      "Most custom projects require a 50% non-refundable deposit before work begins.",
    ],
    image: "/images/full-custom.jpg",
    imageAlt: "Close-up of an engraved hammer and grip on a finished pistol",
  },
  {
    slug: "ffl-transfer",
    name: "FFL transfer",
    category: "Shop",
    priceKind: "quote",
    price: null,
    summary: "Have a firearm shipped to AWG, then pick it up in Indianapolis after the paperwork.",
    details: [
      "Transfer fees vary. Call before you order so the seller gets the right information.",
      "The person on the paperwork is the person who completes the background check and takes the firearm.",
      "Pickup requires a valid government photo ID, any state paperwork that applies, ATF Form 4473, and a passed background check.",
    ],
    notes: ["Appointments are recommended so the transfer gets a full block of time."],
  },
];

export const firearms: Firearm[] = [
  {
    slug: "glock-19-gen5",
    name: "Glock 19 Gen5",
    price: 625,
    condition: "Pre-owned, excellent",
    summary:
      "A pre-owned Glock 19 Gen5 in 9mm, listed in excellent overall condition. Compact, and the shop's photos are of this gun.",
    specs: [
      { label: "Caliber", value: "9mm (9x19)" },
      { label: "Model", value: "G19 Gen5" },
      { label: "Barrel", value: '4.02"' },
      { label: "Capacity", value: "15 rounds" },
      { label: "Condition", value: "Pre-owned, excellent" },
    ],
    includes: [
      "Glock 19 Gen5",
      "One magazine",
      "Factory Glock case",
      "Gen5 features as listed by the shop: Marksman barrel, nDLC finish, front slide serrations, ambidextrous slide stop, reversible magazine catch, and a grip without finger grooves",
    ],
    images: [
      { src: "/images/glock.jpg", alt: "Glock 19 Gen5 on a stand, left side" },
      { src: "/images/glock-2.jpg", alt: "Glock 19 Gen5 on a stand, right side" },
    ],
  },
  {
    slug: "para-ordnance-p10-45",
    name: "Para-Ordnance P10-45",
    price: 750,
    condition: "Pre-owned, very good",
    summary:
      "Stainless Para-Ordnance P10-45 in .45 ACP. A compact double-stack 1911-style pistol, listed in very good condition. The model is discontinued.",
    specs: [
      { label: "Manufacturer", value: "Para-Ordnance" },
      { label: "Model", value: "P10-45" },
      { label: "Caliber", value: ".45 ACP" },
      { label: "Barrel", value: '3"' },
      { label: "Action", value: "Single action" },
      { label: "Capacity", value: "10+1, double-stack" },
      { label: "Finish", value: "Stainless" },
      { label: "Condition", value: "Pre-owned, very good" },
    ],
    includes: ["Two magazines", "Original factory case"],
    images: [
      {
        src: "/images/para.jpg",
        alt: "Stainless Para-Ordnance P10-45 on a stand",
      },
    ],
  },
  {
    slug: "rock-island-bbr-310",
    name: "Rock Island Armory BBR 3.10",
    price: 525,
    condition: "Pre-owned, very good",
    summary:
      "Rock Island Armory BBR 3.10 in .45 ACP, listed in very good condition. All-steel compact pistol with a ported barrel and G10 grips.",
    specs: [
      { label: "Manufacturer", value: "Rock Island Armory" },
      { label: "Model", value: "BBR 3.10" },
      { label: "Caliber", value: ".45 ACP" },
      { label: "Barrel", value: '3.10" ported' },
      { label: "Action", value: "Single action" },
      { label: "Capacity", value: "10+1" },
      { label: "Finish", value: "Black / parkerized" },
      { label: "Grips", value: "Textured G10" },
      { label: "Condition", value: "Pre-owned, very good" },
    ],
    includes: ["One magazine", "Factory case"],
    images: [
      {
        src: "/images/rock-island.jpg",
        alt: "Rock Island Armory BBR 3.10 on a stand",
      },
    ],
  },
];

export const work: WorkPiece[] = [
  {
    src: "/images/ports.jpg",
    alt: "Ported slide and gold barrel",
    title: "Ports",
    caption: "Ported slide, gold barrel",
    href: "/services/next-day-ports",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/images/optic.jpg",
    alt: "Gold slide with an optic cut",
    title: "Optic cut",
    caption: "Glock or HK pattern, milled for a dot",
    href: "/services/optic-cuts",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/cerakote-slide.jpg",
    alt: "Tan engraved slide on a black pistol",
    title: "Slide work",
    caption: "Engraving under Cerakote",
    href: "/services/cerakote-handgun-slide",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/engraved-pistol.jpg",
    alt: "Engraved Beretta with a matching magazine",
    title: "Engraved pistol",
    caption: "Slide and magazine, cut as a pair",
    href: "/services/engraved-pistol",
    aspect: "aspect-square",
  },
  {
    src: "/images/full-custom.jpg",
    alt: "Engraved hammer and textured grip",
    title: "Controls",
    caption: "Hammer, grip, and finish together",
    href: "/services/full-custom",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/images/polish.jpg",
    alt: "Polished slide with scroll engraving",
    title: "Polish",
    caption: "Scroll engraving on a bright slide",
    href: "/services/polishing",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/stipple.jpg",
    alt: "Stippled grip with an Mr. AWG medallion",
    title: "Stipple",
    caption: "Grip texture and a shop medallion",
    href: "/services/stippling-compact",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/images/foam.jpg",
    alt: "Presentation case with an engraved pistol",
    title: "Case",
    caption: "Foam, engraving, and a fitted case",
    href: "/services/custom-case-insert",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/rifle-detail.jpg",
    alt: "Engraved rifle with gold controls and an AWG magazine",
    title: "Rifle",
    caption: "Receiver engraving, gold controls",
    href: "/services/engraved-rifle",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/receiver.jpg",
    alt: "Scroll-engraved receiver with gold controls",
    title: "Receiver",
    caption: "Scroll engraving in the metal",
    href: "/work",
    aspect: "aspect-[4/5]",
  },
];

export const faqs = [
  {
    group: "The shop",
    items: [
      {
        q: "Where are you located?",
        a: "AWG Custom Designs is at 6269 Coffman Rd, Indianapolis, Indiana 46268. Local customers are welcome, and the shop accepts shipments from across the United States for eligible services.",
      },
      {
        q: "What do you actually do?",
        a: "Firearm sales, FFL transfers, laser engraving, Cerakote, slide milling and optic cuts, barrel and slide porting, custom builds, mirror polishing, and engraving on gifts, signs, and awards.",
      },
      {
        q: "Are you a licensed FFL?",
        a: "Yes. AWG Custom Designs is a federally licensed firearms dealer and follows federal, state, and local firearm laws.",
      },
      {
        q: "How much is an FFL transfer?",
        a: "The fee changes. Contact the shop before you order a firearm so you get the current price and the information your seller needs.",
      },
      {
        q: "Can I have a firearm shipped to you?",
        a: "Yes. Contact the shop before you place the order so the seller gets the right shipping details.",
      },
      {
        q: "What do I need to pick up a firearm?",
        a: "A valid government-issued photo ID, any state documentation that applies, and a completed ATF Form 4473 with a passed background check.",
      },
      {
        q: "Can someone else pick up my firearm?",
        a: "No. The person listed on the paperwork has to complete the background check and take possession.",
      },
      {
        q: "Do I need an appointment?",
        a: "Appointments are recommended for transfers, consultations, and design talks. Walk-in hours are not published.",
      },
    ],
  },
  {
    group: "Custom work",
    items: [
      {
        q: "Do you require a deposit?",
        a: "Yes. Most custom projects require a 50% non-refundable deposit before work begins. Several services on this site publish a specific deposit instead. Confirm which number applies before you pay.",
      },
      {
        q: "How long does custom work take?",
        a: "It depends on the project and the current bench. You get an estimated completion time when the order is accepted.",
      },
      {
        q: "Can you copy a design I found online?",
        a: "The shop can design from your idea. It does not copy copyrighted artwork or trademarks without authorization.",
      },
      {
        q: "Will engraving affect the manufacturer's warranty?",
        a: "Some modifications can. If warranty coverage matters, check with the manufacturer before the work starts.",
      },
      {
        q: "Do you work on guns customers already own?",
        a: "Yes, after the shop confirms the firearm can legally be accepted for service.",
      },
      {
        q: "What else can you engrave?",
        a: "Metal, wood, acrylic, leather, glass, slate, tumblers, knives, flasks, wallets, keychains, and other items that can take a laser.",
      },
    ],
  },
  {
    group: "Shipping and payment",
    items: [
      {
        q: "Do you ship?",
        a: "Eligible engraved products ship in the United States. Firearms ship only in line with federal and state law. A buyer in Indianapolis picks up in person after the background check.",
      },
      {
        q: "Can I mail my firearm in for custom work?",
        a: "Often, yes. Contact the shop before you ship so the instructions match the legal requirements. Send the tracking number, and use UPS when you can.",
      },
      {
        q: "What payment methods do you take?",
        a: "Major credit cards, debit cards, and other methods the shop has approved. This preview site does not charge a card.",
      },
      {
        q: "Do you offer refunds?",
        a: "Custom orders are generally non-refundable once production has started. If something is wrong with the order, contact the shop and they will work on a fix.",
      },
      {
        q: "How do I get a quote?",
        a: "Call (317) 300-4641, use the inquiry form, or message the shop on Instagram or TikTok. Photos make the estimate more accurate.",
      },
    ],
  },
] as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/firearms", label: "Firearms" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const serviceCategories: Array<ServiceCategory | "All"> = [
  "All",
  "Machining",
  "Cerakote",
  "Engraving",
  "Shop",
];

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function priceLabel(service: Pick<Service, "priceKind" | "price">) {
  if (service.priceKind === "quote" || service.price == null) return "Quoted";
  const money = formatMoney(service.price);
  if (service.priceKind === "deposit") return `Deposit ${money}`;
  if (service.priceKind === "starting") return `From ${money}`;
  return money;
}

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getFirearm(slug: string) {
  return firearms.find((firearm) => firearm.slug === slug);
}

export const firearmSlugs = firearms.map((firearm) => firearm.slug);

export const inquiryOptions = [
  { value: "custom", label: "Not sure yet — custom work" },
  ...services.map((service) => ({
    value: service.slug,
    label: service.name,
  })),
  ...firearms.map((firearm) => ({
    value: firearm.slug,
    label: `Buy: ${firearm.name} (${formatMoney(firearm.price)})`,
  })),
];
