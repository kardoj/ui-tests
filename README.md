# Veebisaidi kasutajaliidese testimise rakenduse arendamine
## Development of Website User Interface Testing Software

## Kirjeldus/eesmärk
Luua töölauarakendus kasutades Electroni (JavaScript, HTML, CSS). Esimese sammuna saab kasutaja sisestada veebiaadressi, millist tahab testida.
Aadressil asuv sait avatakse rakenduses. Seejärel saab alustada uue stsenaariumi (testi) salvestamist. Kasutaja saab teha erinevaid tegevusi, mida veebilehel
on võimalik teha. Kogu tegevuste jada salvestatakse. Kasutaja saab testile nime anda ja seda hiljem taasesitada. Rakendus annab esitamise käigus (ebaõnnestumise korral)
või taasesituse lõppedes (õnnestunud läbimise korral) kasutajale stsenaariumi läbimise kohta tagasisidet.
Niisugust tehnikat kasutades on ilma iga kord käsitsi proovimata võimalik kindel olla, et vajalikud kasutajaliidese elemendid on pärast täiendavate arenduste lisamist säilinud.

## Ülesanded
0. Uurida kliki salvestamist, mahamängimist koordinaatidepõhiselt (JavaScript document.elementFromPoint(x, y).click();)
1. Electron rakendus, kuhu saab veebilehe sisse laadida
2. Leida mõned konkurendid ja nende pakutavat funktsionaalsust uurida ja võrrelda
  1. Uurida automaattestimise skoopi (mida kuidas saab ja on mõistlik UI poolel testida)
  2. Teha valik, mida ja kuidas rakendusega katta sealt skoobist
3. Alusta salvestust võimalus, pärast mida hakkab taimer käima ja vajutusi järjekorras salvestama
4. Salvestuste failide eksport ja import (paika panna salvestuste formaat [JSON?])
5. Salvestuste valik ja mahamängimine
6. Igal hetkel on võimalik salvestus panna pausile ja lisada sellesse kohta mõne elemendi olemasolu kontroll
7. Peaks kuidagi saama tagasisidet/valideerima seda rakendust nt ekspertide abil, kes proovivad mingi asja lahendada (thinkaloud testing).
8. Kui aega jääb üle (ei jää), uurida, kuidas taasesitust optimeerida (kiirust suurendada, äkki kuidagi loobuda reaalajast)

## Töögraafik
Graafik venitas README.md liiga pikaks ja ma panin ta eraldi faili: SCHEDULE.md. Hakkan sinna ka tehtud tegevusi märkima. Üldine progress jääb ikka siia.

## Progress
* Lehekülgedele saab navigeerida
* Akna suurust saab valida
* _Guest_ lehe klikid registreeritakse _Parent_ lehel (asukohad saab kätte)
* Saab luua uue testi, selle salvestada ja kustutada
* Salvestada saab hiirevajutusi, sisestada sisestusi, kerida. Testi saab taasesitada.
* Vorme saab Enterit vajutades saata
* Elemendi atribuutide kontroll
* Salvestuse taasesitusel kuvatakse paneel, mis näitab mitu tegevust on edukalt läbitud.
* Test esitatakse alati samade mõõtmetega aknas, millega see salvestati.

## Lingid
[Blogi](http://kardo.xyz/b/veebilehestiku-testimine/)

## Käivitamine (Windows)
Eelduseks on [Node.js](https://nodejs.org/en/) olemasolu.
Vajalik võib olla Electroni globaalselt installeerimine `npm install -g electron`.
Kui repo on kloonitud, siis seal kaustas käivitada `npm install` ja rakenduse käivitamiseks samas kohas `electron .`.
_Buildide_ lingid tulevad siia hiljem.

## Mured
* Mõnel dokumendil ei tundu `<webview preload='...'>` miskipärast toimivat. Näiteks minu blogis http://kardo.xyz/b laetakse skript külge, aga
  ühel suvalisel HTML eksperimendil samas domeenis http://kardo.xyz/katsetused/tabs.html paistab, et ei laeta.

## Võiks teha, aga pole prioriteetsed
* "Navigeeri" vajutades enne lehe laadimist AJAX kontroll, kas selline leht on olemas
* Testi taasesitamise tagasiside paremaks

## Teadaolevad piirangud
* Aken on alati samade mõõtmetega, millega test oli salvestatud
* ~~Testid esitatakse reaalajas~~
  - Arenduse käigus on selgunud, et Electroni ja tema `<webview>` _tagi_ kasutades on võimalik kuulata `did-start-loading` ja `did-stop-loading` _evente_,
    mis teeb võimalikuks testide esitamise nii kiiresti, kui see võrgu poolt võimaldatud on.
* `alert()`'iga või `prompt()`'iga ei suuda tester midagi teha
* Valikukast ei tööta
* Sisestus ei tööta nuppu all hoides (saadetakse ainult keydown)
* Uues aknas avanevad asjad ei ole testitavad
* Tabulaatoriga vormil liikumine ja andmete sisestamine ei tööta
