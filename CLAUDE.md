# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LibreChat is an open-source AI chat platform that brings together multiple AI models (OpenAI, Anthropic, Google, etc.) into a unified interface. It features a full-stack architecture with a React frontend, Node.js/Express backend, and MongoDB for data persistence.

## Development Commands

### Core Development Commands
- **Start development backend**: `npm run backend:dev` (uses nodemon for auto-restart)
- **Start production backend**: `npm run backend` or `node api/server/index.js`
- **Start frontend development**: `npm run frontend:dev` (runs `cd client && npm run dev`)
- **Build frontend**: `npm run frontend` (builds all packages + client production build)

### Package Management
- **Update dependencies**: `npm run update` (uses custom update script)
- **Reinstall all**: `npm run reinstall` (clean install across all workspaces)
- **For Bun users**: `npm run b:reinstall` (Bun-based reinstall)

### Testing Commands
- **Run API tests**: `npm run test:api` (Jest tests in api/)
- **Run client tests**: `npm run test:client` (Jest tests in client/)
- **E2E tests**: `npm run e2e` (Playwright end-to-end tests)
- **E2E with UI**: `npm run e2e:headed`
- **Accessibility tests**: `npm run e2e:a11y`
- **Debug E2E tests**: `npm run e2e:debug`

### Code Quality
- **Lint**: `npm run lint` (ESLint across the codebase)
- **Lint and fix**: `npm run lint:fix`
- **Format code**: `npm run format` (Prettier formatting)

### Single Package Testing
- **Test specific API functionality**: `cd api && npm run test:ci`
- **Test specific client functionality**: `cd client && npm run test:ci`

## Architecture Overview

### Workspace Structure
This is a **monorepo** using npm workspaces with the following structure:

```
LibreChat/
├── api/                    # Backend Express server
├── client/                 # React frontend application  
└── packages/
    ├── api/               # Shared API utilities
    ├── client/            # Shared client components
    ├── data-provider/     # Data access layer
    └── data-schemas/      # Shared schemas and types
```

### Backend Architecture (`api/`)
- **Entry point**: `api/server/index.js` (Express server with middleware setup)
- **Key directories**:
  - `app/clients/` - AI provider client implementations (OpenAI, Anthropic, etc.)
  - `models/` - Mongoose database models
  - `server/routes/` - API route handlers
  - `strategies/` - Passport.js authentication strategies
  - `utils/` - Shared utility functions
  - `cache/` - Caching implementations
  - `db/` - Database connection and configuration

### Frontend Architecture (`client/`)
- **Entry point**: `client/src/App.jsx` (React app with providers)
- **State management**: Recoil + React Query for server state
- **Routing**: React Router v6
- **UI Components**: Custom components + Radix UI primitives
- **Styling**: Tailwind CSS
- **Key directories**:
  - `src/components/` - React components organized by feature
  - `src/hooks/` - Custom React hooks
  - `src/utils/` - Frontend utility functions
  - `src/Providers/` - Context providers for state management

### Shared Packages
- **`@librechat/api`**: Shared API utilities and schemas
- **`@librechat/client`**: Shared client components and utilities
- **`data-provider`**: Data access abstraction layer
- **`data-schemas`**: Zod schemas and TypeScript types

## Key Configuration Files

### Environment Configuration
- **`.env.example`** - Template showing all available environment variables
- **`librechat.example.yaml`** - Example LibreChat configuration file
- **`docker-compose.override.yml.example`** - Docker customization examples

### Build Configuration
- **`package.json`** - Root workspace configuration with all scripts
- **`client/vite.config.js`** - Vite bundler configuration for React app
- **`api/` & `client/package.json`** - Individual workspace configurations

## AI Provider Integration

The platform integrates with multiple AI providers through a client abstraction layer:
- Clients are located in `api/app/clients/`
- Each provider (OpenAI, Anthropic, Google, etc.) has its own client class
- Common interface allows switching between providers seamlessly
- Tool integration and function calling supported across providers

## Database and Caching

- **Primary database**: MongoDB (configured via `MONGO_URI`)
- **Search**: MeiliSearch for conversation search functionality
- **Caching**: Redis support for session management and performance
- **Models**: Mongoose ODM with models in `api/models/`

## Authentication System

Multi-provider authentication support:
- Local email/password authentication  
- OAuth2 providers (Google, GitHub, Discord, etc.)
- LDAP integration
- SAML support
- Passport.js strategies in `api/strategies/`

## Development Guidelines

### Code Organization
- Follow the existing folder structure and naming conventions
- Place shared utilities in appropriate `packages/` workspace
- Keep API-specific code in `api/` and client-specific code in `client/`

### State Management  
- Use Recoil for client-side state management
- Use React Query for server state and caching
- Context providers are in `client/src/Providers/`

### Styling
- Tailwind CSS utility classes are preferred
- Custom CSS should be minimal and component-scoped
- UI components use Radix UI primitives with custom styling

### API Development
- Express routes are organized by feature in `api/server/routes/`
- Middleware for authentication, validation, and error handling
- Database operations use Mongoose models from `api/models/`

### Testing
- Jest for unit tests in both API and client
- Playwright for E2E testing with various configurations
- Test files typically end in `.test.js` or `.spec.js`

## Docker Development

The project includes Docker configurations:
- Main `docker-compose.yml` for full stack
- `docker-compose.override.yml.example` for customizations
- Individual service customization possible via override files