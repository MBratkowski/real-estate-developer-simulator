const MUTATION_DEBOUNCE_TIME = 100;
let debounceTimer;
let processedElements = new Set();

function zamienCeny() {
  if (!window.location.hostname.includes("allegro.pl")) return;

  const komunikaty = [
    "nie wiadomo",
    "to zależy",
    "trudno powiedzieć",
    "może być różnie",
    "zależy od wielu czynników",
    "to skomplikowane",
  ];

  const fomoInlineMessages = [
    "🔥 OSTATNIE SZTUKI! 🔥",
    "⚡️ BESTSELLER ⚡️",
    "💎 VIP EDITION 💎",
    "✨ PRZEDSPRZEDAŻ ✨",
    "🌟 LIMITED EDITION 🌟",
    "⭐️ WYPRZEDAŻ ⭐️",
  ];

  const bankMessages = [
    "💸 Weź kredyt! Tylko 28.99% RRSO*! (*po pierwszym miesiącu wzrasta do 69.99%)",
    "🏦 Rata już od 500 zł** (**plus ukryte opłaty, prowizje i ubezpieczenie)",
    "📈 Sprawdź naszą ofertę ze zmiennym oprocentowaniem - co miesiąc nowa niespodzianka!",
    "💰 RRSO tylko 25%! (nie licząc prowizji, ubezpieczenia i opłaty za prowadzenie rachunku)",
    "🎲 Zagraj w ruletkę ze stopą WIBOR!",
    "📝 Przyjdź po kredyt, wyjdź z trzema ubezpieczeniami",
  ];

  const selectors = {
    ceny: '[aria-label*="cena"], .msa3_z4.m3h2_8, .mqu1_1.mp0t_ji.m9qz_yo',
    kupujacy: '[class*="_1e32a_x7RE-"]',
    specyfikacje: ".mgmw_wo.mvrt_8",
    gwarancja: '[class*="_1e32a_x7RE-"] span',
    addToCartButton: '[data-role-type="add-to-cart-button"]',
    cenaZDostawa: ".mqu1_g3.mgn2_12",
    nazwaProduktu: "._1e32a_f18Kx",
    superSprzedawca: ".mpof_ki.m389_6m.msa3_z4.mgn2_12",
    ratyKwota: 'span.mli2_0[style*="font-weight: bold"]',
    ratyInfo: 'span.mli2_0[style*="font-weight: normal"]',
    dostawaInfo: 'span.mli2_0[style*="color: var(--m-color-text-secondary"]',
    ogladalyInfo: 'span.mli2_0[style*="font-weight: normal"]',
  };

  function czyPrzetworzony(element) {
    return processedElements.has(element);
  }

  function oznaczJakoPrzetworzony(element) {
    processedElements.add(element);
  }

  requestAnimationFrame(() => {
    // Przetwarzanie nazw produktów
    document.querySelectorAll(selectors.nazwaProduktu).forEach((element) => {
      if (!czyPrzetworzony(element)) {
        const oryginalnyTekst = element.textContent;
        const slowa = oryginalnyTekst.split(" ");

        // Wstawiamy komunikaty FOMO co kilka słów
        const nowyTekst = slowa
          .reduce((acc, slowo, index) => {
            if (index > 0 && index % 3 === 0) {
              const fomoMsg =
                fomoInlineMessages[
                  Math.floor(Math.random() * fomoInlineMessages.length)
                ];
              return acc + ` ${fomoMsg} ${slowo}`;
            }
            return acc + " " + slowo;
          }, "")
          .trim();

        element.innerHTML = nowyTekst;
        element.style.lineHeight = "1.5";
        element.style.display = "inline-block";
        oznaczJakoPrzetworzony(element);
      }
    });

    // Dodaj nową sekcję do funkcji zamienCeny() przed ostatnim nawiasem }
    // Przetwarzanie informacji o dostawie
    document.querySelectorAll(selectors.dostawaInfo).forEach((element) => {
      if (
        !czyPrzetworzony(element) &&
        element.textContent.includes("dostawa")
      ) {
        element.textContent = "NAPISZ WIADOMOŚĆ DO MINISTERSTWA O DOPŁATY";
        element.style.color = "#cc0000";
        element.style.fontWeight = "bold";
        oznaczJakoPrzetworzony(element);
      }
    });

    document.querySelectorAll(selectors.ogladalyInfo).forEach((element) => {
      if (
        !czyPrzetworzony(element) &&
        element.textContent.includes("kupiły ostatnio")
      ) {
        element.textContent = "OGLĄDAŁO, ŚPIESZ SIĘ!!!!";
        element.style.color = "#ff0000";
        element.style.fontWeight = "bold";
        element.style.fontSize = "1.1em";
        element.style.animation = "blink 1s infinite";

        // Dodaj style animacji do dokumentu
        const style = document.createElement("style");
        style.textContent = `
      @keyframes blink {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
      }
    `;
        document.head.appendChild(style);

        oznaczJakoPrzetworzony(element);
      }
    });

    document.querySelectorAll(selectors.specyfikacje).forEach((element) => {
      if (!czyPrzetworzony(element)) {
        element.textContent =
          komunikaty[Math.floor(Math.random() * komunikaty.length)];
        oznaczJakoPrzetworzony(element);
      }
    });

    // Przetwarzanie cen
    document.querySelectorAll(selectors.ceny).forEach((element) => {
      if (!czyPrzetworzony(element)) {
        element.textContent = "ZAPYTAJ O CENĘ";
        element.style.color = "red";
        element.style.fontWeight = "bold";
        oznaczJakoPrzetworzony(element);
      }
    });

    // Przetwarzanie informacji o ratach
    document.querySelectorAll(selectors.ratyInfo).forEach((element) => {
      if (!czyPrzetworzony(element) && element.textContent.includes("rat")) {
        const bankMessage =
          bankMessages[Math.floor(Math.random() * bankMessages.length)];
        element.textContent = bankMessage + " + ubezpieczenie na życie";
        element.style.color = "#cc0000";
        oznaczJakoPrzetworzony(element);
      }
    });

    // Przetwarzanie kwoty rat
    document.querySelectorAll(selectors.ratyKwota).forEach((element) => {
      if (!czyPrzetworzony(element) && element.textContent.includes("zł")) {
        const kwota = element.textContent.match(/\d+/)[0];
        const nowaKwota = Math.round(parseInt(kwota) * 2.5); // Zwiększamy kwotę o 150%
        element.textContent = `${nowaKwota} zł*`;
        element.style.color = "#cc0000";

        // Dodajemy gwiazdkę z wyjaśnieniem
        const gwiazdka = document.createElement("div");
        gwiazdka.style.fontSize = "0.7em";
        gwiazdka.style.color = "#666";
        gwiazdka.textContent =
          "* kwota może wzrosnąć w zależności od fazy księżyca i humoru prezesa banku oraz dewelopera!!!!";
        element.parentNode.appendChild(gwiazdka);

        oznaczJakoPrzetworzony(element);
      }
    });

    // Przetwarzanie przycisku "Dodaj do koszyka"
    document.querySelectorAll(selectors.addToCartButton).forEach((button) => {
      if (!czyPrzetworzony(button)) {
        const spanElement = button.querySelector("span");
        if (spanElement) {
          spanElement.textContent = "UMÓW SPOTKANIE Z DORADCĄ";
          button.style.backgroundColor = "#c0b283";
          button.style.color = "#2b2b2b";
          button.title =
            "Nasi eksperci czekają by przedstawić spersonalizowaną ofertę";
          oznaczJakoPrzetworzony(button);
        }
      }
    });

    // Przetwarzanie informacji o sprzedawcy
    document.querySelectorAll(selectors.superSprzedawca).forEach((element) => {
      if (!czyPrzetworzony(element)) {
        const textNodes = Array.from(element.childNodes).filter(
          (node) =>
            node.nodeType === Node.TEXT_NODE ||
            (node.nodeType === Node.ELEMENT_NODE && !node.querySelector("img"))
        );

        textNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.includes("od")) {
              node.textContent = "od ";
            } else if (node.textContent.includes("Super Sprzedawcy")) {
              node.textContent = "🏆 LIDERA REGIONU, SUPER DEWELOPER 2025";
            }
          }
        });

        element.style.color = "#2b2b2b";
        element.style.fontWeight = "bold";
        oznaczJakoPrzetworzony(element);
      }
    });
  });
}

// Zoptymalizowany obserwator mutacji z debounce
const obserwator = new MutationObserver(() => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(zamienCeny, MUTATION_DEBOUNCE_TIME);
});

// Uruchomienie skryptu tylko na Allegro
if (window.location.hostname.includes("allegro.pl")) {
  // Inicjalne uruchomienie
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", zamienCeny);
  } else {
    zamienCeny();
  }

  // Rozpoczęcie obserwacji zmian
  obserwator.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}

// Czyszczenie zasobów przy wyłączaniu
window.addEventListener("unload", () => {
  obserwator.disconnect();
  processedElements.clear();
});
