Tegevused:
- Hiirevajutus (.focus mitte .click)
- Tähemärgi sisestamine
- Testsaidi kerimine
  - Luuakse tegevus, mis kerib lehe soovitud kohta
Pärast iga tegevust peab kontrollima, kas leht hakkas laadima. Kui hakkas, siis laadimise lõpetamisel tuleb genereerida tegevus sihtaadressi kontrolliga.

Kontrollid:
- Sihtaadressi kontroll pärast navigeerimist
- Elemendi atribuudi või teksti kontroll (.text, .attr)
  - Elemendil vajutades avatakse valik kõigi tema küljes olevate atribuutidega ja siis saab linnukesega valida, milliseid kontrollitakse. Nimekirjas võiks näidata ka elemendi sisu (.val, .text)

Märkmed:
- Kindlasti peab kasutama getElementFromPoint(), sest sellega on hea määrata, kas element üldse olemas on
