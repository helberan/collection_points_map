# Battery Collection Points Map

Battery Collection Points Map is an open-source project that aims to create an interactive map displaying all available collection points for batteries in the Czech Republic.
The application allows users to filter collection points based on a searched location and/or the type of batteries they accept, providing an easy and efficient way to find the nearest collection point for different battery types.

## Features

- Interactive Map
- Location Details - display location details after clicking on a marker
- Locations filtering and searching
- Easy toggle navigation

## Technology used

- React
- TypeScript
- Redux
- Vite
- Mapbox GL JS
- Material UI

## Project Setup

To set up the project on your local machine, follow these steps:

### `git clone <repository-url>`

Clone the repository to your local machine. Replace "<repository-url>" with the URL of our GitHub repository.

### `npm install`

Install the project dependencies. This command will read the package.json file and install all the required packages.

### `add your Mapbox token`

Create a `.env` file in the root directory and add your Mapbox token.

```js
REACT_APP_MAPBOX_TOKEN=your_mapbox_token_here
```

### `npm run dev`

Runs the app in the development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Usage

### Interacting with the Map:

Click on map markers to view details about specific locations.
Use the drawer navigation to switch between different sections of the app.

## Plan for next development

- add locations filtering based on battery type
- connect app to a database of collection points
- add conditional rendering of collection points based on visible map part
