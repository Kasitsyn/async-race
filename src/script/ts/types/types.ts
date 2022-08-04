export interface IArticle {
  id?: number | null | undefined;
  name: string | null;
  color: string | null;
}

export type stateType = {
  cars: ICar[] | null;
  winners: winner[] | null;
  currentWinner: winner | null;
  numOfCars: number | null;
  numOfWinners: number | null;

  carsNum: number;
  pageNum: number;

  color: string | null;
  name: string | null;
}

export interface ICar {
  id?: number | null;
  name: string | null;
  color: string | null;
}

export type engineStatus = 'started' | 'stopped';

export type engine = {
  velocity: number;
  distance: number;
}

export type queryParams = {
  key: string;
  value: number | string;
}

export type winner = {
  wins: number;
  time: number;
}

export type constantQueryParams = {
  PAGE: string;
  LIMIT: string;
}