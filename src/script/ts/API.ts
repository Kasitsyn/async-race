import { constantQueryParams, engine, engineStatus, ICar, queryParams, winner } from "./types/types";

export const QUERYPARAMS: constantQueryParams = {
  page: '_page',
  pageValue: 1,
  limit: '_limit',
  limitValue: 7
}

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

export const generateQueryString = (params: queryParams[] | [] = []) => params.length
  && `?${params.map((x: queryParams) => `${x.key}=${x.value}`).join('&')}`


//================= CAR =================

export const getCars = async (queryParams: queryParams[]): Promise<{ data: ICar[], count: number }> => {
  const response = await fetch(`${baseUrl}${path.garage}${generateQueryString(queryParams)}`)
  const data = await response.json()

  const count = Number(response.headers.get('X-Total-Count'))
  return { data, count }
}

export const getCar = async (id: number | null): Promise<ICar> => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`)
  const data = await response.json()
  return data
}

export const createCar = async (dataParams: ICar): Promise<ICar> => {
  const response = await fetch(`${baseUrl}${path.garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataParams)
  })

  const data = await response.json()
  return data
}

export const deleteCar = async (id: number | null): Promise<{}> => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: 'DELETE'
  })

  const data = await response.json()
  return data
}

export const updateCar = async (id: number | null, dataParams: ICar): Promise<ICar> => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataParams)
  })

  const data = await response.json()
  return data
}


//================= ENGINE =================

export const toggleEngine = async (queryParams: queryParams[]): Promise<engine> => {
  const response = await fetch(`${baseUrl}${path.engine}${generateQueryString(queryParams)}`, {
    method: "PATCH"
  })

  const data = await response.json();
  return data;
}

export const engineDrive = async (queryParams: queryParams[]): Promise<engine> => {
  const response = await fetch(`${baseUrl}${path.engine}${generateQueryString(queryParams)}`, {
    method: "PATCH"
  })

  const data = await response.json();
  return data;
}

//================= WINNERS =================

export const getWinners = async (queryParams: queryParams[]): Promise<{ data: winner[], count: number }> => {
  const response = await fetch(`${baseUrl}${path.winners}${generateQueryString(queryParams)}`)
  const data = await response.json()

  const count = Number(response.headers.get('X-Total-Count'))
  return { data, count }
}

export const getWinner = async (id: number | null): Promise<winner> => {
  const response = await fetch(`${baseUrl}${path.winners}/${id}`)
  const data = await response.json()
  return data
}

export const createWinner = async (dataParams: winner): Promise<winner> => {
  const response = await fetch(`${baseUrl}${path.garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataParams)
  })

  const data = await response.json()
  return data
}

export const deleteWinner = async (id: number | null): Promise<{}> => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: 'DELETE'
  })

  const data = await response.json()
  return data
}

export const updateWinner = async (id: number | null, dataParams: winner): Promise<winner | {}> => {
  const response = await fetch(`${baseUrl}${path.winners}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataParams)
  })

  const data = await response.json()
  return data
}

