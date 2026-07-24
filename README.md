# Wedding Invitation React SPA

A beautiful, responsive React Single Page Application for Blagica & Ivan's wedding invitation.

## Features

- ✨ Modern React 18 setup with Vite
- 🎨 Tailwind CSS with custom color scheme
- 🚀 Lightning-fast development server
- 📱 Fully responsive design
- 🎭 Smooth animations and transitions
- 🖼️ Local image support with optimization

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will open automatically at `http://localhost:5173`

### Project Structure

```
invitation-spa/
├── public/              # Static assets (images)
│   ├── IMG_9250.jpg
│   ├── IMG_9261.jpg
│   └── IMG_9339.jpg
├── src/
│   ├── components/      # React components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── RevealOnScroll.jsx
│   │   ├── EnvelopeScreen.jsx
│   │   ├── DetailsScreen.jsx
│   │   └── index.js
│   ├── App.jsx         # Main app with routing
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
└── package.json        # Project dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features

### Envelope Screen
- Interactive envelope with wax seal
- Smooth opening animation
- Navigation to details screen

### Details Screen
- Hero section with couple photo
- Wedding date and location details
- Image gallery with hover effects
- Ceremony and reception information
- Scroll reveal animations

## Customization

### Colors
Edit `tailwind.config.js` to modify the custom color palette.

### Fonts
The project uses:
- **Headlines**: Playfair Display
- **Body**: Libre Caslon Text
- **Labels**: Montserrat
- **Icons**: Material Symbols Outlined

### Images
Place images in the `public/` directory and reference them as `/IMG_XXXX.jpg` in component `src` attributes.

## Build

Create an optimized production build:

```bash
npm run build
```

The output will be in the `dist/` directory.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

Made with ❤️ for Blagica & Ivan
