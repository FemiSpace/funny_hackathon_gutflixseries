# Technical Reference: GutFlix LLM Integration

## Table of Contents
1. [Project Structure](#project-structure)
2. [Core Components](#core-components)
3. [Data Models](#data-models)
4. [API Reference](#api-reference)
5. [State Management](#state-management)
6. [Styling Guide](#styling-guide)
7. [Deployment](#deployment)

## Project Structure

```
gutflix/
├── app/
│   ├── api/
│   │   └── generate-reaction/
│   │       └── route.ts         # LLM API endpoint
│   ├── components/
│   │   ├── FoodSelector.tsx     # Food selection grid
│   │   ├── ReactionScene.tsx    # Displays organ reactions
│   │   └── LLMResponseBox.tsx   # Chat interface
│   └── page.tsx                 # Main application
├── lib/
│   └── supabase.ts              # Database client & types
├── public/
│   ├── images/                  # Food images
│   └── gifs/                    # Reaction GIFs
└── docs/                        # Documentation
```

## Core Components

### 1. FoodSelector.tsx
- Displays grid of selectable food items
- Handles food selection
- Shows food metadata (name, damage score)

### 2. ReactionScene.tsx
- Manages reaction display
- Handles animation timing
- Renders character bubbles

### 3. LLMResponseBox.tsx
- Chat interface for follow-up questions
- Manages message history
- Handles user input

## Data Models

### FoodItem
```typescript
interface FoodItem {
  id: number;
  name: string;
  type: string;
  image_path: string;
  gif_path?: string;
  default_quantity: number;
  base_damage_score: number;
  description?: string;
  is_active: boolean;
  created_at: string;
}
```

### OrganReaction
```typescript
interface OrganReaction {
  character: string;
  dialogue: string;
  timestamp: number;
  mood: 'panic' | 'excited' | 'confused' | 'angry' | 'happy';
  emoji: string;
}
```

### LLMResponse
```typescript
interface LLMResponse {
  reactions: OrganReaction[];
  medical_context?: string;
  humor_level: number;
}
```

## API Reference

### POST /api/generate-reaction

**Request:**
```typescript
{
  foodItemId: number;
  quantity: number;
  playerName?: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  foodItem: FoodItem;
  llmResponse: LLMResponse;
  logEntry: GutLogEntry;
  cached: boolean;
}
```

## State Management

### Reaction State
```typescript
interface ReactionState {
  isLoading: boolean;
  currentFood: FoodItem | null;
  reactions: OrganReaction[];
  error: string | null;
  playerName: string;
}
```

### Chat State
```typescript
interface ChatState {
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: number;
  }>;
  isTyping: boolean;
  error: string | null;
}
```

## Styling Guide

### Color Scheme
- Primary: `#8B5CF6` (Purple)
- Danger: `#EF4444` (Red)
- Warning: `#F59E0B` (Amber)
- Success: `#10B981` (Emerald)
- Info: `#3B82F6` (Blue)

### Animation Timings
- Bubble enter: 700ms ease-out
- Character delay: 2000ms between characters
- Typing indicator: 400ms pulse

## Deployment

### Environment Variables
```env
# Azure OpenAI
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_DEPLOYMENT=
AZURE_OPENAI_API_VERSION=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Environment
NODE_ENV=production
```

### Build & Deploy
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

## Testing

### Unit Tests
```bash
npm test
```

### Integration Tests
1. Test food selection
2. Verify API responses
3. Check error handling
4. Validate animations

## Performance

### Optimizations
- Response caching in Supabase
- Lazy loading of components
- Image optimization with Next.js
- Efficient state updates

### Monitoring
- Console logging for errors
- API response times
- Cache hit/miss rates

## Troubleshooting

### Common Issues
1. Missing environment variables
2. API rate limiting
3. Database connection issues
4. Animation jank

### Debugging
1. Check browser console
2. Verify API responses
3. Inspect network traffic
4. Review server logs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a pull request

## License

[MIT License](LICENSE)
