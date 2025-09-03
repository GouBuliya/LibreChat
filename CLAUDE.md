# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

玄鉴 (XUAN JIAN) is a LibreChat-based AI chat application with monorepo architecture. It features a Node.js/Express backend, React frontend, and shared package ecosystem. The project supports multiple AI providers, file handling, real-time messaging, and multi-language localization.

## Development Commands

### Root Level Commands

**Backend Development:**
```bash
npm run backend:dev          # Start development server with nodemon
npm run backend             # Start production backend
npm run backend:stop        # Stop backend server
```

**Frontend Development:**
```bash
npm run frontend:dev        # Start development client (Vite)
npm run frontend           # Build production client
npm run frontend:ci        # CI build mode
```

**Package Building:**
```bash
npm run build:data-provider    # Build data provider package
npm run build:api             # Build API package  
npm run build:data-schemas     # Build data schemas package
npm run build:client-package   # Build client package
```

**Testing:**
```bash
npm run test:client         # Run client tests
npm run test:api           # Run API tests
npm run e2e                # Run Playwright E2E tests
npm run e2e:headed         # Run E2E tests with browser UI
npm run e2e:debug          # Debug E2E tests
npm run e2e:a11y           # Accessibility tests
```

**Code Quality:**
```bash
npm run lint               # Lint all TypeScript/JavaScript files
npm run lint:fix           # Fix linting issues automatically
npm run format             # Format code with Prettier
```

**User Management:**
```bash
npm run create-user        # Create new user account
npm run list-users         # List all users
npm run add-balance        # Add balance to user account
npm run list-balances      # List user balances
npm run ban-user           # Ban user account
npm run delete-user        # Delete user account
npm run reset-password     # Reset user password
```

**Bun Alternatives:**
```bash
npm run b:api:dev          # Bun backend development
npm run b:client:dev       # Bun frontend development
npm run b:test:client      # Bun client tests
npm run b:test:api         # Bun API tests
```

### Individual Package Commands

**Client (client/):**
```bash
npm run dev                # Start Vite dev server
npm run build              # Production build
npm run typecheck          # TypeScript type checking
npm run test               # Jest tests with watch
npm run test:ci            # CI test run
```

**API (api/):**
```bash
npm run test               # Jest tests
npm run test:ci            # CI test run
```

## Architecture

### Monorepo Structure

**Core Applications:**
- `api/` - Express.js backend server with MongoDB integration
- `client/` - React frontend with Vite build system
- `packages/` - Shared packages and libraries

**Shared Packages:**
- `packages/data-schemas/` - Mongoose schemas and TypeScript types
- `packages/api/` - MCP (Model Context Protocol) services and utilities  
- `packages/client/` - Reusable React components and UI library
- `packages/data-provider/` - Data fetching and state management with React Query

### Backend Architecture (api/)

**Core Structure:**
- `server/index.js` - Express application entry point with middleware setup
- `server/routes/` - API route definitions and handlers
- `server/controllers/` - Business logic and request processing
- `server/middleware/` - Authentication, validation, and request processing
- `server/services/` - External integrations and business services
- `models/` - MongoDB models and database operations
- `db/` - Database connection and configuration
- `strategies/` - Authentication strategies (JWT, LDAP, social logins)

**Key Features:**
- JWT authentication with social login support
- MongoDB with Mongoose ODM
- Express middleware stack with CORS, compression, sanitization
- MCP service initialization and management
- File upload and image validation
- Multi-language interface permissions

### Frontend Architecture (client/src/)

**Core Structure:**
- `App.jsx` - Root application with providers (Recoil, React Query, Theme)
- `routes/` - React Router configuration and route components
- `components/` - Reusable UI components organized by feature
- `hooks/` - Custom React hooks for state and API management
- `data-provider/` - React Query integration and API client
- `locales/` - Internationalization files (20+ languages)
- `constants/` - Application constants and configuration

**State Management:**
- Recoil for global state management
- React Query for server state and caching
- Context providers for theme and toast notifications

**UI Framework:**
- Tailwind CSS for styling
- Radix UI components for accessibility
- React DnD for drag-and-drop functionality
- Custom theming system with environment variable support

### Docker Configuration

**Development:**
```bash
docker-compose up -d        # Start all services
docker-compose down         # Stop all services
```

**Services:**
- `api` - LibreChat application container
- `mongodb` - MongoDB database
- `meilisearch` - Search engine service  
- `rag_api` - RAG (Retrieval Augmented Generation) API service

**Deployment:**
```bash
npm run start:deployed      # Start deployed services
npm run stop:deployed       # Stop deployed services
npm run update:deployed     # Update deployed version
```

## Configuration

### Environment Configuration
- `.env` - Main environment variables file (24KB+ configuration)
- `librechat.yaml` - Application configuration with Chinese localization
- `docker-compose.yml` - Service orchestration configuration

### Code Quality Tools
- **ESLint:** Modern flat config with TypeScript, React, accessibility rules
- **Prettier:** 100-char line width, Tailwind CSS plugin integration
- **Husky:** Git hooks for code quality enforcement
- **Jest:** Unit testing framework for both client and API

### Package Management
- **Workspaces:** npm workspaces for monorepo dependency management
- **Module Aliases:** `~` alias for backend root directory imports
- **Lock Files:** Both npm and bun lock files maintained

## Development Guidelines

### Testing Strategy
- **Unit Tests:** Jest for both frontend and backend
- **E2E Tests:** Playwright with multiple browser support
- **Accessibility:** Dedicated a11y test suite with @axe-core/playwright
- **CI Integration:** Separate CI and local test configurations

### Build Process
- **Sequential Builds:** Packages must be built in dependency order
- **Package Dependencies:** data-provider → data-schemas → api → client-package → client
- **Production Builds:** Optimized Vite builds with post-build scripts
- **Development Builds:** Fast rebuild with watch modes

### Deployment Workflow
- **Docker Compose:** Multi-service orchestration
- **Environment Management:** Separate dev/prod configurations
- **Migration Support:** Database migration scripts and tooling
- **Health Checks:** Service health monitoring and validation