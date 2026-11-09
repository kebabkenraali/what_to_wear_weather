'use strict';

// ---------- Vaatekuvat (yksinkertaiset SVG-piirrokset) ----------
const S = 'stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"';
const L = `fill="none" ${S}`;
const svg = (inner) => `<svg viewBox="0 0 64 64" aria-hidden="true">${inner}</svg>`;
const SLEEVES = 'M22 8 L8 16 L4 46 L12 48 L18 26 V56 H46 V26 L52 48 L60 46 L56 16 L42 8 C40 13 24 13 22 8Z';
const COAT = 'M24 6 L8 16 L4 48 L13 50 L18 28 V58 H46 V28 L51 50 L60 48 L56 16 L40 6 L32 14Z';
const BOOT = 'M18 8 H36 V34 L52 42 C56 44 58 48 58 52 H18Z';

const ICONS = {
  tshirt: svg(`<path d="M22 8 L8 16 L13 27 L19 24 V56 H45 V24 L51 27 L56 16 L42 8 C40 13 24 13 22 8Z" fill="#4fb6e8" ${S}/>`),
  longsleeve: svg(`<path d="${SLEEVES}" fill="#7bc47f" ${S}/>`),
  hoodie: svg(`<path d="${SLEEVES}" fill="#9a8cf0" ${S}/>
    <path d="M22 9 C22 0 42 0 42 9 C40 16 24 16 22 9Z" fill="#7d6ee0" ${S}/>
    <path d="M24 42 H40 L43 51 H21Z" fill="#7d6ee0" ${S}/>
    <path d="M29 14 V24 M35 14 V24" ${L}/>`),
  jacket: svg(`<path d="${COAT}" fill="#f0a646" ${S}/>
    <path d="M32 14 V58 M22 42 H28 M36 42 H42" ${L}/>`),
  wintercoat: svg(`<path d="${COAT}" fill="#3f6fd1" ${S}/>
    <path d="M32 14 V58 M18 34 H46 M18 46 H46" ${L}/>
    <path d="M21 9 C22 -1 42 -1 43 9" fill="none" stroke="#f3e9d8" stroke-width="6" stroke-linecap="round"/>
    <path d="M21 9 C22 -1 42 -1 43 9" fill="none" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="1 4" stroke-linecap="round"/>`),
  raincoat: svg(`<path d="${COAT}" fill="#f6d33c" ${S}/>
    <path d="M22 9 C22 -1 42 -1 42 9 L32 16Z" fill="#e9c11f" ${S}/>
    <path d="M32 16 V58" ${L}/>
    <circle cx="32" cy="26" r="1.6" fill="var(--ink)"/><circle cx="32" cy="36" r="1.6" fill="var(--ink)"/><circle cx="32" cy="46" r="1.6" fill="var(--ink)"/>`),
  shorts: svg(`<path d="M14 12 H50 L54 44 H36 L32 26 L28 44 H10Z" fill="#f08a5d" ${S}/><path d="M14 18 H50" ${L}/>`),
  trousers: svg(`<path d="M16 6 H48 L52 58 H37 L32 24 L27 58 H12Z" fill="#4a6fa5" ${S}/><path d="M16 12 H48" ${L}/>`),
  warmtrousers: svg(`<path d="M16 6 H48 L52 58 H37 L32 24 L27 58 H12Z" fill="#35507c" ${S}/>
    <path d="M16 12 H48 M15 26 H31 M33 26 H49 M14 40 H29 M35 40 H50" ${L}/>`),
  sneakers: svg(`<path d="M6 46 V30 C12 34 18 32 22 26 L40 38 C50 40 58 42 58 48 V50 H6Z" fill="#f3f5f8" ${S}/>
    <path d="M6 50 H58 V54 H6Z" fill="#e2574c" ${S}/><path d="M24 32 L28 28 M29 35 L33 31 M34 38 L38 34" ${L}/>`),
  sandals: svg(`<path d="M6 46 H58 V52 H6Z" fill="#b9814f" ${S}/>
    <path d="M14 46 C16 32 28 32 30 46 M38 46 C39 36 49 36 50 46" fill="none" stroke="#e2574c" stroke-width="5" stroke-linecap="round"/>`),
  rubberboots: svg(`<path d="${BOOT}" fill="#3fae6a" ${S}/><path d="M18 52 H58 V57 H18Z" fill="#2a7a49" ${S}/><path d="M18 14 H36" ${L}/>`),
  winterboots: svg(`<path d="${BOOT}" fill="#8a5a3c" ${S}/><path d="M18 52 H58 V57 H18Z" fill="#3b2a20" ${S}/>
    <rect x="15" y="5" width="24" height="9" rx="4" fill="#f3e9d8" ${S}/><path d="M36 26 L42 23 M36 32 L44 29" ${L}/>`),
  beanie: svg(`<circle cx="32" cy="11" r="6" fill="#f3f5f8" ${S}/><path d="M12 44 C12 12 52 12 52 44Z" fill="#e2574c" ${S}/>
    <rect x="9" y="41" width="46" height="12" rx="5" fill="#f3f5f8" ${S}/>`),
  mittens: svg(`<path d="M22 50 V30 C22 10 46 10 46 30 V50Z" fill="#e2574c" ${S}/>
    <path d="M22 40 C10 38 9 24 16 23 C20 23 22 27 22 32" fill="#e2574c" ${S}/>
    <rect x="19" y="48" width="30" height="10" rx="4" fill="#f3f5f8" ${S}/>`),
  scarf: svg(`<rect x="12" y="12" width="40" height="14" rx="7" fill="#2fa58b" ${S}/>
    <path d="M34 24 H48 V52 H34Z" fill="#2fa58b" ${S}/><path d="M34 44 H48 M38 52 V58 M44 52 V58" ${L}/>`),
  umbrella: svg(`<path d="M4 32 C4 2 60 2 60 32 C54 26 48 26 46 32 C42 26 36 26 32 32 C28 26 22 26 18 32 C16 26 10 26 4 32Z" fill="#e2574c" ${S}/>
    <path d="M32 32 V52 C32 60 22 60 22 52" ${L}/>`),
  sunglasses: svg(`<rect x="6" y="24" width="22" height="16" rx="7" fill="#2b3442" ${S}/><rect x="36" y="24" width="22" height="16" rx="7" fill="#2b3442" ${S}/>
    <path d="M28 29 C30 26 34 26 36 29 M6 28 L2 22 M58 28 L62 22" ${L}/>`),
  cap: svg(`<path d="M10 42 C10 12 46 12 46 42Z" fill="#2468d8" ${S}/><path d="M46 42 H62 C61 35 54 32 45 33" fill="#1b4fa8" ${S}/><circle cx="28" cy="19" r="2" fill="var(--ink)"/>`),
  sunscreen: svg(`<rect x="24" y="4" width="16" height="8" rx="2" fill="#f3f5f8" ${S}/><path d="M18 12 H46 L42 58 H22Z" fill="#f6b23c" ${S}/>
    <circle cx="32" cy="34" r="6" fill="#fff3c4" ${S}/><path d="M32 23 V25 M32 43 V45 M21 34 H23 M41 34 H43" ${L}/>`),
  windbreaker: svg(`<path d="${COAT}" fill="#35b5a6" ${S}/>
    <path d="M18 28 L46 40 V58 H18Z" fill="#1f8f83" ${S}/><path d="M32 14 V58" ${L}/>
    <path d="M22 9 C22 -1 42 -1 42 9" fill="none" ${S}/>`),
  rainpants: svg(`<path d="M16 12 H48 L52 58 H37 L32 28 L27 58 H12Z" fill="#f6d33c" ${S}/>
    <path d="M22 12 V3 M42 12 V3 M16 18 H48 M13 51 H27.5 M36.5 51 H51" ${L}/>`),
  gloves: svg(`<path d="M22 54 V18 a2.5 2.5 0 0 1 5 0 V12 a2.5 2.5 0 0 1 5 0 V14 a2.5 2.5 0 0 1 5 0 V20 a2.5 2.5 0 0 1 5 0 V54Z" fill="#4a6fa5" ${S}/>
    <path d="M22 42 C12 40 10 29 15 27 C19 26 22 30 22 35" fill="#4a6fa5" ${S}/>
    <path d="M27 18 V32 M32 14 V32 M37 20 V32" ${L}/>
    <rect x="19" y="50" width="26" height="9" rx="4" fill="#f3f5f8" ${S}/>`),
  earflap: svg(`<path d="M12 36 H23 V54 C23 60 12 60 12 54Z" fill="#8a5a3c" ${S}/><path d="M41 36 H52 V54 C52 60 41 60 41 54Z" fill="#8a5a3c" ${S}/>
    <path d="M14 36 C14 6 50 6 50 36Z" fill="#8a5a3c" ${S}/>
    <rect x="10" y="29" width="44" height="11" rx="5.5" fill="#f3e9d8" ${S}/>`),
  reflector: svg(`<path d="M32 2 V18" ${L}/>
    <path d="M8 22 l-5 -4 M56 22 l5 -4 M5 40 h-4 M59 40 h4 M10 56 l-4 4 M54 56 l4 4" fill="none" stroke="#f0a020" stroke-width="3" stroke-linecap="round"/>
    <circle cx="32" cy="38" r="20" fill="#eef24a" ${S}/>
    <path d="M32 22 V54 M16 38 H48 M21 27 L43 49 M43 27 L21 49" fill="none" stroke="var(--ink)" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="32" cy="38" r="6" fill="#ffffff" ${S}/>`),
  icegrips: svg(`<path d="M18 6 H36 V30 L52 38 C56 40 58 44 58 48 H18Z" fill="#aab4c0" ${S}/><path d="M18 48 H58 V53 H18Z" fill="#3b2a20" ${S}/>
    <path d="M18 40 Q38 34 57 45" fill="none" stroke="#e2574c" stroke-width="4" stroke-linecap="round"/>
    <path d="M21 53 l2.5 7 l2.5 -7 M31 53 l2.5 7 l2.5 -7 M41 53 l2.5 7 l2.5 -7 M51 53 l2.5 7 l2.5 -7" fill="#f3f5f8" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`),
  boots: svg(`<path d="M20 14 H36 V34 L52 42 C56 44 58 48 58 52 H20Z" fill="#a9713f" ${S}/><path d="M20 52 H58 V57 H20Z" fill="#3b2a20" ${S}/>
    <path d="M36 20 H30 M36 26 H30 M36 32 H30 M20 20 H24" ${L}/>`),
  sunhat: svg(`<ellipse cx="32" cy="42" rx="29" ry="10" fill="#f2d48a" ${S}/><path d="M17 41 C17 12 47 12 47 41 C40 45 24 45 17 41Z" fill="#f2d48a" ${S}/>
    <path d="M17.5 35 Q32 42 46.5 35" fill="none" stroke="#e2574c" stroke-width="4" stroke-linecap="round"/>`),
  waterbottle: svg(`<rect x="26" y="4" width="12" height="10" rx="2" fill="#2468d8" ${S}/><rect x="21" y="14" width="22" height="46" rx="7" fill="#e8f6ff" ${S}/>
    <path d="M22.5 30 H41.5 V53 a6 6 0 0 1 -6 6 H28.5 a6 6 0 0 1 -6 -6Z" fill="#6cc4f2"/><path d="M21 30 H43" ${L}/>`),
  mosquito: svg(`<rect x="24" y="8" width="10" height="10" rx="2" fill="#f3f5f8" ${S}/><rect x="17" y="18" width="24" height="42" rx="5" fill="#7bc47f" ${S}/>
    <circle cx="46" cy="9" r="1.8" fill="var(--ink)"/><circle cx="53" cy="5" r="1.8" fill="var(--ink)"/><circle cx="53" cy="13" r="1.8" fill="var(--ink)"/><circle cx="60" cy="9" r="1.8" fill="var(--ink)"/>
    <circle cx="29" cy="40" r="9" fill="#ffffff" stroke="#e2452f" stroke-width="2.5"/>
    <ellipse cx="29" cy="40" rx="2" ry="4.5" fill="var(--ink)"/><path d="M27 38 l-4 -3 M31 38 l4 -3" fill="none" stroke="var(--ink)" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M23 34 L35 46" stroke="#e2452f" stroke-width="2.5" stroke-linecap="round"/>`),
  woolsweater: svg(`<path d="${SLEEVES}" fill="#c0504d" ${S}/>
    <path d="M18 34 l3.5 -4 l3.5 4 l3.5 -4 l3.5 4 l3.5 -4 l3.5 4 l3.5 -4 l3.5 4" fill="none" stroke="#f3f5f8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19 41 H45" fill="none" stroke="#f3f5f8" stroke-width="2" stroke-dasharray="1 4" stroke-linecap="round"/>
    <path d="M18 51 H46 M5 41 L13 43 M59 41 L51 43" ${L}/>`),
  vest: svg(`<path d="M24 6 L15 14 V58 H49 V14 L40 6 L32 14Z" fill="#6f9a4a" ${S}/>
    <path d="M32 14 V58 M15 30 H49 M15 44 H49" ${L}/>`),
  tanktop: svg(`<path d="M21 6 H27 C28 17 36 17 37 6 H43 V18 C43 24 47 26 47 31 V58 H17 V31 C17 26 21 24 21 18Z" fill="#ffb347" ${S}/>`),
  parka: svg(`<path d="M24 5 L8 14 L4 44 L13 46 L18 26 V62 H46 V26 L51 46 L60 44 L56 14 L40 5 L32 13Z" fill="#2f5d50" ${S}/>
    <path d="M32 13 V62 M21 44 H28 M36 44 H43" ${L}/>
    <path d="M20 9 C21 -2 43 -2 44 9" fill="none" stroke="#f3e9d8" stroke-width="7" stroke-linecap="round"/>
    <path d="M20 9 C21 -2 43 -2 44 9" fill="none" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="1 4" stroke-linecap="round"/>`),
  rainhat: svg(`<ellipse cx="32" cy="42" rx="29" ry="10" fill="#f6d33c" ${S}/><path d="M17 41 C17 12 47 12 47 41 C40 45 24 45 17 41Z" fill="#f6d33c" ${S}/>
    <path d="M8 8 l-3 9 M56 8 l-3 9 M32 0 l-3 8" fill="none" stroke="#2f7fe0" stroke-width="3" stroke-linecap="round"/>`),
  thinbeanie: svg(`<path d="M12 46 C12 10 52 10 52 46Z" fill="#2fa58b" ${S}/><rect x="10" y="40" width="44" height="11" rx="5" fill="#238a74" ${S}/>`),
  underpants: svg(`<path d="M10 16 H54 V28 C44 30 37 38 36 50 H28 C27 38 20 30 10 28Z" fill="#bfe3f7" ${S}/><path d="M10 22 H54" ${L}/>`),
  socks: svg(`<path d="M22 6 H40 V36 L54 46 C60 51 56 58 50 58 H36 C26 58 22 50 22 42Z" fill="#f3f5f8" ${S}/>
    <path d="M22 13 H40" ${L}/><path d="M46 58 C44 52 48 46 54 46" ${L}/>`),
  warmsocks: svg(`<path d="M22 6 H40 V36 L54 46 C60 51 56 58 50 58 H36 C26 58 22 50 22 42Z" fill="#c96a4a" ${S}/>
    <path d="M22 6 H40 V16 H22Z" fill="#f3e9d8" ${S}/><path d="M22 23 H40 M22 30 H40 M46 58 C44 52 48 46 54 46" ${L}/>`),
  longjohns: svg(`<path d="M16 6 H48 L51 58 H38 L32 24 L26 58 H13Z" fill="#c9d3df" ${S}/>
    <path d="M16 12 H48 M13.5 51 H27 M37 51 H50.5" ${L}/>`),
  thermal: svg(`<path d="${SLEEVES}" fill="#c9d3df" ${S}/><path d="M18 34 H46 M18 44 H46 M26 14 H38" ${L}/>`),
};

