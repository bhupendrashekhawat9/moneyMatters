# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm install` - Install dependencies
- `npx expo start` - Start the development server with QR code for Expo Go
- `npm run android` - Start the app on Android emulator
- `npm run ios` - Start the app on iOS simulator  
- `npm run web` - Start the app in web browser
- `npm run lint` - Run ESLint for code quality checks
- `npm run reset-project` - Reset project to blank template (removes starter code)

## Project Architecture

This is a React Native Expo app built with TypeScript using file-based routing via Expo Router. The app implements a budget tracking system with authentication.

### Key Architecture Patterns

**Authentication Flow**: The app uses a context-based authentication system with AsyncStorage for persistence:
- `utils/AuthContext.tsx` - React Context provider wrapping the entire app
- `hooks/useAuth.tsx` - Custom hook managing user state and auth operations
- Authentication state determines routing between auth screens and protected content

**Routing Structure**: 
- File-based routing with Expo Router using group routes
- `app/_layout.tsx` - Root layout with AuthProvider wrapper
- `app/(auth)/` - Authentication screens (login, signup)
- `app/(protected)/` - Protected routes requiring authentication
  - Contains tab-based navigation for main app features
  - Nested routes for transactions, budget, and home screens

**Styling System**: 
- NativeWind (Tailwind CSS for React Native) for utility-first styling
- Custom theme system in `constants/theme.ts` with light/dark color schemes
- Components use both NativeWind classes and StyleSheet for styling
- `globals.css` imports NativeWind base styles

**State Management**:
- Context API for authentication state
- AsyncStorage for user data persistence
- Custom hooks pattern for reusable logic

### Component Structure

**Reusable Components**:
- `components/AppButton.tsx` - Styled button component with consistent theming
- `components/BottomNavbar.tsx` - Custom bottom navigation
- `components/transactions/` - Transaction-specific UI components

**Custom Hooks**:
- `useAuth()` - Authentication operations and user state
- `useTheme()` - Theme switching and style generation
- `useGenerateStyle()` - Dynamic style generation utilities

### File Organization

- `/app` - All routes and screens (Expo Router file-based routing)
- `/components` - Reusable UI components organized by feature
- `/hooks` - Custom React hooks for business logic
- `/utils` - Utility functions and context providers
- `/constants` - Theme definitions and app constants

## Technology Stack

- **Framework**: React Native with Expo SDK 53
- **Routing**: Expo Router with typed routes enabled
- **Styling**: NativeWind + Tailwind CSS
- **State**: React Context API + AsyncStorage
- **Typography**: SpaceMono font family
- **Icons**: @expo/vector-icons (MaterialCommunityIcons)
- **TypeScript**: Strict mode enabled with path aliases (`@/*`)

## Development Notes

- The app uses Expo's new architecture (`newArchEnabled: true`)
- Path aliases configured: `@/*` maps to project root
- Git history shows this was converted from Expo template (many default files removed)
- Tab navigation currently has duplicate home routes that may need cleanup
- Auth system is simplified (no password validation in current implementation)