export interface Game {
  id: string;
  title: string;
  platform: 'PS5' | 'Xbox' | 'Nintendo Switch' | 'PC' | 'Mobile' | 'Other';
  genre: string;
  releaseYear: number;
  developer: string;
  status: 'New' | 'In Progress' | 'Completed' | 'On Hold' | 'Abandoned';
  rating?: number;
  playtimeHours?: number;
  completionPercentage?: number;
  dateAdded: string;
  notes?: string;
}

export interface GameFormData {
  title: string;
  platform: Game['platform'];
  genre: string;
  releaseYear: number;
  developer: string;
  status: Game['status'];
  rating?: number;
  playtimeHours?: number;
  completionPercentage?: number;
  notes?: string;
}

export type GameStatus = Game['status'];
export type GamePlatform = Game['platform'];
