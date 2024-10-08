

// Log URL của tab hiện tại khi DOM đã sẵn sàng
window.addEventListener('load', () => {
    // Lấy URL hiện tại
    const urlParams = new URLSearchParams(window.location.search);

    // Kiểm tra xem có tham số 'prompt' không
    if (urlParams.has('prompt')) {
        const promptValue = urlParams.get('prompt');
        const language = urlParams.get('language');
        // Tìm textarea element và điền giá trị
        const textareaElement = document.querySelector('textarea');
        if (textareaElement) {
            textareaElement.value = "Translate: '" + promptValue + "' in " + language;
            // Gọi sự kiện input để đảm bảo các thay đổi được nhận diện
            textareaElement.dispatchEvent(new Event('input', { bubbles: true }));
            setTimeout(function () {/* Look mah! No name! */
                // Tìm nút submit bằng data-testid và nhấn
                const submitButton = document.querySelector('button[data-testid="send-button"]');
                if (submitButton && !submitButton.disabled) {
                    submitButton.click();
                }
            }, 1000);
        } else {
            alert('Khong tim thay input va button submit');
        }
    }
});

document.addEventListener('mouseup', (event) => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
        showTranslateIcon(event.pageX + 20, event.pageY - 10, selectedText);
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
            chrome.storage.sync.get('selectedTypeOpenWith', (data) => {
                const openWith = data.selectedTypeOpenWith || 'new-tab';

                let url = `https://translate.google.com/?sl=auto&tl=${language}&text=${encodeURIComponent(text)}&op=translate`;
                if (typeTranslate === 'chatGPT') {
                    url = `https://chatgpt.com/?prompt=${encodeURIComponent(text)}&language=${language}`;
                } 
    
                if (openWith === 'new-tab') {
                    translateIcon.href = url;
                } else if (openWith === 'popup') {
                    translateIcon.addEventListener('click', () => {
                        window.open(url, '_blank', 'width=800,height=800');
                    });
                }
            });
        });
    });

    translateIcon.style.top = `${y}px`;
    translateIcon.style.left = `${x}px`;

    setTimeout(() => {
        hideTranslateIcon(id);
    }, "2000");
}