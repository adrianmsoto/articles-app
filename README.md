# React + TypeScript + Vite - Articles App

This project provides a minimal setup to get React working with Vite, TypeScript, React Query, and Redux.  
It includes features for managing articles, ratings, favorites, and categories.

Currently, the project uses:

- [React Query](https://react-query.tanstack.com/) for server state management (data fetching, caching, background updates)
- [Redux](https://redux.js.org/) for critical UI states (loading flags, theme, user session, favorites)

## Installation

To get started:

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/articles-app.git
cd articles-app

# Install dependencies
npm install
Create a .env file in the project root with:

env
Copiar código
VITE_BIN_URL=<YOUR_JSONBIN_URL>
VITE_JSONBIN_KEY=<YOUR_JSONBIN_MASTER_KEY>
Replace <YOUR_JSONBIN_URL> and <YOUR_JSONBIN_MASTER_KEY> with your actual JSONBin info.

Development
To start the development server:

bash
Copiar código
npm run dev
Visit http://localhost:5173 to see the app running with Fast Refresh.

Running Tests
Jest (Unit & Integration)
To run unit and integration tests:

bash
Copiar código
npm run test
Covers:

Unit tests for key components (e.g., ArticleForm)

Integration tests between React Query and Redux

Cypress (Optional)
For end-to-end tests:

bash
Copiar código
# Install Cypress if not installed
npm install cypress --save-dev

# Open Cypress UI
npx cypress open
Technical Decisions
State Management
Redux is used for client-side critical state:

Global loading flags

Theme preference

User session

Favorites

React Query is used for server-side state:

Fetching, updating, and caching articles

Article ratings

Category filtering

Rationale: Redux manages synchronous UI states, while React Query handles asynchronous server state with caching and background updates.

Project Architecture
The project follows a vertical slice / hexagonal-inspired architecture:

Domain: Core business logic, types, and models (types/article.ts)

Application: Features like articlesApi.ts, React Query hooks, Redux slices

Infrastructure / Adapters: HTTP requests to JSONBin, localStorage, React Router, UI components

Benefits:

Business logic is decoupled from UI and network layers

Easy to swap adapters or add new features without affecting the domain logic

Feature Summary
Authentication: Handled via Redux / local storage (if implemented)

Favorites: Stored in Redux for fast toggling

Ratings: Managed via React Query with optimistic updates

Categories: Filtered via React Query with optional subcategories

Notes
Make sure .env is configured before running the app

The app uses Vite with Fast Refresh and TypeScript strict mode

ESLint + Prettier are configured for code quality and consistency
```
