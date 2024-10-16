const methodShifra = document.getElementById('method-shifra');
const acction = document.getElementById('deshif');
const acction_select = document.getElementById('acction')
let language
let sdvig
const sdvig_container = document.getElementById('sdvig-container')
const languageContainer = document.getElementById('language-container');
methodShifra.addEventListener('change', function () {
    languageContainer.innerHTML = "";
    sdvig_container.innerHTML = ""
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
    if (methodShifra.options[methodShifra.selectedIndex].classList.contains('select_sdvig')){
        const label  = document.createElement('label')
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
    if (methodShifra.options[methodShifra.selectedIndex].classList.contains('select_sdvig')){
        sdvig = document.getElementById('sdvig_number').value
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
            return result.innerText = bekon_shifr(text, acction);
            break;
        case 'vizhener':
            return result.innerText = vizhener_shifr(text, acction);
            break;
        case 'Shifr_md5':
            return result.innerText = Shifr_md5(text);
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
    console.log(typeof(sdvig))
    
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

function bekon_shifr() {
    return 'в разработке'
}
function vizhener_shifr() {
    return 'в разработке'
}
function Shifr_md5() {
    return 'в разработке'
}
