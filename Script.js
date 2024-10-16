const methodShifra = document.getElementById('method-shifra');
const acction = document.getElementById('deshif');
const acction_select = document.getElementById('acction')
let language
const languageContainer = document.getElementById('language-container');
methodShifra.addEventListener('change', function(){
    languageContainer.innerHTML = "";
    if(methodShifra.options[methodShifra.selectedIndex].classList.contains('no-deshif')){
        acction.disabled = true;
    }
    else{
        acction.disabled = false;
    }
    if(methodShifra.options[methodShifra.selectedIndex].classList.contains('select_language')){
        
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
    
});

document.getElementById('zashifrovat').addEventListener('click', reshit);
function reshit() {
    const text = document.getElementById('fromtext').value
    const shifr = document.getElementById('method-shifra').value
    const acction = document.getElementById('acction').value
    let result = document.getElementsByClassName('result')[0];
    if(methodShifra.options[methodShifra.selectedIndex].classList.contains('select_language')){
    language = document.getElementById('language').value
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
            return result.innerText = chezar_shifr(text, acction);
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
    if(language === 'english'){
        alfavit = 'abcdefghijklmnopqrstuvwxyz'
        reversealfavit = 'zyxwvutsrqponmlkjihgfedcba'
    }
    if(language === 'russian'){
        alfavit ='абвгдеёжзийклмнопрстуфхцчшщъыьэюя'
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
function chezar_shifr(){
    return 'в разработке'
}
function bekon_shifr(){
    return 'в разработке'
}
function  vizhener_shifr(){
    return 'в разработке'
}
function  Shifr_md5(){
    return 'в разработке'
}
