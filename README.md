# Interactive Particle Universe

An animated particle field built with **HTML5, CSS3 and vanilla JavaScript**. The Canvas API draws moving particles, connects nearby particles and responds to pointer movement and clicks.

## Features

- Animated particle field rendered with HTML Canvas
- Nearby particles connect with dynamic lines
- Pointer movement gently repels nearby particles
- Click the background to create a particle burst
- Adjustable particle density and connection distance
- Toggle particle motion and pointer interaction
- Reset controls to their defaults
- Live particle count and approximate FPS display
- Responsive desktop and mobile layout
- No framework or package installation required

## Project structure

```text
interactive-particle-universe/
├── index.html
├── README.md
├── .gitignore
├── css/
│   └── styles.css
└── js/
    └── script.js
```

## Run locally

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR-USERNAME/interactive-particle-universe.git
   ```

2. Open the folder:

   ```bash
   cd interactive-particle-universe
   ```

3. Open `index.html` in a browser, or use the VS Code Live Server extension.

No build step or dependency installation is needed.

## How to interact

- Move your pointer around the canvas to influence nearby particles.
- Click the background to create a burst.
- Adjust **Particle density** to change the number of particles.
- Adjust **Connection distance** to change when particles connect.
- Toggle **Particle motion** to pause or resume movement.
- Toggle **Pointer interaction** to enable or disable pointer influence.
- Select **RESET** to restore default settings.

## Technologies and concepts

- HTML5 semantic structure
- CSS variables, gradients and responsive layout
- JavaScript classes, arrays and event listeners
- Canvas 2D API
- `requestAnimationFrame()` animation loop
- Pointer and resize events
- Distance calculations using `Math.hypot()`

## GitHub workflow

Create an empty GitHub repository named `interactive-particle-universe`, then run these commands from this project's root directory:

```bash
git init
git add .
git commit -m "Initial commit: create interactive particle universe"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/interactive-particle-universe.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

For later updates:

```bash
git add .
git commit -m "feat: improve particle interactions"
git push
```

## Future improvements

- Add selectable particle color themes
- Add a particle-speed slider
- Improve touch interaction
- Add particle trails with an optional toggle
- Optimize connection calculations for larger particle counts
- Add a screenshot/export option

## License

This project is available under the MIT License. Add a `LICENSE` file if you choose to distribute it under that license.
