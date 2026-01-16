# SNT4EVER 🛹

[![SNT4EVER](https://img.shields.io/badge/SNT4EVER-yellow?style=for-the-badge&logo=skateboarding)](https://snt4ever.com)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)

> 🛹 Modern recreation of snt4ever.com - A non-profit association dedicated to preserving Sants Skate Plaza in Barcelona

## 🎯 About

SNT4EVER is a complete recreation of the original snt4ever.com website using modern web technologies. The project represents a cultural and sports association dedicated to preserving and maintaining the Skate Plaza of Sants as a vital community space in Barcelona.

## ✨ Features

### 🎨 **Design & UX**

- **Authentic Design**: Faithful recreation of the original website's dark theme with yellow accent (#FFEE00)
- **Responsive Layout**: Fully responsive design that works seamlessly on desktop, tablet, and mobile
- **Modern Typography**: Professional typography system with Neue Haas Grotesk and Plex Sans fonts
- **Smooth Animations**: Micro-interactions and smooth scrolling with Framer Motion

### 🏗️ **Technical Implementation**

- **React 19**: Latest React version with modern hooks and concurrent features
- **TypeScript**: Full type safety throughout the application
- **Vite**: Lightning-fast development and optimized builds
- **shadcn/ui**: Accessible, beautiful UI components following best practices
- **Tailwind CSS**: Utility-first CSS framework for rapid styling

### 📱 **Core Components**

- **Navigation**: Fixed header with mobile-responsive hamburger menu
- **Hero Section**: Animated marquee with mission statement and call-to-action buttons
- **Timeline**: Interactive chronological content from 1983-2018 with mixed media
- **Image Gallery**: Advanced gallery with lightbox, multiple layouts (grid, masonry)
- **Video Player**: Custom YouTube embed component with responsive sizing
- **News & Events**: Dynamic content cards with filtering and newsletter signup
- **Footer**: Comprehensive credits section with 4-column grid layout

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sanzcortes/SNT4EVER.git
   cd SNT4EVER
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5174
   ```

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
SNT4EVER/
├── src/
│   ├── components/          # React components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── Navigation.tsx
│   │   ├── HeroSection.tsx
│   │   ├── TimelineSection.tsx
│   │   ├── ImageGallery.tsx
│   │   ├── YouTubePlayer.tsx
│   │   ├── NewsEvents.tsx
│   │   └── Footer.tsx
│   ├── lib/               # Utility functions and design system
│   │   ├── design-system.ts
│   │   └── utils.ts
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css          # Global styles
├── public/               # Static assets
└── dist/                # Production build output
```

## 🎨 Design System

The project follows a comprehensive design system based on the original snt4ever.com:

### Colors

- **Background**: Black (`#000000`)
- **Primary**: Yellow (`#FFEE00`)
- **Foreground**: White (`#FFFFFF`)
- **Muted**: White with 60% opacity

### Typography

- **Sans Font**: Neue Haas Grotesk, Plex Sans, system fonts
- **Mono Font**: Plex Mono, Fira Code, monospace
- **Headings**: Bold weights
- **Body**: Regular weight, 1.4rem size for optimal readability

### Layout

- **Container**: Max-width 7xl with responsive padding
- **Grid**: 12-column system with responsive breakpoints
- **Spacing**: Consistent scale using Tailwind CSS spacing units

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

## 📦 Dependencies

### Core Dependencies

- `react@^19.2.0` - UI library
- `react-dom@^19.2.0` - React DOM renderer
- `framer-motion@^12.26.2` - Animation library
- `lucide-react@^0.562.0` - Icon library
- `class-variance-authority@^0.7.1` - Component variants
- `clsx@^2.1.1` - Utility class names
- `tailwind-merge@^3.4.0` - CSS class merging

### UI Components

- `@radix-ui/*` - Accessible component primitives
- `tailwindcss-animate@^1.0.7` - Tailwind animations

### Development Dependencies

- `vite@^7.2.4` - Build tool
- `typescript@~5.9.3` - Type system
- `@vitejs/plugin-react@^5.1.1` - React plugin for Vite
- `tailwindcss@^3.4.0` - CSS framework
- `autoprefixer@^10.4.23` - CSS autoprefixer

## 🚀 Deployment

The application builds to static files in the `dist/` directory and can be deployed to any static hosting service:

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

### Vercel

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy automatically on push

### GitHub Pages

1. Run `npm run build`
2. Deploy the `dist` folder to `gh-pages` branch

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Original snt4ever.com** - For the inspiration and content
- **Cargo Collective** - Original platform that hosted the first version
- **Barcelona Skate Community** - For the culture and stories
- **shadcn/ui** - For the beautiful and accessible UI components
- **Framer Motion** - For the smooth animations

## 📞 Contact

- **Website**: [snt4ever.com](https://snt4ever.com)
- **Email**: info@snt4ever.com
- **Instagram**: [@snt4ever](https://instagram.com/snt4ever)
- **Location**: Sants Skate Plaza, Barcelona, Spain

---

<div align="center">
  <p>Made with ❤️ in Barcelona, Spain</p>
  <p>Preserving skate culture since 1983 • Defendiendo la cultura del skate desde 1983</p>
</div>