// ---------- Ukko: näyttää miltä sää tuntuu ----------
const INK = '#1d2a3a';
const FEEL = {
  freezing: { label: 'Hyvin kylmä', skin: '#cfe3f7', shirt: '#3f6fd1', bg: '#cfe4ff', hue: '#2468d8' },
  cold:     { label: 'Kylmä',       skin: '#e6edf5', shirt: '#5b8fd9', bg: '#e1efff', hue: '#3a86e0' },
  cool:     { label: 'Viileä',      skin: '#f6d7b8', shirt: '#6fb48a', bg: '#e2f3e8', hue: '#2f9e62' },
  warm:     { label: 'Lämmin',      skin: '#f8cfa4', shirt: '#f0b23c', bg: '#fff1c9', hue: '#e6951a' },
  hot:      { label: 'Kuuma',       skin: '#f08f73', shirt: '#e86a4a', bg: '#ffd9c9', hue: '#e2452f' },
};
// Värisevä, kärsivä ukko vain kovalla pakkasella; muu talvi on neutraali.
const feelCat = (f) => (f < -15 ? 'freezing' : f < 7 ? 'cold' : f < 15 ? 'cool' : f < 23 ? 'warm' : 'hot');

// Ukon vaatteet: mitä ehdotetuista vaatteista piirretään ukon päälle ja millä värillä.
const TOPS = ['parka', 'wintercoat', 'raincoat', 'jacket', 'windbreaker', 'vest', 'hoodie', 'woolsweater', 'thermal', 'longsleeve', 'tshirt', 'tanktop'];
const TOP_COL = {
  parka: '#2f5d50', wintercoat: '#3f6fd1', raincoat: '#f6d33c', jacket: '#f0a646', windbreaker: '#35b5a6', vest: '#6f9a4a',
  hoodie: '#9a8cf0', woolsweater: '#c0504d', thermal: '#c9d3df', longsleeve: '#7bc47f', tshirt: '#4fb6e8', tanktop: '#ffb347',
};
const BARE_ARMS = new Set(['tshirt', 'tanktop']);
const ZIPPED = new Set(['parka', 'wintercoat', 'raincoat', 'jacket', 'windbreaker', 'vest']);
const BOTTOM_COL = { rainpants: '#f6d33c', warmtrousers: '#35507c', trousers: '#4a6fa5' };
const SHOES = { // [väri, onko varrellinen]
  winterboots: ['#8a5a3c', true], rubberboots: ['#3fae6a', true], boots: ['#a9713f', true],
  sneakers: ['#f3f5f8', false], sandals: ['#b9814f', false],
};
const DEFAULT_WEAR = {
  freezing: ['wintercoat', 'warmtrousers', 'winterboots', 'beanie', 'scarf', 'mittens'],
  cold: ['wintercoat', 'trousers', 'winterboots', 'beanie', 'scarf'],
  cool: ['longsleeve', 'trousers', 'sneakers'],
  warm: ['tshirt', 'trousers', 'sneakers'],
  hot: ['tshirt', 'shorts', 'sandals'],
};

