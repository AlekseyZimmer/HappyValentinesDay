export enum AppStage {
  INTRO = 'INTRO',
  GAME = 'GAME',
  REWARD = 'REWARD'
}

export type GameObjectType = 'HEART' | 'BUG' | 'COFFEE';

export interface GameObject {
  id: number;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  type: GameObjectType;
  speed: number;
}

export interface GameStats {
  score: number;
  health: number;
  maxScore: number;
}