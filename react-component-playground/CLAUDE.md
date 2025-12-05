# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a production-ready React UserProfile component library with TypeScript, custom hooks, and comprehensive testing.

## Common Commands

```bash
# Development
npm run dev           # Start Vite dev server at localhost:3000

# Testing
npm test              # Run Jest tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report

# Code Quality
npm run typecheck     # TypeScript type checking
npm run lint          # ESLint
npm run lint:fix      # ESLint with auto-fix

# Build
npm run build         # Build with Vite
```

## Architecture

### Component Structure

```
src/components/UserProfile/
├── UserProfile.tsx           # Main component
├── UserProfile.module.css    # CSS modules styles
├── types.ts                  # TypeScript interfaces
├── utils.ts                  # Helper functions
├── hooks/
│   ├── useUserProfile.ts     # Edit state management (reducer pattern)
│   └── useUserProfileValidation.ts  # Form validation
└── __tests__/
    ├── UserProfile.test.tsx  # Component tests
    └── hooks.test.ts         # Hook tests
```

### Key Patterns

- **State Management**: Uses `useReducer` for edit state in `useUserProfile` hook
- **Styling**: CSS Modules with CSS custom properties for theming
- **Testing**: React Testing Library with `userEvent` for interactions
- **Exports**: Barrel exports from `src/index.ts`

## Important Files

- `src/components/UserProfile/types.ts` - All TypeScript interfaces
- `src/components/UserProfile/hooks/useUserProfile.ts` - Core state logic
- `jest.config.cjs` - Jest configuration (CommonJS due to ESM package)
- `vite.config.ts` - Vite dev server configuration

## Testing Notes

- Tests use `identity-obj-proxy` for CSS module mocking
- React 18 act() warnings are suppressed in `setupTests.ts`
- Use `waitFor` after user interactions that trigger state updates
