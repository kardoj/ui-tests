Tegevused:
- Hiirevajutus (.focus mitte .click)
- Tähemärgi sisestamine
- Testsaidi kerimine
  - Luuakse tegevus, mis kerib lehe soovitud kohta
Pärast iga tegevust peab kontrollima, kas leht hakkas laadima. Kui hakkas, siis laadimise lõpetamisel tuleb genereerida tegevus sihtaadressi kontrolliga.

Üks natuke teist tüüpi tegevus on navigeerimistegevus. Sellega liigutakse lihtsalt ühelt lehelt teisele. Navigeerimistegevusega paralleelselt käib alati sihtaadressi kontroll.

Kontrollid:
- Sihtaadressi kontroll pärast navigeerimist
- Elemendi atribuudi või teksti kontroll (.text, .attr)
  - Elemendil vajutades avatakse valik kõigi tema küljes olevate atribuutidega ja siis saab linnukesega valida, milliseid kontrollitakse. Nimekirjas võiks näidata ka elemendi sisu (.val, .text)
  - Võiks olla ka lihtsalt elemendi olemasolu kontroll

Märkmed:
- Kindlasti peab kasutama document.elementFromPoint(), sest sellega on hea määrata, kas element üldse olemas on

Testi salvestamine:
- "Alusta salvestamist" vajutusega
  - luuakse navigeerimistegevus hetkel avatud lehele
- Hiirevajutusel salvestatakse klikk tegevusena
  - Kontrollitakse, kas pärat klikki hakkas leht laadima, kui hakkas
    - oodatakse ära kuni leht on laetud
    - sisestatakse aadressi kontroll
  - Kui ei hakanud pärast klikki laadima
    - ei tee midagi

Testi taasesitamine:
- "Esita" vajutusega
  - Mängitakse järjest tegevused ja kontrollid. Kui pärast tegevuse tegemist hakkas leht laadima, oodatakse laadimise lõppu enne järgmise tegevuse tegemist. Vastasel juhul oodatakse
    konfiguratsioonis määratud aeg (nt. 3 sekundit) ja käivitatakse seejärel järgmine tegevus
