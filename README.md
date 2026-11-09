# Mitä päälle?

Selaimessa toimiva sovellus, joka hakee paikallisen sääennusteen ja näyttää yksinkertaisilla kuvilla, mitä vaatteita kannattaa pukea päälle.

**Avaa sovellus: https://kebabkenraali.github.io/what_to_wear_weather/**

Sovellus on tehty niin, että sitä voi käyttää myös ihminen, joka ei osaa lukea: sää, lämpötila ja vaatteet näytetään kuvina, ja vaatteiden nimet ovat lyhyitä ja selkokielisiä.

## Mitä sovellus tekee

- **Sijainti:** hakee laitteen sijainnin (📍) tai paikkakunnan voi valita käsin (🔍). Valinta jää muistiin selaimeen.
- **Ukko:** piirretty hahmo näyttää, miltä sää tuntuu (kova pakkanen, kylmä, viileä, lämmin, kuuma), ja sillä on päällään samat vaatteet, joita sovellus ehdottaa. Tuuli, sade, lumi, sumu, ukkonen ja yö näkyvät kuvassa.
- **Lämpötila:** iso numero ja lämpömittari, joiden väri kertoo saman kuin ukko.
- **Vaatteet:** kuvat ja selkokieliset nimet alusvaatteista päällysvaatteisiin ja asusteisiin. Suositus lasketaan seuraavan neljän tunnin säästä.
- **Ilta:** jos illan (klo 18–22) sää on selvästi erilainen, näytetään erillinen kortti ja vaatteet, jotka kannattaa ottaa mukaan.
- **Suomen vuodenajat:** mukana ovat muun muassa heijastin pimeällä, liukuesteet liukkaalla, kumisaappaat loskassa, hyttyssuoja kesällä sekä lakki ja aurinkorasva keväällä ja kesällä.
- **Ruudulle sovitus:** näkymä mahtuu ruudulle ilman vieritystä puhelimella pysty- ja vaaka-asennossa sekä tietokoneella.

## Käyttö

Helpoimmin sovellusta käyttää osoitteessa https://kebabkenraali.github.io/what_to_wear_weather/. Puhelimessa sivun voi lisätä aloitusnäyttöön selaimen valikosta.

Sovellus on pelkkää HTML:ää, CSS:ää ja JavaScriptiä. Asennusta, rakennusvaihetta tai API-avaimia ei tarvita.

Omalla koneella sen saa käyntiin käynnistämällä paikallisen palvelimen projektin kansiossa:

```bash
python -m http.server 8767
```

Avaa sitten selaimessa `http://localhost:8767`.

Laitteen paikannus toimii selaimissa vain `localhost`-osoitteessa tai HTTPS-yhteydellä. Jos paikannus ei onnistu, sovellus näyttää Helsingin sään, kunnes paikkakunta valitaan käsin.

## Kuukausien esikatselu

Osoitteessa `?kuukaudet` (tai alareunan 📅-linkistä) näkee, miltä sovellus näyttää kunakin kuukautena. Säät ovat käsin valittuja tyypillisiä esimerkkejä Etelä- ja Keski-Suomesta, eivät oikeaa ennustetta.

## Tiedostot

| Tiedosto | Sisältö |
|---|---|
| `index.html` | Sivun rakenne |
| `style.css` | Ulkoasu, tumma tila, vaaka-asento |
| `app.js` | Sään haku, pukeutumissäännöt, ukon ja vaatteiden SVG-kuvat |

Pukeutumissäännöt ovat `app.js`-tiedoston funktiossa `outfit`, ja ukon olotilojen rajat funktiossa `feelCat`.

## Tietolähteet

- Sääennuste ja paikkakuntahaku: [Open-Meteo](https://open-meteo.com/)
- Oman sijainnin paikannimi: [BigDataCloud](https://www.bigdatacloud.com/) (koordinaatit lähetetään palveluun nimen hakemiseksi)

Sijaintia ei tallenneta muualle kuin käyttäjän omaan selaimeen.
