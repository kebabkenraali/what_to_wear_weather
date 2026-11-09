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
  + '\n;globalThis.__app = { ICONS, FEEL, MONTHS, person, outfit, derive, feelCat, fxOf };';
vm.runInNewContext(src, sandbox);
const { ICONS, FEEL, MONTHS, person, outfit, derive, feelCat, fxOf } = sandbox.__app;

// --- Apurit ---
const INK = '#1d2a3a';
const slug = (s) => s.toLowerCase().replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const write = (rel, text) => {
  const file = path.join(out, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text.replace(/\r?\n\s*/g, '\n').trim() + '\n');
};
// Vaatekuva omaksi tiedostokseen: vaalea tausta, jotta kuva näkyy myös tummalla sivulla.
const iconSvg = (svg) => svg
  .replace('<svg viewBox="0 0 64 64" aria-hidden="true">',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="128" height="128"><rect width="64" height="64" rx="10" fill="#f4f8fd"/>')
  .replaceAll('var(--ink)', INK);
const personSvg = (svg) => svg
  .replace('<svg viewBox="0 0 120 140" aria-hidden="true">', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 140" width="240" height="280">');

// --- Vaatteet ryhmittäin: [avain app.js:ssä, nimi] ---
const GROUPS = [
  ['Alusvaatteet', [['underpants', 'Alushousut'], ['longjohns', 'Pitkät alushousut'], ['socks', 'Sukat'], ['warmsocks', 'Lämpimät sukat'], ['thermal', 'Pitkä aluspaita']]],
  ['Paidat', [['tanktop', 'Hihaton paita'], ['tshirt', 'T-paita'], ['longsleeve', 'Pitkähihainen paita'], ['hoodie', 'Lämmin paita'], ['woolsweater', 'Villapaita']]],
  ['Takit', [['vest', 'Liivi'], ['windbreaker', 'Tuulitakki'], ['jacket', 'Takki'], ['raincoat', 'Sadetakki'], ['wintercoat', 'Talvitakki'], ['parka', 'Paksu talvitakki']]],
  ['Housut', [['shorts', 'Shortsit'], ['trousers', 'Pitkät housut'], ['rainpants', 'Sadehousut'], ['warmtrousers', 'Lämpimät housut']]],
  ['Kengät', [['sandals', 'Sandaalit'], ['sneakers', 'Lenkkarit'], ['boots', 'Paksut kengät'], ['rubberboots', 'Kumisaappaat'], ['winterboots', 'Talvikengät'], ['icegrips', 'Liukuesteet kenkiin']]],
  ['Päähineet', [['cap', 'Lippalakki'], ['sunhat', 'Aurinkohattu'], ['rainhat', 'Sadehattu'], ['thinbeanie', 'Ohut pipo'], ['beanie', 'Pipo'], ['earflap', 'Karvahattu']]],
  ['Kädet ja kaula', [['gloves', 'Hanskat'], ['mittens', 'Lapaset'], ['scarf', 'Kaulahuivi']]],
  ['Muut tavarat', [['umbrella', 'Sateenvarjo'], ['sunglasses', 'Aurinkolasit'], ['sunscreen', 'Aurinkorasva'], ['waterbottle', 'Vesipullo'], ['mosquito', 'Hyttyssuoja'], ['reflector', 'Heijastin']]],
];

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
const cell = (file, name) => `<td align="center" width="140"><img src="${file}" width="96" alt="${name}"><br>${name}</td>`;
const table = (cells, perRow = 5) => {
  const rows = [];
  for (let i = 0; i < cells.length; i += perRow) rows.push(`<tr>\n${cells.slice(i, i + perRow).join('\n')}\n</tr>`);
  return `<table>\n${rows.join('\n')}\n</table>`;
};

let md = `# Sovelluksen kuvat

Tässä kansiossa ovat kaikki kuvat, joita sovellus käyttää.

Kuvia on kolmea lajia:

- vaatteiden kuvat
- ukon kuvat
- esimerkit jokaisesta kuukaudesta.

Sovellus piirtää kuvat itse.
Tämän kansion kuvat ovat kopioita katselua varten.

## Vaatteet

Jokaisella vaatteella on kuva ja nimi.
`;

for (const [title, items] of GROUPS) {
  const cells = items.map(([key, name]) => {
    if (!ICONS[key]) throw new Error(`Kuvaa ei löydy: ${key}`);
    used.add(key);
    const file = `vaatteet/${slug(name)}.svg`;
    write(file, iconSvg(ICONS[key]));
    return cell(file, name);
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
  write(file, personSvg(person(feel, { sun: feel === 'warm' })));
  return `<td align="center" width="170"><img src="${file}" width="130" alt="${name}"><br><b>${name}</b><br>${text}</td>`;
}));

md += `

## Sää ukon kuvassa

Ukon kuvassa näkyy myös sää.

`;
md += table(WEATHER.map(([name, text, feel, fx, wear]) => {
  const file = `saa/${slug(name)}.svg`;
  write(file, personSvg(person(feel, fx, wear)));
  return `<td align="center" width="170"><img src="${file}" width="130" alt="${name}"><br><b>${name}</b><br>${text}</td>`;
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
  const wear = outfit(s).map((i) => i.icon);
  const file = `kuukaudet/${String(mi + 1).padStart(2, '0')}-${slug(m.name)}.svg`;
  write(file, personSvg(person(feelCat(m.feels), { ...fxOf(s), sun: m.day && m.code <= 1 }, wear)));
  const deg = `${m.t < 0 ? '−' : m.t > 0 ? '+' : ''}${Math.abs(m.t)} astetta`;
  return `<td align="center" width="170"><img src="${file}" width="130" alt="${m.name}"><br><b>${m.name}</b><br>${deg}</td>`;
}), 4);

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
const count = fs.readdirSync(out, { recursive: true }).filter((f) => String(f).endsWith('.svg')).length;
console.log(`Valmis: ${count} kuvaa kansiossa kuvat/`);
