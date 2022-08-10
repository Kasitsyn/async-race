import { createCar, deleteCar, engineDrive, getCars, toggleEngine, QUERYPARAMS } from './API.js';
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
    var _a, _b;
    (_a = UI.menu.generateCarsBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', async (e) => {
        const cars = generateManyCars(10);
        const carsPromises = [];
        cars.forEach((car) => {
            carsPromises.push(createCar(Object.assign({}, car)));
        });
        await Promise.all(carsPromises).then(() => renderArticleAll(QUERYPARAMS.pageValue));
    });
    (_b = UI.menu.raceBtn) === null || _b === void 0 ? void 0 : _b.addEventListener('click', async (e) => {
        const startBtns = document.querySelectorAll('#start-btn');
        const promises = [];
        startBtns.forEach((el) => {
            const promise = new Promise(async (res, rej) => {
                const getId = async (el) => {
                    if (el.dataset.id)
                        return +(el.dataset.id);
                };
                const carId = await getId(el);
                const data = await toggleEngine([{ key: QUERYPARAMS.id, value: carId }, { key: QUERYPARAMS.status, value: QUERYPARAMS.statusValueStart }]);
                const driveResponse = await engineDrive([{ key: QUERYPARAMS.id, value: carId }, { key: QUERYPARAMS.status, value: QUERYPARAMS.statusValueDrive }]);
                res({ data, driveResponse, carId });
            });
            promises.push(promise);
        });
        await Promise.all(promises).then(res => res.forEach(data => move(data)));
        function move({ data, driveResponse, carId }) {
            state.id = carId;
            console.log({ data, driveResponse, carId });
            if (data) {
                state.velocity = data.velocity;
                state.distance = data.distance;
            }
            const carImage = document.querySelector(`#car-img[data-id="${state.id}"]`);
            const breakBtn = document.querySelector(`#break-btn[data-id="${state.id}"]`);
            const startBtn = document.querySelector(`#start-btn[data-id="${state.id}"]`);
            const flag = document.querySelector(`#flag-img[data-id="${state.id}"]`);
            const ids = {};
            let time = 0;
            startBtn === null || startBtn === void 0 ? void 0 : startBtn.setAttribute('disabled', 'true');
            breakBtn === null || breakBtn === void 0 ? void 0 : breakBtn.removeAttribute('disabled');
            //  ============ animation
            if (state.distance !== null && state.velocity !== null) {
                time = Math.round(state.distance / state.velocity);
            }
            if (carImage && flag) {
                const CurrentDistance = getDistance(carImage, flag);
                ids[(state.id)] = animation(carImage, CurrentDistance, time);
            }
            if (breakBtn)
                breakBtn.onclick = () => window.cancelAnimationFrame(ids[state.id].id);
            //  ============
            if (driveResponse === null || driveResponse === void 0 ? void 0 : driveResponse.success) {
                state.success = true;
            }
            else {
                state.success = false;
                window.cancelAnimationFrame(ids[state.id].id);
                if (carImage)
                    carImage.style.transform = `translateX(0px)`;
                breakBtn === null || breakBtn === void 0 ? void 0 : breakBtn.setAttribute('disabled', 'true');
                startBtn === null || startBtn === void 0 ? void 0 : startBtn.removeAttribute('disabled');
                console.log(driveResponse);
            }
        }
    });
};
export const addArticleHandlers = () => {
    var _a, _b, _c, _d;
    const UIArticle = {
        selectBtnAll: document.querySelectorAll('#select-btn'),
        removeBtnAll: document.querySelectorAll('#remove-btn'),
        title: document.querySelector('#article-title'),
        startBtnAll: document.querySelectorAll('#start-btn'),
        breakBtnAll: document.querySelectorAll('#break-btn'),
        carImg: document.querySelector(`#car-img`),
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
        const data = await toggleEngine([{ key: QUERYPARAMS.id, value: state.id }, { key: QUERYPARAMS.status, value: QUERYPARAMS.statusValueStart }]);
        if (data) {
            state.velocity = data.velocity;
            state.distance = data.distance;
        }
        const carImage = document.querySelector(`#car-img[data-id="${state.id}"]`);
        const breakBtn = document.querySelector(`#break-btn[data-id="${state.id}"]`);
        const startBtn = document.querySelector(`#start-btn[data-id="${state.id}"]`);
        const flag = document.querySelector(`#flag-img[data-id="${state.id}"]`);
        const ids = {};
        let time = 0;
        startBtn === null || startBtn === void 0 ? void 0 : startBtn.setAttribute('disabled', 'true');
        breakBtn === null || breakBtn === void 0 ? void 0 : breakBtn.removeAttribute('disabled');
        //  ============ animation
        if (state.distance !== null && state.velocity !== null) {
            time = Math.round(state.distance / state.velocity);
        }
        if (carImage && flag) {
            const CurrentDistance = getDistance(carImage, flag);
            ids[(state.id)] = animation(carImage, CurrentDistance, time);
        }
        if (breakBtn)
            breakBtn.onclick = () => window.cancelAnimationFrame(ids[state.id].id);
        //  ============
        const driveResponse = await engineDrive([{ key: QUERYPARAMS.id, value: state.id }, { key: QUERYPARAMS.status, value: QUERYPARAMS.statusValueDrive }]);
        if (driveResponse === null || driveResponse === void 0 ? void 0 : driveResponse.success) {
            state.success = true;
        }
        else {
            state.success = false;
            window.cancelAnimationFrame(ids[state.id].id);
            if (carImage)
                carImage.style.transform = `translateX(0px)`;
            breakBtn === null || breakBtn === void 0 ? void 0 : breakBtn.setAttribute('disabled', 'true');
            startBtn === null || startBtn === void 0 ? void 0 : startBtn.removeAttribute('disabled');
            console.log(driveResponse);
        }
    }));
    (_d = UIArticle.breakBtnAll) === null || _d === void 0 ? void 0 : _d.forEach((el) => el.addEventListener('click', async (e) => {
        saveId(e);
        const carImage = document.querySelector(`#car-img[data-id="${state.id}"]`);
        const breakBtn = document.querySelector(`#break-btn[data-id="${state.id}"]`);
        const startBtn = document.querySelector(`#start-btn[data-id="${state.id}"]`);
        startBtn === null || startBtn === void 0 ? void 0 : startBtn.removeAttribute('disabled');
        breakBtn === null || breakBtn === void 0 ? void 0 : breakBtn.setAttribute('disabled', 'true');
        if (carImage)
            carImage.style.transform = `translateX(0px)`;
        const data = await toggleEngine([{ key: QUERYPARAMS.id, value: state.id }, { key: QUERYPARAMS.status, value: QUERYPARAMS.statusValueBreak }]);
        if (data) {
            state.velocity = data.velocity;
            state.distance = data.distance;
        }
        console.log(state.velocity, state.distance);
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
//================= ANIMATIONS =================
// function draw(timePassed) {
//   car.style.left = timePassed / 5 + 'px';
// }
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
function getPositionPointer(elem) {
    const { left, width } = elem.getBoundingClientRect();
    return left + width;
}
function getDistance(start, finish) {
    const startPosition = getPositionPointer(start);
    const finishPosition = getPositionPointer(finish);
    return finishPosition - startPosition;
}
function animation(car, distance, animationTime) {
    const state = {};
    const startTime = new Date().getTime();
    async function getInterval() {
        const currTime = new Date().getTime();
        const passedDistance = Math.round((currTime - startTime) * (distance / animationTime));
        car.style.transform = `translateX(${Math.min(passedDistance, distance)}px)`;
        if (passedDistance < distance) {
            state.id = window.requestAnimationFrame(getInterval);
        }
    }
    state.id = window.requestAnimationFrame(getInterval);
    return state;
}
renderCarsNumber();
renderPageNumber();
renderArticleAll(QUERYPARAMS.pageValue);
// alert('Привет, Друг! Дай мне еще не много времени на доработку, нужно еще с анимацией разобраться! Мой ТГ: @Yuri_Kasitsyn, мой диск: Yura#5680')
