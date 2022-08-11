import { createCar, deleteCar, engineDrive, getCars, toggleEngine, QUERYPARAMS } from './API.js';
import { Article } from './Article.js';
import { DATABASE, initState, nameCars, saveToLocalStorage, state } from './Store.js';
function initHtml() {
    document.body.innerHTML = `
  <header class="header">
    <nav class="nav">
      <button class="btn header__btn" id="to-garage">To garage</button>
      <button class="btn header__btn" id="to-winners">To winners</button>
    </nav>
  </header>
  <main class="main">
    <section class="garage" id="garage">
      <form action="" class="garage__form garage__form--create" id="garage-form-create">
        <input type="text" class="garage__form" name="name" id="name-input">
        <input type="color" class="garage__form" name="color" id="color-input">
        <input type="submit" class="garage__submit" id="create-btn" value="Create">
      </form>
      <form action="" class="garage__form garage__form--update" id="garage-form-update">
        <input type="text" class="garage__form" name="name" id="name-input-update">
        <input type="color" class="garage__form" name="color" id="color-input-update">
        <input type="submit" class="garage__submit" id="update-btn" value="Update">
      </form>
      <div class="menu">
        <button class="btn btn-race" id="race-btn">Race</button>
        <button class="btn btn-reset" id="reset-btn">Reset</button>
        <button class="btn btn-generate" id="generate-cars-btn">Generate cars</button>
      </div>
      <h1 class="title">
        Garage (<span class="cars-num-garage" id="cars-num-garage"></span>)
      </h1>
      <h3 class="subtitle">Page #<span class="page-num-garage" id="page-num-garage">1</span></h3>
      <div class="articles-wrapper">
      </div>
      <footer class="article__nav">
        <button class="btn nav__btn-prev" id="prev-btn">Prev</button>
        <button class="btn nav__btn-next" id="next-btn">Next</button>
      </footer>
    </section>
    <section class="winners visually-hidden" id="winners">
      <h1 class="title">
        Winners (<span class="winners-num" id="winners-num"></span>)
      </h1>
      <h3 class="subtitle">Page #<span class="page-num-winners" id="page-num-winners">1</span></h3>
      <table class="winners__table">
        <thead>
          <tr>
            <th>Number</th>
            <th>Car</th>
            <th>Name</th>
            <th>Wins</th>
            <th>Best time (sec)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td><img src="./src/assets/icons/car.svg" alt="car" width="30" height="30"></td>
            <td>Tesla</td>
            <td>1</td>
            <td>10</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
  `;
}
initHtml();
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
        setCurrentPage();
        await renderArticleAll(state.pageAmount);
    });
};
export const addMenuHandler = () => {
    var _a, _b, _c;
    (_a = UI.menu.generateCarsBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', async (e) => {
        const cars = generateManyCars(10);
        const carsPromises = [];
        cars.forEach((car) => {
            carsPromises.push(createCar(Object.assign({}, car)));
        });
        savePageAmount();
        setCurrentPage();
        await Promise.all(carsPromises).then(() => renderArticleAll(state.currentPage));
    });
    (_b = UI.menu.raceBtn) === null || _b === void 0 ? void 0 : _b.addEventListener('click', async (e) => {
        const startBtns = document.querySelectorAll('#start-btn');
        const promises = [];
        startBtns.forEach((el) => {
            const promise = new Promise(async (res, rej) => {
                const getId = async (el) => {
                    if (el.dataset.id)
                        return +(el.dataset.id);
                    return 1;
                };
                const carId = await getId(el);
                const data = await toggleEngine([{ key: QUERYPARAMS.id, value: carId }, { key: QUERYPARAMS.status, value: QUERYPARAMS.statusValueStart }]);
                res({ data, carId });
            });
            promises.push(promise);
        });
        const finishedCars = [];
        function findWinner() {
            var _a;
            finishedCars.sort((a, b) => b.velocity - a.velocity);
            const id = finishedCars[0].carId;
            const name = (_a = document.querySelector(`#article-title[data-id="${id}"]`)) === null || _a === void 0 ? void 0 : _a.innerText;
            alert(`${name}(${id}) is winner!!!`);
        }
        await Promise.all(promises).then(res => Promise.all(res.map(data => move(data)))).then(() => findWinner());
        async function move({ data, carId }) {
            carId = carId;
            console.log({ data, carId });
            if (data) {
                state.velocity = data.velocity;
                state.distance = data.distance;
            }
            const carImage = document.querySelector(`#car-img[data-id="${carId}"]`);
            const breakBtn = document.querySelector(`#break-btn[data-id="${carId}"]`);
            const startBtn = document.querySelector(`#start-btn[data-id="${carId}"]`);
            const flag = document.querySelector(`#flag-img[data-id="${carId}"]`);
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
                ids[carId] = animation(carImage, CurrentDistance, time);
            }
            if (breakBtn)
                breakBtn.onclick = () => window.cancelAnimationFrame(ids[carId].id);
            //  ============
            const driveResponse = await engineDrive([{ key: QUERYPARAMS.id, value: carId }, { key: QUERYPARAMS.status, value: QUERYPARAMS.statusValueDrive }]);
            if (driveResponse === null || driveResponse === void 0 ? void 0 : driveResponse.success) {
                // console.log(carId)
                state.success = true;
                // state.finishedCar['id'] = carId
                // state.finishedCar['velocity'] = data.velocity
                finishedCars.push(Object.assign({ carId }, data));
                // console.log(finishedCars)
            }
            else {
                state.success = false;
                console.log(ids[carId]);
                window.cancelAnimationFrame(ids[carId].id);
                // if (carImage) carImage.style.transform = `translateX(0px)`
                breakBtn === null || breakBtn === void 0 ? void 0 : breakBtn.setAttribute('disabled', 'true');
                startBtn === null || startBtn === void 0 ? void 0 : startBtn.removeAttribute('disabled');
                console.log(driveResponse);
            }
        }
    });
    (_c = UI.menu.resetBtn) === null || _c === void 0 ? void 0 : _c.addEventListener('click', async (e) => {
        renderArticleAll(state.currentPage);
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
            renderArticleAll(state.currentPage);
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
            // if (carImage) carImage.style.transform = `translateX(0px)`
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
        state.currentPage++;
        await renderArticleAll(state.currentPage);
        (_a = UI.footer.nextBtn) === null || _a === void 0 ? void 0 : _a.scrollIntoView();
    });
    (_b = UI.footer.prevBtn) === null || _b === void 0 ? void 0 : _b.addEventListener('click', async (e) => {
        var _a;
        state.currentPage--;
        await renderArticleAll(state.currentPage);
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
    serverData.data.reverse().forEach(car => {
        car.id && car.name && car.color && renderArticle(car.id, car.name, car.color);
    });
    state.carsAmount = serverData.count;
    renderCarsNumber();
    addArticleHandlers();
    savePageAmount();
    renderFooterBtn();
    renderPageNumber();
    console.log(state.currentPage);
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
    state.currentPage >= state.pageAmount
        ? (_a = UI.footer.nextBtn) === null || _a === void 0 ? void 0 : _a.setAttribute('disabled', 'true')
        : (_b = UI.footer.nextBtn) === null || _b === void 0 ? void 0 : _b.removeAttribute('disabled');
    state.currentPage === 1
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
function setCurrentPage() {
    savePageAmount();
    state.currentPage = state.pageAmount;
}
setCurrentPage();
renderCarsNumber();
renderPageNumber();
renderArticleAll(state.pageAmount);
alert('Привет, Друг! Дай мне еще не много времени на доработку, нужно еще с анимацией разобраться! Мой ТГ: @Yuri_Kasitsyn, мой диск: Yura#5680');
