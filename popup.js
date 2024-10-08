document.addEventListener('DOMContentLoaded', () => {
  const languageSelect = document.getElementById('languageSelect');
  const toolTranslate = document.getElementById('toolTranslate');
  const openWith = document.getElementById('openWith');
  const saveButton = document.getElementById('saveButton');

  // Load the selected language from storage
  chrome.storage.sync.get('selectedLanguage', (data) => {
    if (data.selectedLanguage) {
      languageSelect.value = data.selectedLanguage;
      localStorage.setItem('selectedLanguage', data.selectedLanguage);
    }
  });

  // Load the selected language from storage
  chrome.storage.sync.get('selectedTypeTranslate', (data) => {
    if (data.selectedTypeTranslate) {
      toolTranslate.value = data.selectedTypeTranslate;
      localStorage.setItem('selectedTypeTranslate', data.selectedTypeTranslate);
    }
  });

  // Load the selected open with from storage
  chrome.storage.sync.get('selectedTypeOpenWith', (data) => {
    if (data.selectedTypeOpenWith) {
      openWith.value = data.selectedTypeOpenWith;
      localStorage.setItem('openWith', data.selectedTypeOpenWith);
    }
  });

  // Save the selected language to storage when the button is clicked
  saveButton.addEventListener('click', () => {
    const selectedLanguage = languageSelect.value;
    const selectedTypeTranslate = toolTranslate.value;
    const selectedTypeOpenWith = openWith.value;

    chrome.storage.sync.set({ selectedLanguage }, () => {
      localStorage.setItem('selectedLanguage', selectedLanguage);
    });
    chrome.storage.sync.set({ selectedTypeTranslate }, () => {
      localStorage.setItem('selectedTypeTranslate', selectedTypeTranslate);
    });
    chrome.storage.sync.set({ selectedTypeOpenWith }, () => {
      localStorage.setItem('selectedTypeOpenWith', selectedTypeOpenWith);
    });

    alert('Lưu thành công!');
  });
});
