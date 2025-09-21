# GameVault - Video Game Collection Manager

A modern, minimalist web application for managing your video game collection with full CRUD operations. Built with Next.js 15, TypeScript, and shadcn/ui components.

## Project Overview

**GameVault** is a sophisticated video game collection management system that allows users to:
- Add, edit, and delete video games from their collection
- Track game progress and completion status
- Rate games and add personal notes
- Search and filter games by various criteria
- View collection statistics and analytics

## Development Team

**Developers:**
- Atilio Gustavo Morataya Serrano (MS101122)
- Wilmer Henrry Salazar Martinez (SM101223)

## Technologies Used

### Frontend Framework
- **Next.js 15.5.3** - React framework with App Router
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS v4** - Utility-first CSS framework

### UI Components & Styling
- **shadcn/ui** - Modern, accessible UI components
- **Lucide React** - Beautiful icon library
- **Sonner** - Toast notifications

### Form Management & Validation
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation

### State Management & Data Persistence
- **React Hooks** - Modern state management
- **localStorage** - Client-side data persistence
- **Custom hooks** - Reusable logic components

## Design Decisions

### Architecture Choices
- **Client-side storage**: Used localStorage instead of a database for simplicity and immediate setup
- **Component-based architecture**: Modular design with reusable components
- **TypeScript**: Full type safety throughout the application
- **Responsive design**: Mobile-first approach with Tailwind CSS

### Data Management
- **JSON structure**: Simple, readable data format
- **Unique ID generation**: Automatic ID creation using timestamps
- **Validation**: Comprehensive form validation with real-time feedback
- **Error handling**: Graceful error management with user notifications

## Installation & Setup

### Prerequisites
- Node.js 18+ or later
- npm, yarn, or pnpm package manager

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/wkatir/crud-videogames.git
   cd crud-videogames
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal)

## Features

### Core Functionality
- **Create** - Add new games to your collection
- **Read** - View all games in a clean table format
- **Update** - Edit existing game information
- **Delete** - Remove games with confirmation dialogs

### Advanced Features
- **Smart Search** - Search across titles, developers, and genres
- **Status Tracking** - Mark games as New, In Progress, Completed, etc.
- **Rating System** - Rate games from 1-10 stars
- **Progress Tracking** - Track completion percentage
- **Platform Support** - Support for PS5, Xbox, Nintendo Switch, PC, Mobile
- **Personal Notes** - Add custom notes for each game
- **Statistics Dashboard** - View collection metrics at a glance

### User Experience
- **Toast Notifications** - Real-time feedback for all actions
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Fast Performance** - Optimized with Next.js 15 and Turbopack
- **Modern UI** - Clean, professional design with shadcn/ui
- **Form Validation** - Real-time validation with helpful error messages

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx          # Main application page
│   └── globals.css       # Global styles and Tailwind
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── game-form.tsx     # Game creation/editing form
│   └── game-table.tsx    # Games display table
└── lib/                  # Utility functions
    ├── types.ts          # TypeScript interfaces
    ├── utils.ts         # Utility functions
    └── game-storage.ts   # Data persistence logic
```

## Configuration

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint"
  }
}
```

### TypeScript Configuration
- Full type safety with strict mode
- Path mapping with `@/*` aliases
- Modern ES modules support

## Challenges & Solutions

### Challenges Encountered

1. **Unique ID Generation**
   - **Problem**: Needed unique identifiers for each game
   - **Solution**: Implemented timestamp-based ID generation with random suffix

2. **Form Validation**
   - **Problem**: Complex validation requirements for different field types
   - **Solution**: Used Zod schema validation with React Hook Form for robust validation

3. **Data Persistence**
   - **Problem**: Need to persist data between sessions
   - **Solution**: localStorage implementation with error handling

4. **State Management**
   - **Problem**: Complex state updates across multiple components
   - **Solution**: React hooks with proper state management patterns

5. **Hydration Errors**
   - **Problem**: Browser extension interference causing hydration mismatches
   - **Solution**: Added suppressHydrationWarning to resolve extension conflicts

### Technical Solutions Implemented

- **Error Boundaries**: Proper error handling throughout the application
- **Loading States**: User feedback during async operations
- **Optimistic Updates**: Immediate UI updates with rollback on errors
- **Memory Management**: Efficient localStorage usage
- **Performance Optimization**: Code splitting and lazy loading

## Data Model

### Game Interface
```typescript
interface Game {
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
```

## Design Philosophy

- **Minimalism**: Clean, uncluttered interface
- **Functionality**: Every element serves a purpose
- **Accessibility**: WCAG compliant design
- **Performance**: Optimized for speed and efficiency
- **Maintainability**: Clean, documented code structure

## Future Enhancements

- Database integration for multi-user support
- Game cover image uploads
- Advanced filtering and sorting options
- Export/import functionality
- Dark mode support
- Mobile app version

## License

This project is for educational purposes as part of the Quality Management course.

