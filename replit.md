# Overview

MindSpace is a mental health chatbot application designed to provide supportive conversations and wellness tracking for users. The application features a calming, user-friendly interface built with React and TypeScript, offering personalized mental health support through conversational AI and mood tracking capabilities.

The core functionality centers around a chatbot interface that engages users in therapeutic conversations, along with mood tracking features that help users monitor their emotional well-being over time. The application prioritizes user privacy and provides local data storage with crisis resource information for emergency situations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The client is built using **React 18** with **TypeScript** and follows a component-based architecture pattern. Key architectural decisions include:

- **Styling**: Uses **Tailwind CSS** with **shadcn/ui** component library for consistent, accessible UI components
- **Routing**: Implements **Wouter** for lightweight client-side routing
- **State Management**: Leverages **TanStack React Query** for server state management and local React state for UI interactions
- **Build Tool**: Uses **Vite** for fast development and optimized production builds

The application structure follows a modular approach with components organized by feature:
- Core chat interface components for conversation flow
- Mood tracking and wellness monitoring components  
- Crisis resources and safety information displays
- Reusable UI components from shadcn/ui library

## Backend Architecture

The server uses **Express.js** with TypeScript in a RESTful API pattern:

- **API Routes**: Structured around conversations and mood entries with CRUD operations
- **Storage Layer**: Implements an abstraction pattern with `IStorage` interface, currently using in-memory storage (`MemStorage`) but designed to easily swap for database implementations
- **Development Setup**: Integrates Vite middleware for hot module replacement during development

The backend is designed with modularity in mind, separating routing logic from storage operations to allow for easy database integration later.

## Data Storage Solutions

Currently uses **in-memory storage** for development/demo purposes with a well-defined interface that supports:

- Conversation persistence with user sessions and message history
- Mood entry tracking with date-based queries and user association
- UUID-based entity identification for scalability

The storage layer is architected to easily transition to **PostgreSQL** using **Drizzle ORM**, with schema definitions already established in the shared module. The database schema includes:
- `conversations` table for chat history storage
- `mood_entries` table for mood tracking data
- Proper indexing and relationships for performance

## Conversation Engine

Implements a **rule-based conversational AI** system that:

- Uses keyword matching and sentiment analysis for response generation
- Provides contextual responses based on user emotional states
- Offers quick response suggestions to guide conversation flow
- Maintains conversation context throughout user sessions

The system prioritizes empathetic, supportive responses while avoiding diagnostic or prescriptive language, focusing on active listening and emotional validation.

## Authentication and Authorization

Currently operates **without user authentication**, treating each session independently. The architecture is prepared for future user authentication integration with:
- User ID association in data models
- Session-based or token-based auth patterns ready to implement
- Privacy-focused design with local data storage options

# External Dependencies

## Core Framework Dependencies
- **React 18** with **TypeScript** for type-safe frontend development
- **Express.js** for backend API server
- **Vite** for development tooling and build optimization

## UI and Styling
- **Tailwind CSS** for utility-first styling approach
- **shadcn/ui** component library built on **Radix UI** primitives for accessible components
- **Lucide React** for consistent iconography

## Database and ORM
- **Drizzle ORM** with **PostgreSQL** dialect for type-safe database operations
- **Neon Database Serverless** driver for cloud PostgreSQL connectivity
- Database schema validation using **Drizzle-Zod** integration

## State Management and Data Fetching
- **TanStack React Query** for server state management and caching
- **Wouter** for lightweight client-side routing

## Development and Build Tools
- **ESBuild** for fast TypeScript compilation and bundling
- **tsx** for development server with TypeScript support
- **PostCSS** with **Autoprefixer** for CSS processing

## Third-party Integrations
The application is designed to operate **locally without external API dependencies** for core functionality, prioritizing user privacy and data security. Crisis resources link to standard mental health hotlines and text services, but no external APIs are required for the chatbot conversation engine or mood tracking features.