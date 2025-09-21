'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Game, GameStatus, GamePlatform } from '@/lib/types';
import { Search, Filter, Trash2, Edit, Star, Clock, CheckCircle, Pause, XCircle, Gamepad2, Monitor, Smartphone, Target } from 'lucide-react';

interface GameTableProps {
  games: Game[];
  onEdit: (game: Game) => void;
  onDelete: (gameId: string, gameTitle: string) => void;
}

const STATUS_CONFIG: Record<GameStatus, { label: string; color: string; icon: React.ReactNode }> = {
  'New': { label: 'New', color: 'bg-gray-100 text-gray-700 border border-gray-200', icon: <Gamepad2 className="h-3 w-3" /> },
  'In Progress': { label: 'In Progress', color: 'bg-gray-100 text-gray-700 border border-gray-200', icon: <Clock className="h-3 w-3" /> },
  'Completed': { label: 'Completed', color: 'bg-gray-100 text-gray-700 border border-gray-200', icon: <CheckCircle className="h-3 w-3" /> },
  'On Hold': { label: 'On Hold', color: 'bg-gray-100 text-gray-700 border border-gray-200', icon: <Pause className="h-3 w-3" /> },
  'Abandoned': { label: 'Abandoned', color: 'bg-gray-100 text-gray-700 border border-gray-200', icon: <XCircle className="h-3 w-3" /> },
};

const PLATFORM_ICONS: Record<GamePlatform, React.ReactNode> = {
  'PS5': <Gamepad2 className="h-4 w-4" />,
  'Xbox': <Gamepad2 className="h-4 w-4" />,
  'Nintendo Switch': <Gamepad2 className="h-4 w-4" />,
  'PC': <Monitor className="h-4 w-4" />,
  'Mobile': <Smartphone className="h-4 w-4" />,
  'Other': <Target className="h-4 w-4" />,
};

export function GameTable({ games, onEdit, onDelete }: GameTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<GameStatus | 'All'>('All');
  const [platformFilter, setPlatformFilter] = useState<GamePlatform | 'All'>('All');

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.developer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.genre.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || game.status === statusFilter;
    const matchesPlatform = platformFilter === 'All' || game.platform === platformFilter;

    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const handleDelete = (gameId: string, gameTitle: string) => {
    onDelete(gameId, gameTitle);
  };

  const renderStars = (rating?: number) => {
    if (!rating) return <span className="text-gray-400">No rating</span>;

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating / 2)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating}/10)</span>
      </div>
    );
  };

  if (games.length === 0) {
    return (
      <Card className="w-full border-gray-200">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Gamepad2 className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No games yet</h3>
          <p className="text-gray-500 text-center text-sm">
            Start building your collection by adding your first game.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-medium">Games</span>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>{filteredGames.length} of {games.length}</span>
          </div>
        </CardTitle>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200 bg-gray-50/50"
            />
          </div>

          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={(value: GameStatus | 'All') => setStatusFilter(value)}>
              <SelectTrigger className="w-[140px] border-gray-200 bg-gray-50/50">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
                <SelectItem value="Abandoned">Abandoned</SelectItem>
              </SelectContent>
            </Select>

            <Select value={platformFilter} onValueChange={(value: GamePlatform | 'All') => setPlatformFilter(value)}>
              <SelectTrigger className="w-[130px] border-gray-200 bg-gray-50/50">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Platforms</SelectItem>
                <SelectItem value="PS5">PS5</SelectItem>
                <SelectItem value="Xbox">Xbox</SelectItem>
                <SelectItem value="Nintendo Switch">Nintendo Switch</SelectItem>
                <SelectItem value="PC">PC</SelectItem>
                <SelectItem value="Mobile">Mobile</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {filteredGames.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No games match your search criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-100">
                  <TableHead className="text-gray-600 font-medium text-sm">Game</TableHead>
                  <TableHead className="text-gray-600 font-medium text-sm">Platform</TableHead>
                  <TableHead className="text-gray-600 font-medium text-sm">Genre</TableHead>
                  <TableHead className="text-gray-600 font-medium text-sm">Developer</TableHead>
                  <TableHead className="text-gray-600 font-medium text-sm">Status</TableHead>
                  <TableHead className="text-gray-600 font-medium text-sm">Rating</TableHead>
                  <TableHead className="text-gray-600 font-medium text-sm">Progress</TableHead>
                  <TableHead className="text-gray-600 font-medium text-sm w-20"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGames.map((game) => (
                  <TableRow key={game.id} className="border-gray-50 hover:bg-gray-25">
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-medium text-gray-900">{game.title}</div>
                        <div className="text-xs text-gray-500">
                          {game.releaseYear}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-2 text-gray-600">{PLATFORM_ICONS[game.platform]}</span>
                        <span className="text-sm text-gray-700">{game.platform}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-700">{game.genre}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-700">{game.developer}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={STATUS_CONFIG[game.status].color}>
                        <span className="flex items-center">
                          {STATUS_CONFIG[game.status].icon}
                          <span className="ml-1 text-xs">{STATUS_CONFIG[game.status].label}</span>
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {renderStars(game.rating)}
                    </TableCell>
                    <TableCell>
                      {game.completionPercentage !== undefined ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-12 bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-gray-600 h-1.5 rounded-full"
                              style={{ width: `${game.completionPercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {game.completionPercentage}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(game)}
                          className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-600 hover:text-red-600 hover:bg-gray-100"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="border-gray-200">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-gray-900">Delete Game</AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-600">
                                Are you sure you want to delete "{game.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-gray-200 text-gray-700">Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(game.id, game.title)}
                                className="bg-gray-900 hover:bg-gray-800 text-white"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
