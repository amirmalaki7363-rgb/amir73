import { useCart } from '../context/CartContext';

interface Props {
  id: string;
  alt: string;
  category: string;
}

/* Each product gets a bespoke SVG illustration matching its type.
   Colors and style follow the dark luxury aesthetic. */

export function ProductImage({ id, alt, category }: Props) {
  const key = id || category;

  const illustrations: Record<string, JSX.Element> = {
    // CONSOLES
    'ps5-gold': <PS5Console variant="gold" />,
    'ps5-slim': <PS5Console variant="slim" />,
    'xbox-sx': <XboxConsole />,
    'switch-oled': <SwitchConsole />,

    // CONTROLLERS
    'dualsense-edge': <Controller color="white" accent="#D4AF5A" />,
    'scuf-reflex': <Controller color="#1a1a1a" accent="#00D9FF" />,
    'dualsense-black': <Controller color="#0a0a0a" accent="#D4AF5A" />,
    'xbox-elite': <XboxController />,

    // DISCS
    'gow-ragnarok': <GameDisc color1="#3a2a1a" color2="#8B4513" title="GOW" accent="#D4AF5A" />,
    'spider-man-2': <GameDisc color1="#0a1a2a" color2="#1a3a5a" title="SM2" accent="#00D9FF" />,
    'tlou2': <GameDisc color1="#1a2a1a" color2="#2a4a2a" title="TLOU" accent="#D4AF5A" />,
    'fc25': <GameDisc color1="#0a1a2a" color2="#0a3a5a" title="FC25" accent="#00D9FF" />,
    'ghost-tsushima': <GameDisc color1="#2a1a0a" color2="#5a3a1a" title="GOT" accent="#D4AF5A" />,
    'gtav': <GameDisc color1="#1a1a2a" color2="#3a3a5a" title="GTA" accent="#D4AF5A" />,

    // ACCOUNTS
    'psn-plus': <AccountCard color="#003791" accent="#0070D1" label="PS+" icon="ps" />,
    'xbox-gp': <AccountCard color="#107C10" accent="#2EB04A" label="GP" icon="xbox" />,
    'psn-extra': <AccountCard color="#1a1a3a" accent="#5C2D91" label="PS+" icon="ps" />,
    'psn-deluxe': <AccountCard color="#2a1a3a" accent="#D4AF5A" label="PS+" icon="ps" />,

    // FIGURES
    'kratos': <FigureFigure color1="#3a2a1a" color2="#8B4513" title="KRATOS" />,
    'spiderman-fig': <FigureFigure color1="#1a0a2a" color2="#5a1a3a" title="SPIDEY" />,
    'leon-kennedy': <FigureFigure color1="#1a2a1a" color2="#2a5a3a" title="LEON" />,
    'jin-sakai': <FigureFigure color1="#2a1a0a" color2="#5a3a1a" title="JIN" />,
    'dante': <FigureFigure color1="#2a0a0a" color2="#5a1a1a" title="DANTE" />,
    'ellie': <FigureFigure color1="#1a1a2a" color2="#2a3a4a" title="ELLIE" />,

    // ACCESSORIES
    'gaming-headset': <HeadsetIcon />,
    'charging-station': <ChargingStation />,
    'gaming-keyboard': <KeyboardIcon />,
    'gaming-mouse': <MouseIcon />,
    'controller-dock': <ControllerDock />,
    'gaming-stand': <StandIcon />,
  };

  return (
    <div className="product-img-wrap" role="img" aria-label={alt}>
      {illustrations[key] || <GenericProduct />}
    </div>
  );
}

