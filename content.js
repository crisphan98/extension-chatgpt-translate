document.addEventListener('mouseup', (event) => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
        showTranslateIcon(event.pageX, event.pageY, selectedText);
    }
});
function hideTranslateIcon(id) {
    const translateIcon = document.getElementById(id);
    if (translateIcon) {
        translateIcon.remove();
    }
}

function showTranslateIcon(x, y, text) {
    const id = new Date().getTime();
    let translateIcon = document.createElement('a');
    translateIcon.id = id;
    translateIcon.style.position = 'absolute';
    translateIcon.style.cursor = 'pointer';
    translateIcon.target = '_blank';
    document.body.appendChild(translateIcon);

    const img = document.createElement('img');
    img.src = "https://i.pinimg.com/originals/e5/b5/f7/e5b5f75aee252932abc227fc80cbb633.jpg";
    img.style.width = '20px';
    img.style.height = '20px';
    translateIcon.appendChild(img);

    // Set href dynamically based on the selected text and stored language
    chrome.storage.sync.get('selectedLanguage', (data) => {
        const language = data.selectedLanguage || 'en';
        chrome.storage.sync.get('selectedTypeTranslate', (data) => {
            const typeTranslate = data.selectedTypeTranslate || 'chatGPT';
            if (typeTranslate === 'chatGPT') {
                translateIcon.href = `https://chatgpt.com/chat?model=gpt-3.5-turbo-0613&prompt=${encodeURIComponent(text)}`;
            } else {
                translateIcon.href = `https://translate.google.com/?sl=auto&tl=${language}&text=${encodeURIComponent(text)}&op=translate`;
            }
        });
    });

    translateIcon.style.top = `${y}px`;
    translateIcon.style.left = `${x}px`;

    setTimeout(() => {
        hideTranslateIcon(id);
    }, "2000");
}

document.addEventListener('mousedown', () => {
    // const translateIcon = document.getElementById('translateIcon');
    // if (translateIcon) {
    //   translateIcon.remove();
    // }
});
