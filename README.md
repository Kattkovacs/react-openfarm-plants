# 🌱 React OpenFarm Plants

A modern plant explorer application that displays plant information with category filtering, pagination, and detailed plant views. Built with React and powered by the OpenFarm API proxy backend.

## Features

- 🌿 **Plant Browsing** - Browse plants across categories with infinite scroll pagination
- 🔍 **Category Filtering** - Filter plants by family (Asteraceae, Fagaceae, etc.)
- 📄 **Plant Details** - View comprehensive plant information including:
  - Scientific name, family, genus
  - Author, publication year, bibliography
  - Synonyms (historical and scientific variants)
  - Plant rank and status
  - External API links
- ⚡ **Infinite Scroll** - Automatically load more plants as you scroll
- 🎨 **Clean UI** - Responsive card-based layout with green nature theme

## Tech Stack

### Frontend
- **React** 19.2.3 - UI library
- **React Router DOM** 7.10.1 - Client-side routing and navigation
- **JavaScript (ES6+)** - Core language
- **CSS-in-JS** - Inline styling for components

### Backend
- **OpenFarm Proxy API** - API server running on `http://localhost:3001`
  - Provides paginated plant crop data
  - Returns plant metadata including images, family, genus info

### Development
- **Create React App** - Build tooling and webpack configuration
- **ESLint** - Code quality and linting

## API

This application communicates with the OpenFarm Proxy API backend:

### Base URL
```
http://localhost:3001/api
```

### Endpoints Used

#### Get Crops List (Paginated)
```
GET /crops?page={pageNumber}
GET /crops?page={pageNumber}&family={familyName}
```

**Response:**
```json
{
  "data": [
    {
      "id": 257312,
      "common_name": "Beech",
      "scientific_name": "Fagus sylvatica",
      "family": "Fagaceae",
      "genus": "Fagus",
      "slug": "fagus-sylvatica",
      "image_url": "https://...",
      "author": "L.",
      "year": 1753,
      "bibliography": "Sp. Pl.: 998 (1753)",
      "status": "accepted",
      "rank": "species",
      "synonyms": [...]
    }
  ],
  "meta": {
    "total_pages": 50
  }
}
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenFarm Proxy API server running on localhost:3001

### Setup

1. **Clone the repository**
   ```bash
   cd c:\Users\User\Documents\Projects\react-openfarm-plants
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the backend server**
   ```bash
   # Ensure OpenFarm Proxy API is running on port 3001
   # See: https://github.com/openfarm/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open in browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

### `npm start`
Runs the app in development mode with hot reload. Open [http://localhost:3000](http://localhost:3000) to view it.

### `npm run build`
Builds the app for production to the `build` folder with optimizations.

### `npm test`
Launches the test runner in interactive watch mode.

## Project Structure

```
react-openfarm-plants/
├── src/
│   ├── App.js           # Main app with routing and plant list
│   ├── index.js         # React entry point
│   └── ...other files
├── public/              # Static assets
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## How It Works

1. **Home Page** - Lists plants from the API with category filter dropdown
2. **Infinite Scroll** - When you scroll near the bottom, the next page auto-loads
3. **Category Filter** - Select a plant family to filter results
4. **Plant Details** - Click any plant card to view full details on a separate page
5. **Navigation** - Use the back button to return to the plant list

## Configuration

The API endpoint is currently hardcoded as `http://localhost:3001/api`. To change it, update the fetch URLs in `src/App.js`:

```javascript
const res = await fetch(`http://localhost:3001/api/crops?page=${pageToLoad}${familyQuery}`);
```

## Dependencies

See [package.json](package.json) for the full list. Key packages:
- `react` - UI framework
- `react-dom` - DOM rendering
- `react-router-dom` - Client routing
- `react-scripts` - Build configuration

## Browser Support

Works on modern browsers (Chrome, Firefox, Safari, Edge). Requires ES6+ support.

## License

This project is open source.

## Support

For issues with:
- **Frontend**: Check browser console for errors
- **Backend/API**: Ensure OpenFarm Proxy server is running on port 3001
- **CORS errors**: Verify API server has CORS enabled for localhost:3000


### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
