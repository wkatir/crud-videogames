'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GameFormData, Game, GamePlatform, GameStatus } from '@/lib/types';
import { toast } from 'sonner';

const gameSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  platform: z.enum(['PS5', 'Xbox', 'Nintendo Switch', 'PC', 'Mobile', 'Other']),
  genre: z.string().min(1, 'Genre is required').max(50, 'Genre must be less than 50 characters'),
  releaseYear: z.number().min(1970, 'Release year must be at least 1970').max(new Date().getFullYear() + 2, 'Release year cannot be in the future'),
  developer: z.string().min(1, 'Developer is required').max(100, 'Developer must be less than 100 characters'),
  status: z.enum(['New', 'In Progress', 'Completed', 'On Hold', 'Abandoned']),
  rating: z.number().min(1, 'Rating must be at least 1').max(10, 'Rating must be at most 10').optional(),
  playtimeHours: z.number().min(0, 'Playtime must be positive').optional(),
  completionPercentage: z.number().min(0, 'Completion must be at least 0%').max(100, 'Completion must be at most 100%').optional(),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
});

interface GameFormProps {
  game?: Game | null;
  onSave: (gameData: GameFormData) => void;
  onCancel: () => void;
}

const PLATFORMS: GamePlatform[] = ['PS5', 'Xbox', 'Nintendo Switch', 'PC', 'Mobile', 'Other'];
const STATUSES: GameStatus[] = ['New', 'In Progress', 'Completed', 'On Hold', 'Abandoned'];

export function GameForm({ game, onSave, onCancel }: GameFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<GameFormData>({
    resolver: zodResolver(gameSchema),
    defaultValues: {
      title: game?.title || '',
      platform: game?.platform || 'PC',
      genre: game?.genre || '',
      releaseYear: game?.releaseYear || new Date().getFullYear(),
      developer: game?.developer || '',
      status: game?.status || 'New',
      rating: game?.rating,
      playtimeHours: game?.playtimeHours,
      completionPercentage: game?.completionPercentage,
      notes: game?.notes || '',
    },
  });

  const onSubmit = async (data: GameFormData) => {
    try {
      await onSave(data);
      toast.success(game ? 'Game updated successfully!' : 'Game added successfully!');
      reset();
    } catch (error) {
      toast.error('An error occurred while saving the game.');
      console.error('Error saving game:', error);
    }
  };

  return (
    <Card className="w-full max-w-2xl border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium">
          {game ? 'Edit Game' : 'Add New Game'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">Title *</Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="Enter game title"
                className={`border-gray-200 bg-gray-50/50 focus:bg-white transition-colors ${errors.title ? 'border-red-300' : ''}`}
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform" className="text-sm font-medium text-gray-700">Platform *</Label>
              <Select
                value={watch('platform')}
                onValueChange={(value: GamePlatform) => setValue('platform', value)}
              >
                <SelectTrigger className={`border-gray-200 bg-gray-50/50 focus:bg-white transition-colors ${errors.platform ? 'border-red-300' : ''}`}>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {PLATFORMS.map((platform) => (
                    <SelectItem key={platform} value={platform}>
                      {platform}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.platform && <p className="text-sm text-red-500">{errors.platform.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre" className="text-sm font-medium text-gray-700">Genre *</Label>
              <Input
                id="genre"
                {...register('genre')}
                placeholder="e.g., Action, RPG, Strategy"
                className={`border-gray-200 bg-gray-50/50 focus:bg-white transition-colors ${errors.genre ? 'border-red-300' : ''}`}
              />
              {errors.genre && <p className="text-sm text-red-500">{errors.genre.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="releaseYear" className="text-sm font-medium text-gray-700">Release Year *</Label>
              <Input
                id="releaseYear"
                type="number"
                {...register('releaseYear', { valueAsNumber: true })}
                placeholder="e.g., 2024"
                className={`border-gray-200 bg-gray-50/50 focus:bg-white transition-colors ${errors.releaseYear ? 'border-red-300' : ''}`}
              />
              {errors.releaseYear && <p className="text-sm text-red-500">{errors.releaseYear.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="developer" className="text-sm font-medium text-gray-700">Developer *</Label>
              <Input
                id="developer"
                {...register('developer')}
                placeholder="Game developer studio"
                className={`border-gray-200 bg-gray-50/50 focus:bg-white transition-colors ${errors.developer ? 'border-red-300' : ''}`}
              />
              {errors.developer && <p className="text-sm text-red-500">{errors.developer.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium text-gray-700">Status</Label>
              <Select
                value={watch('status')}
                onValueChange={(value: GameStatus) => setValue('status', value)}
              >
                <SelectTrigger className="border-gray-200 bg-gray-50/50 focus:bg-white transition-colors">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating" className="text-sm font-medium text-gray-700">Rating (1-10)</Label>
              <Input
                id="rating"
                type="number"
                min="1"
                max="10"
                {...register('rating', { valueAsNumber: true })}
                placeholder="Rate the game"
                className={`border-gray-200 bg-gray-50/50 focus:bg-white transition-colors ${errors.rating ? 'border-red-300' : ''}`}
              />
              {errors.rating && <p className="text-sm text-red-500">{errors.rating.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="completionPercentage" className="text-sm font-medium text-gray-700">Completion (%)</Label>
              <Input
                id="completionPercentage"
                type="number"
                min="0"
                max="100"
                {...register('completionPercentage', { valueAsNumber: true })}
                placeholder="Game completion percentage"
                className={`border-gray-200 bg-gray-50/50 focus:bg-white transition-colors ${errors.completionPercentage ? 'border-red-300' : ''}`}
              />
              {errors.completionPercentage && <p className="text-sm text-red-500">{errors.completionPercentage.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium text-gray-700">Notes</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Add any notes about this game..."
              rows={3}
              className={`border-gray-200 bg-gray-50/50 focus:bg-white transition-colors resize-none ${errors.notes ? 'border-red-300' : ''}`}
            />
            {errors.notes && <p className="text-sm text-red-500">{errors.notes.message}</p>}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                onCancel();
              }}
              disabled={isSubmitting}
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              {isSubmitting ? 'Saving...' : (game ? 'Update Game' : 'Add Game')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
