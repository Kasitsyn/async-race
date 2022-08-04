import { createCar, deleteCar, engineDrive, generateQueryString, getCar, getCars, updateCar, toggleEngine, getWinners, getWinner, createWinner, deleteWinner, updateWinner, QUERYPARAMS } from './API.js';
import { Article } from './Article.js';
import { DATABASE, initState, saveToLocalStorage, serverData, state } from './Store.js';
import { ICar, winner } from './types/types.js';

//================= DATA FOR TESTING =================
const car: ICar = {
  name: 'ass',
  color: '#ffffff',
}

const winner: winner = {
  wins: 12221,
  time: 2.92
}

//================= UI =================
const UI = {
  header: {
    toGarageBtn: document.querySelector<HTMLButtonElement>('#to-garage'),
    toWinnersBtn: document.querySelector<HTMLButtonElement>('#to-winners'),
  },
  form: {
    formCreate: document.querySelector<HTMLFormElement>('#garage-form-create'),
    formUpdate: document.querySelector<HTMLFormElement>('#garage-form-update'),
    nameInput: document.querySelector<HTMLInputElement>('#name-input'),
    colorInput: document.querySelector<HTMLInputElement>('#color-input'),
    createBtn: document.querySelector<HTMLButtonElement>('#create-btn'),
    nameInputUpdate: document.querySelector<HTMLInputElement>('#name-input-update'),
    colorInputUpdate: document.querySelector<HTMLInputElement>('#color-input-update'),
    updateBtn: document.querySelector<HTMLButtonElement>('#update-btn')
  },
  menu: {
    raceBtn: document.querySelector<HTMLButtonElement>('#race-btn'),
    resetBtn: document.querySelector<HTMLButtonElement>('#reset-btn'),
    generateCarsBtn: document.querySelector<HTMLButtonElement>('#generate-cars-btn')
  },
  garage: {
    garageSection: document.querySelector<HTMLDivElement>('#garage'),
    carsNum: document.querySelector<HTMLSpanElement>('#cars-num-garage'),
    pageNumGarage: document.querySelector<HTMLSpanElement>('#page-num-garage'),
  },
  article: {
    selectBtn: document.querySelector<HTMLButtonElement>('#select-btn'),
    removeBtn: document.querySelector<HTMLButtonElement>('#remove-btn'),
    title: document.querySelector<HTMLHeadingElement>('#article-title'),
    startBtn: document.querySelector<HTMLButtonElement>('#start-btn'),
    breakBtn: document.querySelector<HTMLButtonElement>('#break-btn'),
    carImg: document.querySelector<HTMLImageElement>('#car-img'),
    flagImg: document.querySelector<HTMLImageElement>('#flag-img'),
  },
  footer: {
    prevBtn: document.querySelector<HTMLButtonElement>('#prev-btn'),
    nextBtn: document.querySelector<HTMLButtonElement>('#next-btn')
  },
  winners: {
    winnersSection: document.querySelector<HTMLDivElement>('#winners'),
    winnersNum: document.querySelector<HTMLSpanElement>('#winners-num'),
    pageNumWinners: document.querySelector<HTMLSpanElement>('#page-num-winners')
  }
}

initState()

//================= GARAGE FORM =================

const getColor = (e: Event): string => {
  return (e.target as HTMLInputElement).value
}

const getName = (e: Event): string => {
  return (e.target as HTMLInputElement).value
}


//================= HANDLERS =================


const addHeaderButtonsHandler = (): void => {
  UI.header.toWinnersBtn?.addEventListener('click', (e) => {
    UI.garage.garageSection?.classList.add('visually-hidden')
    UI.winners.winnersSection?.classList.remove('visually-hidden')
  })

  UI.header.toGarageBtn?.addEventListener('click', (e) => {
    UI.winners.winnersSection?.classList.add('visually-hidden')
    UI.garage.garageSection?.classList.remove('visually-hidden')
  })
}

const addGarageFormsHandler = (): void => {
  UI.form.colorInput?.addEventListener('change', (e) => {
    state.color = getColor(e)
    saveToLocalStorage(DATABASE, state)
  })
  UI.form.colorInputUpdate?.addEventListener('change', (e) => {
    state.color = getColor(e)
    saveToLocalStorage(DATABASE, state)
  })

  UI.form.nameInput?.addEventListener('change', (e) => {
    state.name = getName(e)
    saveToLocalStorage(DATABASE, state)
  })
  UI.form.formUpdate?.addEventListener('change', (e) => {
    state.name = getName(e)
    saveToLocalStorage(DATABASE, state)
  })
  UI.form.createBtn?.addEventListener('click', async (e) => {
    e.preventDefault();
    const name = state.name
    const color = state.color
    await createCar({ name, color })
    const serverData = await getCars([{ key: QUERYPARAMS.PAGE, value: 1 }, { key: QUERYPARAMS.LIMIT, value: 100 }])
    serverData.data.forEach(car => {
      car.id && car.name && car.color && renderArticles(car.id, car.name, car.color)
      
    })
  })
}

addHeaderButtonsHandler()
addGarageFormsHandler()

//================= CREATE CAR =================



//================= RENDER =================

const renderArticles = (id: number, carsName: string, carsColor: string): void => {
  const article = new Article(id, carsName, carsColor);
  article.generateArticle();
}








