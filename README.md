# Article Management App

A React application to manage articles with categories, subcategories, favorites, and ratings.  
Built with a vertical slice + hexagonal-inspired architecture using React, Redux Toolkit, React Query, and TypeScript.

---

## Table of Contents

1. [Project Structure](#project-structure)  
2. [Requirements](#requirements)  
3. [Installation](#installation)  
4. [Development](#development)  
5. [Testing](#testing)  
6. [Technical Decisions](#technical-decisions)  
7. [Features](#features)  
8. [Notes](#notes)

---

## Project Structure

```text
src/
├─ app/ # App entry, providers, routes
├─ core/ # Shared infrastructure, hooks, store
├─ features/ # Vertical slices (articles and home)
│ └─ articles/
│ ├─ api/ # API adapters (JSONBin)
│ ├─ domain/ # Business logic (services, types)
│ ├─ redux/ # Slice for favorites
│ ├─ ui/ # Components/pages
│ └─ tests/ # Jest tests for form & integration
├─ shared/ # Shared components, assets, layout
public/
cypress/ # E2E tests
```



**Architecture notes:**  
- **Vertical slice:** each feature contains UI, domain logic, API, redux slice, and tests.  
- **Hexagonal-inspired:** domain (pure logic) is decoupled from adapters (API) and UI.  
- **State separation:** React Query for server data, Redux for UI state like theme & favorites.

## Requirements
- Node.js 18+ - npm 9+ - Browser: Chrome / Firefox recommended  

---
## Installation

Clone the repository and install dependencies:
```bash
git clone https://github.com/adrianmsoto/articles-app.git
cd articles-app
npm install
# ToDo: Create a .env file in the project root
echo "VITE_BIN_URL=<YOUR_JSONBIN_URL>" >> .env
echo "VITE_JSONBIN_KEY=<YOUR_JSONBIN_MASTER_KEY>" >> .env
```

## Development
Start the development server:
```bash
npm run dev
```
Visit http://localhost:5173  -> to see the app running with Fast Refresh.
 
## Testing
#### Jest (Unit & Integration)
| Command                  | Description |
|--------------------------|-------------|
| `npm run test`           | Run all Jest tests once. Covers unit and integration tests across components, slices, and hooks. |

**Test files:**
- `ArticleFormFields.test.tsx`  
  - Focuses on individual form fields.  
  - Ensures inputs correctly update state and validate required fields.
- `ArticleForm.test.tsx`  
  - Validate if allow type in inputs

#### Cypress (E2E)
| Command                  | Description |
|--------------------------|-------------|
| `npm run cypress:open`   | Opens the interactive Cypress runner for manual test execution and debugging. |
| `npm run cypress:run`    | Runs all Cypress tests headlessly, suitable for CI/CD pipelines. |

**Test files:**
- `article-form-validation.cy.ts`  
  - Edge case test: ensures the form does not submit when required fields are empty.  
- `articles-error.cy.ts`  
  - Simulates server errors or missing articles to verify proper error handling in the UI.  
- `articles-success.cy.ts`  
  - Full success flow: creating a new article, rating it, adding to favorites, editing, and deleting.  
  - Confirms the integration between UI, React Query, and Redux for state management.

> These tests together ensure coverage of critical workflows and edge cases, validating both unit logic and end-to-end user interactions.


## Technical Decisions
State management
- React Query: manages server state (articles fetching, caching, updates). Optimistic updates used for rating/favorites.
- Redux Toolkit: manages UI state (theme toggle, favorites). Favorites are persisted in Redux for instant feedback, while articles remain authoritative in the server/mock API.
- Local storages: to Manages Favorites

## Architecture
* Vertical slices: each feature in src/features/<name> contains ui/, api/, domain/, redux/, tests/.
* Hexagonal-inspired separation:
  - domain/: business logic (services, types)
  - api/: adapters (JSONBin fetch/put)
  - ui/: React components and pages
  - `tests/`: Unit and integration tests for that feature.
* Benefits: easier testing, maintainable code, decoupled business logic from transport/adapters.

## Favorites & Ratings
Favorites persisted in Redux for fast UI feedback.
Ratings handled via React Query updates to mock server (JSONBin).

## Tests
- Unit: React Testing Library for ArticleForm validation.
- Integration: simulate React Query ↔ Redux interaction (creating articles and updating favorites).
- E2E: Cypress covers success flows and error cases (404, missing articles).

---
## Features
- List articles with pagination and category/subcategory filters.
- Create new articles & edit existing ones.
- Detail view with full information, ratings, and favorites.
- Persist favorites and ratings.
- Responsive UI for desktop & mobile.
- Image previews with placeholder/fallback.
- Error handling for missing or broken data.

## Notes
- Edge cases handled: missing articles, invalid form submissions.
- UI & accessibility: buttons with proper labels, hover effects, responsive grid layout.


## Commands Summary

| Command                 | Description                        |
|-------------------------|------------------------------------|
| `npm run dev`           | Start development server           |
| `npm run build`         | Build production                   |
| `npm run preview`       | Preview production build           |
| `npm run test`          | Run Jest tests once                |
| `npm run test:watch`    | Jest watch mode                    |
| `npm run cypress:open`  | Open Cypress interactive runner    |
| `npm run cypress:run`   | Run Cypress tests headlessly       |
| `npm run lint`          | Run ESLint                         |
| `npm run format`        | Format code with Prettier          |


### Author
Adrian Marin Soto  



