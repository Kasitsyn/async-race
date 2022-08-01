export interface ICar {
  name: string;
  color: string;
}

export type carData = {
  name?: string;
  color?: string;
} 

export type engineStatus = 'started' | 'stopped';

export type engine = {
  velocity: number;
  distance: number;
} 