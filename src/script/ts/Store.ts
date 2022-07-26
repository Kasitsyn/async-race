import { stateType } from "./Types";

export const DATABASE = 'database'

export let state: stateType = {
  id: null,
  currentPage: 1,
  pageAmount: 1,
  color: null,
  name: null,
  cars: null,
  winners: null,
  currentWinner: null,
  carsAmount: null,
  winnersAmount: null
}

export const nameCars: string[] = ['Tesla', 'Toyota', 'BMW', 'Mercedes', 'Porsche', 'Lexus', 'Ferrari', 'Lada', 'Subaru', 'Mazda']



export const initState = () => {
  if (localStorage.database) {
    const stateFromLocalStorage = JSON.parse(localStorage.getItem(DATABASE) || '{}')
    state = { ...stateFromLocalStorage }
  }
  saveToLocalStorage(DATABASE, state)
}

export const saveToLocalStorage = (key: string, value: stateType) => {
  localStorage.setItem(key, JSON.stringify(value))
}


