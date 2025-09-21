'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GameForm } from '@/components/game-form';
import { GameTable } from '@/components/game-table';
import { Game, GameFormData } from '@/lib/types';
import { getGames, createGame, updateGame, deleteGame } from '@/lib/game-storage';
import { Plus, Gamepad2, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGames = () => {
      const storedGames = getGames();
      setGames(storedGames);
      setIsLoading(false);
    };

    loadGames();

    const handleStorageChange = () => {
      loadGames();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleAddGame = () => {
    setEditingGame(null);
    setShowForm(true);
  };

  const handleEditGame = (game: Game) => {
    setEditingGame(game);
    setShowForm(true);
  };

  const handleSaveGame = async (gameData: GameFormData) => {
    try {
      if (editingGame) {
        const updatedGame = updateGame(editingGame.id, gameData);
        if (updatedGame) {
          setGames(prev => prev.map(game =>
            game.id === editingGame.id ? updatedGame : game
          ));
          setShowForm(false);
          setEditingGame(null);
        }
      } else {
        const newGame = createGame(gameData);
        setGames(prev => [...prev, newGame]);
        setShowForm(false);
        setEditingGame(null);
      }
    } catch (error) {
      console.error('Error saving game:', error);
      toast.error('An error occurred while saving the game.');
      throw error;
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingGame(null);
  };

  const handleDeleteGame = (gameId: string, gameTitle: string) => {
    try {
      const success = deleteGame(gameId);
      if (success) {
        setGames(prev => prev.filter(game => game.id !== gameId));
        toast.success(`"${gameTitle}" has been deleted successfully!`);
      }
    } catch (error) {
      console.error('Error deleting game:', error);
      toast.error('An error occurred while deleting the game.');
    }
  };

  const stats = {
    total: games.length,
    completed: games.filter(g => g.status === 'Completed').length,
    inProgress: games.filter(g => g.status === 'In Progress').length,
    new: games.filter(g => g.status === 'New').length,
    averageRating: games.filter(g => g.rating).length > 0
      ? Math.round((games.reduce((sum, g) => sum + (g.rating || 0), 0) / games.filter(g => g.rating).length) * 10) / 10
      : 0,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Gamepad2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your game collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-light text-gray-900 mb-2 tracking-tight">
                GameVault
              </h1>
              <p className="text-gray-600 text-sm">
                Your personal game collection
              </p>
            </div>
            <Button
              onClick={handleAddGame}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
              size="default"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Game
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <Gamepad2 className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
                    <p className="text-lg font-semibold text-gray-900">{stats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <CheckCircle className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Completed</p>
                    <p className="text-lg font-semibold text-gray-900">{stats.completed}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <Clock className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">In Progress</p>
                    <p className="text-lg font-semibold text-gray-900">{stats.inProgress}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <TrendingUp className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Rating</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {stats.averageRating > 0 ? `${stats.averageRating}/10` : '—'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          {showForm && (
            <div className="mb-6">
              <GameForm
                game={editingGame}
                onSave={handleSaveGame}
                onCancel={handleCancelForm}
              />
            </div>
          )}

          <GameTable
            games={games}
            onEdit={handleEditGame}
            onDelete={(gameId, gameTitle) => handleDeleteGame(gameId, gameTitle)}
          />
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-100">
          <div className="text-center text-gray-400">
            <p className="text-sm">GameVault • Built with Next.js & shadcn/ui</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
