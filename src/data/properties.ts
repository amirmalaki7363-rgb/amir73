// ─── Types ────────────────────────────────────────────────
export interface Agent {
  name: string;
  role: string;
  phone: string;
  email: string;
  image: string;
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  location: string;
  city: string;
  state: string;
  country: string;
  price: number;
  type: 'ویلا' | 'خانه' | 'ملک' | 'اقامتگاه' | 'پنت‌هاوس' | 'آپارتمان';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lotSize?: string;
  yearBuilt?: number;
  description: string;
  features: string[];
  amenities: string[];
  images: string[];
  featured: boolean;
  agent: Agent;
}

// ─── Image helper ─────────────────────────────────────────
// Use "premium:" prefix for Unsplash+ images (plus.unsplash.com)
const img = (id: string, w = 1200, h = 800) => {
  if (id.startsWith('premium:')) {
    return `https://plus.unsplash.com/premium_photo-${id.slice(8)}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
  }
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
};

const gallery = (ids: string[]) => ids.map((id) => img(id, 1400, 900));

// ─── Shared agents ─────────────────────────────────────────
const agentDaniel: Agent = {
  name: 'دنیل مورگان',
  role: 'مدیرعامل',
  phone: '(555) 246-7890',
  email: 'daniel@horizonproperties.com',
  image: img('1507003211169-0a1dd7228f2d', 400, 400),
};

const agentOlivia: Agent = {
  name: 'اولیویا کارتر',
  role: 'مشاور املاک لوکس',
  phone: '(555) 246-7891',
  email: 'olivia@horizonproperties.com',
  image: img('1438761681033-6461ffad8d80', 400, 400),
};

const agentJames: Agent = {
  name: 'جیمز ویلسون',
  role: 'مشاور سرمایه‌گذاری',
  phone: '(555) 246-7892',
  email: 'james@horizonproperties.com',
  image: img('1500648767791-00dcc994a43e', 400, 400),
};

const agentSophia: Agent = {
  name: 'سوفیا بنت',
  role: 'متخصص ارشد املاک',
  phone: '(555) 246-7893',
  email: 'sophia@horizonproperties.com',
  image: img('1524504388940-b1c1722653e1', 400, 400),
};

// ─── Verified Unsplash photo IDs ────────────────────────────
// Architecture:
// 1580587771525-78b9dba3b914  — white/brown concrete villa
// 1600596542815-ffad4c1539a9  — white concrete building
// 1721815693498-cc28507c0ba2  — two-story house w/ windows
// 1628012209120-d9db7abf7eab  — white concrete building
// 1706808849780-7a04fbac83ef  — modern house w/ pool & loungers
// 1698994705178-d244d73ea573  — house on a hill
// 1719887805632-de5be825f72b  — house w/ windows & palm trees
// 1613490493576-7fde63acd811  — white/brown concrete building
// 1600607687939-ce8a6c25118c  — modern villa
// 1600047509807-ba8f99d2cdde  — luxury home
// 1484154218962-a197022b5858  — modern building
// 1502672260266-1c1ef2d93688  — modern interior
// 1545324418-cc1a3fa10c00     — modern house
// 1505843513577-22bb7d21e455  — white/black lighted concrete house
// 1787491581005-76861ea79bf8  — modern house w/ deck in forest
// 1591474200742-8e512e6f98f8  — white/brown wooden house
// 1762811054947-605b20298615  — modern white house at dusk
// premium:1682377521625-c656fc1ff3e1 — house w/ pool
// premium:1694475117121-0c14f8ddf7bb — house w/ pool
// premium:1682377521753-58d1fd9fa5ce — house w/ pool in yard

// ─── Properties ────────────────────────────────────────────
export const properties: Property[] = [
  {
    id: '1',
    slug: 'lakeside-modern-villa',
    name: 'ویلا مدرن ساحلی',
    location: 'آستین، تگزاس، آمریکا',
    city: 'Austin',
    state: 'Texas',
    country: 'USA',
    price: 2_350_000,
    type: 'ویلا',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 6200,
    lotSize: '۰.۸ هکتار',
    yearBuilt: 2021,
    description:
      'شاهکار معماری خیره‌کننده‌ای در ساحل دریاچه آستین. این ویلا دارای دیوارهای شیشه‌ای از کف تا سقف است که مرز میان فضای داخلی و منظره را از بین می‌برد، یک استخر بی‌نهایت ریزورتی و فضاهای زندگی با طراحی دقیق که نهایت زندگی لوکس مدرن را تجسم می‌کند.',
    features: [
      'دیوارهای شیشه‌ای از کف تا سقف',
      'استخر بی‌نهایت با چشم‌انداز دریاچه',
      'سیستم خانه هوشمند',
      'آشپزخانه حرفه‌ای با لوازم Wolf',
      'مستربد با تراس خصوصی',
      'انبار شراب',
      'سینمای خانگی',
      'گاراژ سه‌ ماشین',
    ],
    amenities: ['استخر', 'خانه هوشمند', 'انبار شراب', 'سینمای خانگی', 'گاراژ', 'باشگاه'],
    images: gallery([
      '1580587771525-78b9dba3b914',
      '1706808849780-7a04fbac83ef',
      '1600607687939-ce8a6c25118c',
      '1505843513577-22bb7d21e455',
    ]),
    featured: true,
    agent: agentDaniel,
  },
  {
    id: '2',
    slug: 'pacific-glass-house',
    name: 'خانه شیشه‌ای پاسیفیک',
    location: 'مالیبو، کالیفرنیا، آمریکا',
    city: 'Malibu',
    state: 'California',
    country: 'USA',
    price: 4_800_000,
    type: 'خانه',
    bedrooms: 6,
    bathrooms: 5,
    sqft: 8400,
    lotSize: '۱.۲ هکتار',
    yearBuilt: 2022,
    description:
      'نشسته بر ساحل مالیبو، این جواهر معماری چشم‌اندازهای uninterrupted اقیانوس آرام را از طریق نما شیشه‌ای شفاف خود ارائه می‌دهد. طراحی آن زندگی داخلی و خارجی را با تراس‌های وسیع، استخر لبه ناپدید و فضاهای داخلی تزئین شده با بهترین متریال‌ها تلفیق می‌کند.',
    features: [
      'چشم‌انداز پانوراما اقیانوس',
      'استخر لبه ناپدید',
      'سالن زندگی محصور در شیشه',
      'آشپزخانه و غذاخوری روباز',
      'دسترسی خصوصی به ساحل',
      'سیستم انرژی خورشیدی',
      'مرکز اسپا و سلامت',
    ],
    amenities: ['چشم‌انداز اقیانوس', 'استخر', 'اسپا', 'انرژی خورشیدی', 'دسترسی ساحل', 'آشپزخانه روباز'],
    images: gallery([
      '1600047509807-ba8f99d2cdde',
      '1719887805632-de5be825f72b',
      '1600596542815-ffad4c1539a9',
      '1484154218962-a197022b5858',
    ]),
    featured: true,
    agent: agentOlivia,
  },
  {
    id: '3',
    slug: 'desert-horizon-estate',
    name: 'ملک افق کویر',
    location: 'اسکاتس‌دیل، آریزونا، آمریکا',
    city: 'Scottsdale',
    state: 'Arizona',
    country: 'USA',
    price: 3_150_000,
    type: 'ملک',
    bedrooms: 4,
    bathrooms: 4,
    sqft: 5500,
    lotSize: '۲.۵ هکتار',
    yearBuilt: 2020,
    description:
      'اقامتگاه آرام صحرایی که با محیط طبیعی خود هماهنگ است. خطوط تمیز، سنگ گرم و دیوارهای خاک فشرده پناهگاهی پیچیده ایجاد می‌کنند. این ملک دارای استخر انعکاسی، حیاط‌های سایه‌دار و چشم‌انداز پانوراما کوه‌های مک‌داول است.',
    features: [
      'دیوارهای خاک فشرده و سنگی',
      'استخر انعکاسی',
      'زندگی در حیاط سایه‌دار',
      'چشم‌انداز کوهستان',
      'باغبانی کویری بومی',
      'کاسیتای مهمان جداگانه',
    ],
    amenities: ['استخر', 'چشم‌انداز کوهستان', 'خانه مهمان', 'حیاط', 'گاراژ'],
    images: gallery([
      '1698994705178-d244d73ea573',
      '1613490493576-7fde63acd811',
      '1591474200742-8e512e6f98f8',
      '1787491581005-76861ea79bf8',
    ]),
    featured: true,
    agent: agentJames,
  },
  {
    id: '4',
    slug: 'oceanfront-residence',
    name: 'اقامتگاه ساحلی',
    location: 'میامی، فلوریدا، آمریکا',
    city: 'Miami',
    state: 'Florida',
    country: 'USA',
    price: 5_200_000,
    type: 'اقامتگاه',
    bedrooms: 5,
    bathrooms: 6,
    sqft: 7200,
    lotSize: '۰.۵ هکتار',
    yearBuilt: 2023,
    description:
      'اقامتگاه نمادین ساحلی که لوکس ساحلی مدرن را تعریف می‌کند. با ۲۰۰ فوت خط ساحلی خصوصی، تراس پشت بامی و فضاهای داخلی توسط یک طراح برنده جایزه، این خانه بیانیه‌ای از زندگی استوایی ظریف در بهترین شکل آن است.',
    features: [
      '۲۰۰ فوت خط ساحلی خصوصی',
      'تراس پشت بامی با چشم‌انداز اقیانوس',
      'استخر لبه بی‌نهایت',
      'اسکله خصوصی',
      'شیشه تایید شده طوفان',
      'آشپزخانه تابستانی',
    ],
    amenities: ['چشم‌انداز اقیانوس', 'استخر', 'اسکله', 'تراس پشت بام', 'گاراژ', 'باشگاه'],
    images: gallery([
      '1628012209120-d9db7abf7eab',
      '1502672260266-1c1ef2d93688',
      '1545324418-cc1a3fa10c00',
      '1762811054947-605b20298615',
    ]),
    featured: true,
    agent: agentSophia,
  },
  {
    id: '5',
    slug: 'modern-hillside-retreat',
    name: 'اقامتگاه مدرن دامنه',
    location: 'لس‌آنجلس، کالیفرنیا، آمریکا',
    city: 'Los Angeles',
    state: 'California',
    country: 'USA',
    price: 3_750_000,
    type: 'خانه',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 4800,
    lotSize: '۰.۶ هکتار',
    yearBuilt: 2021,
    description:
      'خانه‌ای مجسمه‌وار در دامنه تپه با چشم‌اندازهای خیره‌کننده حوضه لس‌آنجلس. تراس‌های کنسولی، استخر لبه صفر و پالت متریال فولاد، شیشه و چوب گرم اقامتی خلق می‌کنند که هم جسور و هم پیوند عمیق با منظره است.',
    features: [
      'تراس‌های کنسولی',
      'استخر لبه صفر',
      'چشم‌انداز شهر و اقیانوس',
      'زندگی بازطراحی',
      'پله معلق',
      'ایستگاه شارژ خودرو برقی',
    ],
    amenities: ['استخر', 'چشم‌انداز شهر', 'گاراژ', 'شارژ برقی', 'خانه هوشمند'],
    images: gallery([
      '1721815693498-cc28507c0ba2',
      '1600607687939-ce8a6c25118c',
      '1505843513577-22bb7d21e455',
      '1706808849780-7a04fbac83ef',
    ]),
    featured: false,
    agent: agentOlivia,
  },
  {
    id: '6',
    slug: 'palm-garden-residence',
    name: 'اقامتگاه باغ نخل',
    location: 'بورلی هیلز، کالیفرنیا، آمریکا',
    city: 'Beverly Hills',
    state: 'California',
    country: 'USA',
    price: 6_400_000,
    type: 'ملک',
    bedrooms: 7,
    bathrooms: 8,
    sqft: 11000,
    lotSize: '۱.۵ هکتار',
    yearBuilt: 2022,
    description:
      'ملکی باشکوه در قلب بورلی هیلز، احاطه شده با نخل‌های بالغ و باغ‌های منظم. این اقامتگاه دارای ورودی دو طبقه، آشپزخانه درجه فیلم، استخر المپیکی و پاویون سلامت جداگانه با سونا و حمام بخار است.',
    features: [
      'ورودی دو طبقه باشکوه',
      'استخر المپیکی',
      'پاویون سلامت',
      'باغ‌های رسمی با نخل',
      'حیاط موتور با فواره',
      'محل کارکنان',
    ],
    amenities: ['استخر', 'باشگاه', 'اسپا', 'باغ', 'محل کارکنان', 'گاراژ', 'خانه هوشمند'],
    images: gallery([
      '1719887805632-de5be825f72b',
      '1600047509807-ba8f99d2cdde',
      '1580587771525-78b9dba3b914',
      '1762811054947-605b20298615',
    ]),
    featured: false,
    agent: agentDaniel,
  },
  {
    id: '7',
    slug: 'contemporary-lake-house',
    name: 'خانه دریاچه‌ای مدرن',
    location: 'لیک تاهو، نوادا، آمریکا',
    city: 'Lake Tahoe',
    state: 'Nevada',
    country: 'USA',
    price: 2_950_000,
    type: 'خانه',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 4200,
    lotSize: '۰.۴ هکتار',
    yearBuilt: 2019,
    description:
      'خانه دریاچه‌ای مدرن و گرم پیچیده در سدر و سنگ، با دسترسی مستقیم به دریاچه و چشم‌انداز پانوراما آب. طراحی آن گرمای روستیک را با مدرنیسم تمیز متعادل می‌کند و دارای شومینه سنگی، عرشه دریاچه‌ای و جکوزی زیر کاج‌ها است.',
    features: [
      'دسترسی مستقیم به دریاچه',
      'اسکله خصوصی',
      'شومینه سنگی',
      'عرشه دریاچه‌ای',
      'جکوزی',
      'نمای سدر و سنگ',
    ],
    amenities: ['چشم‌انداز دریاچه', 'اسکله', 'جکوزی', 'شومینه', 'گاراژ'],
    images: gallery([
      '1787491581005-76861ea79bf8',
      '1591474200742-8e512e6f98f8',
      '1698994705178-d244d73ea573',
      '1484154218962-a197022b5858',
    ]),
    featured: false,
    agent: agentJames,
  },
  {
    id: '8',
    slug: 'architectural-downtown-penthouse',
    name: 'پنت‌هاوس معماری مرکز شهر',
    location: 'آستین، تگزاس، آمریکا',
    city: 'Austin',
    state: 'Texas',
    country: 'USA',
    price: 1_850_000,
    type: 'پنت‌هاوس',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 3200,
    yearBuilt: 2023,
    description:
      'پنت‌هاوس یک طبقه کامل در مرکز آستین با چشم‌انداز ۳۶۰ درجه افق شهر. فضای داخلی دارای بتن صیقلی، نجاری سفارشی و تراس دوردار است. امکانات ساختمان شامل استخر پشت بام، مرکز تناسب اندام و نگهبان ۲۴ ساعته است.',
    features: [
      'چشم‌انداز ۳۶۰ درجه افق شهر',
      'تراس دوردار',
      'کف‌پوش بتن صیقلی',
      'نجاری سفارشی ایتالیایی',
      'آشپزخانه گورمه حرفه‌ای',
      'استخر پشت بام ساختمان',
    ],
    amenities: ['چشم‌انداز شهر', 'استخر', 'باشگاه', 'نگهبان', 'تراس', 'خانه هوشمند'],
    images: gallery([
      '1545324418-cc1a3fa10c00',
      '1502672260266-1c1ef2d93688',
      '1628012209120-d9db7abf7eab',
      '1600596542815-ffad4c1539a9',
    ]),
    featured: false,
    agent: agentSophia,
  },
];

// ─── Services ─────────────────────────────────────────────
export interface Service {
  title: string;
  description: string;
  number: string;
}

export const services: Service[] = [
  {
    number: '۰۱',
    title: 'فروش خانه لوکس',
    description:
      'نمایندگی تخصصی برای املاک متمایز، پیوند فروشندگان آگاه با خریداران واجد شرایط از طریق بازاریابی هدفمند و دسترسی جهانی.',
  },
  {
    number: '۰۲',
    title: 'سرمایه‌گذاری ملک',
    description:
      'مشاوره سرمایه‌گذاری راهبردی با هوش بازار عمیق، شناسایی فرصت‌های رشد بالا و حداکثرسازی ارزش بلندمدت پرتفوی.',
  },
  {
    number: '۰۳',
    title: 'بازاریابی ملک',
    description:
      'داستان‌سرایی بصری برنده جایزه — عکاسی سینمایی، فیلم و مطالب سطح تحریری که هر ملک را به عنوان یک عرضه منحصر به فرد معرفی می‌کند.',
  },
  {
    number: '۰۴',
    title: 'مشاوره املاک',
    description:
      'راهنمایی محرمانه در هر مرحله از تحصیل و واگذاری، با تمرکز بر صداقت، رازداری و نتایج مشتری.',
  },
  {
    number: '۰۵',
    title: 'ارزیابی ملک',
    description:
      'ارزیابی‌های دقیق و قابل دفاع مبتنی بر داده قابل مقایسه، تحلیل ساخت و درک عمیق پویایی‌های میکرو-بازار.',
  },
  {
    number: '۰۶',
    title: 'خدمات نقل مکان',
    description:
      'پشتیبانی نقل مکان سرتاسری — از کشف محله و جایابی مدرسه تا آمادگی ورود، اطمینان از انتقال بی‌وقفه.',
  },
];

// ─── Team ──────────────────────────────────────────────────
export interface TeamMember {
  name: string;
  role: string;
  image: string;
  email: string;
  phone: string;
}

export const team: TeamMember[] = [
  {
    name: 'دنیل مورگان',
    role: 'مدیرعامل',
    image: img('1507003211169-0a1dd7228f2d', 500, 600),
    email: 'daniel@horizonproperties.com',
    phone: '(555) 246-7890',
  },
  {
    name: 'اولیویا کارتر',
    role: 'مشاور املاک لوکس',
    image: img('1438761681033-6461ffad8d80', 500, 600),
    email: 'olivia@horizonproperties.com',
    phone: '(555) 246-7891',
  },
  {
    name: 'جیمز ویلسون',
    role: 'مشاور سرمایه‌گذاری',
    image: img('1500648767791-00dcc994a43e', 500, 600),
    email: 'james@horizonproperties.com',
    phone: '(555) 246-7892',
  },
  {
    name: 'سوفیا بنت',
    role: 'متخصص ارشد املاک',
    image: img('1524504388940-b1c1722653e1', 500, 600),
    email: 'sophia@horizonproperties.com',
    phone: '(555) 246-7893',
  },
];

// ─── Why Choose ────────────────────────────────────────────
export interface Reason {
  title: string;
  description: string;
  number: string;
}

export const reasons: Reason[] = [
  {
    number: '۰۱',
    title: 'تخصص معتبر',
    description:
      'بیش از دو دهه تجربه در املاک لوکس، با سابقه موفق تراکنش‌ها در بازارهای برتر.',
  },
  {
    number: '۰۲',
    title: 'شبکه جهانی',
    description:
      'شبکه متصل خریداران، فروشندگان و شرکا در سراسر قاره‌ها، که به ملک شما بازخورد بی‌نظیری می‌دهد.',
  },
  {
    number: '۰۳',
    title: 'رازداری و صداقت',
    description:
      'هر تراکنش با نهایت محرمانگی و شفافیت انجام می‌شود، اعتمادی که فراتر از فروش دوام می‌آورد.',
  },
  {
    number: '۰۴',
    title: 'بینش مبتنی بر داده',
    description:
      'تصمیمات سرمایه‌گذاری پشتیبانی شده با تحلیل دقیق بازار، داده‌های قابل مقایسه و هوش روند آینده‌نگر.',
  },
];

// ─── Stats ─────────────────────────────────────────────────
export const stats = [
  { value: '۷۵۰+', label: 'ملک فروخته شده' },
  { value: '۴.۲ میلیارد $', label: 'حجم کل فروش' },
  { value: '۲۵', label: 'سال تجربه' },
  { value: '۹۸٪', label: 'رضایت مشتری' },
];

// ─── Helpers ───────────────────────────────────────────────
export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured);
}

export function getSimilarProperties(property: Property, count = 3): Property[] {
  return properties
    .filter((p) => p.id !== property.id)
    .sort((a, b) => {
      const scoreA = (a.state === property.state ? 1 : 0) + (a.type === property.type ? 1 : 0);
      const scoreB = (b.state === property.state ? 1 : 0) + (b.type === property.type ? 1 : 0);
      return scoreB - scoreA;
    })
    .slice(0, count);
}

export const propertyTypes = ['ویلا', 'خانه', 'ملک', 'اقامتگاه', 'پنت‌هاوس', 'آپارتمان'] as const;
export const locations = ['آستین، تگزاس', 'مالیبو، کالیفرنیا', 'اسکاتس‌دیل، آریزونا', 'میامی، فلوریدا', 'لس‌آنجلس، کالیفرنیا', 'بورلی هیلز، کالیفرنیا', 'لیک تاهو، نوادا'];
