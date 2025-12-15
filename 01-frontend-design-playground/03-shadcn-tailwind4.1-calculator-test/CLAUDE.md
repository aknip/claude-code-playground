# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quickstart
pnpm dev
http://localhost:5173

## Project Overview

This is a React + TypeScript + Vite frontend project used as a playground for testing Claude Code's frontend design capabilities. It uses shadcn/ui components (some of them based on Radix UI primitives) and Tailwind CSS 4.1 for styling.


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

### Key Technologies
- **React 19** with TypeScript
- **Vite 7** for bundling and dev server
- **Tailwind CSS 4.1** with `@tailwindcss/vite` plugin (no tailwind.config.js needed)
- **shadcn/ui** component library (new-york style, non-RSC mode)
- **Radix UI** primitives for accessible components
- **react-hook-form** + **zod** for form handling and validation
- **lucide-react** for icons
- **recharts** for data visualization
- **sonner** for toast notifications
- **vaul** for drawer components


### Path Aliases
Configured in `vite.config.ts`:
- `@/` maps to `src/`
- Import UI components: `@/components/ui`
- Import utilities: `@/lib/utils`
- Import hooks: `@/hooks`


### Styling (Tailwind CSS 4.1)
This project uses Tailwind CSS 4.1's new CSS-first configuration:
- All theme configuration is in `src/index.css` using `@theme inline` directive
- CSS variables defined in `:root` and `.dark` selectors using OKLCH color space
- Dark mode via class strategy (`@custom-variant dark (&:is(.dark *))`)
- Color tokens: `background`, `foreground`, `primary`, `secondary`, `destructive`, `muted`, `accent`, `popover`, `card`, `sidebar`, `chart-1` through `chart-5`
- Radius tokens: `--radius` base variable with computed `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl` variants
- Animation via `tw-animate-css` package


### Themes (styling configurations)
There a some prepared themes (css configurations) which can be used by copying their content to `src/index.css` to see the effect:
- `src/index.css-colored.css`
- `src/index.css-final-design.css`
- `src/index.css-wireframe.css`


### UI Components
- 48 shadcn/ui components in `src/components/ui/`
- Use `cn()` utility from `@/lib/utils` for conditional class merging (clsx + tailwind-merge)
- Components use `class-variance-authority` (cva) for variant management
- Custom hooks in `src/hooks/` (e.g., `useIsMobile` for responsive behavior)



## Visual Development

### Design Principles
- Comprehensive design checklist in `/_specs/design-principles.md`
- Brand style guide in `/_specs/style-guide.md`
- When making visual (front-end, UI/UX) changes, always refer to these files for guidance

### Quick Visual Check
IMMEDIATELY after implementing any front-end change:
1. **Identify what changed** - Review the modified components/pages
2. **Navigate to affected pages** - Use `mcp__playwright__browser_navigate` to visit each changed view
3. **Verify design compliance** - Compare against `/_specs/design-principles.md` and `/_specs/style-guide.md`
4. **Validate feature implementation** - Ensure the change fulfills the user's specific request
5. **Check acceptance criteria** - Review any provided context files or requirements
6. **Capture evidence** - Take full page screenshot at desktop viewport (1440px) of each changed view
7. **Check for errors** - Run `mcp__playwright__browser_console_messages`

This verification ensures changes meet design standards and user requirements.

### Comprehensive Design Review
Invoke the `@agent-design-review` subagent for thorough design validation when:
- Completing significant UI/UX features
- Before finalizing PRs with visual changes
- Needing comprehensive accessibility and responsiveness testing