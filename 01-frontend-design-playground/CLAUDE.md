# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite frontend project used as a playground for testing Claude Code's frontend design capabilities. It uses shadcn/ui components with Radix UI primitives and Tailwind CSS for styling.

## Development Commands

```bash

# Install dependencies
pnpm install

# Start development server with hot reload
pnpm dev

# Build for production (runs TypeScript check + Vite build)
pnpm build

# Run ESLint
pnpm lint

# Preview production build
pnpm preview
```

## Architecture

### Directory Structure
- `mockup/` - Main application directory
  - `src/components/ui/` - shadcn/ui components (43 components including button, dialog, form, toast, etc.)
  - `src/lib/utils.ts` - Utility functions (`cn` for className merging with clsx + tailwind-merge)
  - `src/hooks/` - Custom React hooks (includes `use-toast.ts`)

### Key Technologies
- **React 19** with TypeScript
- **Vite 7** for bundling and dev server
- **Tailwind CSS 3.4** with CSS variables for theming
- **shadcn/ui** component library (non-RSC mode, using `@/` path aliases)
- **Radix UI** primitives for accessible components
- **react-hook-form** + **zod** for form handling and validation
- **lucide-react** for icons

### Path Aliases
Configured in `vite.config.ts` and `components.json`:
- `@/` maps to `src/`
- `@/components/ui` for UI components
- `@/lib` for utilities
- `@/hooks` for custom hooks

### Styling
- Theming (Tailwind, shadcn-ui) with CSS variables defined in `src/index.css`
- Dark mode support via class strategy
- Custom color tokens: `background`, `foreground`, `primary`, `secondary`, `destructive`, `muted`, `accent`, `popover`, `card`
- Use `cn()` utility from `@/lib/utils` for conditional class merging
