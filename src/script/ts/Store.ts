import { stateType } from "./types/types";

export const DATABASE = 'database'

export let state: stateType = {
  id: null,
  currentPage: 1,
  pageAmount: null,
  color: null,
  name: null,
  cars: null,
  winners: null,
  currentWinner: null,
  carsAmount: null,
  winnersAmount: null
}

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
