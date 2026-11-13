// Vie kaikki sovelluksen kuvat kansioon kuvat/ ja tekee niistä galleriasivun kuvat/README.md.
// Kuvat otetaan suoraan app.js-tiedostosta, joten ne ovat aina samat kuin sovelluksessa.
//
// Käyttö:  node tools/vie-kuvat.mjs

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'kuvat');

// --- Ladataan app.js ilman selainta: selaimen oliot korvataan tyhjillä sijaisilla. ---
const dummy = new Proxy(function () {}, {
  get: (t, k) => (k === Symbol.toPrimitive ? () => '' : k === 'then' ? undefined : dummy),
  apply: () => dummy,
  construct: () => dummy,
  set: () => true,
});
const sandbox = {
  document: dummy, window: dummy, navigator: {}, localStorage: dummy, location: { search: '?kuukaudet' },
  URLSearchParams, fetch: () => Promise.reject(new Error('ei verkkoa')), requestAnimationFrame: () => {},
  setInterval: () => {}, setTimeout: () => {}, console,
};
const src = fs.readFileSync(path.join(root, 'app.js'), 'utf8')
  .replace(/\(async function init\(\)[\s\S]*$/, '') // ei käynnistetä sovellusta
  + '\n;globalThis.__app = { ICONS, FEEL, MONTHS, EVENINGS, TOPS, SHOES, NAMES, UI, person, outfit, derive, feelCat, fxOf, periodSky, wearFor, eveningExtras, clockPic, thermometer, skyIcon, deg, laterText };';
vm.runInNewContext(src, sandbox);
const { ICONS, FEEL, MONTHS, EVENINGS, TOPS, SHOES, NAMES, UI, person, outfit, derive, feelCat, fxOf, periodSky, wearFor, eveningExtras, clockPic, thermometer, skyIcon, deg, laterText } = sandbox.__app;

// --- Apurit ---
const INK = '#1d2a3a';
const slug = (s) => s.toLowerCase().replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const write = (rel, text) => {
  const file = path.join(out, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text.replace(/\r?\n\s*/g, '\n').trim() + '\n');
};
// Vaatekuva omaksi tiedostokseen: vaalea tausta, jotta kuva näkyy myös tummalla sivulla.
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
// Kuvateksti tallennetaan myös kuvan sisään (title), jotta se kulkee tiedoston mukana.
const iconSvg = (svg, caption) => svg
  .replace('<svg viewBox="0 0 64 64" aria-hidden="true">',
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="128" height="128" role="img"><title>${esc(caption)}</title><rect width="64" height="64" rx="10" fill="#f4f8fd"/>`)
  .replaceAll('var(--ink)', INK);
const personSvg = (svg, caption) => svg
  .replace('<svg viewBox="0 0 120 140" aria-hidden="true">',
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 140" width="240" height="280" role="img"><title>${esc(caption)}</title>`);

// --- Vaatteet ryhmittäin: [avain app.js:ssä, nimi] ---
const GROUPS = [
  ['Alusvaatteet', [['underpants', 'Alushousut'], ['longjohns', 'Pitkät alushousut'], ['socks', 'Sukat'], ['warmsocks', 'Lämpimät sukat'], ['thermal', 'Pitkä aluspaita']]],
  ['Paidat', [['tanktop', 'Hihaton paita'], ['tshirt', 'T-paita'], ['longsleeve', 'Pitkähihainen paita'], ['hoodie', 'Lämmin paita'], ['woolsweater', 'Villapaita']]],
  ['Takit', [['vest', 'Liivi'], ['windbreaker', 'Tuulitakki'], ['jacket', 'Takki'], ['warmjacket', 'Lämmin takki'], ['raincoat', 'Sadetakki'], ['wintercoat', 'Talvitakki'], ['parka', 'Paksu talvitakki']]],
  ['Housut', [['shorts', 'Shortsit'], ['trousers', 'Pitkät housut'], ['rainpants', 'Sadehousut'], ['warmtrousers', 'Lämpimät housut']]],
  ['Kengät', [['sandals', 'Sandaalit'], ['sneakers', 'Lenkkarit'], ['boots', 'Paksut kengät'], ['rubberboots', 'Kumisaappaat'], ['winterboots', 'Talvikengät'], ['icegrips', 'Liukuesteet kenkiin']]],
  ['Päähineet', [['cap', 'Lippalakki'], ['sunhat', 'Aurinkohattu'], ['rainhat', 'Sadehattu'], ['thinbeanie', 'Ohut pipo'], ['beanie', 'Pipo'], ['earflap', 'Karvahattu']]],
  ['Kädet ja kaula', [['gloves', 'Hanskat'], ['mittens', 'Lapaset'], ['scarf', 'Kaulahuivi']]],
  ['Muut tavarat', [['umbrella', 'Sateenvarjo'], ['sunglasses', 'Aurinkolasit'], ['sunscreen', 'Aurinkorasva'], ['waterbottle', 'Vesipullo'], ['mosquito', 'Hyttyssuoja'], ['reflector', 'Heijastin']]],
];

// Kuvateksti: milloin vaate puetaan.
const WHEN = {
  underpants: 'Aina.', longjohns: 'Kun on kova pakkanen.', socks: 'Melkein aina.', warmsocks: 'Kun on pakkasta.', thermal: 'Kun on kova pakkanen.',
  tanktop: 'Kun on helle.', tshirt: 'Kun on lämmin.', longsleeve: 'Kun on vähän viileää.', hoodie: 'Kun on viileää.', woolsweater: 'Kun on kylmä.',
  vest: 'Kun on melkein lämmin.', windbreaker: 'Kun tuulee.', jacket: 'Kun on viileää.', warmjacket: 'Syksyllä, kun on viileää.', raincoat: 'Kun sataa.', wintercoat: 'Kun on kylmä.', parka: 'Kun on kova pakkanen.',
  shorts: 'Kun on kuuma.', trousers: 'Melkein aina.', rainpants: 'Kun sataa paljon.', warmtrousers: 'Kun on pakkasta.',
  sandals: 'Kun on kuuma ja kuivaa.', sneakers: 'Kun on kuivaa.', boots: 'Kun on viileää.', rubberboots: 'Kun sataa tai on loskaa.', winterboots: 'Kun on lunta tai pakkasta.', icegrips: 'Kun on liukasta.',
  cap: 'Keväällä ja kesällä.', sunhat: 'Kun aurinko paistaa kovaa.', rainhat: 'Kun sataa ja tuulee kovaa.', thinbeanie: 'Kun on viileää.', beanie: 'Kun on kylmä.', earflap: 'Kun on kova pakkanen.',
  gloves: 'Kun on kylmä.', mittens: 'Kun on pakkasta.', scarf: 'Kun on kylmä tai tuulee.',
  umbrella: 'Kun sataa.', sunglasses: 'Kun aurinko paistaa.', sunscreen: 'Kun aurinko paistaa kovaa.', waterbottle: 'Kun on helle.', mosquito: 'Kesällä, kun on hyttysiä.', reflector: 'Kun on pimeää.',
};

// --- Ukon olotilat ja sääkuvat ---
const FEELS = [
  ['freezing', 'Kova pakkanen', 'Ukko tärisee.'],
  ['cold', 'Kylmä', 'Ukolla on pipo. Suu on suora.'],
  ['cool', 'Viileä', 'Ukko seisoo rauhassa.'],
  ['warm', 'Lämmin', 'Ukko hymyilee. Kädet ovat ylhäällä.'],
  ['hot', 'Kuuma', 'Ukko on punainen ja hikoilee.'],
];
const COOL_WEAR = ['longsleeve', 'jacket', 'trousers', 'sneakers'];
const WEATHER = [
  ['Tuuli', 'Viivat tarkoittavat tuulta. Ukko nojaa tuulessa.', 'cool', { wind: true }, [...COOL_WEAR.filter((k) => k !== 'jacket'), 'windbreaker']],
  ['Sade', 'Siniset pisarat tarkoittavat sadetta.', 'cool', { rain: true }, ['raincoat', 'trousers', 'rubberboots', 'umbrella']],
  ['Lumi', 'Valkoiset pallot tarkoittavat lunta.', 'cold', { snow: true }, ['wintercoat', 'trousers', 'winterboots', 'beanie', 'scarf', 'gloves']],
  ['Ukkonen', 'Pilvi ja salama tarkoittavat ukkosta.', 'warm', { thunder: true, rain: true }, ['raincoat', 'trousers', 'rubberboots']],
  ['Sumu', 'Vaaleat raidat tarkoittavat sumua.', 'cool', { fog: true }, COOL_WEAR],
  ['Aurinko', 'Aurinko tarkoittaa, että aurinko paistaa.', 'warm', { sun: true }, ['tshirt', 'trousers', 'sneakers', 'cap', 'sunglasses']],
  ['Pimeä', 'Kuu ja tähdet tarkoittavat, että ulkona on pimeää.', 'cool', { night: true }, [...COOL_WEAR, 'reflector']],
];

fs.rmSync(out, { recursive: true, force: true });
const used = new Set();
// Yksi ruutu: kuva, nimi ja kuvateksti.
const cell = (file, name, text, w = 96) =>
  `<td align="center" valign="top" width="${w + 60}"><img src="${file}" width="${w}" alt="${name}. ${text.replace('<br>', ' ')}"><br><b>${name}</b><br>${text}</td>`;
const table = (cells, perRow = 5) => {
  const rows = [];
  for (let i = 0; i < cells.length; i += perRow) rows.push(`<tr>\n${cells.slice(i, i + perRow).join('\n')}\n</tr>`);
  return `<table>\n${rows.join('\n')}\n</table>`;
};

let md = `# Sovelluksen kuvat

Tässä kansiossa ovat kaikki kuvat, joita sovellus käyttää.

Kuvia on neljää lajia:

- vaatteiden kuvat
- ukon kuvat
- esimerkit jokaisesta kuukaudesta
- kaappaukset sovelluksen näkymistä.

Sovellus piirtää kuvat itse.
Tämän kansion kuvat ovat kopioita katselua varten.

## Vaatteet

Jokaisella vaatteella on kuva ja nimi.
Nimen alla lukee, milloin vaate puetaan.
`;

for (const [title, items] of GROUPS) {
  const cells = items.map(([key, name]) => {
    if (!ICONS[key]) throw new Error(`Kuvaa ei löydy: ${key}`);
    used.add(key);
    if (!WHEN[key]) throw new Error(`Kuvateksti puuttuu: ${key}`);
    const file = `vaatteet/${slug(name)}.svg`;
    write(file, iconSvg(ICONS[key], `${name}. ${WHEN[key]}`));
    return cell(file, name, WHEN[key]);
  });
  md += `\n### ${title}\n\n${table(cells)}\n`;
}
const missing = Object.keys(ICONS).filter((k) => !used.has(k));
if (missing.length) throw new Error(`Nämä kuvat puuttuvat galleriasta: ${missing.join(', ')}`);

md += `
## Ukko

Ukko näyttää, miltä ulkona tuntuu.
Taustan väri kertoo saman asian.

`;
md += table(FEELS.map(([feel, name, text]) => {
  const file = `ukko/${slug(name)}.svg`;
  write(file, personSvg(person(feel, { sun: feel === 'warm' }), `${name}. ${text}`));
  return cell(file, name, text, 130);
}));

md += `

## Sää ukon kuvassa

Ukon kuvassa näkyy myös sää.

`;
md += table(WEATHER.map(([name, text, feel, fx, wear]) => {
  const file = `saa/${slug(name)}.svg`;
  write(file, personSvg(person(feel, fx, wear), `${name}. ${text}`));
  return cell(file, name, text, 130);
}), 4);

md += `

## Esimerkki jokaisesta kuukaudesta

Ukolla on päällä vaatteet, joita sovellus ehdottaa.
Säät ovat esimerkkejä. Ne eivät ole oikea sääennuste.

`;
md += table(MONTHS.map((m0, mi) => {
  const m = { wind: 4, pop: 0, precip: 0, snow: 0, uv: 0, day: true, mosquito: false, ...m0 };
  const s = derive({
    feelsMin: m.feels - 1, feelsMax: m.feels + 1, feelsAvg: m.feels, tAvg: m.t,
    pop: m.pop, precip: m.precip, snow: m.snow, wind: m.wind, uv: m.uv,
    codes: [m.code], daylight: m.day, anyDark: !m.day, mostlyDay: m.day,
    clearish: m.code <= 2, mosquito: m.mosquito, month: mi + 1,
  });
  const items = outfit(s);
  const wear = items.map((i) => i.icon);
  const feel = feelCat(m.feels);
  const file = `kuukaudet/${String(mi + 1).padStart(2, '0')}-${slug(m.name)}.svg`;
  // Kuvateksti: lämpötila, sää ja vaatteet, jotka näkyvät ukon päällä.
  const deg = `${m.t < 0 ? '−' : m.t > 0 ? '+' : ''}${Math.abs(m.t)} astetta`;
  const sky = [
    s.thunder ? 'Ukkostaa' : s.snowy ? 'Sataa lunta' : s.rainy ? 'Sataa' : s.foggy ? 'On sumua'
      : m.code <= 1 && m.day ? 'Aurinko paistaa' : m.code <= 1 ? 'Taivas on selkeä' : 'On pilvistä',
    s.windy && 'Tuulee', !m.day && 'On pimeää',
  ].filter(Boolean).join('. ');
  const top = TOPS.find((k) => wear.includes(k));
  const shown = [top, 'shorts', 'rainpants', 'warmtrousers', 'trousers', ...Object.keys(SHOES),
    'earflap', 'beanie', 'thinbeanie', 'rainhat', 'sunhat', 'cap', 'mittens', 'gloves', 'scarf', 'sunglasses', 'umbrella', 'reflector'];
  const names = items.filter((i) => shown.includes(i.icon)).map((i) => i.name.replace(' päälle', '').toLowerCase());
  const text = `${deg}. ${FEEL[feel].label}. ${sky}.<br>Ukolla on: ${names.join(', ')}.`;
  write(file, personSvg(person(feel, { ...fxOf(s), sun: m.day && m.code <= 1 }, wear), `${m.name}. ${text.replace('<br>', ' ')}`));
  return cell(file, m.name, text, 130);
}), 3);

// --- Näkymien kaappaukset: piirretään samalla logiikalla kuin sovelluksen kortit ---
const FONT = 'font-family="Segoe UI, system-ui, sans-serif"';
const T = (x, y, s, o = {}) => {
  const { size = 15, w = 400, col = INK, anchor = 'middle', italic = false } = o;
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" ${FONT} font-size="${size}" font-weight="${w}" fill="${col}"${italic ? ' font-style="italic"' : ''}>${esc(s)}</text>`;
};
// Riko pitkä teksti sanavälein riveille.
const lines = (s, max) => {
  const out = [];
  let cur = '';
  for (const word of String(s).split(' ')) {
    const next = cur ? `${cur} ${word}` : word;
    if (next.length > max && cur) { out.push(cur); cur = word; } else cur = next;
  }
  if (cur) out.push(cur);
  return out;
};
// Upotetaan sovelluksen svg-kuvat isomman kuvan sisään <g>-ryhminä.
const EMBED = {
  icon: (inner, x, y, w) => inner.replace('<svg viewBox="0 0 64 64" aria-hidden="true">', `<g transform="translate(${x} ${y}) scale(${(w / 64).toFixed(4)})">`).replace(/<\/svg>\s*$/, '</g>'),
  person: (inner, x, y, w) => inner.replace('<svg viewBox="0 0 120 140" aria-hidden="true">', `<g transform="translate(${x} ${y}) scale(${(w / 120).toFixed(4)})">`).replace(/<\/svg>\s*$/, '</g>'),
  thermo: (inner, x, y, h) => inner.replace('<svg viewBox="0 0 24 64" aria-hidden="true">', `<g transform="translate(${x} ${y}) scale(${(h / 64).toFixed(4)})">`).replace(/<\/svg>\s*$/, '</g>'),
};
// Yhteenveto testisäästä (sama kaava kuin kuukausiesimerkeissä).
const summaryOf = (v) => {
  const o = { wind: 4, pop: 0, precip: 0, snow: 0, uv: 0, day: true, ...v };
  return derive({
    feelsMin: o.feels - 1, feelsMax: o.feels + 1, feelsAvg: o.feels, tAvg: o.t,
    pop: o.pop, precip: o.precip, snow: o.snow, wind: o.wind, uv: o.uv,
    codes: [o.code], daylight: o.day, anyDark: !o.day, mostlyDay: o.day,
    clearish: o.code <= 2, mosquito: false, month: o.month,
  });
};

const CARD_W = 500;
const frame = (H, title) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CARD_W} ${H}" width="${CARD_W}" height="${H}" role="img"><title>${esc(title)}</title>
  <rect width="${CARD_W}" height="${H}" rx="18" fill="#eef5fd"/>
  <rect x="8" y="8" width="${CARD_W - 16}" height="${H - 16}" rx="14" fill="#ffffff" stroke="#b9cfe9" stroke-width="3"/>`;

// Illan kortin kaappaus: kello ja kuu, illan ukko, lämpötila, reppu ja puhe.
const eveningCard = (e) => {
  const sNow = summaryOf(e.now), sEve = summaryOf(e.eve);
  const wearNow = wearFor(sNow);
  const extra = eveningExtras(wearNow, sEve);
  const feel = feelCat(sEve.feelsAvg);
  const sky = periodSky(sEve);
  const depLines = lines(`Lähtiessä: ${wearNow.map((i) => i.name.replace(' päälle', '')).join(', ')}.`, 64);
  const sayLines = lines(laterText({ hour: e.hour, s: sEve, now: sNow, extra }), 72);
  const p = [T(CARD_W / 2, 42, e.name, { size: 22, w: 700 })];
  depLines.forEach((l, i) => p.push(T(24, 66 + i * 15, l, { size: 11.5, col: '#5a6b80', anchor: 'start' })));
  const headY = 66 + depLines.length * 15 + 12;
  p.push(EMBED.icon(clockPic(e.hour), 110, headY, 56));
  p.push(T(CARD_W / 2, headY + 46, `${String(e.hour).padStart(2, '0')}:00`, { size: 30, w: 800 }));
  p.push(EMBED.icon(UI.moon, 336, headY, 52));
  const sceneY = headY + 64;
  p.push(EMBED.person(person(feel, fxOf(sEve), [...wearNow, ...extra].map((i) => i.icon)), 46, sceneY, 172));
  p.push(EMBED.icon(skyIcon(e.eve.code, e.eve.day !== false), 322, sceneY + 16, 74));
  p.push(EMBED.thermo(thermometer(sEve.tAvg, feel), 334, sceneY + 104, 44));
  p.push(T(376, sceneY + 152, deg(sEve.tAvg), { size: 30, w: 800, col: FEEL[feel].text }));
  let y = sceneY + 232;
  if (extra.length) {
    p.push(EMBED.icon(UI.bag, 32, y, 60));
    extra.slice(0, 5).forEach((it, i) => p.push(EMBED.icon(ICONS[it.icon], 128 + i * 68, y + 2, 56)));
    p.push(T(128, y + 84, `Mukaan: ${extra.map((i) => i.name).join(', ')}`, { size: 13, anchor: 'start' }));
    y += 100;
  }
  sayLines.forEach((l, i) => p.push(T(24, y + 26 + i * 18, l, { size: 13, col: '#5a6b80', anchor: 'start', italic: true })));
  const H = y + 26 + sayLines.length * 18 + 16;
  return frame(H, `Illan kortti: ${e.name}`) + `<g>${p.join('\n')}</g></svg>`;
};

// Etusivun kaappaus: sijainti, nyt-kortti ja vaatelista.
const homeCard = () => {
  const s = summaryOf({ t: 8, feels: 6, code: 61, wind: 5, pop: 60, precip: 2, month: 10 });
  const wear = wearFor(s);
  const feel = feelCat((s.feelsMin + s.feelsAvg) / 2);
  const rows = Math.ceil(wear.length / 5);
  const H = 396 + rows * 96 + 18;
  const p = [];
  p.push(EMBED.icon(UI.pin, 44, 26, 46));
  p.push(T(104, 58, 'Helsinki', { size: 24, w: 700, anchor: 'start' }));
  p.push(EMBED.icon(UI.search, 410, 26, 46));
  p.push(`<rect x="14" y="86" width="${CARD_W - 28}" height="290" rx="16" fill="#ffffff" stroke="#d7e4f2" stroke-width="2.5"/>`);
  p.push(EMBED.person(person(feel, { ...fxOf(s), rain: true }, wear.map((i) => i.icon)), 56, 108, 180));
  p.push(EMBED.icon(skyIcon(61, true), 316, 128, 80));
  p.push(EMBED.thermo(thermometer(s.tAvg, feel), 328, 232, 52));
  p.push(T(374, 282, deg(s.tAvg), { size: 32, w: 800, col: FEEL[feel].text }));
  p.push(EMBED.icon(UI.speaker, 296, 316, 44));
  p.push(EMBED.icon(UI.dress, 356, 316, 44));
  wear.slice(0, rows * 5).forEach((it, i) => {
    const x = 44 + (i % 5) * 92, y = 406 + Math.floor(i / 5) * 96;
    p.push(`<rect x="${x - 6}" y="${y - 12}" width="86" height="88" rx="12" fill="#f4f8fd" stroke="#d7e4f2" stroke-width="1.5"/>`);
    p.push(EMBED.icon(ICONS[it.icon], x + 9, y - 2, 50));
    p.push(T(x + 34, y + 66, it.name, { size: 10.5 }));
  });
  return frame(H, 'Mitä päälle? Etusivu') + `<g>${p.join('\n')}</g></svg>`;
};

fs.mkdirSync(path.join(out, 'kaappaukset'), { recursive: true });
write('kaappaukset/etusivu.svg', homeCard());

md += `

