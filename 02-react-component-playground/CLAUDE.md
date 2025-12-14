# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A production-ready React UserProfile component library built with TypeScript. The project provides a reusable `UserProfile` component with editing capabilities, validation hooks, and utility functions.

## Common Commands

```bash
# Development
npm run dev          # Start Vite dev server
npm run build        # Build with Vite
npm run preview      # Preview production build

# Testing
npm test             # Run Jest tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage (80% threshold required)

# Code Quality
npm run lint         # Run ESLint on src/
npm run lint:fix     # Auto-fix linting issues
npm run typecheck    # TypeScript type checking (tsc --noEmit)
```

## Architecture

### Component Structure

The main export is the `UserProfile` component located at `src/components/UserProfile/`:

```
src/
├── index.ts                      # Library entry point - re-exports everything
├── components/UserProfile/
│   ├── UserProfile.tsx           # Main component with edit/view modes
│   ├── types.ts                  # TypeScript interfaces (User, UserProfileProps, etc.)
│   ├── utils.ts                  # Helper functions (getInitials, formatDate, etc.)
│   ├── UserProfile.module.css    # CSS Modules styling
│   ├── hooks/
│   │   ├── useUserProfile.ts     # State management hook (useReducer pattern)
│   │   └── useUserProfileValidation.ts  # Form validation hook
│   └── __tests__/
│       ├── UserProfile.test.tsx  # Component tests
│       └── hooks.test.ts         # Hook tests
└── demo/                         # Dev demo app (App.tsx, main.tsx)
```

### Key Patterns

- **State Management**: `useUserProfile` hook uses `useReducer` for edit state (START_EDIT, CANCEL_EDIT, UPDATE_FIELD, SAVE_SUCCESS, etc.)
- **Validation**: `useUserProfileValidation` provides field validators (email, URL, name length constraints)
- **CSS Modules**: Styles use `.module.css` files with `identity-obj-proxy` for test mocking
- **Path Aliases**: `@/*` maps to `src/*` (configured in tsconfig.json and jest.config.cjs)

### Testing

- Jest + React Testing Library with jsdom environment
- Test files in `__tests__/` directories or `*.test.{ts,tsx}` pattern
- Setup file at `src/setupTests.ts` (imports `@testing-library/jest-dom`)