/* === CONSOLES === */
function PS5Console({ variant }: { variant: 'gold' | 'slim' }) {
  const bodyColor = variant === 'gold' ? '#1a1a1a' : '#151515';
  const accent = variant === 'gold' ? '#D4AF5A' : '#D4AF5A';
  return (
    <svg viewBox="0 0 200 200" className="product-svg" aria-hidden="true">
      <defs>
        <linearGradient id={`pg-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2a2a" />
          <stop offset="1" stopColor={bodyColor} />
        </linearGradient>
        <filter id={`glow-${variant}`}>
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      {/* Console body - vertical */}
      <rect x="70" y="40" width="60" height="110" rx="4" fill={`url(#pg-${variant})`} stroke={accent} strokeWidth="0.5" />
      <rect x="78" y="48" width="44" height="6" rx="2" fill={accent} opacity="0.3" />
      <rect x="78" y="58" width="44" height="2" rx="1" fill="#333" />
      <rect x="78" y="64" width="44" height="2" rx="1" fill="#333" />
      <rect x="78" y="70" width="44" height="2" rx="1" fill="#333" />
      {/* Blue LED line */}
      <rect x="74" y="82" width="52" height="3" rx="1.5" fill="#00D9FF" opacity="0.6" filter={`url(#glow-${variant})`} />
      <rect x="74" y="82" width="52" height="3" rx="1.5" fill="#00D9FF" />
      {/* Base */}
      <ellipse cx="100" cy="155" rx="45" ry="8" fill="#0a0a0a" />
      <ellipse cx="100" cy="153" rx="40" ry="6" fill="#1a1a1a" />
      {/* Glow under */}
      <ellipse cx="100" cy="160" rx="50" ry="6" fill={accent} opacity="0.06" filter={`url(#glow-${variant})`} />
      <ellipse cx="100" cy="160" rx="35" ry="4" fill="#00D9FF" opacity="0.08" filter={`url(#glow-${variant})`} />
    </svg>
  );
}

function XboxConsole() {
  return (
    <svg viewBox="0 0 200 200" className="product-svg" aria-hidden="true">
      <defs>
        <linearGradient id="xbx-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1a1a" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>
      <rect x="55" y="55" width="90" height="90" rx="8" fill="url(#xbx-grad)" stroke="#333" strokeWidth="0.5" />
      {/* Top vent */}
      <circle cx="100" cy="70" r="5" fill="#222" />
      <circle cx="100" cy="70" r="3" fill="#107C10" opacity="0.6" />
      <rect x="68" y="80" width="64" height="1.5" fill="#333" />
      <rect x="68" y="84" width="64" height="1.5" fill="#333" />
      {/* Logo - stylized */}
      <circle cx="100" cy="115" r="18" fill="none" stroke="#107C10" strokeWidth="1.5" opacity="0.5" />
      <path d="M88 105 Q100 100 112 105 Q100 115 100 125 Q100 115 88 125 Q100 115 100 105" fill="none" stroke="#2EB04A" strokeWidth="1" opacity="0.7" />
      {/* Base */}
      <rect x="50" y="148" width="100" height="8" rx="2" fill="#0a0a0a" />
      <ellipse cx="100" cy="160" rx="50" ry="6" fill="#107C10" opacity="0.05" />
    </svg>
  );
}

function SwitchConsole() {
  return (
    <svg viewBox="0 0 200 200" className="product-svg" aria-hidden="true">
      <defs>
        <linearGradient id="sw-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1a1a1a" />
          <stop offset="0.5" stopColor="#111" />
          <stop offset="1" stopColor="#1a1a1a" />
        </linearGradient>
      </defs>
      {/* Left joy-con */}
      <rect x="35" y="50" width="35" height="100" rx="16" fill="#2a2a2a" />
      <circle cx="52" cy="80" r="6" fill="#444" />
      {/* Screen */}
      <rect x="68" y="50" width="64" height="100" rx="2" fill="#000" stroke="#333" strokeWidth="0.5" />
      <rect x="72" y="54" width="56" height="92" rx="1" fill="#0a0a0a" />
      <rect x="72" y="54" width="56" height="92" rx="1" fill="#00D9FF" opacity="0.04" />
      {/* Right joy-con */}
      <rect x="130" y="50" width="35" height="100" rx="16" fill="#2a2a2a" />
      <circle cx="147" cy="70" r="4" fill="#444" />
      <circle cx="147" cy="90" r="4" fill="#444" />
      <circle cx="140" cy="105" r="4" fill="#444" />
      <circle cx="154" cy="115" r="4" fill="#444" />
      {/* Glow */}
      <ellipse cx="100" cy="160" rx="55" ry="5" fill="#D4AF5A" opacity="0.04" />
    </svg>
  );
}

/* === CONTROLLERS === */
function Controller({ color, accent }: { color: string; accent: string }) {
  return (
    <svg viewBox="0 0 200 200" className="product-svg" aria-hidden="true">
      <defs>
        <radialGradient id={`ctrl-${color}`} cx="0.5" cy="0.4">
          <stop offset="0" stopColor={color === '#0a0a0a' || color === '#1a1a1a' ? '#3a3a3a' : '#f5f5f5'} />
          <stop offset="1" stopColor={color} />
        </radialGradient>
      </defs>
      {/* Body */}
      <path d="M50 80 Q50 55 75 55 L125 55 Q150 55 150 80 L150 110 Q150 140 130 140 Q115 140 110 125 L90 125 Q85 140 70 140 Q50 140 50 110 Z" fill={`url(#ctrl-${color})`} stroke={accent} strokeWidth="0.5" />
      {/* Touchpad */}
      <rect x="70" y="62" width="60" height="18" rx="8" fill={color === '#0a0a0a' || color === '#1a1a1a' ? '#222' : '#e8e8e8'} opacity="0.5" />
      {/* Left stick */}
      <circle cx="65" cy="100" r="10" fill="#1a1a1a" />
      <circle cx="65" cy="100" r="7" fill="#333" />
      {/* Right stick */}
      <circle cx="120" cy="110" r="10" fill="#1a1a1a" />
      <circle cx="120" cy="110" r="7" fill="#333" />
      {/* D-pad */}
      <circle cx="92" cy="108" r="8" fill={accent} opacity="0.3" />
      <rect x="89" y="103" width="6" height="2" fill={accent} />
      <rect x="89" y="111" width="6" height="2" fill={accent} />
      {/* Buttons */}
      <circle cx="135" cy="85" r="4" fill="#444" />
      <circle cx="135" cy="85" r="2" fill={accent} opacity="0.5" />
      <circle cx="125" cy="95" r="4" fill="#444" />
      <circle cx="125" cy="95" r="2" fill="#cc4444" opacity="0.5" />
      <circle cx="145" cy="95" r="4" fill="#444" />
      <circle cx="145" cy="95" r="2" fill="#44cc44" opacity="0.5" />
      <circle cx="135" cy="105" r="4" fill="#444" />
      <circle cx="135" cy="105" r="2" fill="#4488ff" opacity="0.5" />
      {/* Center light */}
      <rect x="88" y="73" width="24" height="2" rx="1" fill={accent} opacity="0.6" />
      {/* Glow */}
      <ellipse cx="100" cy="155" rx="55" ry="5" fill={accent} opacity="0.05" />
    </svg>
  );
}

function XboxController() {
  return (
    <svg viewBox="0 0 200 200" className="product-svg" aria-hidden="true">
      <defs>
        <radialGradient id="xb-ctrl" cx="0.5" cy="0.4">
          <stop offset="0" stopColor="#2a2a2a" />
          <stop offset="1" stopColor="#0a0a0a" />
        </radialGradient>
      </defs>
      <path d="M45 85 Q45 58 70 58 L130 58 Q155 58 155 85 L155 115 Q155 142 135 142 Q120 142 115 128 L85 128 Q80 142 65 142 Q45 142 45 115 Z" fill="url(#xb-ctrl)" stroke="#333" strokeWidth="0.5" />
      <circle cx="65" cy="100" r="11" fill="#1a1a1a" />
      <circle cx="65" cy="100" r="8" fill="#333" />
      <circle cx="125" cy="100" r="11" fill="#1a1a1a" />
      <circle cx="125" cy="100" r="8" fill="#333" />
      {/* D-pad */}
      <rect x="88" y="108" width="24" height="6" rx="1" fill="#222" />
      <rect x="97" y="99" width="6" height="24" rx="1" fill="#222" />
      {/* Xbox button */}
      <circle cx="100" cy="72" r="6" fill="#107C10" opacity="0.6" />
      <circle cx="100" cy="72" r="4" fill="#2EB04A" opacity="0.4" />
      {/* ABXY */}
      <circle cx="140" cy="82" r="4" fill="#444" />
      <circle cx="140" cy="82" r="2" fill="#FFD700" opacity="0.5" />
      <circle cx="148" cy="90" r="4" fill="#444" />
      <circle cx="148" cy="90" r="2" fill="#FF4444" opacity="0.5" />
      <circle cx="148" cy="106" r="4" fill="#444" />
      <circle cx="148" cy="106" r="2" fill="#44AAFF" opacity="0.5" />
      <circle cx="140" cy="114" r="4" fill="#444" />
      <circle cx="140" cy="114" r="2" fill="#44FF44" opacity="0.5" />
      <ellipse cx="100" cy="160" rx="55" ry="5" fill="#D4AF5A" opacity="0.04" />
    </svg>
  );
}

/* === GAME DISCS === */
function GameDisc({ color1, color2, title, accent }: { color1: string; color2: string; title: string; accent: string }) {
  return (
    <svg viewBox="0 0 200 200" className="product-svg" aria-hidden="true">
      <defs>
        <linearGradient id={`disc-${title}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color1} />
          <stop offset="1" stopColor={color2} />
        </linearGradient>
        <radialGradient id={`disc-shine-${title}`} cx="0.3" cy="0.3">
          <stop offset="0" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
      </defs>
      {/* Case */}
      <rect x="50" y="30" width="100" height="140" rx="4" fill={`url(#disc-${title})`} stroke={accent} strokeWidth="0.5" />
      <rect x="50" y="30" width="100" height="140" rx="4" fill={`url(#disc-shine-${title})`} />
      {/* Title area */}
      <rect x="60" y="45" width="80" height="50" rx="3" fill="rgba(0,0,0,0.3)" />
      <text x="100" y="75" textAnchor="middle" fill={accent} fontSize="16" fontWeight="bold" fontFamily="sans-serif">{title}</text>
      {/* Disc */}
      <circle cx="100" cy="130" r="22" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" />
      <circle cx="100" cy="130" r="18" fill="rgba(0,0,0,0.3)" stroke={accent} strokeWidth="0.5" />
      <circle cx="100" cy="130" r="6" fill={accent} opacity="0.2" />
      {/* Bottom strip */}
      <rect x="60" y="155" width="80" height="8" rx="1" fill="rgba(0,0,0,0.3)" />
      <ellipse cx="100" cy="175" rx="45" ry="3" fill={accent} opacity="0.05" />
    </svg>
  );
}

/* === ACCOUNTS === */
function AccountCard({ color, accent, label, icon }: { color: string; accent: string; label: string; icon: string }) {
  return (
    <svg viewBox="0 0 200 200" className="product-svg" aria-hidden="true">
      <defs>
        <linearGradient id={`acc-${label}-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>
      <rect x="45" y="35" width="110" height="130" rx="12" fill={`url(#acc-${label}-${color})`} stroke={accent} strokeWidth="0.5" />
      {/* Icon circle */}
      <circle cx="100" cy="80" r="28" fill="rgba(255,255,255,0.05)" stroke={accent} strokeWidth="1" />
      {icon === 'ps' ? (
        <path d="M85 72 Q90 68 100 70 Q108 72 108 78 Q108 84 98 86 L92 88 L92 98 L88 99 L88 72 Z M92 88 L98 86 Q102 84 102 80 Q102 76 96 75 L92 76 Z" fill={accent} opacity="0.8" />
      ) : (
        <circle cx="100" cy="80" r="16" fill="none" stroke={accent} strokeWidth="2" opacity="0.7" />
      )}
      {/* Label */}
      <text x="100" y="130" textAnchor="middle" fill={accent} fontSize="14" fontWeight="bold" fontFamily="sans-serif" opacity="0.8">{label}</text>
      {/* Duration */}
      <rect x="75" y="140" width="50" height="14" rx="7" fill="rgba(255,255,255,0.08)" />
      <text x="100" y="150" textAnchor="middle" fill="#F5F5F5" fontSize="9" fontFamily="sans-serif" opacity="0.6">۱۲ ماه</text>
      <ellipse cx="100" cy="170" rx="50" ry="3" fill={accent} opacity="0.05" />
    </svg>
  );
}

/* === FIGURES === */
function FigureFigure({ color1, color2, title }: { color1: string; color2: string; title: string }) {
  return (
    <svg viewBox="0 0 200 200" className="product-svg" aria-hidden="true">
      <defs>
        <linearGradient id={`fig-${title}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color2} />
          <stop offset="1" stopColor={color1} />
        </linearGradient>
        <radialGradient id={`fig-glow-${title}`} cx="0.5" cy="0.3">
          <stop offset="0" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="165" rx="40" ry="6" fill="#0a0a0a" />
      {/* Stylized figure silhouette */}
      {/* Head */}
      <circle cx="100" cy="50" r="14" fill={`url(#fig-${title})`} />
      {/* Body */}
      <path d="M88 62 L85 90 L78 130 L82 155 L88 155 L92 130 L100 100 L108 130 L112 155 L118 155 L122 130 L115 90 L112 62 Z" fill={`url(#fig-${title})`} />
      {/* Arms */}
      <path d="M86 68 L72 95 L70 110 L74 110 L80 95 L88 75 Z" fill={`url(#fig-${title})`} />
      <path d="M114 68 L128 95 L130 110 L126 110 L120 95 L112 75 Z" fill={`url(#fig-${title})`} />
      {/* Cape */}
      <path d="M88 65 Q70 80 65 120 Q70 110 88 100 Z" fill={color1} opacity="0.7" />
      <path d="M112 65 Q130 80 135 120 Q130 110 112 100 Z" fill={color1} opacity="0.7" />
      {/* Shine overlay */}
      <ellipse cx="95" cy="55" rx="30" ry="60" fill={`url(#fig-glow-${title})`} />
      {/* Base */}
      <ellipse cx="100" cy="158" rx="22" ry="5" fill={color2} opacity="0.5" />
      <ellipse cx="100" cy="160" rx="50" ry="4" fill={color2} opacity="0.06" />
    </svg>
  );
}

/* === ACCESSORIES === */
function HeadsetIcon() {
  return (
    <svg viewBox="0 0 200 200" className="product-svg" aria-hidden="true">
      <defs>
        <linearGradient id="hs-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2a2a" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>
      {/* Headband */}
      <path d="M55 100 Q55 50 100 50 Q145 50 145 100" fill="none" stroke="url(#hs-grad)" strokeWidth="6" strokeLinecap="round" />
      {/* Left cup */}
      <rect x="48" y="95" width="28" height="40" rx="10" fill="url(#hs-grad)" stroke="#D4AF5A" strokeWidth="0.5" />
      <circle cx="62" cy="115" r="8" fill="#1a1a1a" />
      <circle cx="62" cy="115" r="5" fill="#D4AF5A" opacity="0.3" />
      {/* Right cup */}
      <rect x="124" y="95" width="28" height="40" rx="10" fill="url(#hs-grad)" stroke="#D4AF5A" strokeWidth="0.5" />
      <circle cx="138" cy="115" r="8" fill="#1a1a1a" />
      <circle cx="138" cy="115" r="5" fill="#D4AF5A" opacity="0.3" />
      {/* Mic */}
      <path d="M152 110 Q165 115 165 135" fill="none" stroke="#333" strokeWidth="2" />
      <circle cx="165" cy="135" r="4" fill="#1a1a1a" />
      <ellipse cx="100" cy="165" rx="50" ry="4" fill="#D4AF5A" opacity="0.04" />
    </svg>
  );
}

function ChargingStation() {
  return (
    <svg viewBox="0 0 200 200" className="product-svg" aria-hidden="true">
      <defs>
        <linearGradient id="cs-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1a1a" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>
      {/* Base */}
      <rect x="55" y="120" width="90" height="30" rx="6" fill="url(#cs-grad)" stroke="#333" strokeWidth="0.5" />
      {/* Slots */}
      <rect x="70" y="100" width="20" height="25" rx="3" fill="#111" />
      <rect x="110" y="100" width="20" height="25" rx="3" fill="#111" />
      {/* LED */}
      <rect x="73" y="103" width="14" height="2" rx="1" fill="#D4AF5A" opacity="0.6" />
      <rect x="113" y="103" width="14" height="2" rx="1" fill="#D4AF5A" opacity="0.6" />
      {/* Controllers in slots */}
      <path d="M68 80 Q68 65 80 65 L80 100 L68 100 Z" fill="#2a2a2a" stroke="#444" strokeWidth="0.5" />
      <path d="M108 80 Q108 65 120 65 L120 100 L108 100 Z" fill="#2a2a2a" stroke="#444" strokeWidth="0.5" />
      {/* USB */}
      <rect x="90" y="135" width="20" height="8" rx="2" fill="#333" />
      <ellipse cx="100" cy="165" rx="45" ry="3" fill="#D4AF5A" opacity="0.04" />
    </svg>
  );
}

function KeyboardIcon() {
  return (
    <svg viewBox="0 0 200 200" className="product-svg" aria-hidden="true">
      <defs>
        <linearGradient id="kb-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1a1a" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>
      <rect x="30" y="60" width="140" height="80" rx="8" fill="url(#kb-grad)" stroke="#333" strokeWidth="0.5" />
      {/* Keys */}
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={38 + col * 11}
            y={68 + row * 14}
            width="9"
            height="10"
            rx="2"
            fill="#222"
            stroke="#333"
            strokeWidth="0.3"
          />
        ))
      )}
      {/* RGB strip */}
      <rect x="30" y="135" width="140" height="3" rx="1.5" fill="#00D9FF" opacity="0.4" />
      <rect x="30" y="135" width="140" height="3" rx="1.5" fill="url(#kb-rainbow)" opacity="0.3" />
      <linearGradient id="kb-rainbow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#7B4DFF" />
        <stop offset="0.5" stopColor="#00D9FF" />
        <stop offset="1" stopColor="#D4AF5A" />
      </linearGradient>
      <ellipse cx="100" cy="160" rx="55" ry="3" fill="#D4AF5A" opacity="0.04" />
    </svg>
  );
}

function MouseIcon() {
  return (
    <svg viewBox="0 0 200 200" className="product-svg" aria-hidden="true">
      <defs>
        <linearGradient id="ms-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1a1a" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="100" rx="35" ry="55" fill="url(#ms-grad)" stroke="#333" strokeWidth="0.5" />
      {/* Left/Right split */}
      <line x1="100" y1="50" x2="100" y2="100" stroke="#333" strokeWidth="0.5" />
      {/* Scroll wheel */}
      <rect x="96" y="70" width="8" height="18" rx="4" fill="#222" />
      <rect x="97" y="72" width="6" height="14" rx="3" fill="#D4AF5A" opacity="0.5" />
      {/* RGB logo */}
      <circle cx="100" cy="120" r="10" fill="#00D9FF" opacity="0.1" />
      <circle cx="100" cy="120" r="5" fill="#00D9FF" opacity="0.2" />
      <ellipse cx="100" cy="162" rx="35" ry="3" fill="#D4AF5A" opacity="0.04" />
    </svg>
  );
}

function ControllerDock() {
  return (
    <svg viewBox="0 0 200 200" className="product-svg" aria-hidden="true">
      <rect x="65" y="110" width="70" height="35" rx="6" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" />
      <rect x="80" y="85" width="40" height="30" rx="4" fill="#111" />
      <path d="M85 70 Q85 55 100 55 Q115 55 115 70 L115 88 L85 88 Z" fill="#2a2a2a" stroke="#444" strokeWidth="0.5" />
      <rect x="93" y="75" width="14" height="2" rx="1" fill="#D4AF5A" opacity="0.5" />
      <rect x="85" y="120" width="30" height="4" rx="2" fill="#00D9FF" opacity="0.4" />
      <ellipse cx="100" cy="160" rx="40" ry="3" fill="#D4AF5A" opacity="0.04" />
    </svg>
  );
}

function StandIcon() {
  return (
    <svg viewBox="0 0 200 200" className="product-svg" aria-hidden="true">
      <defs>
        <linearGradient id="st-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2a2a" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>
      {/* Base */}
      <ellipse cx="100" cy="155" rx="45" ry="10" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" />
      {/* Vertical support */}
      <rect x="92" y="60" width="16" height="95" fill="url(#st-grad)" rx="2" />
      {/* Top clip */}
      <rect x="85" y="55" width="30" height="12" rx="3" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" />
      {/* Vent lines */}
      <line x1="95" y1="70" x2="95" y2="140" stroke="#333" strokeWidth="0.5" />
      <line x1="105" y1="70" x2="105" y2="140" stroke="#333" strokeWidth="0.5" />
      <ellipse cx="100" cy="170" rx="40" ry="3" fill="#D4AF5A" opacity="0.04" />
    </svg>
  );
}

function GenericProduct() {
  return (
    <svg viewBox="0 0 200 200" className="product-svg" aria-hidden="true">
      <rect x="60" y="60" width="80" height="80" rx="12" fill="#1a1a1a" stroke="#D4AF5A" strokeWidth="0.5" opacity="0.5" />
      <circle cx="100" cy="100" r="20" fill="#D4AF5A" opacity="0.1" />
    </svg>
  );
}
