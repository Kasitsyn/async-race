import { stateType } from "./Types";

export const DATABASE = 'database'

export let state: stateType = {
  id: 1,
  currentPage: 1,
  pageAmount: 1,
  color: null,
  name: null,
  velocity: null,
  distance: null,
  success: false,
  cars: null,
  winners: [],
  carsAmount: null,
  winnersAmount: null,
}

// export const animation: animationId = {
//   'id': null
// }

export const nameCars: string[] = ['Tesla', 'Toyota', 'BMW', 'Mercedes', 'Porsche', 'Lexus', 'Ferrari', 'Lada', 'Subaru', 'Mazda']
export const nameRacers: string[] = ['Bottas', 'Gasly', 'Alonso', 'Sebastian ', 'Leclerc', 'Schumacher', 'Ricciardo', 'Russell', 'Magnussen', 'Tsunoda']



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


