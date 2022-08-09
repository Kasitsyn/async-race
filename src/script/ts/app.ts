import { createCar, deleteCar, engineDrive, generateQueryString, getCar, getCars, updateCar, toggleEngine, getWinners, getWinner, createWinner, deleteWinner, updateWinner, QUERYPARAMS } from './API.js';
import { Article } from './Article.js';
import { DATABASE, initState, nameCars, saveToLocalStorage, state } from './Store.js';
import { ICar } from './Types.js';

//================= DATA FOR TESTING =================

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


export const addHeaderButtonsHandler = (): void => {
  UI.header.toWinnersBtn?.addEventListener('click', (e) => {
    UI.garage.garageSection?.classList.add('visually-hidden')
    UI.winners.winnersSection?.classList.remove('visually-hidden')
  })

  UI.header.toGarageBtn?.addEventListener('click', (e) => {
    UI.winners.winnersSection?.classList.add('visually-hidden')
    UI.garage.garageSection?.classList.remove('visually-hidden')
  })
}

export const addGarageFormsHandler = (): void => {
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

export const addMenuHandler = () => {
  UI.menu.generateCarsBtn?.addEventListener('click', async (e) => {
    const cars = generateManyCars(10)
    const carsPromises: Promise<ICar>[] = []
    cars.forEach((car: ICar) => {
      carsPromises.push(createCar({ ...car }))
    })
    await Promise.all(carsPromises).then(() => renderArticleAll(QUERYPARAMS.pageValue))

  })
}

export const addArticleHandlers = (): void => {

  const UIArticle = {
    selectBtnAll: document.querySelectorAll<HTMLButtonElement>('#select-btn'),
    removeBtnAll: document.querySelectorAll<HTMLButtonElement>('#remove-btn'),
    title: document.querySelector<HTMLHeadingElement>('#article-title'),
    startBtnAll: document.querySelectorAll<HTMLButtonElement>('#start-btn'),
    breakBtnAll: document.querySelectorAll<HTMLButtonElement>('#break-btn'),
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

  UIArticle.removeBtnAll?.forEach((el) => el.addEventListener('click', async (e) => {
    saveId(e)
    await deleteCar(state.id).then(() => {
      console.log(state.id)
      renderArticleAll(QUERYPARAMS.pageValue)
    })
  }))

  UIArticle.startBtnAll?.forEach((el) => el.addEventListener('click', async (e) => {
    saveId(e)
    await toggleEngine([{key: QUERYPARAMS.id, value: state.id}, {key: QUERYPARAMS.status, value: state.id}])
  }))
}

export const addFooterHandlers = (): void => {
  UI.footer.nextBtn?.addEventListener('click', async (e) => {
    QUERYPARAMS.pageValue++
    await renderArticleAll(QUERYPARAMS.pageValue)
    UI.footer.nextBtn?.scrollIntoView()
  })

  UI.footer.prevBtn?.addEventListener('click', async (e) => {
    QUERYPARAMS.pageValue--
    await renderArticleAll(QUERYPARAMS.pageValue)
    UI.footer.prevBtn?.scrollIntoView()
  })
}

addHeaderButtonsHandler()
addGarageFormsHandler()
addFooterHandlers()
addMenuHandler()

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
  renderFooterBtn()
}

export const renderCarsNumber = () => {
  UI.garage.carsNum && state.carsAmount !== null
    ? (UI.garage.carsNum.innerText = `${state.carsAmount}`)
    : ''
}

export const renderPageNumber = () => {
  UI.garage.pageNumGarage && state.currentPage !== null
    ? (UI.garage.pageNumGarage.innerText = `${state.currentPage}`)
    : ''
}

export const renderFooterBtn = () => {
  QUERYPARAMS.pageValue >= state.pageAmount
    ? UI.footer.nextBtn?.setAttribute('disabled', 'true')
    : UI.footer.nextBtn?.removeAttribute('disabled')

  QUERYPARAMS.pageValue === 1
    ? UI.footer.prevBtn?.setAttribute('disabled', 'true')
    : UI.footer.prevBtn?.removeAttribute('disabled')
}

//================= PAGE =================

export const savePageAmount = () => {
  state.pageAmount = state.carsAmount
    ? Math.ceil(state.carsAmount / QUERYPARAMS.limitValue)
    : 1
  saveToLocalStorage(DATABASE, state)
  console.log(QUERYPARAMS.pageValue, state.carsAmount, QUERYPARAMS.limitValue, state.pageAmount)
}

export const generateManyCars = (amount: number): ICar[] => {
  const cars: ICar[] = []
  for (let i = 0; i < amount; i++) {
    const name: string = nameCars[Math.floor(Math.random() * 10)]
    const color: string = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    cars.push({ name, color })
  }

  return cars
}



renderCarsNumber()
renderPageNumber()
renderArticleAll(QUERYPARAMS.pageValue)











