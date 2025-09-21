import { Game, GameFormData } from './types';

const STORAGE_KEY = 'gamevault-games';

export function generateGameId(): string {
  return `game-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function getGames(): Game[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading games from localStorage:', error);
    return [];
  }
}

export function saveGames(games: Game[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
  } catch (error) {
    console.error('Error saving games to localStorage:', error);
  }
}

export function createGame(gameData: GameFormData): Game {
  const newGame: Game = {
    ...gameData,
    id: generateGameId(),
    dateAdded: new Date().toISOString(),
  };

  const games = getGames();
  games.push(newGame);
  saveGames(games);

  return newGame;
}

export function updateGame(id: string, gameData: GameFormData): Game | null {
  const games = getGames();
  const gameIndex = games.findIndex(game => game.id === id);

  if (gameIndex === -1) return null;

  const updatedGame: Game = {
    ...gameData,
    id,
    dateAdded: games[gameIndex].dateAdded,
  };

  games[gameIndex] = updatedGame;
  saveGames(games);

  return updatedGame;
}

export function deleteGame(id: string): boolean {
  const games = getGames();
  const filteredGames = games.filter(game => game.id !== id);

  if (filteredGames.length === games.length) return false;

  saveGames(filteredGames);
  return true;
}

export function getGame(id: string): Game | null {
  const games = getGames();
  return games.find(game => game.id === id) || null;
}

export function getGamesByStatus(status: Game['status']): Game[] {
  const games = getGames();
  return games.filter(game => game.status === status);
}

export function getGamesByPlatform(platform: Game['platform']): Game[] {
  const games = getGames();
  return games.filter(game => game.platform === platform);
}

export function searchGames(query: string): Game[] {
  const games = getGames();
  const lowercaseQuery = query.toLowerCase();

  return games.filter(game =>
    game.title.toLowerCase().includes(lowercaseQuery) ||
    game.developer.toLowerCase().includes(lowercaseQuery) ||
    game.genre.toLowerCase().includes(lowercaseQuery)
  );
}
