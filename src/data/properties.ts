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
  type: 'Villa' | 'House' | 'Estate' | 'Residence' | 'Penthouse' | 'Apartment';
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
  name: 'Daniel Morgan',
  role: 'Managing Director',
  phone: '(555) 246-7890',
  email: 'daniel@horizonproperties.com',
  image: img('1507003211169-0a1dd7228f2d', 400, 400),
};

const agentOlivia: Agent = {
  name: 'Olivia Carter',
  role: 'Luxury Property Advisor',
  phone: '(555) 246-7891',
  email: 'olivia@horizonproperties.com',
  image: img('1438761681033-6461ffad8d80', 400, 400),
};

const agentJames: Agent = {
  name: 'James Wilson',
  role: 'Investment Consultant',
  phone: '(555) 246-7892',
  email: 'james@horizonproperties.com',
  image: img('1500648767791-00dcc994a43e', 400, 400),
};

const agentSophia: Agent = {
  name: 'Sophia Bennett',
  role: 'Senior Property Specialist',
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
    name: 'Lakeside Modern Villa',
    location: 'Austin, Texas, USA',
    city: 'Austin',
    state: 'Texas',
    country: 'USA',
    price: 2_350_000,
    type: 'Villa',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 6200,
    lotSize: '0.8 acres',
    yearBuilt: 2021,
    description:
      'A stunning architectural masterpiece set on the shores of Lake Austin. This villa features floor-to-ceiling glass walls that dissolve the boundary between interior and landscape, a resort-style infinity pool, and meticulously designed living spaces that embody the pinnacle of modern luxury living.',
    features: [
      'Floor-to-ceiling glass walls',
      'Infinity pool with lake views',
      'Smart home automation',
      'Chef\'s kitchen with Wolf appliances',
      'Primary suite with private terrace',
      'Wine cellar',
      'Home theater',
      'Three-car garage',
    ],
    amenities: ['Pool', 'Smart Home', 'Wine Cellar', 'Home Theater', 'Garage', 'Gym'],
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
    name: 'Pacific Glass House',
    location: 'Malibu, California, USA',
    city: 'Malibu',
    state: 'California',
    country: 'USA',
    price: 4_800_000,
    type: 'House',
    bedrooms: 6,
    bathrooms: 5,
    sqft: 8400,
    lotSize: '1.2 acres',
    yearBuilt: 2022,
    description:
      'Perched on the Malibu coastline, this architectural gem offers uninterrupted Pacific Ocean views through its transparent glass facade. The design seamlessly integrates indoor and outdoor living with expansive terraces, a vanishing-edge pool, and interiors curated with the finest materials.',
    features: [
      'Panoramic ocean views',
      'Vanishing-edge pool',
      'Glass-enclosed living pavilion',
      'Outdoor kitchen and dining',
      'Private beach access',
      'Solar power system',
      'Spa and wellness center',
    ],
    amenities: ['Ocean View', 'Pool', 'Spa', 'Solar Power', 'Beach Access', 'Outdoor Kitchen'],
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
    name: 'Desert Horizon Estate',
    location: 'Scottsdale, Arizona, USA',
    city: 'Scottsdale',
    state: 'Arizona',
    country: 'USA',
    price: 3_150_000,
    type: 'Estate',
    bedrooms: 4,
    bathrooms: 4,
    sqft: 5500,
    lotSize: '2.5 acres',
    yearBuilt: 2020,
    description:
      'A serene desert retreat that harmonizes with its natural surroundings. Clean lines, warm stone, and rammed-earth walls create a sophisticated sanctuary. The estate features a reflection pool, shaded courtyards, and panoramic views of the McDowell Mountains.',
    features: [
      'Rammed-earth and stone walls',
      'Reflection pool',
      'Shaded courtyard living',
      'Mountain views',
      'Native desert landscaping',
      'Detached guest casita',
    ],
    amenities: ['Pool', 'Mountain View', 'Guest House', 'Courtyard', 'Garage'],
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
    name: 'Oceanfront Residence',
    location: 'Miami, Florida, USA',
    city: 'Miami',
    state: 'Florida',
    country: 'USA',
    price: 5_200_000,
    type: 'Residence',
    bedrooms: 5,
    bathrooms: 6,
    sqft: 7200,
    lotSize: '0.5 acres',
    yearBuilt: 2023,
    description:
      'An iconic oceanfront residence defining modern coastal luxury. With 200 feet of private waterfront, a rooftop terrace, and interiors by an award-winning designer, this home is a statement of refined tropical living at its finest.',
    features: [
      '200 ft of private waterfront',
      'Rooftop terrace with ocean views',
      'Infinity-edge pool',
      'Private dock',
      'Hurricane-rated glass',
      'Summer kitchen',
    ],
    amenities: ['Ocean View', 'Pool', 'Dock', 'Rooftop Terrace', 'Garage', 'Gym'],
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
    name: 'Modern Hillside Retreat',
    location: 'Los Angeles, California, USA',
    city: 'Los Angeles',
    state: 'California',
    country: 'USA',
    price: 3_750_000,
    type: 'House',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 4800,
    lotSize: '0.6 acres',
    yearBuilt: 2021,
    description:
      'A sculptural hillside home offering breathtaking views of the Los Angeles basin. Cantilevered terraces, a zero-edge pool, and a material palette of steel, glass, and warm wood create a residence that is both bold and intimately connected to its landscape.',
    features: [
      'Cantilevered terraces',
      'Zero-edge pool',
      'City and ocean views',
      'Open-plan living',
      'Floating staircase',
      'EV charging station',
    ],
    amenities: ['Pool', 'City View', 'Garage', 'EV Charging', 'Smart Home'],
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
    name: 'Palm Garden Residence',
    location: 'Beverly Hills, California, USA',
    city: 'Beverly Hills',
    state: 'California',
    country: 'USA',
    price: 6_400_000,
    type: 'Estate',
    bedrooms: 7,
    bathrooms: 8,
    sqft: 11000,
    lotSize: '1.5 acres',
    yearBuilt: 2022,
    description:
      'A grand estate in the heart of Beverly Hills, enveloped by mature palms and manicured gardens. The residence features a double-height entry, a film-grade kitchen, an Olympic-length pool, and a separate wellness pavilion with sauna and steam rooms.',
    features: [
      'Double-height grand entry',
      'Olympic-length pool',
      'Wellness pavilion',
      'Formal gardens with palms',
      'Motor court with fountain',
      'Staff quarters',
    ],
    amenities: ['Pool', 'Gym', 'Spa', 'Garden', 'Staff Quarters', 'Garage', 'Smart Home'],
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
    name: 'Contemporary Lake House',
    location: 'Lake Tahoe, Nevada, USA',
    city: 'Lake Tahoe',
    state: 'Nevada',
    country: 'USA',
    price: 2_950_000,
    type: 'House',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 4200,
    lotSize: '0.4 acres',
    yearBuilt: 2019,
    description:
      'A warm modern lake house wrapped in cedar and stone, offering direct lake access and panoramic water views. The design balances rustic warmth with clean modernism, featuring a stone fireplace, a lakeside deck, and a hot tub under the pines.',
    features: [
      'Direct lake access',
      'Private dock',
      'Stone fireplace',
      'Lakeside deck',
      'Hot tub',
      'Cedar and stone exterior',
    ],
    amenities: ['Lake View', 'Dock', 'Hot Tub', 'Fireplace', 'Garage'],
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
    name: 'Architectural Downtown Penthouse',
    location: 'Austin, Texas, USA',
    city: 'Austin',
    state: 'Texas',
    country: 'USA',
    price: 1_850_000,
    type: 'Penthouse',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 3200,
    yearBuilt: 2023,
    description:
      'A full-floor penthouse in downtown Austin with 360-degree skyline views. The interior features polished concrete, custom millwork, and a wrap-around terrace. Building amenities include a rooftop pool, fitness center, and 24-hour concierge.',
    features: [
      '360-degree skyline views',
      'Wrap-around terrace',
      'Polished concrete floors',
      'Custom Italian millwork',
      'Gourmet chef\'s kitchen',
      'Building rooftop pool',
    ],
    amenities: ['City View', 'Pool', 'Gym', 'Concierge', 'Terrace', 'Smart Home'],
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
    number: '01',
    title: 'Luxury Home Sales',
    description:
      'Curated representation for distinguished properties, connecting discerning sellers with qualified buyers through targeted marketing and global reach.',
  },
  {
    number: '02',
    title: 'Property Investment',
    description:
      'Strategic investment advisory backed by deep market intelligence, identifying high-growth opportunities and maximizing long-term portfolio value.',
  },
  {
    number: '03',
    title: 'Property Marketing',
    description:
      'Award-winning visual storytelling — cinematic photography, film, and editorial-grade materials that position each property as a singular offering.',
  },
  {
    number: '04',
    title: 'Real Estate Advisory',
    description:
      'Confidential guidance through every stage of acquisition and disposition, with a focus on integrity, discretion, and client outcomes.',
  },
  {
    number: '05',
    title: 'Property Valuation',
    description:
      'Precise, defensible valuations grounded in comparable data, construction analysis, and an intimate understanding of micro-market dynamics.',
  },
  {
    number: '06',
    title: 'Relocation Services',
    description:
      'End-to-end relocation support — from neighborhood discovery and school placement to move-in readiness, ensuring a seamless transition.',
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
    name: 'Daniel Morgan',
    role: 'Managing Director',
    image: img('1507003211169-0a1dd7228f2d', 500, 600),
    email: 'daniel@horizonproperties.com',
    phone: '(555) 246-7890',
  },
  {
    name: 'Olivia Carter',
    role: 'Luxury Property Advisor',
    image: img('1438761681033-6461ffad8d80', 500, 600),
    email: 'olivia@horizonproperties.com',
    phone: '(555) 246-7891',
  },
  {
    name: 'James Wilson',
    role: 'Investment Consultant',
    image: img('1500648767791-00dcc994a43e', 500, 600),
    email: 'james@horizonproperties.com',
    phone: '(555) 246-7892',
  },
  {
    name: 'Sophia Bennett',
    role: 'Senior Property Specialist',
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
    number: '01',
    title: 'Trusted Expertise',
    description:
      'Over two decades of experience in luxury real estate, with a track record of successful transactions across prime markets.',
  },
  {
    number: '02',
    title: 'Global Network',
    description:
      'A connected network of buyers, sellers, and partners across continents, giving your property unparalleled exposure.',
  },
  {
    number: '03',
    title: 'Discretion & Integrity',
    description:
      'Every transaction is handled with the utmost confidentiality and transparency, building trust that lasts beyond the sale.',
  },
  {
    number: '04',
    title: 'Data-Driven Insights',
    description:
      'Investment decisions backed by rigorous market analysis, comparable data, and forward-looking trend intelligence.',
  },
];

// ─── Stats ─────────────────────────────────────────────────
export const stats = [
  { value: '750+', label: 'Properties Sold' },
  { value: '$4.2B', label: 'Total Sales Volume' },
  { value: '25', label: 'Years of Excellence' },
  { value: '98%', label: 'Client Satisfaction' },
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

export const propertyTypes = ['Villa', 'House', 'Estate', 'Residence', 'Penthouse', 'Apartment'] as const;
export const locations = ['Austin, Texas', 'Malibu, California', 'Scottsdale, Arizona', 'Miami, Florida', 'Los Angeles, California', 'Beverly Hills, California', 'Lake Tahoe, Nevada'];
