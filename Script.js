
const methodShifra = document.getElementById('method-shifra');
const acction = document.getElementById('deshif');
const acction_select = document.getElementById('acction')
let language
let sdvig
let key
const sdvig_container = document.getElementById('sdvig-container')
const languageContainer = document.getElementById('language-container');
const key_container = document.getElementById('key_container')
methodShifra.addEventListener('change', function () {
    languageContainer.innerHTML = "";
    sdvig_container.innerHTML = ""
    key_container.innerHTML = ""
    if (methodShifra.options[methodShifra.selectedIndex].classList.contains('no-deshif')) {
        acction.disabled = true;
    }
    else {
        acction.disabled = false;
    }
    if (methodShifra.options[methodShifra.selectedIndex].classList.contains('select_language')) {

        // Создание label
        const label = document.createElement('label');
        label.setAttribute('for', 'language');
        label.textContent = 'Выберите язык';

        // Создание select
        const select = document.createElement('select');
        select.setAttribute('name', 'language');
        select.setAttribute('id', 'language');

        // Создание options
        const russianOption = document.createElement('option');
        russianOption.setAttribute('value', 'russian');
        russianOption.textContent = 'Русский';

        const englishOption = document.createElement('option');
        englishOption.setAttribute('value', 'english');
        englishOption.textContent = 'Английский';

        // Добавление options в select
        select.appendChild(russianOption);
        select.appendChild(englishOption);

        // Добавление label и select в контейнер
        languageContainer.appendChild(label);
        languageContainer.appendChild(select);
    }
    if (methodShifra.options[methodShifra.selectedIndex].classList.contains('select_sdvig')) {
        const label = document.createElement('label')
        label.setAttribute('for', 'sdvig_number')
        label.textContent = 'Выберите шаг'

        const input = document.createElement('input')
        input.setAttribute('id', 'sdvig_number')
        input.setAttribute('class', 'sdvig-input')
        input.setAttribute('type', 'number')
        input.setAttribute('min', '2')
        input.setAttribute('max', '10')
        sdvig_container.append(label)
        sdvig_container.append(input)
    }
    if (methodShifra.options[methodShifra.selectedIndex].classList.contains('select_key')){
        const label = document.createElement('label')
        label.setAttribute('for', 'key_str')
        label.setAttribute('class', 'key-text')
        label.textContent = 'Напишите ключ'

        const input = document.createElement('input')
        input.setAttribute('id', 'key_str')
        input.setAttribute('class', 'key-input')
        input.setAttribute('type', 'text')
        input.setAttribute('maxlength', '20')
        key_container.append(label)
        key_container.append(input)
    }
});

