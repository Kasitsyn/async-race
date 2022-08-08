import { createCar, deleteCar, getCars, toggleEngine, QUERYPARAMS } from './API.js';
import { Article } from './Article.js';
import { DATABASE, initState, nameCars, saveToLocalStorage, state } from './Store.js';
//================= DATA FOR TESTING =================
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
export const addHeaderButtonsHandler = () => {
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
export const addGarageFormsHandler = () => {
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
        await renderArticleAll(QUERYPARAMS.pageValue);
    });
};
export const addMenuHandler = () => {
    var _a;
    (_a = UI.menu.generateCarsBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', async (e) => {
        const cars = generateManyCars(10);
        const carsPromises = [];
        cars.forEach((car) => {
            carsPromises.push(createCar(Object.assign({}, car)));
        });
        await Promise.all(carsPromises).then(() => renderArticleAll(QUERYPARAMS.pageValue));
    });
};
export const addArticleHandlers = () => {
    var _a, _b, _c;
    const UIArticle = {
        selectBtnAll: document.querySelectorAll('#select-btn'),
        removeBtnAll: document.querySelectorAll('#remove-btn'),
        title: document.querySelector('#article-title'),
        startBtnAll: document.querySelectorAll('#start-btn'),
        breakBtnAll: document.querySelectorAll('#break-btn'),
        carImg: document.querySelector('#car-img'),
        flagImg: document.querySelector('#flag-img')
    };
    const saveId = (e) => {
        const target = e.target;
        if (target.dataset.id) {
            state.id = +target.dataset.id;
        }
    };
    (_a = UIArticle.selectBtnAll) === null || _a === void 0 ? void 0 : _a.forEach((el) => el.addEventListener('click', async (e) => {
        saveId(e);
    }));
    (_b = UIArticle.removeBtnAll) === null || _b === void 0 ? void 0 : _b.forEach((el) => el.addEventListener('click', async (e) => {
        saveId(e);
        await deleteCar(state.id).then(() => {
            console.log(state.id);
            renderArticleAll(QUERYPARAMS.pageValue);
        });
    }));
    (_c = UIArticle.startBtnAll) === null || _c === void 0 ? void 0 : _c.forEach((el) => el.addEventListener('click', async (e) => {
        saveId(e);
        await toggleEngine([{ key: QUERYPARAMS.id, value: state.id }, { key: QUERYPARAMS.status, value: state.id }]);
    }));
};
export const addFooterHandlers = () => {
    var _a, _b;
    (_a = UI.footer.nextBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', async (e) => {
        var _a;
        QUERYPARAMS.pageValue++;
        await renderArticleAll(QUERYPARAMS.pageValue);
        (_a = UI.footer.nextBtn) === null || _a === void 0 ? void 0 : _a.scrollIntoView();
    });
    (_b = UI.footer.prevBtn) === null || _b === void 0 ? void 0 : _b.addEventListener('click', async (e) => {
        var _a;
        QUERYPARAMS.pageValue--;
        await renderArticleAll(QUERYPARAMS.pageValue);
        (_a = UI.footer.prevBtn) === null || _a === void 0 ? void 0 : _a.scrollIntoView();
    });
};
addHeaderButtonsHandler();
addGarageFormsHandler();
addFooterHandlers();
addMenuHandler();
//================= RENDER =================
const renderArticle = (id, carsName, carsColor) => {
    const article = new Article(id, carsName, carsColor);
    article.generateArticle();
};
export const renderArticleAll = async (page) => {
    const articlesWrapper = document.querySelector('.articles-wrapper');
    if (articlesWrapper)
        articlesWrapper.innerHTML = '';
    const serverData = await getCars([{ key: QUERYPARAMS.page, value: page }, { key: QUERYPARAMS.limit, value: QUERYPARAMS.limitValue }]);
    serverData.data.forEach(car => {
        car.id && car.name && car.color && renderArticle(car.id, car.name, car.color);
    });
    state.carsAmount = serverData.count;
    renderCarsNumber();
    addArticleHandlers();
    savePageAmount();
    renderFooterBtn();
};
export const renderCarsNumber = () => {
    UI.garage.carsNum && state.carsAmount !== null
        ? (UI.garage.carsNum.innerText = `${state.carsAmount}`)
        : '';
};
export const renderPageNumber = () => {
    UI.garage.pageNumGarage && state.currentPage !== null
        ? (UI.garage.pageNumGarage.innerText = `${state.currentPage}`)
        : '';
};
export const renderFooterBtn = () => {
    var _a, _b, _c, _d;
    QUERYPARAMS.pageValue >= state.pageAmount
        ? (_a = UI.footer.nextBtn) === null || _a === void 0 ? void 0 : _a.setAttribute('disabled', 'true')
        : (_b = UI.footer.nextBtn) === null || _b === void 0 ? void 0 : _b.removeAttribute('disabled');
    QUERYPARAMS.pageValue === 1
        ? (_c = UI.footer.prevBtn) === null || _c === void 0 ? void 0 : _c.setAttribute('disabled', 'true')
        : (_d = UI.footer.prevBtn) === null || _d === void 0 ? void 0 : _d.removeAttribute('disabled');
};
//================= PAGE =================
export const savePageAmount = () => {
    state.pageAmount = state.carsAmount
        ? Math.ceil(state.carsAmount / QUERYPARAMS.limitValue)
        : 1;
    saveToLocalStorage(DATABASE, state);
    console.log(QUERYPARAMS.pageValue, state.carsAmount, QUERYPARAMS.limitValue, state.pageAmount);
};
export const generateManyCars = (amount) => {
    const cars = [];
    for (let i = 0; i < amount; i++) {
        const name = nameCars[Math.floor(Math.random() * 10)];
        const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        cars.push({ name, color });
    }
    return cars;
};
renderCarsNumber();
renderPageNumber();
renderArticleAll(QUERYPARAMS.pageValue);
