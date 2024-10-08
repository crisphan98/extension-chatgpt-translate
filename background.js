chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'translate') {
        const url = `https://translate.google.com/?sl=auto&tl=${localStorage.getItem('selectedLanguage') || 'en'}&text=${encodeURIComponent(message.text)}&op=translate`;
        chrome.tabs.create({ url: url });
    }
});

chrome.webNavigation.onCompleted.addListener((details) => {
    // Gửi tin nhắn đến content script
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: ['content.js']
    });
  }, { url: [{ urlMatches: '.*' }] });
  