function person(feel, fx = {}, wear) {
  const c = FEEL[feel];
  const has = new Set(wear || DEFAULT_WEAR[feel]);
  const st = `stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;
  const thin = `stroke="${INK}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
  const line = `fill="none" ${st}`;
  const limb = (d, col) =>
    `<path d="${d}" fill="none" stroke="${INK}" stroke-width="13" stroke-linecap="round"/>` +
    `<path d="${d}" fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round"/>`;
  const flake = (x, y, r = 5) =>
    `<path d="M${x - r} ${y}h${2 * r}M${x} ${y - r}v${2 * r}M${x - r * 0.7} ${y - r * 0.7}l${r * 1.4} ${r * 1.4}M${x - r * 0.7} ${y + r * 0.7}l${r * 1.4} ${-r * 1.4}" fill="none" stroke="#5aa0e6" stroke-width="2" stroke-linecap="round"/>`;

  // --- Yläosa: päällimmäinen vaate näkyy ---
  const tops = TOPS.filter((k) => has.has(k));
  const top = tops[0] || 'tshirt';
  const topCol = TOP_COL[top];
  const sleeveKey = top === 'vest' ? (tops[1] || 'longsleeve') : top;
  const sleeve = BARE_ARMS.has(sleeveKey) ? c.skin : TOP_COL[sleeveKey];
  const crossed = feel === 'freezing';
  const hands = {
    freezing: [[64, 84], [56, 78]], cold: [[35, 92], [85, 92]], cool: [[35, 92], [85, 92]],
    warm: [[27, 44], [93, 44]], hot: [[37, 96], [80, 28]],
  }[feel];
  const arms = {
    freezing: limb('M45 66 Q34 84 64 84', sleeve) + limb('M75 66 Q86 82 56 78', sleeve),
    cold:     limb('M45 64 L35 92', sleeve) + limb('M75 64 L85 92', sleeve),
    cool:     limb('M45 64 L35 92', sleeve) + limb('M75 64 L85 92', sleeve),
    warm:     limb('M45 64 L27 44', sleeve) + limb('M75 64 L93 44', sleeve),
    hot:      limb('M45 64 L37 96', sleeve) + limb('M75 64 Q98 54 80 28', sleeve),
  }[feel];

  const long = top === 'parka';
  let torso = `<rect x="44" y="56" width="32" height="${long ? 54 : 46}" rx="11" fill="${topCol}" ${st}/>`;
  if (ZIPPED.has(top)) torso += `<path d="M60 58 V${long ? 108 : 100}" fill="none" ${thin}/>`;
  if (top === 'wintercoat' || top === 'vest') torso += `<path d="M45.5 74 H74.5 M45.5 88 H74.5" fill="none" ${thin}/>`;
  if (top === 'parka') torso += `<path d="M48 90 h8 M64 90 h8" fill="none" ${thin}/>`;
  if (top === 'jacket') torso += `<path d="M49 84 h7 M64 84 h7" fill="none" ${thin}/>`;
  if (top === 'windbreaker') torso += `<path d="M46 72 H74" fill="none" stroke="#f3f5f8" stroke-width="4"/>`;
  if (top === 'raincoat') torso += `<circle cx="64" cy="70" r="1.6" fill="${INK}"/><circle cx="64" cy="82" r="1.6" fill="${INK}"/><circle cx="64" cy="94" r="1.6" fill="${INK}"/>`;
  if (top === 'hoodie') torso += `<path d="M52 86 H68 L70 95 H50Z" fill="#7d6ee0" ${thin}/><path d="M57 60 V70 M63 60 V70" fill="none" ${thin}/>`;
  if (top === 'woolsweater') torso += `<path d="M46 72 l3.5 -4 l3.5 4 l3.5 -4 l3.5 4 l3.5 -4 l3.5 4 l3.5 -4 l3.5 4" fill="none" stroke="#f3f5f8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M46 80 H74" fill="none" stroke="#f3f5f8" stroke-width="2" stroke-dasharray="1 4" stroke-linecap="round"/>`;
  if (top === 'thermal') torso += `<path d="M45.5 76 H74.5 M45.5 88 H74.5" fill="none" ${thin}/>`;
  if (has.has('reflector')) torso += `<path d="M49 97 V104" fill="none" ${thin}/><circle cx="49" cy="108" r="4.5" fill="#eef24a" ${thin}/>`;

  // Huppu pään takana
  let hood = '';
  if (top === 'raincoat') hood = `<circle cx="60" cy="35" r="24.5" fill="#e9c11f" ${st}/>`;
  else if (top === 'parka') hood = `<circle cx="60" cy="35" r="24.5" fill="#f3e9d8" ${st}/>`;
  else if (top === 'hoodie') hood = `<ellipse cx="60" cy="53" rx="21" ry="9" fill="#7d6ee0" ${st}/>`;

  // --- Alaosa ja kengät ---
  const shorts = has.has('shorts');
  const bottom = ['rainpants', 'warmtrousers', 'trousers'].find((k) => has.has(k));
  const legCol = shorts ? c.skin : BOTTOM_COL[bottom] || BOTTOM_COL.trousers;
  let legs = limb('M53 100 V126', legCol) + limb('M67 100 V126', legCol);
  if (shorts) legs += `<path d="M46 92 H74 V110 H62 L60 102 L58 110 H46Z" fill="#f08a5d" ${st}/>`;
  if (bottom === 'warmtrousers') legs += `<path d="M48.5 110 h9 M62.5 110 h9" fill="none" ${thin}/>`;
  const shoeKey = Object.keys(SHOES).find((k) => has.has(k));
  if (shoeKey) {
    const [col, tall] = SHOES[shoeKey];
    for (const x of [53, 67]) {
      const fx0 = x < 60 ? x - 11 : x - 6.5;
      if (shoeKey === 'sandals') {
        legs += `<rect x="${fx0}" y="127" width="17.5" height="5.5" rx="2.5" fill="${col}" ${thin}/>` +
          `<path d="M${fx0 + 3} 127 q5.5 -8 11 0" fill="none" stroke="#e2574c" stroke-width="3" stroke-linecap="round"/>`;
        continue;
      }
      if (tall) legs += `<rect x="${x - 6.5}" y="111" width="13" height="17" rx="3" fill="${col}" ${st}/>`;
      legs += `<rect x="${fx0}" y="122.5" width="17.5" height="9.5" rx="4.5" fill="${col}" ${st}/>`;
      if (shoeKey === 'winterboots') legs += `<rect x="${x - 7.5}" y="108" width="15" height="6" rx="3" fill="#f3e9d8" ${thin}/>`;
      if (shoeKey === 'sneakers') legs += `<path d="M${fx0 + 2} 130 h13.5" fill="none" stroke="#e2574c" stroke-width="2" stroke-linecap="round"/>`;
    }
  }

  // --- Pää, kasvot ja päähine ---
  const mouth = {
    freezing: `<path d="M51 44 l3 -3 l3 3 l3 -3 l3 3 l3 -3 l3 3" ${line}/>`,
    cold:     `<path d="M53 44 H67" ${line}/>`,
    cool:     `<path d="M53 44 H67" ${line}/>`,
    warm:     `<path d="M50 40 Q60 51 70 40" ${line}/>`,
    hot:      `<ellipse cx="60" cy="45" rx="6" ry="5" fill="${INK}"/><path d="M56 47 Q60 55 64 47Z" fill="#ff7f8e"/>`,
  }[feel];
  let eyes;
  if (feel === 'freezing') eyes = `<path d="M49 32 l6 2 M71 32 l-6 2" ${line}/>`;
  else if (has.has('sunglasses')) eyes = `<rect x="45.5" y="28" width="12.5" height="9.5" rx="4" fill="#2b3442" ${thin}/><rect x="62" y="28" width="12.5" height="9.5" rx="4" fill="#2b3442" ${thin}/><path d="M58 31 h4" fill="none" ${thin}/>`;
  else eyes = `<circle cx="53" cy="33" r="2.6" fill="${INK}"/><circle cx="67" cy="33" r="2.6" fill="${INK}"/>`;

  let hat = '';
  if (has.has('earflap')) {
    hat = `<rect x="34" y="24" width="11" height="24" rx="5.5" fill="#8a5a3c" ${st}/><rect x="75" y="24" width="11" height="24" rx="5.5" fill="#8a5a3c" ${st}/>
      <path d="M40 25 C40 2 80 2 80 25Z" fill="#8a5a3c" ${st}/><rect x="37" y="18" width="46" height="10" rx="5" fill="#f3e9d8" ${st}/>`;
  } else if (has.has('beanie')) {
    hat = `<path d="M40 25 C40 2 80 2 80 25Z" fill="#e2574c" ${st}/><rect x="37" y="19" width="46" height="9" rx="4.5" fill="#f3f5f8" ${st}/><circle cx="60" cy="6" r="5" fill="#f3f5f8" ${st}/>`;
  } else if (has.has('thinbeanie')) {
    hat = `<path d="M40 25 C40 3 80 3 80 25Z" fill="#2fa58b" ${st}/><rect x="38" y="20" width="44" height="8" rx="4" fill="#238a74" ${st}/>`;
  } else if (has.has('rainhat')) {
    hat = `<ellipse cx="60" cy="24" rx="30" ry="7" fill="#f6d33c" ${st}/><path d="M43 24 C43 2 77 2 77 24 C70 27 50 27 43 24Z" fill="#f6d33c" ${st}/>`;
  } else if (has.has('sunhat')) {
    hat = `<ellipse cx="60" cy="24" rx="30" ry="7" fill="#f2d48a" ${st}/><path d="M43 24 C43 2 77 2 77 24 C70 27 50 27 43 24Z" fill="#f2d48a" ${st}/>
      <path d="M43.5 19 Q60 25 76.5 19" fill="none" stroke="#e2574c" stroke-width="3.5" stroke-linecap="round"/>`;
  } else if (has.has('cap')) {
    hat = `<path d="M40 27 C40 5 80 5 80 27Z" fill="#2468d8" ${st}/><path d="M79 27 H97 C96 21 89 19 79 20Z" fill="#1b4fa8" ${st}/>`;
  }

  let neck = '';
  if (has.has('scarf')) neck = `<rect x="45" y="53" width="30" height="9" rx="4.5" fill="#2fa58b" ${st}/><path d="M66 60 v12" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M66 60 v12" fill="none" stroke="#2fa58b" stroke-width="4" stroke-linecap="round"/>`;
  else if (top === 'wintercoat') neck = `<rect x="44" y="53" width="32" height="8" rx="4" fill="#f3e9d8" ${st}/>`;

  // --- Kädet ja kädessä pidettävät ---
  const handCol = has.has('mittens') ? '#e2574c' : has.has('gloves') ? '#4a6fa5' : c.skin;
  let held = '';
  if (has.has('umbrella') && !crossed) {
    const [hx, hy] = hands[1];
    const ux = Math.min(hx + 14, 99);
    const uy = Math.max(22, hy - 52);
    held = `<path d="M${ux} ${uy} L${hx} ${hy}" ${line}/>
      <path d="M${ux - 21} ${uy} C${ux - 21} ${uy - 26} ${ux + 21} ${uy - 26} ${ux + 21} ${uy}Z" fill="#e2574c" ${st}/>`;
  }
  const handDots = hands.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5.5" fill="${handCol}" ${thin}/>`).join('');

  let extras = '';
  if (feel === 'freezing') {
    extras += `<path d="M26 62 q-5 6 0 12 q5 6 0 12 M94 62 q5 6 0 12 q-5 6 0 12" fill="none" ${thin}/>`;
    extras += (fx.night || fx.thunder ? '' : flake(18, 22, 7)) + flake(102, 30, 6) + flake(104, 100, 5);
  }
  if (feel === 'hot') {
    extras += `<g class="fx-sweat" fill="#4aa8f0" stroke="${INK}" stroke-width="1.5"><path d="M38 30 q-5 8 0 10 q5 -2 0 -10Z"/><path d="M84 44 q-4 7 0 9 q4 -2 0 -9Z"/></g>`;
  }
  const sun = !fx.night && !fx.thunder && (feel === 'hot' || (feel === 'warm' && fx.sun))
    ? `<g stroke="#f0a020" stroke-width="3" stroke-linecap="round"><circle cx="102" cy="18" r="9" fill="#ffd23c"/><path d="M102 3v-3M102 33v4M87 18h-4M117 18h3M91 7l-3 -3M113 29l3 3M91 29l-3 3M113 7l3 -3" /></g>`
    : '';

  const body =
    legs + (crossed ? '' : arms) + torso + hood + (crossed ? arms : '') +
    `<circle cx="60" cy="36" r="20" fill="${c.skin}" ${st}/>` + eyes + mouth + hat + neck + held + handDots + extras;

  let overlay = '';
  let sky = '';
  if (fx.night && !fx.thunder) {
    sky += `<path d="M18 6 a11 11 0 1 0 9 17 a9 9 0 0 1 -9 -17Z" fill="#ffe08a" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
      <g fill="#ffe08a" stroke="${INK}" stroke-width="1"><circle cx="100" cy="12" r="2.5"/><circle cx="110" cy="32" r="2"/><circle cx="8" cy="40" r="1.8"/></g>`;
  }
  if (fx.thunder) {
    sky += `<path d="M4 16 C4 6 16 4 20 10 C24 2 40 4 40 14 C48 14 48 26 40 26 H10 C2 26 0 18 4 16Z" fill="#8894a6" ${thin}/>
      <path d="M20 26 L10 44 H18 L13 60 L30 38 H21 L27 26Z" fill="#ffd23c" ${thin}/>`;
  }
  if (fx.fog) {
    overlay += `<g class="fx-wind" fill="none" stroke="#ffffff" stroke-width="9" stroke-linecap="round" opacity=".75">
      <path d="M-6 52 H52"/><path d="M60 74 H126"/><path d="M-6 98 H76"/><path d="M40 118 H126"/></g>
      <g fill="none" stroke="#9aa7b5" stroke-width="2" stroke-linecap="round" opacity=".8">
      <path d="M2 47 H44 M70 69 H118 M4 93 H68 M48 113 H118"/></g>`;
  }
  if (fx.wind) {
    overlay += `<g class="fx-wind" fill="none" stroke="#6b8299" stroke-width="3.5" stroke-linecap="round">
      <path d="M2 34 H28 q9 0 9 -7 q0 -6 -6 -6"/><path d="M0 66 H24"/><path d="M4 98 H30 q8 0 8 7 q0 5 -5 5"/><path d="M86 52 H112 q7 0 7 -6"/></g>`;
  }
  if (fx.rain) {
    overlay += `<g class="fx-fall" stroke="#2f7fe0" stroke-width="3.5" stroke-linecap="round">
      <path d="M16 0l-4 12M40 -10l-4 12M82 -6l-4 12M106 4l-4 12M24 50l-4 12M100 56l-4 12M14 100l-4 12M108 104l-4 12M30 -30l-4 12M92 -34l-4 12"/></g>`;
  }
  if (fx.snow) {
    overlay += `<g class="fx-fall slow" fill="#ffffff" stroke="#5aa0e6" stroke-width="1.5">
      <circle cx="14" cy="10" r="4"/><circle cx="40" cy="-8" r="3.5"/><circle cx="86" cy="2" r="4"/><circle cx="108" cy="24" r="3.5"/>
      <circle cx="22" cy="60" r="4"/><circle cx="102" cy="70" r="4"/><circle cx="12" cy="108" r="3.5"/><circle cx="106" cy="116" r="4"/><circle cx="64" cy="-16" r="3.5"/></g>`;
  }

  const lean = fx.wind ? ' transform="rotate(7 60 130)"' : '';
  const shake = feel === 'freezing' ? ' class="fx-shake"' : '';
  return `<svg viewBox="0 0 120 140" aria-hidden="true">
    <rect width="120" height="140" rx="20" fill="${c.bg}"/>
    <ellipse cx="60" cy="134" rx="30" ry="4" fill="rgba(0,0,0,.12)"/>
    ${sun}${sky}<g${lean}><g${shake}>${body}</g></g>${overlay}</svg>`;
}

