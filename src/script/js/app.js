import { createCar, getCars, QUERYPARAMS } from './API.js';
import { addArticleBtnHandlers, Article } from './Article.js';
import { DATABASE, initState, saveToLocalStorage, state } from './Store.js';
//================= DATA FOR TESTING =================
const car = {
    name: 'ass',
    color: '#ffffff',
};
const winner = {
    wins: 12221,
    time: 2.92
};
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
    // article: {
    //   selectBtn: document.querySelector<HTMLButtonElement>('#select-btn'),
    //   removeBtn: document.querySelector<HTMLButtonElement>('#remove-btn'),
    //   title: document.querySelector<HTMLHeadingElement>('#article-title'),
    //   startBtn: document.querySelector<HTMLButtonElement>('#start-btn'),
    //   breakBtn: document.querySelector<HTMLButtonElement>('#break-btn'),
    //   carImg: document.querySelector<HTMLImageElement>('#car-img'),
    //   flagImg: document.querySelector<HTMLImageElement>('#flag-img'),
    // },
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
initState();
//================= GARAGE FORM =================
const getColor = (e) => {
    return e.target.value;
};
const getName = (e) => {
    return e.target.value;
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
const addGarageFormsHandler = () => {
    var _a, _b, _c, _d, _e;
    (_a = UI.form.colorInput) === null || _a === void 0 ? void 0 : _a.addEventListener('change', (e) => {
        state.color = getColor(e);
        saveToLocalStorage(DATABASE, state);
    });
    (_b = UI.form.colorInputUpdate) === null || _b === void 0 ? void 0 : _b.addEventListener('change', (e) => {
        state.color = getColor(e);
        saveToLocalStorage(DATABASE, state);
    });
    (_c = UI.form.nameInput) === null || _c === void 0 ? void 0 : _c.addEventListener('change', (e) => {
        state.name = getName(e);
        saveToLocalStorage(DATABASE, state);
    });
    (_d = UI.form.formUpdate) === null || _d === void 0 ? void 0 : _d.addEventListener('change', (e) => {
        state.name = getName(e);
        saveToLocalStorage(DATABASE, state);
    });
    (_e = UI.form.createBtn) === null || _e === void 0 ? void 0 : _e.addEventListener('click', async (e) => {
        e.preventDefault();
        const name = state.name;
        const color = state.color;
        await createCar({ name, color });
        await renderArticleAll();
    });
};
addHeaderButtonsHandler();
addGarageFormsHandler();
//================= CREATE CAR =================
//================= RENDER =================
const renderArticle = (id, carsName, carsColor) => {
    const article = new Article(id, carsName, carsColor);
    article.generateArticle();
};
export const renderArticleAll = async () => {
    const articlesWrapper = document.querySelector('.articles-wrapper');
    if (articlesWrapper)
        articlesWrapper.innerHTML = '';
    const serverData = await getCars([{ key: QUERYPARAMS.PAGE, value: 1 }, { key: QUERYPARAMS.LIMIT, value: 200 }]);
    serverData.data.forEach(car => {
        car.id && car.name && car.color && renderArticle(car.id, car.name, car.color);
    });
    addArticleBtnHandlers();
};
