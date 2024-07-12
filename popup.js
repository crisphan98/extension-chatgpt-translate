document.addEventListener('DOMContentLoaded', () => {
  const languageSelect = document.getElementById('languageSelect');
  const toolTranslate = document.getElementById('toolTranslate');
  const saveButton = document.getElementById('saveButton');

  // Load the selected language from storage
  chrome.storage.sync.get('selectedLanguage', (data) => {
    if (data.selectedLanguage) {
      languageSelect.value = data.selectedLanguage;
      localStorage.setItem('selectedLanguage', data.selectedLanguage);
    }
  });

    // Load the selected language from storage
    chrome.storage.sync.get('toolTranslate', (data) => {
      console.log("🚀 ~ chrome.storage.sync.get ~ data:", data)
      if (data.toolTranslate) {
        toolTranslate.value = data.toolTranslate;
        localStorage.setItem('toolTranslate', data.toolTranslate);
      }
    });

  // Save the selected language to storage when the button is clicked
  saveButton.addEventListener('click', () => {
    const selectedLanguage = languageSelect.value;
    chrome.storage.sync.set({ selectedLanguage }, () => {
      localStorage.setItem('selectedLanguage', selectedLanguage);
    });
    chrome.storage.sync.set({ toolTranslate }, () => {
      localStorage.setItem('toolTranslate', toolTranslate);
    });
  });
});