function thermometer(temp, feel) {
  const h = Math.max(2, Math.min(38, ((temp + 25) / 60) * 38));
  const col = FEEL[feel].hue;
  return `<svg viewBox="0 0 24 64" aria-hidden="true">
    <rect x="7" y="3" width="10" height="46" rx="5" fill="#fff" stroke="var(--ink)" stroke-width="2"/>
    <rect x="10" y="${46 - h}" width="4" height="${h + 4}" fill="${col}"/>
    <circle cx="12" cy="53" r="9" fill="${col}" stroke="var(--ink)" stroke-width="2"/></svg>`;
}

//// ---------- Sääkuvat ja nappien kuvat (omat piirrokset: näyttävät samalta joka laitteessa) ----------
const CLOUD = 'M17 46 C6 46 4 31 15 29 C16 16 35 13 40 24 C51 20 61 31 55 41 C54 44 51 46 48 46Z';
const sunPic = (cx, cy, r) => {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
    const x = Math.cos((a * Math.PI) / 180);
    const y = Math.sin((a * Math.PI) / 180);
    return `M${(cx + x * (r + 3)).toFixed(1)} ${(cy + y * (r + 3)).toFixed(1)}L${(cx + x * (r + 8)).toFixed(1)} ${(cy + y * (r + 8)).toFixed(1)}`;
  }).join('');
  return `<path d="${rays}" fill="none" stroke="#f0a020" stroke-width="3" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffd23c" stroke="#f0a020" stroke-width="2.5"/>`;
};
const moonPic = (x, y, k = 1) => `<path transform="translate(${x} ${y}) scale(${k})" d="M14 2 a16 16 0 1 0 13 25 a13 13 0 0 1 -13 -25Z" fill="#ffe08a" ${S}/>`;
const cloudPic = (fill) => `<path d="${CLOUD}" fill="${fill}" ${S}/>`;
const dropsPic = (xs) => `<path d="${xs.map((x) => `M${x} 50l-3 9`).join('')}" fill="none" stroke="#2f7fe0" stroke-width="3.5" stroke-linecap="round"/>`;
const flakesPic = (xs) => xs.map((x, i) => `<circle cx="${x}" cy="${i % 2 ? 58 : 53}" r="3" fill="#ffffff" stroke="#5aa0e6" stroke-width="2"/>`).join('');

const isSnowCode = (c) => (c >= 71 && c <= 77) || c === 85 || c === 86;
const isRainCode = (c) => (c >= 51 && c <= 67) || (c >= 80 && c <= 82) || c >= 95;
const isFogCode = (c) => c === 45 || c === 48;

// Sääkoodi (WMO) -> kuva.
function skyIcon(code, isDay = true) {
  const bigOrb = isDay ? sunPic(32, 32, 13) : moonPic(14, 12);
  const smallOrb = isDay ? sunPic(45, 18, 8) : moonPic(36, 2, 0.6);
  if (code === 0) return svg(bigOrb);
  if (code === 1) return svg(bigOrb + `<g transform="translate(24 28) scale(.6)">${cloudPic('#ffffff')}</g>`);
  if (code === 2) return svg(smallOrb + cloudPic('#ffffff'));
  if (code === 3) return svg(cloudPic('#dfe6ee'));
  if (isFogCode(code)) return svg(cloudPic('#eef1f5') + `<path d="M10 53 H54 M16 60 H48" fill="none" stroke="#9aa7b5" stroke-width="3.5" stroke-linecap="round"/>`);
  if (code >= 95) return svg(cloudPic('#aab4c0') + dropsPic([18, 50]) + `<path d="M33 44 L25 55 H32 L28 64 L43 51 H35 L39 44Z" fill="#ffd23c" ${S} stroke-width="2"/>`.replace(`stroke-width="2.5" `, ''));
  if (isSnowCode(code)) return svg(cloudPic('#eef1f5') + flakesPic(code === 75 || code === 86 ? [16, 27, 38, 49] : [21, 33, 45]));
  if (code === 65 || code === 67 || code === 82) return svg(cloudPic('#aab4c0') + dropsPic([17, 26, 35, 44, 53]));
  if (code >= 61) return svg(cloudPic('#cfd8e2') + dropsPic([22, 33, 44]));
  if (code >= 51) return svg(cloudPic('#eef1f5') + dropsPic([27, 40]));
  return svg(cloudPic('#dfe6ee'));
}

const LS = 'fill="none" stroke="var(--ink)" stroke-linecap="round" stroke-linejoin="round"';
const UI = {
  pin: svg(`<path d="M32 58 C19 41 14 32 14 24 a18 18 0 0 1 36 0 c0 8 -5 17 -18 34Z" fill="#e2574c" ${S}/><circle cx="32" cy="24" r="6.5" fill="#ffffff" ${S}/>`),
  search: svg(`<path d="M40 40 L56 56" ${LS} stroke-width="7"/><circle cx="27" cy="27" r="16" fill="#bfe3f7" ${S} />`),
  calendar: svg(`<rect x="8" y="12" width="48" height="44" rx="7" fill="#ffffff" ${S}/><path d="M8 26 V19 a7 7 0 0 1 7 -7 H49 a7 7 0 0 1 7 7 V26Z" fill="#e2574c" ${S}/>
    <path d="M20 6 V16 M44 6 V16" ${LS} stroke-width="4"/><path d="M19 36 h4 M30 36 h4 M41 36 h4 M19 46 h4 M30 46 h4" ${LS} stroke-width="4"/>`),
  speaker: svg(`<path d="M8 24 H19 L35 10 V54 L19 40 H8Z" fill="#4a6fa5" ${S}/><path d="M43 23 q7 9 0 18 M50 15 q13 17 0 34" ${LS} stroke-width="4"/>`),
  // Pukeminen yksi vaate kerrallaan: paita ja vihreä nuoli seuraavaan.
  dress: svg(`<path transform="translate(-4 -2) scale(.86)" d="M22 8 L8 16 L13 27 L19 24 V56 H45 V24 L51 27 L56 16 L42 8 C40 13 24 13 22 8Z" fill="#4fb6e8" stroke="var(--ink)" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="46" cy="46" r="16" fill="#3fae6a" ${S}/><path d="M38 46 H54 M47.5 38.5 L55 46 L47.5 53.5" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`),
  gear: svg(`<path d="M32 6 V14 M32 50 V58 M6 32 H14 M50 32 H58 M13.6 13.6 L19.3 19.3 M44.7 44.7 L50.4 50.4 M13.6 50.4 L19.3 44.7 M44.7 19.3 L50.4 13.6" ${LS} stroke-width="6"/>
    <circle cx="32" cy="32" r="15" fill="#c9d3df" ${S}/><circle cx="32" cy="32" r="5.5" fill="#ffffff" ${S}/>`),
  check: svg(`<path d="M12 34 L26 48 L52 16" fill="none" stroke="#2a8a50" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`),
  left: svg(`<path d="M40 12 L20 32 L40 52" ${LS} stroke-width="8"/>`),
  right: svg(`<path d="M24 12 L44 32 L24 52" ${LS} stroke-width="8"/>`),
  close: svg(`<path d="M16 16 L48 48 M48 16 L16 48" ${LS} stroke-width="7"/>`),
  retry: svg(`<path d="M50 34 a18 18 0 1 1 -7 -15" ${LS} stroke-width="6"/><path d="M46 6 V20 H32" ${LS} stroke-width="6"/>`),
  offline: svg(cloudPic('#dfe6ee') + `<path d="M12 56 L52 10" fill="none" stroke="#e2452f" stroke-width="6" stroke-linecap="round"/>`),
};

