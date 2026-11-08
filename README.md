# MathLab — The Mathematics Workshop (V2)

A static, browser-based Class 9 mathematics exploration project. Built with HTML, CSS and vanilla JavaScript; no server, paid API or account is required.

## Run
Open `index.html` in a modern browser, or serve this folder with any static web host. Keep the `pages`, `js`, CSS and HTML files in their current relative locations.

## V2 additions
- Geometry: triangle area, perimeter and Heron's formula; square, rectangle, rhombus, parallelogram and trapezium area/perimeter experiments.
- Coordinate geometry: point/quadrant identification, straight-line graphing, slope/intercepts, distance, midpoint and a polygon shape builder with area/perimeter calculations and supported quadrilateral classification.
- Statistics: mean, median and mode with worked calculation steps.
- Probability: coin and die simulations (including 500/1,000/5,000 trials), theoretical-vs-experimental explanation, and a 52-card deck event simulator with and without replacement (without replacement is limited to one deck, 52 cards).
- Challenges: choose one, several or all five topic areas before building a practice test.
- Formula register: expanded searchable reference for all five laboratories.
- Algebra: step-by-step equations with variables on both sides and polynomial addition/subtraction for one variable.

## Important limitations
- These are educational simulations, not proof that a random process will match theoretical probability exactly.
- The card simulator supports both replacement modes. Without replacement is limited to a single 52-card deck; theoretical probability displayed is the first-draw probability, since later draws depend on earlier cards.
- The polynomial tool supports one variable and powers 0–8 for addition/subtraction; it is not a general computer algebra system.
- The line graph accepts common straight-line forms `y = mx + c`, `x = ay + b`, and vertical lines `x = k`. Shape Builder expects vertices in boundary order; its labels are limited to common quadrilaterals and generic polygons.
- Formula coverage is intended as a learning reference. Confirm exact inclusion and depth against the current CBSE textbook/syllabus used by the school.

## Storage
Theme preference and challenge best/last scores are stored locally in the browser. No data is uploaded to a server.

Footer credit retained: MADE BY ARRADHYA SHARMA.


## Combined V1 + V2 project inventory
The V2 folder is the complete project and includes the original V1 homepage, theme system, seven laboratory pages, shared styles and JavaScript, plus the expanded V2 activities. Files are kept separate by responsibility so they can be edited and tested easily.

- `index.html` — workshop homepage
- `style.css`, `pages.css` — shared visual system and page layouts
- `script.js` — theme preference and shared interface behavior
- `pages/` — Algebra, Geometry, Coordinate Geometry, Statistics, Probability, Challenges and Formula Register
- `js/` — the matching interactive logic for each laboratory