document.getElementById('zashifrovat').addEventListener('click', reshit);
function reshit() {
    const text = document.getElementById('fromtext').value
    const shifr = document.getElementById('method-shifra').value
    const acction = document.getElementById('acction').value
    let result = document.getElementsByClassName('result')[0];
    if (methodShifra.options[methodShifra.selectedIndex].classList.contains('select_language')) {
        language = document.getElementById('language').value
    }
    if (methodShifra.options[methodShifra.selectedIndex].classList.contains('select_sdvig')) {
        sdvig = document.getElementById('sdvig_number').value
    }
    if (methodShifra.options[methodShifra.selectedIndex].classList.contains('select_key')){
        key = document.getElementById('key_str').value
    }
    if (text === '') {
        result.innerText = 'Заполните поле с текстом!'
        return result
    }
    
    switch (shifr) {
        case 'atbash':
            return result.innerText = atbash_shifr(text, acction, language);
            break;
        case 'chezar':
            return result.innerText = chezar_shifr(text, acction, language, sdvig);
            break;
        case 'bekon':
            return result.innerText = bekon_shifr(text, acction, language);
            break;
        case 'vizhener':
            return result.innerText = vizhener_shifr(text, acction, language, key);
            break;
        case 'Shifr_md5':
            return result.innerText = Shifr_md5(text);
            break;
        default:
            return result.innerText = 'Выберите шифр!';
    }
    document.getElementById('fromtext').value = '';
    reshit.innerText = ''
}
function atbash_shifr(text, acction, language) {
    let alfavit, reversealfavit;

    if (language === 'english') {
        alfavit = 'abcdefghijklmnopqrstuvwxyz'
        reversealfavit = 'zyxwvutsrqponmlkjihgfedcba'
    }
    if (language === 'russian') {
        alfavit = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'
        reversealfavit = 'яюэьыъщшчцхфутсрпонмлкйизжёедгвба';
    }
    if (acction === 'shifrovka') {
        let result_text = ''
        for (let i = 0; i < text.length; i++) {
            if (text[i] === text[i].toUpperCase()) {
                let char = text[i].toLowerCase()
                let indextext = alfavit.indexOf(char)
                if (indextext !== -1) {
                    result_text += reversealfavit[indextext].toUpperCase()
                }
                else {
                    result_text += char
                }
            }
            else {
                let char = text[i].toLowerCase()
                let indextext = alfavit.indexOf(char)
                if (indextext !== -1) {
                    result_text += reversealfavit[indextext]
                }
                else {
                    result_text += char
                }
            }
        }
        return result_text
    }
    else {

        let result_text = ''
        for (let i = 0; i < text.length; i++) {
            if (text[i] === text[i].toUpperCase()) {
                let char = text[i].toLowerCase()
                let indextext = reversealfavit.indexOf(char)
                if (indextext !== -1) {
                    result_text += alfavit[indextext].toUpperCase()
                }
                else {
                    result_text += char
                }
            }
            else {
                let char = text[i].toLowerCase()
                let indextext = reversealfavit.indexOf(char)
                if (indextext !== -1) {
                    result_text += alfavit[indextext]
                }
                else {
                    result_text += char
                }
            }
        }
        return result_text
    }
}
function chezar_shifr(text, acction, language, sdvig) {
    let alfavit;
    let result = ""
    if (language === 'english') {
        alfavit = 'abcdefghijklmnopqrstuvwxyz'
    }
    if (language === 'russian') {
        alfavit = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'
    }
    const shift = sdvig % alfavit.length;
    if (acction === 'shifrovka') {
        for (let i = 0; i < text.length; i++) {
            if (text[i] === text[i].toUpperCase()) {
                let char = text[i].toLowerCase()
                let indextext = alfavit.indexOf(char)
                let shifrindex = (indextext + shift) % alfavit.length
                if (indextext !== -1) {
                    result += alfavit[shifrindex].toUpperCase()
                }
                else {
                    result += char
                }
            }
            else {
                let char = text[i].toLowerCase()
                let indextext = alfavit.indexOf(char)
                let shifrindex = (indextext + shift) % alfavit.length
                if (indextext !== -1) {
                    result += alfavit[shifrindex]
                }
                else {
                    result += char
                }
            }
        }
        return result
    }
    else {
        for (let i = 0; i < text.length; i++) {
            if (text[i] === text[i].toUpperCase()) {
                let char = text[i].toLowerCase()
                let indextext = alfavit.indexOf(char)
                let shifrindex = (indextext - shift + alfavit.length) % alfavit.length
                if (indextext !== -1) {
                    result += alfavit[shifrindex].toUpperCase()
                }
                else {
                    result += char
                }
            }
            else {

                let char = text[i].toLowerCase()
                let indextext = alfavit.indexOf(char)
                let shifrindex = (indextext - shift + alfavit.length) % alfavit.length

                if (indextext !== -1) {
                    result += alfavit[shifrindex]
                }
                else {
                    result += char
                }
            }
        }
        return result
    }
}

