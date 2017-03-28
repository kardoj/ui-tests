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
  - Kontrollitakse, kas pärast klikki hakkas leht laadima, kui hakkas
    - oodatakse ära kuni leht on laetud
    - sisestatakse aadressi kontroll
  - Kui ei hakanud pärast klikki laadima
    - ei tee midagi

Testi taasesitamine:
- "Esita" vajutusega
  - Laetakse failist testi sisu recordingusse tagasi
  - Playeri sees tehakse:
    - isPlaying true
    - Recordingule lisada getActionCount(), et player saaks küsida mitu actionit on kokku
    - Player esitab (mingi actionPerformer on ilmselt vaja) ükshaaval actioneid:
      - Esitab actioni ära ja hoiab sisemiselt meeles, mitmes esitati (performedCount)
      - Saadab dokumendina signaali performed-an-action
      - Ootab dokumendilt vastust, kas finished-loading-after-performing-an-action või  did-not-start-loading-after-an-action
      - Kui kumbki signaalidest tuleb ja performedCount != recording.getActionCount(), esitab uue actioni
      - Kui kumbki signaalidest tuleb ja performedCount == recording.getActionCount(),
      lõpetab taasesituse ja kuvab kokkuvõtte
      - isPlaying false