## Näkymien kaappaukset

Näin sovellus näyttää.
Esimerkissä sataa, joten ukolla on sadetakki ja sateenvarjo.

![Etusivu](kaappaukset/etusivu.svg)

## Illan kortin esimerkit (?ilta)

Nämä ovat samat esimerkit kuin sovelluksen ?ilta-esikatselussa.
Ilta on eri säinen kuin lähtiessä, ja reppuun kannattaa ottaa tavaraa.

`;
const eveningCells = EVENINGS.map((e) => {
  const file = `kaappaukset/illan-kortti-${slug(e.name)}.svg`;
  write(file, eveningCard(e));
  const take = eveningExtras(wearFor(summaryOf(e.now)), summaryOf(e.eve)).map((i) => i.name).join(', ');
  return cell(file, e.name, `Kello ${String(e.hour).padStart(2, '0')}. Mukaan: ${take || 'ei mitään'}.`, 420);
});
md += table(eveningCells, 2);

md += `

## Ohje tekijälle

Älä muuta tämän kansion kuvia käsin.
Kuvat tehdään tiedostosta \`app.js\`.

Kun muutat sovelluksen kuvia, tee kansio uudelleen tällä komennolla:

\`\`\`bash
node tools/vie-kuvat.mjs
\`\`\`
`;

