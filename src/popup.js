const DEFAULT_SETTINGS = {
  komunikaty: [
    "nie wiadomo",
    "to zależy",
    "trudno powiedzieć",
    "może być różnie",
    "zależy od wielu czynników",
    "to skomplikowane"
  ],
  fomoMessages: [
    "🔥 OSTATNIE SZTUKI! 🔥",
    "⚡️ BESTSELLER ⚡️",
    "💎 VIP EDITION 💎",
    "✨ PRZEDSPRZEDAŻ ✨",
    "🌟 LIMITED EDITION 🌟",
    "⭐️ WYPRZEDAŻ ⭐️"
  ],
  bankMessages: [
    "💸 Weź kredyt! Tylko 28.99% RRSO*!",
    "🏦 Rata już od 500 zł**",
    "📈 Sprawdź naszą ofertę ze zmiennym oprocentowaniem",
    "💰 RRSO tylko 25%!",
    "🎲 Zagraj w ruletkę ze stopą WIBOR!",
    "📝 Przyjdź po kredyt, wyjdź z trzema ubezpieczeniami"
  ]
};

// Load settings when popup opens
document.addEventListener('DOMContentLoaded', async () => {
  const settings = await chrome.storage.sync.get(DEFAULT_SETTINGS);
  
  document.getElementById('komunikaty').value = settings.komunikaty.join('\n');
  document.getElementById('fomoMessages').value = settings.fomoMessages.join('\n');
  document.getElementById('bankMessages').value = settings.bankMessages.join('\n');
});

// Save settings
document.getElementById('save').addEventListener('click', async () => {
  const settings = {
    komunikaty: document.getElementById('komunikaty').value.split('\n').filter(line => line.trim()),
    fomoMessages: document.getElementById('fomoMessages').value.split('\n').filter(line => line.trim()),
    bankMessages: document.getElementById('bankMessages').value.split('\n').filter(line => line.trim())
  };

  await chrome.storage.sync.set(settings);
  
  const status = document.getElementById('status');
  status.style.display = 'block';
  setTimeout(() => {
    status.style.display = 'none';
  }, 2000);
}); 