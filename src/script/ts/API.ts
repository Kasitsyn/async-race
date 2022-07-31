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

interface ICar {
  "name": string;
  "color": string;
  "id": number;
}

export const getCars = async (): Promise<string[]> => {
  const response = await fetch(`${baseUrl}${path.garage}`)
  return await response.json()
}

export const getCar = async (id: number): Promise<ICar> => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`)
  const data = await response.json()
  return data
}