function bekon_shifr(text, acction, language) {
    let alfavit, bacontable, result
    if (language === 'russian') {
        alfavit = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'
        bacontable = {
            "а": "AAAAA", "б": "AAAAB", "в": "AAABA", "г": "AAABB", "д": "AABAA",
            "е": "AABAB", "ё": "AABBA", "ж": "AABBB", "з": "ABAAA", "и": "ABAAB",
            "й": "ABABA", "к": "ABABB", "л": "ABBAA", "м": "ABBAB", "н": "ABBBA",
            "о": "ABBBB", "п": "BAAAA", "р": "BAAAB", "с": "BAABA", "т": "BAABB",
            "у": "BABAA", "ф": "BABAB", "х": "BABBA", "ц": "BABBB", "ч": "BBAAA",
            "ш": "BBAAB", "щ": "BBABA", "ъ": "BBABB", "ы": "BBBAA", "ь": "BBBAB",
            "э": "BBBBA", "ю": "BBBBB", "я": "BBBBB"
        }
    }
    if (language === 'english') {
        alfavit = 'abcdefghijklmnopqrstuvwxyz'
        bacontable = {
            "a": "AAAAA", "b": "AAAAB", "c": "AAABA", "d": "AAABB", "e": "AABAA",
            "f": "AABAB", "g": "AABBA", "h": "AABBB", "i": "ABAAA", "j": "ABAAB",
            "k": "ABABA", "l": "ABABB", "m": "ABBAA", "n": "ABBAB", "o": "ABBBA",
            "p": "ABBBB", "q": "BAAAA", "r": "BAAAB", "s": "BAABA", "t": "BAABB",
            "u": "BABAA", "v": "BABAB", "w": "BABBA", "x": "BABBB", "y": "BBAAA",
            "z": "BBAAB"

        };
    }
    if (acction === 'shifrovka') {
        let text_low = text.toLowerCase()
        result = ""
        for (let i = 0; i < text_low.length; i++) {
            const char = text_low[i]
            if (alfavit.includes(char)) {
                result += bacontable[char]
            }
            else {
                result += char
            }
        }
    }
    else {
        let current = ""
        result = ""
        for (let i = 0; i < text.length; i++) {
            const char = text[i]
            if (char === " ") {
                result += " "
            }
            else {
                current += char
                if (current.length === 5) {
                    let decodchar = Object.keys(bacontable).find(key => bacontable[key] === current)
                    result += decodchar ? decodchar : current
                    current = ""

                }
            }
        }
    }
    return result
}
function vizhener_shifr(text, acction, language, key) {
    let alfavit, result,charindex,keyCharIndex;
    result = ""
    alfavit = ""
    console.log(key)
    if(language === 'russian'){
        alfavit = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    }
    else if (language === 'english'){
        alfavit = 'abcdefghijklmnopqrstuvwxyz';
    }
    else {
        result += "Неверный язык. Используйте 'Русский' или 'Английский'."
        return result
        
    } 

        keylower = key.toLowerCase()
        textlower = text.toLowerCase()
        let keyIndex = 0;
        for(let i = 0 ; i < text.length; i++){

            const char = textlower[i]

            if(alfavit.includes(char)){
                charindex = alfavit.indexOf(char)
                keyCharIndex = alfavit.indexOf(keylower[keyIndex % keylower.length])
            
        if(acction === 'shifrovka'){
            const shifIndex =  ( charindex + keyCharIndex) % alfavit.length;
            console.log(alfavit)
            result +=  text[i] === text[i].toUpperCase() ? alfavit[shifIndex].toUpperCase() : alfavit[shifIndex]
        }
        else if(acction === 'deshifrovanie'){
            const decryptedIndex = (charindex - keyCharIndex + alfavit.length) % alfavit.length;
                result += text[i] === text[i].toUpperCase() ? alfavit[decryptedIndex].toUpperCase() : alfavit[decryptedIndex]
        }
        keyIndex++
        }
        else{
            result += char
        }
    }
    return result
}
function Shifr_md5(text, acction) {
    if(acction ==='deshifrovanie'){
        return 'Дешифрование не работает на хэш!'
    }
    var hash = CryptoJS.MD5(text);
    return hash
}
