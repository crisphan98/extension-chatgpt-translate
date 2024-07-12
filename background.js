chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'translate') {
        const url = `https://translate.google.com/?sl=auto&tl=${localStorage.getItem('selectedLanguage') || 'en'}&text=${encodeURIComponent(message.text)}&op=translate`;
        chrome.tabs.create({ url: url });
    }
});