fs.writeFileSync(path.join(out, 'README.md'), md);

// --- Sovelluksen logo: iloinen ukko talvivaatteissa ---
// icon.svg on tavallinen logo. icon-maskable.svg on sama pienempänä, jotta puhelin voi
// leikata kuvakkeen pyöreäksi. PNG-versiot tehdään näistä erikseen (katso README).
const logoWear = ['wintercoat', 'trousers', 'winterboots', 'beanie', 'scarf', 'mittens'];
const logo = (viewBox, bg) => person('warm', {}, logoWear)
  .replace('<svg viewBox="0 0 120 140" aria-hidden="true">', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="512" height="512" role="img"><title>Mitä päälle?</title>`)
  .replace(/<rect width="120" height="140" rx="20" fill="[^"]*"\/>/, bg)
  .replace(/\r?\n\s*/g, '\n');
const icons = path.join(root, 'icons');
fs.mkdirSync(icons, { recursive: true });
fs.writeFileSync(path.join(icons, 'icon.svg'), logo('-10 0 140 140', '<rect x="-10" width="140" height="140" rx="28" fill="#cfe6ff"/>'));
fs.writeFileSync(path.join(icons, 'icon-maskable.svg'), logo('-35 -22 190 190', '<rect x="-35" y="-22" width="190" height="190" fill="#cfe6ff"/>'));
const count = fs.readdirSync(out, { recursive: true }).filter((f) => String(f).endsWith('.svg')).length;
console.log(`Valmis: ${count} kuvaa kansiossa kuvat/`);