// ---------- Vaatteiden nimet ----------
const NAMES = {
  underpants: 'Alushousut', longjohns: 'Pitkät alushousut', socks: 'Sukat', warmsocks: 'Lämpimät sukat', thermal: 'Pitkä aluspaita',
  tanktop: 'Hihaton paita', tshirt: 'T-paita', longsleeve: 'Pitkähihainen paita', hoodie: 'Lämmin paita', woolsweater: 'Villapaita',
  vest: 'Liivi', windbreaker: 'Tuulitakki', jacket: 'Takki', raincoat: 'Sadetakki', wintercoat: 'Talvitakki', parka: 'Paksu talvitakki',
  shorts: 'Shortsit', trousers: 'Pitkät housut', rainpants: 'Sadehousut', warmtrousers: 'Lämpimät housut',
  sandals: 'Sandaalit', sneakers: 'Lenkkarit', boots: 'Paksut kengät', rubberboots: 'Kumisaappaat', winterboots: 'Talvikengät', icegrips: 'Liukuesteet kenkiin',
  cap: 'Lippalakki', sunhat: 'Aurinkohattu', rainhat: 'Sadehattu', thinbeanie: 'Ohut pipo', beanie: 'Pipo', earflap: 'Karvahattu',
  gloves: 'Hanskat', mittens: 'Lapaset', scarf: 'Kaulahuivi',
  umbrella: 'Sateenvarjo', sunglasses: 'Aurinkolasit', sunscreen: 'Aurinkorasva', waterbottle: 'Vesipullo', mosquito: 'Hyttyssuoja', reflector: 'Heijastin',
};

// ---------- Apurit ja tallennus ----------
const $ = (id) => document.getElementById(id);
const deg = (n) => `${Math.round(n)}°`;
const WINDY = 8;       // keskituuli m/s
const GUSTY = 11;      // puuskat m/s
const DEFAULT_LOC = { name: 'Helsinki', lat: 60.1699, lon: 24.9384, mode: 'manual' };
const HELP_URL = 'https://github.com/kebabkenraali/what_to_wear_weather#jos-sovellus-sanoo-paikannus-on-estetty';

// Kaikki tallennetaan vain käyttäjän omaan selaimeen.
const store = {
  get(key, fallback) {
    try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
  },
};
const DEFAULT_SETTINGS = {
  lock: false,   // piilota sijainti-, haku- ja kalenterinappi
  speak: true,   // puhe päällä
  chill: 0,      // +3 = palelee helposti, -3 = tulee helposti kuuma
  hidden: [],    // vaatteet, joita ei näytetä
  outing: false, // valitse vaatteet ulkonaoloajalle
  from: 8, to: 16,
};
let settings = { ...DEFAULT_SETTINGS, ...store.get('wtw.settings', {}) };
let photos = store.get('wtw.photos', {}); // omat valokuvat vaatteista: { avain: dataURL }
const state = { loc: null, data: null, req: 0, stale: false, view: null };

function msg(el, text, err = false) {
  el.textContent = text || '';
  el.hidden = !text;
  el.classList.toggle('err', err);
}
async function getJson(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

// ---------- Puhe ----------
function speak(text) {
  if (!settings.speak || !('speechSynthesis' in window)) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/­/g, ''));
    u.lang = 'fi-FI';
    const voice = speechSynthesis.getVoices().find((v) => v.lang && v.lang.toLowerCase().startsWith('fi'));
    if (voice) u.voice = voice;
    u.rate = 0.9;
    speechSynthesis.speak(u);
  } catch {}
}
const FEEL_SAY = {
  freezing: 'Ulkona on kova pakkanen', cold: 'Ulkona on kylmä', cool: 'Ulkona on viileää',
  warm: 'Ulkona on lämmin', hot: 'Ulkona on kuuma',
};
function sayTemp(t) {
  const n = Math.round(t);
  if (n === 0) return 'Nolla astetta';
  const amount = Math.abs(n) === 1 ? 'Yksi aste' : `${Math.abs(n)} astetta`;
  return n < 0 ? `${amount} pakkasta` : amount;
}
// Miten kannattaa pukeutua, sanottuna yhdellä lauseella.
const DRESS_SAY = {
  freezing: 'Pue todella lämpimästi. Suojaa kädet, pää ja kasvot',
  cold: 'Pue lämpimät vaatteet',
  cool: 'Pue vähän lämmintä päälle',
  warm: 'Kevyet vaatteet riittävät',
  hot: 'Pue ohuet ja kevyet vaatteet. Juo vettä',
};
// Ukkoa tai kaiutinta painamalla kuultava teksti: sää ja miten sen mukaan pukeudutaan.
// Vaatteita ei luetella; yksittäisen vaatteen nimen kuulee painamalla sen kuvaa.
function summaryText(v) {
  const s = v.s;
  const has = (...keys) => v.wear.some((i) => keys.includes(i.icon));
  const parts = [FEEL_SAY[v.feel], sayTemp(v.temp), DRESS_SAY[v.dress]];
  if (s.thunder) parts.push('Ukkostaa. Pysy sisällä, jos voit');
  if (s.snowy) parts.push('Sataa lunta. Pue lämpimät kengät');
  else if (s.rainy) parts.push('Sataa. Pue sadevaatteet');
  if (s.foggy) parts.push('On sumua');
  if (s.windy) parts.push('Tuulee. Pue takki, joka suojaa tuulelta');
  if (s.icy) parts.push('On liukasta. Kävele varovasti');
  if (has('sunscreen', 'sunhat')) parts.push('Aurinko paistaa. Suojaa iho ja pää');
  if (has('reflector')) parts.push('On pimeää. Laita heijastin');
  return parts.join('. ') + '.';
}
// "Pue pipo", "Ota mukaan sateenvarjo", "Laita aurinkorasva".
function sayItem(it) {
  const verb = ['umbrella', 'waterbottle'].includes(it.icon) ? 'Ota mukaan'
    : ['sunscreen', 'mosquito', 'reflector', 'icegrips', 'sunglasses'].includes(it.icon) ? 'Laita' : 'Pue';
  return `${verb} ${it.name.toLowerCase()}`;
}

// ---------- Sijainti ----------
function setLocation(loc) {
  state.loc = loc;
  store.set('wtw.location', loc);
  // "≈" kertoo, että paikka on arvio verkkoyhteyden perusteella.
  $('locName').textContent = (loc.mode === 'ip' ? '≈ ' : '') + loc.name;
  loadWeather();
}

// Arvioitu paikka verkkoyhteyden (IP-osoitteen) perusteella. Ei tarvitse selaimen sijaintilupaa,
// mutta on tarkka vain kaupungin tasolla ja voi mobiiliverkossa osua väärään kaupunkiin.
async function ipLocation() {
  const d = await getJson('https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=fi');
  if (typeof d.latitude !== 'number' || typeof d.longitude !== 'number') throw new Error('Ei arviota');
  return {
    name: d.city || d.locality || d.principalSubdivision || d.countryName || 'Arvioitu paikka',
    lat: +d.latitude.toFixed(2), lon: +d.longitude.toFixed(2), mode: 'ip',
  };
}

function getPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error('Selain ei tue paikannusta.'));
    navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000, maximumAge: 5 * 60 * 1000 });
  });
}

