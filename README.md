# Mitä päälle?

Tämä sovellus kertoo, mitä vaatteita kannattaa pukea tänään.

Sovellus katsoo sään puolestasi.
Sitten se näyttää vaatteet kuvina.

**Avaa sovellus tästä: https://kebabkenraali.github.io/what_to_wear_weather/**

## Kenelle sovellus on?

Sovellus sopii kaikille.

Sinun ei tarvitse osata lukea.
Kuvat kertovat, millainen sää on.
Kuvat kertovat myös, mitä vaatteita tarvitset.

Vaatteiden nimet on kirjoitettu lyhyesti ja selkeästi.

## Näin käytät sovellusta

1. Avaa sovellus puhelimella tai tietokoneella.
2. Sovellus kysyy, saako se katsoa, missä olet. Vastaa: Salli.
3. Katso ukkoa. Ukko näyttää, miltä sää tuntuu.
4. Katso vaatteiden kuvat. Pue ne päälle.

Sovellus toimii, kun puhelin on pystyssä.
Sovellus toimii myös, kun puhelin on vaakatasossa.

## Mitä kuvat tarkoittavat?

### Ukko

Ukko näyttää, miltä ulkona tuntuu.

- Ukko tärisee: ulkona on kova pakkanen.
- Ukolla on pipo ja suu on suora: ulkona on kylmä.
- Ukko seisoo rauhassa: ulkona on viileää.
- Ukko hymyilee ja kädet ovat ylhäällä: ulkona on lämmin.
- Ukko on punainen ja hikoilee: ulkona on kuuma.

Ukolla on päällä ne vaatteet, joita sovellus ehdottaa sinulle.

Ukon kuvassa näkyy myös sää:

- viivat tarkoittavat tuulta
- siniset pisarat tarkoittavat sadetta
- valkoiset pallot tarkoittavat lunta
- salama tarkoittaa ukkosta
- kuu tarkoittaa, että ulkona on pimeää.

### Lämpötila

Iso numero kertoo, kuinka monta astetta ulkona on.
Numeron vieressä on lämpömittari.

Väri kertoo saman asian:

- sininen tarkoittaa kylmää
- vihreä tarkoittaa viileää
- oranssi tarkoittaa lämmintä
- punainen tarkoittaa kuumaa.

### Vaatteet

Jokainen vaate on omassa ruudussa.
Ruudussa on vaatteen kuva ja nimi.

Vaatteet ovat pukemisjärjestyksessä.
Ensin tulevat alusvaatteet.
Sitten tulevat paidat, takki, housut ja kengät.
Viimeisenä tulevat pipo, hanskat ja muut pienet tavarat.

### Illan kortti

Joskus illalla sää on erilainen kuin nyt.
Silloin näet toisen kortin.
Kortissa on nuoli ja kuu.

Kortti näyttää illan sään.
Plus-merkin jälkeen ovat vaatteet, jotka kannattaa ottaa mukaan.

## Sijainti

Sovellus tarvitsee tiedon, missä olet.
Näin se löytää oikean sään.

Ylhäällä on kaksi nappia:

- 📍 Tämä nappi hakee paikan, jossa olet nyt.
- 🔍 Tällä napilla voit kirjoittaa paikan nimen itse.

Sovellus muistaa paikan seuraavalla kerralla.

Jos sovellus ei saa tietää, missä olet, se näyttää Helsingin sään.

## Sovellus tuntee Suomen sään

Sovellus ehdottaa oikeita vaatteita joka vuodenaikaan.

- Pimeällä sovellus ehdottaa heijastinta.
- Liukkaalla sovellus ehdottaa liukuesteitä kenkiin.
- Loskassa sovellus ehdottaa kumisaappaita.
- Keväällä ja kesällä sovellus ehdottaa lakkia.
- Kun aurinko paistaa kovaa, sovellus ehdottaa aurinkorasvaa.
- Kesällä sovellus ehdottaa hyttyssuojaa.

## Katso, miltä eri kuukaudet näyttävät

Sovelluksen alareunassa on kalenterin kuva 📅.
Paina sitä.

Näet esimerkin jokaisesta kuukaudesta.
Esimerkit eivät ole oikea sääennuste.
Ne näyttävät, millainen sää Suomessa yleensä on.

## Tietosuoja

Sovellus ei kerää tietoja sinusta.

Sovellus muistaa paikan vain omassa laitteessasi.

Sovellus lähettää paikan kahteen palveluun:

- [Open-Meteo](https://open-meteo.com/) antaa sääennusteen.
- [BigDataCloud](https://www.bigdatacloud.com/) kertoo paikan nimen.

## Ohje tekijälle

Tämä osa on sinulle, joka haluat muuttaa sovellusta.

Sovelluksessa on kolme tiedostoa:

- `index.html` on sivun runko.
- `style.css` kertoo, miltä sivu näyttää.
- `app.js` hakee sään, valitsee vaatteet ja piirtää kuvat.

Sinun ei tarvitse asentaa mitään.

Näin käynnistät sovelluksen omalla koneellasi.
Kirjoita tämä komento sovelluksen kansiossa:

```bash
python -m http.server 8767
```

Avaa sitten selaimessa osoite `http://localhost:8767`.

Vaatteiden säännöt ovat tiedostossa `app.js`.
Etsi kohta, jonka nimi on `outfit`.
