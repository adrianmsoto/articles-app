## Articles App

A minimal setup to get React working with Vite, TypeScript, React Query, and Redux.  
Includes features for managing articles, ratings, favorites, and categories.

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/articles-app.git
cd articles-app
npm install
# Create a .env file in the project root
echo "VITE_BIN_URL=<YOUR_JSONBIN_URL>" >> .env
echo "VITE_JSONBIN_KEY=<YOUR_JSONBIN_MASTER_KEY>" >> .env
```
Replace <YOUR_JSONBIN_URL> and <YOUR_JSONBIN_MASTER_KEY> with your actual JSONBin info.

## Development
Start the development server:
```bash
npm run dev
```
Visit http://localhost:5173
 to see the app running with Fast Refresh.

 
## Running Tests
Jest (Unit & Integration)
```bash
npm run test
```
Covers:
Unit tests for key components (e.g., ArticleForm)
Integration tests between React Query and Redux


## Technical Decisions
State Management
Local storages: to Manages Favorites

React Query: Manages server-side state:
* Fetching, updating, and caching articles
* Article ratings
* Category filtering

Rationale: Redux handles synchronous UI state, React Query handles asynchronous server state with caching and background updates.



## Project Architecture

Inspired by vertical slice / hexagonal architecture:
- Domain: Core business logic, types, models (types/article.ts)
- Application: Features like articlesApi.ts, React Query hooks, Redux slices
- Infrastructure / Adapters: HTTP requests, localStorage, React Router, UI components

Benefits: Business logic is separated from adapters and UI, making it easy to swap or add new features without affecting the domain logic.



## Features Summary
Authentication: Handled via Redux / local storage (if implemented)
Favorites: Stored in Redux for fast toggling
Ratings: Managed via React Query with optimistic updates
Categories: Filtered via React Query with optional subcategories


## Notes

Ensure .env is configured before running the app

Uses Vite with Fast Refresh and TypeScript strict mode

ESLint + Prettier configured for code quality and consistency