async function placeName(lat, lon) {
  try {
    const d = await getJson(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=fi`);
    return d.city || d.locality || d.principalSubdivision || null;
  } catch { return null; }
}

async function useGps(silent = false) {
  const btn = $('gpsBtn');
  btn.disabled = true;
  try {
    const pos = await getPosition();
    const lat = +pos.coords.latitude.toFixed(3);
    const lon = +pos.coords.longitude.toFixed(3);
    const name = (await placeName(lat, lon)) || `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
    msg($('locMsg'), '');
    setLocation({ name, lat, lon, mode: 'gps' });
    return true;
  } catch (e) {
    // Varatapa: arvioidaan paikka verkkoyhteydestä, jos tarkkaa sijaintia ei saada.
    let approx = null;
    try { approx = await ipLocation(); } catch {}
    if (approx) setLocation(approx);
    if (!silent) {
      const denied = e && e.code === 1;
      const why = denied ? 'Paikannus on estetty. ' : 'Tarkkaa sijaintia ei saatu. ';
      msg($('locMsg'), why + (approx
        ? `Näytetään arvioitu paikka: ${approx.name}. Jos se on väärä, paina hakunappia ja kirjoita paikka. `
        : 'Paina hakunappia ja kirjoita paikka. '), !approx);
      if (denied) {
        const a = document.createElement('a');
        a.href = HELP_URL;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = 'Katso ohje: näin sallit paikannuksen';
        $('locMsg').append(a);
      }
      queueFit();
    }
    return !!approx;
  } finally {
    btn.disabled = false;
  }
}

function toggleSearch(open) {
  const form = $('searchForm');
  form.hidden = !open;
  queueFit();
  $('searchToggle').setAttribute('aria-expanded', String(open));
  if (open) $('searchInput').focus();
  else { $('results').hidden = true; $('searchInput').value = ''; }
}

async function searchPlace(q) {
  const list = $('results');
  list.hidden = true;
  list.replaceChildren();
  try {
    const d = await getJson(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=6&language=fi&format=json`);
    const hits = d.results || [];
    if (!hits.length) return msg($('locMsg'), `Paikkaa "${q}" ei löytynyt.`, true);
    msg($('locMsg'), '');
    for (const h of hits) {
      const li = document.createElement('li');
      const b = document.createElement('button');
      b.type = 'button';
      const small = document.createElement('small');
      small.textContent = ' ' + [h.admin1, h.country].filter(Boolean).join(', ');
      b.append(h.name, small);
      b.addEventListener('click', () => {
        toggleSearch(false);
        setLocation({ name: h.name, lat: h.latitude, lon: h.longitude, mode: 'manual' });
      });
      li.append(b);
      list.append(li);
    }
    list.hidden = false;
  } catch {
    msg($('locMsg'), 'Haku epäonnistui. Tarkista verkkoyhteys.', true);
  }
}

// ---------- Sää ----------
const CACHE_MAX_AGE = 18 * 3600 * 1000; // vanhaa ennustetta käytetään enintään näin kauan

// Paikan kellonaika tunnin tarkkuudella, esim. "2026-11-09T14". Lasketaan laitteen kellosta,
// jotta myös muistista ladattu (vanha) ennuste osuu oikeaan tuntiin.
function localHour(data) {
  return new Date(Date.now() + (data.utc_offset_seconds || 0) * 1000).toISOString().slice(0, 13);
}
function nowIndex(data) {
  const h = localHour(data);
  return data.hourly.time.findIndex((x) => x.slice(0, 13) >= h);
}

function showOffline(on) {
  $('offline').hidden = !on;
  if (on) for (const id of ['now', 'wear', 'later']) $(id).hidden = true;
}

async function loadWeather() {
  const { lat, lon } = state.loc;
  const req = ++state.req;
  try {
    const url = 'https://api.open-meteo.com/v1/forecast'
      + `?latitude=${lat}&longitude=${lon}`
      + '&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_gusts_10m,is_day'
      + '&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,snowfall,snow_depth,weather_code,wind_speed_10m,wind_gusts_10m,uv_index,is_day'
      + '&wind_speed_unit=ms&timezone=auto&forecast_days=2';
    const data = await getJson(url);
    if (req !== state.req) return;
    state.data = data;
    state.stale = false;
    store.set('wtw.forecast', { t: Date.now(), lat, lon, data });
    showOffline(false);
    $('updated').textContent = '· ' + new Date().toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' });
    render();
  } catch {
    if (req !== state.req) return;
    // Ei yhteyttä: näytetään viimeksi haettu ennuste, jos se on samalta paikalta ja tarpeeksi tuore.
    const c = store.get('wtw.forecast', null);
    const usable = c && c.data && Date.now() - c.t < CACHE_MAX_AGE
      && Math.abs(c.lat - lat) < 0.3 && Math.abs(c.lon - lon) < 0.3 && nowIndex(c.data) >= 0;
    if (usable) {
      state.data = c.data;
      state.stale = true;
      showOffline(false);
      render();
    } else {
      state.data = null;
      showOffline(true);
    }
  }
}

// "Nyt" = seuraavat 4 tuntia, tai avustajan asettama ulkonaoloaika.
// "Ilta" = saman päivän klo 18–22, jos se on vielä edessä.
function windows(data) {
  const t = data.hourly.time;
  const start = nowIndex(data);
  if (start < 0) return { now: [], evening: [], idx: -1 };
  const today = localHour(data).slice(0, 10);
  const all = t.map((_, i) => i);
  const hr = (i) => +t[i].slice(11, 13);
  if (settings.outing) {
    const out = all.filter((i) => i >= start && t[i].startsWith(today) && hr(i) >= settings.from && hr(i) <= settings.to);
    if (out.length) return { now: out, evening: [], idx: start };
  }
  const now = all.slice(start, start + 4);
  const evening = all.filter((i) => i >= start + 4 && t[i].startsWith(today) && hr(i) >= 18 && hr(i) <= 22);
  return { now, evening: evening.length >= 2 ? evening : [], idx: start };
}

// Tämän hetken sää. Vanhasta ennusteesta luetaan kuluvan tunnin arvot.
function currentOf(data, idx) {
  if (!state.stale && data.current) return data.current;
  const h = data.hourly;
  const pick = (k) => (h[k] ? h[k][idx] : 0) ?? 0;
  return {
    temperature_2m: pick('temperature_2m'), apparent_temperature: pick('apparent_temperature'),
    weather_code: pick('weather_code'), wind_speed_10m: pick('wind_speed_10m'),
    wind_gusts_10m: pick('wind_gusts_10m'), is_day: pick('is_day'),
  };
}

function summarize(data, idx) {
  const h = data.hourly;
  const pick = (k) => idx.map((i) => (h[k] ? h[k][i] : 0) ?? 0);
  const sum = (a) => a.reduce((x, y) => x + y, 0);
  const feels = pick('apparent_temperature');
  const temp = pick('temperature_2m');
  const codes = pick('weather_code');
  const days = pick('is_day');
  const s = {
    feelsMin: Math.min(...feels), feelsMax: Math.max(...feels),
    feelsAvg: sum(feels) / feels.length,
    tAvg: sum(temp) / temp.length,
    pop: Math.max(...pick('precipitation_probability')),
    precip: sum(pick('precipitation')),
    snow: sum(pick('snowfall')),
    snowDepth: Math.max(...pick('snow_depth')), // metriä
    wind: Math.max(...pick('wind_speed_10m')),
    gust: Math.max(...pick('wind_gusts_10m')),
    uv: Math.max(...pick('uv_index')),
    codes,
    daylight: days.some(Boolean),
    anyDark: days.some((d) => !d),
    mostlyDay: sum(days) * 2 >= days.length,
    clearish: codes.some((c) => c <= 2),
  };
  derive(s);
  // Hyttyset: Suomen leveysasteilla kesällä, lämpimällä ja tyynellä poutasäällä.
  s.month = +localHour(data).slice(5, 7);
  s.mosquito = data.latitude >= 55 && s.month >= 6 && s.month <= 8 && s.tAvg >= 12 && !s.rainy && s.wind < 7;
  return s;
}

// Säätilat, jotka johdetaan yhteenvedon luvuista.
function derive(s) {
  s.snowy = s.snow >= 0.5 || s.codes.some(isSnowCode);
  s.rainy = !s.snowy && (s.pop >= 50 || s.precip >= 1) && s.precip >= 0.2;
  s.windy = s.wind >= WINDY || (s.gust || 0) >= GUSTY;
  s.stormy = s.wind >= 11 || (s.gust || 0) >= 16; // liian tuulista sateenvarjolle
  s.thunder = s.codes.some((c) => c >= 95);
  s.foggy = s.codes.filter(isFogCode).length * 2 >= s.codes.length;
  s.slush = s.snowy && s.tAvg > 0.5;
  s.snowGround = (s.snowDepth || 0) >= 0.03; // lunta maassa vähintään 3 cm
  s.icy = s.codes.some((c) => [56, 57, 66, 67].includes(c))
    || ((s.snowy || s.precip > 0.2) && s.tAvg > -3 && s.tAvg < 1.5);
  return s;
}
const fxOf = (s) => ({ wind: s.windy, rain: s.rainy, snow: s.snowy, thunder: s.thunder, fog: s.foggy, night: !s.mostlyDay });

function periodSky(s) {
  if (s.thunder) return skyIcon(95);
  if (s.snowy) return skyIcon(73);
  if (s.rainy) return skyIcon(63);
  const count = {};
  let best = s.codes[0];
  for (const c of s.codes) { count[c] = (count[c] || 0) + 1; if (count[c] > count[best]) best = c; }
  return skyIcon(best, s.mostlyDay);
}

// Onko ilta selvästi erilainen kuin nyt?
function veryDifferent(a, b) {
  const d = Math.abs(a.feelsAvg - b.feelsAvg);
  return d >= 6
    || (d >= 3 && feelCat(a.feelsAvg) !== feelCat(b.feelsAvg))
    || a.rainy !== b.rainy || a.snowy !== b.snowy
    || (a.windy !== b.windy && Math.abs(a.wind - b.wind) >= 3);
}

// ---------- Pukeutumissäännöt ----------
// chill: avustajan säätö. +3 = palelee helposti (lämpimämmät vaatteet), -3 = tulee helposti kuuma.
function outfit(s, chill = 0) {
  // Pukeudutaan hieman kylmimmän hetken suuntaan painottaen.
  const f = (s.feelsMin + s.feelsAvg) / 2 - chill;
  const { snowy, rainy, windy } = s;
  const maybeRain = !snowy && !rainy && s.pop >= 30;
  const items = [];
  const add = (icon, name) => items.push({ icon, name });

  // Alusvaatteet
  const sandals = !snowy && !rainy && !s.snowGround && f >= 23;
  add('underpants', 'Alushousut');
  if (f < -5) add('longjohns', 'Pitkät alushousut');
  if (f < 0) add('warmsocks', 'Lämpimät sukat');
  else if (!sandals) add('socks', 'Sukat');

  // Yläosa
  if (f >= 27) add('tanktop', 'Hihaton paita');
  else if (f >= 20) add('tshirt', 'T-paita');
  else if (f >= 12) add('longsleeve', 'Pitkähihainen paita');
  else if (f >= 2) add('hoodie', 'Lämmin paita');
  else if (f >= -10) { add('tshirt', 'T-paita'); add('woolsweater', 'Villapaita päälle'); }
  else { add('thermal', 'Pitkä aluspaita'); add('woolsweater', 'Villapaita päälle'); }

  // Päällysvaate
  if (rainy && f >= 5) add('raincoat', 'Sadetakki');
  else if (f < -12) add('parka', 'Paksu talvitakki');
  else if (f < 2) add('wintercoat', 'Talvitakki');
  else if (f < 10) add('jacket', 'Takki');
  else if (windy && f < 21) add('windbreaker', 'Tuulitakki');
  else if (f < 14) add('jacket', 'Ohut takki');
  else if (f < 17) add('vest', 'Liivi');

  // Alaosa
  if (f >= 22 && !rainy) add('shorts', 'Shortsit');
  else if (f < -5) add('warmtrousers', 'Lämpimät housut');
  else add('trousers', 'Pitkät housut');
  if (rainy && (s.precip >= 3 || f < 8)) add('rainpants', 'Sadehousut');

  // Kengät
  if (s.slush) add('rubberboots', 'Kumisaappaat');
  else if (snowy || f < 0) add('winterboots', 'Talvikengät');
  else if (s.snowGround) add(s.tAvg > 1 ? 'rubberboots' : 'winterboots', s.tAvg > 1 ? 'Kumisaappaat' : 'Talvikengät'); // lunta maassa, vaikka ei sada
  else if (rainy) add('rubberboots', 'Kumisaappaat');
  else if (sandals) add('sandals', 'Sandaalit');
  else if (f < 7) add('boots', 'Paksut kengät');
  else add('sneakers', 'Lenkkarit');
  if (s.icy) add('icegrips', 'Liukuesteet kenkiin');

  // Asusteet
  // Keväällä ja kesällä (maalis–elokuu) suositellaan aina lakkia, ellei tarvita lämmintä päähinettä.
  const capSeason = s.month >= 3 && s.month <= 8;
  if (f < -12) add('earflap', 'Karvahattu');
  else if (f < 4) add('beanie', 'Pipo');
  else if (rainy && s.stormy) add('rainhat', 'Sadehattu');
  else if (s.uv >= 6 && f >= 10) add('sunhat', 'Aurinkohattu');
  else if (capSeason || (s.uv >= 3 && f >= 10)) add('cap', 'Lippalakki');
  else if (f < 8) add('thinbeanie', 'Ohut pipo');
  if (f < -5) add('mittens', 'Lapaset');
  else if (f < 3) add('gloves', 'Hanskat');
  if (f < -2 || (f < 6 && windy)) add('scarf', 'Kaulahuivi');
  if ((rainy || maybeRain) && !s.thunder) {
    if (!s.stormy) add('umbrella', 'Sateenvarjo');
    else if (!items.some((i) => i.icon === 'raincoat')) add('raincoat', 'Sadetakki');
  }
  if (s.daylight && (s.uv >= 3 || (s.clearish && s.uv >= 1.5))) add('sunglasses', 'Aurinkolasit');
  if (s.uv >= 3) add('sunscreen', 'Aurinkorasva');
  if (f >= 25) add('waterbottle', 'Vesipullo');
  if (s.mosquito) add('mosquito', 'Hyttyssuoja');
  if (s.anyDark) add('reflector', 'Heijastin');
  return items;
}

// Suositus tälle käyttäjälle: avustajan lämpösäätö ja piilotetut vaatteet huomioitu.
const wearFor = (s) => outfit(s, settings.chill).filter((i) => !settings.hidden.includes(i.icon));

// ---------- Piirto ----------
function drawScene(prefix, feel, fx, sky, temp, wear) {
  const p = $(prefix + 'Person');
  p.innerHTML = person(feel, fx, wear.map((i) => i.icon)); // oma, kiinteä SVG-merkkijono
  const words = [FEEL[feel].label, fx.wind && 'tuulinen', fx.rain && 'sataa', fx.snow && 'sataa lunta',
    fx.thunder && 'ukkonen', fx.fog && 'sumua', fx.night && 'pimeää'].filter(Boolean);
  p.setAttribute('aria-label', words.join(', '));
  p.title = words.join(', ');
  $(prefix + 'Icon').innerHTML = sky;
  $(prefix + 'Thermo').innerHTML = thermometer(temp, feel);
  const t = $(prefix + 'Temp');
  t.textContent = deg(temp);
  t.style.color = FEEL[feel].hue;
}

// Vaatteen kuva: avustajan lisäämä valokuva tai piirros.
function fillPicture(el, key) {
  if (photos[key]) {
    const img = document.createElement('img');
    img.className = 'photo';
    img.alt = '';
    img.src = photos[key];
    el.append(img);
  } else {
    el.insertAdjacentHTML('beforeend', ICONS[key]);
  }
}

const HYPHEN = /(Alus|alus|Pitkä|Kumi|Villa|Aurinko|Sateen|Talvi|Liuku|Kaula|Lippa|Hyttys|Karva|Sade|Tuuli|Vesi)(?=[a-zäö]{4,})/g;
function clothesEls(items) {
  return items.map((it) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'item';
    b.title = it.name;
    fillPicture(b, it.icon);
    const label = document.createElement('b');
    label.textContent = it.name.replace(HYPHEN, '$1­'); // pehmeä tavuviiva yhdyssanan osien väliin
    b.append(label);
    b.addEventListener('click', () => speak(it.name)); // painallus sanoo vaatteen nimen
    return b;
  });
}

function render() {
  const data = state.data;
  if (!data) return;
  const w = windows(data);
  if (!w.now.length) return;
  const c = currentOf(data, w.idx);

  // Nyt
  const sNow = summarize(data, w.now);
  const wearNow = wearFor(sNow);
  const feel = feelCat(c.apparent_temperature - settings.chill);
  const fx = {
    wind: c.wind_speed_10m >= WINDY || (c.wind_gusts_10m || 0) >= GUSTY,
    rain: isRainCode(c.weather_code),
    snow: isSnowCode(c.weather_code),
    sun: !!c.is_day && c.weather_code <= 1,
    thunder: c.weather_code >= 95,
    fog: isFogCode(c.weather_code),
    night: !c.is_day,
  };
  drawScene('now', feel, fx, skyIcon(c.weather_code, !!c.is_day), c.temperature_2m, wearNow);
  // dress = kuinka lämpimästi pukeudutaan (sama luku, jolla vaatteet valitaan)
  const dress = feelCat((sNow.feelsMin + sNow.feelsAvg) / 2 - settings.chill);
  state.view = { feel, fx, temp: c.temperature_2m, wear: wearNow, s: sNow, dress };
  $('staleBadge').hidden = !state.stale;

  $('clothes').replaceChildren(...clothesEls(wearNow));
  $('now').hidden = false;
  $('wear').hidden = false;

  // Ilta, jos selvästi erilainen
  const later = $('later');
  later.hidden = true;
  if (w.evening.length) {
    const sEve = summarize(data, w.evening);
    if (veryDifferent(sNow, sEve)) {
      const wearEve = wearFor(sEve);
      drawScene('later', feelCat(sEve.feelsAvg - settings.chill), fxOf(sEve), periodSky(sEve), sEve.tAvg, wearEve);
      const have = new Set(wearNow.map((i) => i.icon));
      const extra = wearEve.filter((i) => !have.has(i.icon));
      const box = $('laterClothes');
      box.replaceChildren();
      if (extra.length) {
        const plus = document.createElement('div');
        plus.className = 'item plus';
        plus.textContent = '+';
        plus.setAttribute('aria-label', 'Ota mukaan illaksi');
        plus.title = 'Ota mukaan illaksi';
        box.append(plus, ...clothesEls(extra));
      }
      box.hidden = !extra.length;
      later.hidden = false;
    }
  }
  fit();
}

// ---------- Pukeminen yksi vaate kerrallaan ----------
const steps = { items: [], i: 0 };
function openSteps() {
  if (!state.view || !state.view.wear.length) return;
  steps.items = state.view.wear;
  steps.i = 0;
  $('steps').hidden = false;
  drawStep();
}
function closeSteps() {
  $('steps').hidden = true;
  if ('speechSynthesis' in window) speechSynthesis.cancel();
}
function drawStep() {
  const n = steps.items.length;
  const done = steps.i >= n;
  $('stepDots').replaceChildren(...steps.items.map((_, k) => {
    const d = document.createElement('span');
    d.className = k < steps.i ? 'dot done' : k === steps.i ? 'dot cur' : 'dot';
    return d;
  }));
  const pic = $('stepPic');
  pic.replaceChildren();
  $('stepPrev').disabled = steps.i === 0;
  if (done) {
    // Kaikki puettu: näytetään valmis ukko.
    pic.innerHTML = person('warm', {}, steps.items.map((i) => i.icon)); // iloinen ukko: kaikki on puettu
    $('stepName').textContent = 'Valmis!';
    pic.onclick = () => speak('Valmis!');
    speak('Valmis! Olet pukenut kaikki vaatteet.');
    return;
  }
  const it = steps.items[steps.i];
  fillPicture(pic, it.icon);
  $('stepName').textContent = it.name;
  pic.onclick = () => speak(sayItem(it));
  speak(sayItem(it));
}

// ---------- Avustajan asetukset ----------
function applySettings() {
  for (const id of ['gpsBtn', 'searchToggle', 'calLink']) $(id).hidden = settings.lock;
  if (settings.lock) toggleSearch(false);
  $('speakBtn').hidden = !settings.speak || !('speechSynthesis' in window);
}

// Valokuva pienennetään neliöksi ennen tallennusta, jotta se mahtuu selaimen muistiin.
function fileToPhoto(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const size = 320;
      const c = document.createElement('canvas');
      c.width = c.height = size;
      const m = Math.min(img.width, img.height);
      c.getContext('2d').drawImage(img, (img.width - m) / 2, (img.height - m) / 2, m, m, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL('image/jpeg', 0.8));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Kuvaa ei voitu lukea')); };
    img.src = url;
  });
}

function clothesRow(key) {
  const row = document.createElement('div');
  row.className = 'set-row';
  const thumb = document.createElement('span');
  thumb.className = 'thumb';
  fillPicture(thumb, key);

  const show = document.createElement('label');
  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.checked = !settings.hidden.includes(key);
  cb.dataset.key = key;
  show.append(cb, ' ' + NAMES[key]);

  const pick = document.createElement('label');
  pick.className = 'btn';
  const file = document.createElement('input');
  file.type = 'file';
  file.accept = 'image/*';
  file.hidden = true;
  file.addEventListener('change', async () => {
    if (!file.files[0]) return;
    try {
      const next = { ...photos, [key]: await fileToPhoto(file.files[0]) };
      if (!store.set('wtw.photos', next)) throw new Error('Muisti täynnä');
      photos = next;
      row.replaceWith(clothesRow(key));
    } catch {
      msg($('setMsg'), 'Kuvaa ei voitu tallentaa. Selaimen muisti voi olla täynnä.', true);
    }
  });
  pick.append(photos[key] ? 'Vaihda kuva' : 'Oma kuva', file);
  row.append(thumb, show, pick);

  if (photos[key]) {
    const del = document.createElement('button');
    del.type = 'button';
    del.textContent = 'Poista kuva';
    del.addEventListener('click', () => {
      const next = { ...photos };
      delete next[key];
      store.set('wtw.photos', next);
      photos = next;
      row.replaceWith(clothesRow(key));
    });
    row.append(del);
  }
  return row;
}

function openSettings() {
  $('setLock').checked = settings.lock;
  $('setSpeak').checked = settings.speak;
  $('setChill').value = String(settings.chill);
  $('setOuting').checked = settings.outing;
  for (const [id, val] of [['setFrom', settings.from], ['setTo', settings.to]]) {
    const sel = $(id);
    if (!sel.options.length) for (let h = 5; h <= 23; h++) sel.add(new Option(`${h}.00`, String(h)));
    sel.value = String(val);
  }
  msg($('setMsg'), '');
  $('setClothes').replaceChildren(...Object.keys(NAMES).map(clothesRow));
  $('settings').showModal();
}

function saveSettings() {
  const from = +$('setFrom').value;
  const to = +$('setTo').value;
  settings = {
    lock: $('setLock').checked,
    speak: $('setSpeak').checked,
    chill: +$('setChill').value,
    outing: $('setOuting').checked,
    from: Math.min(from, to), to: Math.max(from, to),
    hidden: [...$('setClothes').querySelectorAll('input[type=checkbox]')].filter((c) => !c.checked).map((c) => c.dataset.key),
  };
  store.set('wtw.settings', settings);
  applySettings();
  render();
}

// Asetukset avataan pitämällä nappia pohjassa, jotta käyttäjä ei avaa niitä vahingossa.
function holdToOpen(el, fn, ms = 1200) {
  let timer;
  const stop = () => { clearTimeout(timer); el.classList.remove('holding'); };
  el.addEventListener('pointerdown', () => {
    el.classList.add('holding');
    timer = setTimeout(() => { stop(); fn(); }, ms);
  });
  for (const ev of ['pointerup', 'pointerleave', 'pointercancel']) el.addEventListener(ev, stop);
  el.addEventListener('contextmenu', (e) => e.preventDefault());
}

// ---------- Sovitus ruudulle ----------
// Etsii suurimman vaateruudun koon, jolla koko näkymä mahtuu ruudulle ilman vieritystä.
function fit() {
  if (!$('clothes').children.length || $('wear').hidden || document.body.classList.contains('months-mode')) return;
  // [ruudukko, koon kerroin, väli]: illan lisävaatteet ovat hieman pienempiä.
  const boxes = [[$('clothes'), 1, 8]];
  if (!$('later').hidden && !$('laterClothes').hidden) boxes.push([$('laterClothes'), 0.8, 6]);
  const applyBox = ([box, k, gap], s) => {
    const n = box.children.length;
    const W = box.clientWidth;
    const ts = Math.floor(s * k);
    const cols = Math.max(2, Math.min(n, Math.floor((W + gap) / (ts * 1.1 + gap))));
    const tileW = (W - gap * (cols - 1)) / cols;
    const fs = Math.max(9.5, Math.min(17, ts * 0.125, tileW / 5.5));
    box.style.setProperty('--ts', ts + 'px');
    box.style.setProperty('--fs', fs + 'px');
    box.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  };
  const fits = () => document.documentElement.scrollHeight <= window.innerHeight + 1;
  // Suurin koko väliltä lo..hi, jolla sivu mahtuu ruudulle.
  const grow = (targets, lo, hi) => {
    const apply = (s) => targets.forEach((b) => applyBox(b, s));
    apply(lo);
    if (fits()) {
      for (let i = 0; i < 8; i++) {
        const mid = (lo + hi) / 2;
        apply(mid);
        if (fits()) lo = mid; else hi = mid;
      }
    }
    apply(lo);
    return lo;
  };
  // 1) Yhteinen koko kaikille ruudukoille (pienin 48; jos sekään ei mahdu, sivua voi vierittää).
  const base = grow(boxes, 48, 180);
  // 2) Jos ruudukot ovat vierekkäin (vaaka-asento), kumpikin saa kasvaa omaan tilaansa.
  if (boxes.length > 1) for (const b of boxes) grow([b], base, 180);
}
let fitQueued = false;
function queueFit() {
  if (fitQueued) return;
  fitQueued = true;
  requestAnimationFrame(() => { fitQueued = false; fit(); });
}

// ---------- Kuukausien esikatselu (?kuukaudet) ----------
// Tyypillinen sää Etelä- ja Keski-Suomessa kunakin kuukautena.
const MONTHS = [
  { name: 'Tammikuu',  t: -18, feels: -25, code: 0,  day: false, wind: 3 },
  { name: 'Helmikuu',  t: -7,  feels: -11, code: 1,  uv: 2 },
  { name: 'Maaliskuu', t: 0,   feels: -4,  code: 73, snow: 2, pop: 80, precip: 2 },
  { name: 'Huhtikuu',  t: 6,   feels: 3,   code: 2,  wind: 9, uv: 2.5 },
  { name: 'Toukokuu',  t: 14,  feels: 13,  code: 1,  uv: 5, wind: 5 },
  { name: 'Kesäkuu',   t: 19,  feels: 19,  code: 2,  uv: 6, mosquito: true },
  { name: 'Heinäkuu',  t: 27,  feels: 29,  code: 0,  uv: 7 },
  { name: 'Elokuu',    t: 20,  feels: 21,  code: 95, pop: 80, precip: 5, wind: 6 },
  { name: 'Syyskuu',   t: 12,  feels: 10,  code: 61, pop: 70, precip: 1.5, wind: 5 },
  { name: 'Lokakuu',   t: 6,   feels: 3,   code: 45, day: false },
  { name: 'Marraskuu', t: 1,   feels: -3,  code: 71, snow: 1, pop: 80, precip: 2, day: false },
  { name: 'Joulukuu',  t: -4,  feels: -9,  code: 73, snow: 3, pop: 90, precip: 3, day: false },
];

function renderMonths() {
  document.querySelector('.location').hidden = true;
  document.body.classList.add('months-mode');
  const root = $('months');
  root.hidden = false;
  for (const [mi, m0] of MONTHS.entries()) {
    const m = { wind: 4, pop: 0, precip: 0, snow: 0, uv: 0, day: true, mosquito: false, ...m0 };
    const s = derive({
      feelsMin: m.feels - 1, feelsMax: m.feels + 1, feelsAvg: m.feels, tAvg: m.t,
      pop: m.pop, precip: m.precip, snow: m.snow, wind: m.wind, uv: m.uv,
      codes: [m.code], daylight: m.day, anyDark: !m.day, mostlyDay: m.day,
      clearish: m.code <= 2, mosquito: m.mosquito, month: mi + 1,
    });
    const feel = feelCat(m.feels);
    const wear = outfit(s);
    const card = document.createElement('section');
    card.className = 'card month';
    const h = document.createElement('h2');
    h.textContent = m.name;
    const scene = document.createElement('div');
    scene.className = 'scene';
    scene.innerHTML = `<div class="person">${person(feel, { ...fxOf(s), sun: m.day && m.code <= 1 }, wear.map((i) => i.icon))}</div>
      <div class="reading"><div class="sky">${skyIcon(m.code, m.day)}</div>
      <div class="temp" style="color:${FEEL[feel].hue}"><span class="thermo">${thermometer(m.t, feel)}</span>${deg(m.t)}</div></div>`;
    const clothes = document.createElement('div');
    clothes.className = 'clothes';
    clothes.append(...clothesEls(wear));
    card.append(h, scene, clothes);
    root.append(card);
  }
}

// ---------- Päivitys ----------
// Päivitä ennuste (ja sijainti, ellei paikkaa ole valittu käsin) puolen tunnin välein ja kun sivulle palataan.
let lastRefresh = Date.now();
function refresh() {
  if (!state.loc || document.hidden) return;
  lastRefresh = Date.now();
  if (state.loc.mode !== 'manual' && !settings.lock) useGps(true).then((ok) => { if (!ok) loadWeather(); });
  else loadWeather();
}

// ---------- Käynnistys ----------
(async function init() {
  // Päivityksen jälkeen selaimen muistissa voi olla vanha sivu ja uusi koodi. Silloin sivulta puuttuu
  // osia ja se jäisi tyhjäksi. Ladataan sivu kerran uudelleen ohi muistin; jos sekään ei auta,
  // näytetään kuva ja nappi, jolla voi yrittää uudelleen.
  const freshUrl = () => location.pathname + '?v=' + Date.now();
  if (!$('stepBtn') || !$('settings') || !$('offline')) {
    let tried = true;
    try {
      tried = !!sessionStorage.getItem('wtw.reloaded');
      sessionStorage.setItem('wtw.reloaded', '1');
    } catch {}
    if (!tried) return location.replace(freshUrl());
    document.body.innerHTML = `<main><section class="card offline"><div class="offline-pic">${UI.offline}</div>`
      + `<button id="retryBtn" class="big" type="button" aria-label="Yritä uudelleen">${UI.retry}</button>`
      + '<p class="msg">Sovellus päivittyi. Paina nappia.</p></section></main>';
    $('retryBtn').addEventListener('click', () => location.replace(freshUrl()));
    return;
  }
  try { sessionStorage.removeItem('wtw.reloaded'); } catch {}

  // Nappien kuvat
  const icons = {
    gpsBtn: UI.pin, searchToggle: UI.search, searchGo: UI.search, calLink: UI.calendar, backLink: UI.left, gearBtn: UI.gear,
    speakBtn: UI.speaker, stepBtn: UI.dress, stepClose: UI.close, stepPrev: UI.left, stepNext: UI.check,
    retryBtn: UI.retry, offlinePic: UI.offline, staleBadge: UI.offline,
  };
  for (const [id, pic] of Object.entries(icons)) $(id).innerHTML = pic;
  $('stepBtn').insertAdjacentHTML('beforeend', '<span>Pue vaatteet</span>'); // seliteteksti pukemisnappiin

  // Tapahtumat
  $('gpsBtn').addEventListener('click', () => useGps());
  $('searchToggle').addEventListener('click', () => toggleSearch($('searchForm').hidden));
  $('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const q = $('searchInput').value.trim();
    if (q.length >= 2) searchPlace(q);
  });
  const sayAll = () => state.view && speak(summaryText(state.view));
  $('speakBtn').addEventListener('click', sayAll);
  $('nowPerson').addEventListener('click', sayAll);
  $('stepBtn').addEventListener('click', openSteps);
  $('stepClose').addEventListener('click', closeSteps);
  $('stepPrev').addEventListener('click', () => { if (steps.i > 0) { steps.i--; drawStep(); } });
  $('stepNext').addEventListener('click', () => {
    if (steps.i >= steps.items.length) return closeSteps();
    steps.i++;
    drawStep();
  });
  $('retryBtn').addEventListener('click', refresh);
  holdToOpen($('gearBtn'), openSettings);
  $('settings').addEventListener('close', saveSettings);
  window.addEventListener('resize', queueFit);
  window.addEventListener('online', refresh);
  setInterval(refresh, 30 * 60 * 1000);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && Date.now() - lastRefresh > 10 * 60 * 1000) refresh();
  });
  if ('speechSynthesis' in window) speechSynthesis.getVoices(); // ladataan äänet valmiiksi

  // Asennettava sovellus: toimii ilman verkkoa viimeksi haetulla ennusteella.
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});

  if (new URLSearchParams(location.search).has('kuukaudet')) return renderMonths();
  applySettings();

  const saved = store.get('wtw.location', null);
  if (saved && (saved.mode === 'manual' || settings.lock)) return setLocation(saved);
  // Näytä heti jotain, ja tarkenna omaan sijaintiin jos paikannus onnistuu.
  setLocation(saved || DEFAULT_LOC);
  await useGps(true);
})();
