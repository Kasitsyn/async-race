import { engineDrive, toggleEngine } from './API.js';
import { Article } from './Article.js';
//================= UI =================
const UI = {
    header: {
        toGarageBtn: document.querySelector('#to-garage'),
        toWinnersBtn: document.querySelector('#to-winners'),
    },
    form: {
        formCreate: document.querySelector('#garage-form-create'),
        formUpdate: document.querySelector('#garage-form-update'),
        nameInput: document.querySelector('#name-input'),
        colorInput: document.querySelector('#color-input'),
        createBtn: document.querySelector('#create-btn'),
        nameInputUpdate: document.querySelector('#name-input-update'),
        colorInputUpdate: document.querySelector('#color-input-update'),
        updateBtn: document.querySelector('#update-btn')
    },
    menu: {
        raceBtn: document.querySelector('#race-btn'),
        resetBtn: document.querySelector('#reset-btn'),
        generateCarsBtn: document.querySelector('#generate-cars-btn')
    },
    garage: {
        garageSection: document.querySelector('#garage'),
        carsNum: document.querySelector('#cars-num-garage'),
        pageNumGarage: document.querySelector('#page-num-garage'),
    },
    article: {
        selectBtn: document.querySelector('#select-btn'),
        removeBtn: document.querySelector('#remove-btn'),
        title: document.querySelector('#article-title'),
        startBtn: document.querySelector('#start-btn'),
        breakBtn: document.querySelector('#break-btn'),
        carImg: document.querySelector('#car-img'),
        flagImg: document.querySelector('#flag-img'),
    },
    footer: {
        prevBtn: document.querySelector('#prev-btn'),
        nextBtn: document.querySelector('#next-btn')
    },
    winners: {
        winnersSection: document.querySelector('#winners'),
        winnersNum: document.querySelector('#winners-num'),
        pageNumWinners: document.querySelector('#page-num-winners')
    }
};
//================= HANDLERS =================
const addHeaderButtonsHandler = () => {
    var _a, _b;
    (_a = UI.header.toWinnersBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
        var _a, _b;
        (_a = UI.garage.garageSection) === null || _a === void 0 ? void 0 : _a.classList.add('visually-hidden');
        (_b = UI.winners.winnersSection) === null || _b === void 0 ? void 0 : _b.classList.remove('visually-hidden');
    });
    (_b = UI.header.toGarageBtn) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
        var _a, _b;
        (_a = UI.winners.winnersSection) === null || _a === void 0 ? void 0 : _a.classList.add('visually-hidden');
        (_b = UI.garage.garageSection) === null || _b === void 0 ? void 0 : _b.classList.remove('visually-hidden');
    });
};
addHeaderButtonsHandler();
//================= RENDER =================
const renderArticle = () => {
    const article = new Article(0, 'ass', 'black');
    article.generateArticle();
};
renderArticle();
//=================  =================
const car = {
    name: 'ass',
    color: '#ffffff',
};
const bss = await toggleEngine([{ key: 'id', value: '1' }, { key: 'status', value: 'started' }]);
console.log(bss);
const ass = await engineDrive([{ key: 'id', value: '1' }, { key: 'status', value: 'drive' }]);
console.log(ass);
