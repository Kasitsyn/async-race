import { createCar, deleteCar, engineDrive, generateQueryString, getCar, getCars, updateCar, toggleEngine, getWinners, getWinner, createWinner, deleteWinner, updateWinner, QUERYPARAMS } from './API.js';
import { Article } from './Article.js';
import { DATABASE, initState, saveToLocalStorage, state } from './Store.js';
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
    await renderArticleAll(QUERYPARAMS.pageValue)
  })
}

export const addArticleHandlers = () => {

  const UIArticle = {
    selectBtnAll: document.querySelectorAll<HTMLButtonElement>('#select-btn'),
    removeBtnAll: document.querySelectorAll<HTMLButtonElement>('#remove-btn'),
    title: document.querySelector<HTMLHeadingElement>('#article-title'),
    startBtn: document.querySelector<HTMLButtonElement>('#start-btn'),
    breakBtn: document.querySelector<HTMLButtonElement>('#break-btn'),
    carImg: document.querySelector<HTMLImageElement>('#car-img'),
    flagImg: document.querySelector<HTMLImageElement>('#flag-img')
  }

  const saveId = (e: Event) => {
    const target = e.target as HTMLButtonElement
    if (target.dataset.id) {
      state.id = +target.dataset.id
    }

  }

  UIArticle.selectBtnAll?.forEach((el) => el.addEventListener('click', async (e) => {
    saveId(e)

  }))

  UIArticle.removeBtnAll?.forEach(el => el.addEventListener('click', async (e) => {
    saveId(e)
    await deleteCar(state.id).then(() => {
      console.log(state.id)
      renderArticleAll(QUERYPARAMS.pageValue)
    })
  }))
}

export const addFooterHandlers = () => {
  UI.footer.nextBtn?.addEventListener('click', (e) => {
    QUERYPARAMS.pageValue++
    renderArticleAll(QUERYPARAMS.pageValue)
  })

  UI.footer.prevBtn?.addEventListener('click', (e) => {
    QUERYPARAMS.pageValue--
    renderArticleAll(QUERYPARAMS.pageValue)
  })
}

addHeaderButtonsHandler()
addGarageFormsHandler()
addFooterHandlers()

//================= RENDER =================

const renderArticle = (id: number, carsName: string, carsColor: string): void => {
  const article = new Article(id, carsName, carsColor);
  article.generateArticle();

}

export const renderArticleAll = async (page: number) => {
  const articlesWrapper = document.querySelector<HTMLDivElement>('.articles-wrapper')
  if (articlesWrapper) articlesWrapper.innerHTML = '';
  const serverData = await getCars([{ key: QUERYPARAMS.page, value: page }, { key: QUERYPARAMS.limit, value: QUERYPARAMS.limitValue }])
  serverData.data.forEach(car => {
    car.id && car.name && car.color && renderArticle(car.id, car.name, car.color)
  })
  state.carsAmount = serverData.count
  renderCarsNumber()
  addArticleHandlers()
  savePageAmount()
}

export const renderCarsNumber = () => {
  UI.garage.carsNum && state.carsAmount !== null
    ? (UI.garage.carsNum.innerText = `${state.carsAmount}`)
    : ''
}

export const renderPageNumber = () => {
  console.log(state.currentPage)
  UI.garage.pageNumGarage && state.currentPage !== null
    ? (UI.garage.pageNumGarage.innerText = `${state.currentPage}`)
    : ''
}

const savePageAmount = () => {
  state.pageAmount = state.carsAmount
    ? Math.ceil(state.carsAmount / QUERYPARAMS.limitValue)
    : 1
  console.log(state.carsAmount, QUERYPARAMS.limitValue, state.pageAmount)
}

// const saveCurrentPage = () => {
//   state.currentPage = 
// }
renderCarsNumber()
renderPageNumber()
renderArticleAll(QUERYPARAMS.pageValue)









