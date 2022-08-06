export interface IArticle {
  id?: number | null | undefined;
  name: string | null;
  color: string | null;
}

export type stateType = {
  id: number | null;
  cars: ICar[] | null;
  winners: winner[] | null;
  currentWinner: winner | null;
  carsAmount: number | null;
  winnersAmount: number | null;
  currentPage: number;
  pageAmount: number | null;
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
  page: string;
  pageValue: number;
  limit: string;
  limitValue: number;
}