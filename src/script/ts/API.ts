import { carData, engine, engineStatus, ICar } from "./types/types";

const baseUrl: string = 'http://127.0.0.1:3000'
const path: {
  garage: string;
  engine: string;
  winners: string;
} = {
  garage: '/garage',
  engine: '/engine',
  winners: '/winners'
}

// const generateQueryString = (params) => params.length && `?${params.map(x => `${x.key}=${x.value}`).join('&')}`


//================= CAR API =================

export const getCars = async (): Promise<string[]> => {
  const response = await fetch(`${baseUrl}${path.garage}`)
  const data = await response.json()
  return data
}

export const getCar = async (id: number): Promise<ICar> => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`)
  const data = await response.json()
  return data
}

export const createCar = async (carData: ICar): Promise<ICar> => {
  const response = await fetch(`${baseUrl}${path.garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(carData)
  })

  const car = await response.json()
  return car
}

export const deleteCar = async (id: number): Promise<ICar> => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: 'DELETE'
  })

  const car = await response.json()
  return car
}

export const updateCar = async (id: number, carData: carData): Promise<ICar> => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(carData)
  })

  const car = await response.json()
  return car
}


//================= ENGINE API =================

export const updateEngine = async (id: number, engineStatus: engineStatus): Promise<engine> => {
  const response = await fetch(`${baseUrl}${path.engine}?id=${id}&status=${engineStatus}`, {
    method: 'PATCH'
  })

  const engine = await response.json();
  return engine;
}

