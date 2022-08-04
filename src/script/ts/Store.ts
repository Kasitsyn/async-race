import {stateType } from "./types/types";

export const DATABASE = 'database'

export let state: stateType = {
  carsNum: 0,
  pageNum: 1,

  color: null,
  name: null,
  cars: null,
  winners: null,
  currentWinner: null,
  numOfCars: null,
  numOfWinners: null
}

export const initState = () => {
  const stateFromLocalStorage = JSON.parse(localStorage.getItem(DATABASE) || '{}')
  state = { ...stateFromLocalStorage }
}

export const saveToLocalStorage = (key: string, value: stateType) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const serverData = {
  car: null
}