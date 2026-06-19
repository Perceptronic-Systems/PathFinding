# Path Finding Demonstration

This repository contains a visual demonstration of a flood-fill pathfinding algorithm implemented on a grid structure. The application simulates how a "flood" spreads across a map and traces the resulting path, illustrating concepts of shortest path discovery.

## Features

*   **Grid Visualization:** Renders an interactive grid where cells represent interconnected nodes in a maze.
*   **Flood-Fill Simulation:** Demonstrates a process where a starting point expands outward, filling adjacent open cells.
*   **Path Tracing Logic:** Implements algorithms to determine and trace paths between start and goal points within the grid structure.
*   **Interactive View:** Allows the user to toggle the display of numerical values within the cells to visualize path costs.

## Technology Stack

*   HTML5
*   CSS3
*   JavaScript (ES Module)

## Setup

The application is self-contained and requires no external dependencies. The files are structured as follows:

```
index.html
src/main.js
src/style.css
```

To run the demonstration, open `index.html` in a web browser.

## Code Overview

### `index.html`

The HTML file sets up the canvas element for visualization and includes the necessary CSS and JavaScript files. It contains introductory text explaining the concept of flood-fill pathfinding.

### `style.css`

Styles the user interface, providing a dark theme for the grid and defining the visual appearance of the toggle switch and layout elements.

### `main.js`

This script contains the core logic for the pathfinding simulation. Key functions include:

*   **`initializeMaze()`:** Populates the grid with random states and initial values.
*   **`render(cells_to_render)`:** Responsible for drawing the grid to the canvas, applying colors based on cell state (1, 2, 3), and optionally displaying numerical values if enabled by the user setting (`view_values`).
*   **Pathfinding Functions (`checkCell`, `checkLower`, `generateMap`):** These functions implement the logic for determining potential moves and tracing paths through the grid using a flood-fill approach.
*   **`animate()`:** Manages the continuous simulation loop, executing pathfinding and rendering steps at regular intervals to provide a dynamic visual representation of the spreading algorithm.

The core execution flow is managed by an interval that calls the `animate` function periodically:

```javascript
setInterval(() => {
    animate();
}, 200);
```