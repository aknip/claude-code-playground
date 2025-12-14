# Test project for Claude Code Skills, Agents and Commands

- "UserProfile Component"
- This demo component was created with "Claude Code Tresor" and the Command in Claude: `/development:scaffold react-component UserProfile --hooks --tests`
- Based on the article https://alirezarezvani.medium.com/stop-teaching-claude-the-same-thing-every-day-build-your-persistent-ai-development-team-e41b416e3e19
- See Repository: https://github.com/alirezarezvani/claude-code-tresor
- **IMPORTANT:** Works ONLY with Claude Code CLI via terminal - NOT via VS Code extension!

## Quickstart
- nmp install
- npm run dev
- http://localhost:3000
- Tests:
  - npm run test
  - npm run typecheck
  - npm run lint     

## UserProfile Component

A React component for displaying and editing user profiles with TypeScript support, custom hooks, and comprehensive testing.

## Features

- **Three display variants**: `compact`, `full`, and `card`
- **Editable mode** with form validation
- **Custom hooks** for state management and validation
- **Fully typed** with TypeScript
- **Accessible** (WCAG compliant)
- **Dark mode support** via CSS custom properties
- **58 unit tests** with high coverage

## Installation

```bash
npm install
```

## Usage

### Basic Usage

```tsx
import { UserProfile, createMockUser } from './src';

const user = createMockUser();

<UserProfile user={user} />
```

### With Editing

```tsx
import { UserProfile } from './src';

<UserProfile
  user={user}
  isEditable
  onSave={async (updatedUser) => {
    await saveToAPI(updatedUser);
  }}
  onEdit={(user) => console.log('Editing:', user)}
/>
```

### Variants

```tsx
// Compact - minimal display
<UserProfile user={user} variant="compact" />

// Full - all details (default)
<UserProfile user={user} variant="full" />

// Card - centered card layout
<UserProfile user={user} variant="card" />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `user` | `User` | required | User data to display |
| `isLoading` | `boolean` | `false` | Show loading skeleton |
| `isEditable` | `boolean` | `false` | Enable edit mode |
| `onEdit` | `(user: User) => void` | - | Called when edit starts |
| `onSave` | `(user: User) => Promise<void>` | - | Called to save changes |
| `className` | `string` | - | Custom CSS class |
| `variant` | `'compact' \| 'full' \| 'card'` | `'full'` | Display variant |
| `showSocialLinks` | `boolean` | `true` | Show social links |

### User Type

```typescript
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  joinedAt: Date;
  isVerified?: boolean;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}
```

## Custom Hooks

### useUserProfile

Manages edit state for the profile component.

```tsx
import { useUserProfile } from './src';

const {
  state,        // { isEditing, editedUser, errors, isDirty }
  startEdit,    // Start editing
  cancelEdit,   // Cancel changes
  updateField,  // Update a field
  saveChanges,  // Save to server
  isSaving,     // Loading state
} = useUserProfile(user, onSave);
```

### useUserProfileValidation

Provides field validation functions.

```tsx
import { useUserProfileValidation } from './src';

const {
  validateField,  // Validate single field
  validateAll,    // Validate entire user object
  validateEmail,  // Email validation
  validateUrl,    // URL validation
  validateName,   // Name validation
} = useUserProfileValidation();
```

## Scripts

```bash
# Start a dev server at http://localhost:3000
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Type check
npm run typecheck

# Lint
npm run lint

# Fix lint errors
npm run lint:fix

# Build
npm run build
```

## Project Structure

```
src/
├── index.ts                          # Main exports
├── setupTests.ts                     # Jest setup
├── types/
│   └── css.d.ts                      # CSS module types
├── demo/
│   ├── App.tsx                       # Demo application
│   ├── main.tsx                      # Demo entry point
│   └── styles.css                    # Demo styles
└── components/
    └── UserProfile/
        ├── index.ts                  # Component exports
        ├── types.ts                  # TypeScript interfaces
        ├── UserProfile.tsx           # Main component
        ├── UserProfile.module.css    # Component styles
        ├── utils.ts                  # Helper utilities
        ├── hooks/
        │   ├── index.ts
        │   ├── useUserProfile.ts     # Edit state hook
        │   └── useUserProfileValidation.ts
        └── __tests__/
            ├── UserProfile.test.tsx  # Component tests
            └── hooks.test.ts         # Hook tests
```

## Development

Start the demo app to see the component in action:

```bash
npm run dev
```

This opens a browser at `http://localhost:3000` with interactive controls to:

- Switch between variants
- Toggle editable mode
- Toggle social links
- Simulate loading state
- Toggle verified badge
- Toggle avatar

## Testing

The component includes 58 tests covering:

- Rendering all variants
- Edit mode functionality
- Form validation
- Accessibility attributes
- Edge cases

```bash
# Run all tests
npm test

# With coverage report
npm run test:coverage
```

## License

MIT
