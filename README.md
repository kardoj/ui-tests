﻿# Veebilehe kasutajaliidese testimise rakenduse loomine

## Kirjeldus/eesmärk
Luua töölauarakendus kasutades HTML'i, CSS'i, JavaScript'i ja Electron'i. Avades rakenduse saab kasutaja sisestada veebiaadressi. Sisestatud
aadressil asuv leht avatakse rakenduses. Seejärel on võimalik alustada uue stsenaariumi salvestamist.
Kasutaja tehtud hiirevajutused salvestatakse ja neid on võimalik pärast samas järjekorras automaatselt taasesitada.

## Piirangud
* Aken on alati samade mõõtmetega, millega test oli salvestatud
* Testid esitatakse reaalajas

## Ülesanded
0. Uurida kliki salvestamist, mahamängimist koordinaatidepõhiselt (JavaScript elementFromPoint(x, y).click();)
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

## Lingid
[Blogi](http://kardo.xyz/b/veebilehestiku-testimine/)

## Käivitamine (Windows)
Eelduseks on [Node.js](https://nodejs.org/en/) olemasolu.
Kui repo on kloonitud, siis seal kaustas käivitada `npm install` ja rakenduse käivitamiseks samas kohas `electron .`.
_Build_'ide lingid tulevad siia hiljem.

## Mõtted
* Mida teha nende linkidega, mis avanevad uues aknas?
* Parema hiireklahvi vajutus (pigem vist veebis pole)?

## Võiks teha, aga pole prioriteetsed
* "Navigeeri" vajutades enne lehe laadimist AJAX kontroll, kas selline leht on olemas
