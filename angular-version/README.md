# KORIANI TUNA FISHING SLU - Angular Universal Version

This is the Angular Universal (SSR) version of the KORIANI TUNA FISHING SLU website.

## Prerequisites

- Node.js 18+ 
- npm or pnpm

## Installation

```bash
cd angular-version
npm install
```

## Development

```bash
# Client-side only
npm start

# With Server-Side Rendering (SSR)
npm run dev:ssr
```

The app will be available at `http://localhost:4200` (client) or `http://localhost:4000` (SSR).

## Production Build

```bash
# Build for production with SSR
npm run build:ssr

# Serve the production build
npm run serve:ssr:koriani-tuna
```

## Environment Variables

For the contact form email functionality, set these environment variables:

```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

For Gmail, you need to create an App Password in your Google Account settings.

## Project Structure

```
angular-version/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/
│   │   │   ├── hero-section/
│   │   │   ├── about-section/
│   │   │   ├── products-section/
│   │   │   ├── contact-section/
│   │   │   └── footer/
│   │   ├── directives/
│   │   │   └── scroll-animation.directive.ts
│   │   ├── services/
│   │   │   ├── translation.service.ts
│   │   │   └── contact.service.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   ├── app.config.server.ts
│   │   └── app.routes.ts
│   ├── assets/
│   │   └── images/
│   ├── index.html
│   ├── main.ts
│   ├── main.server.ts
│   └── styles.scss
├── server.ts
├── angular.json
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Features

- **Angular 19** with standalone components
- **Angular Universal (SSR)** for server-side rendering
- **Tailwind CSS** for styling
- **Multi-language support** (Spanish, French, English)
- **Scroll animations** with Intersection Observer
- **Contact form** with Nodemailer integration
- **Hero carousel** with auto-advance
- **Product modals** with detailed information
- **Responsive design** for all screen sizes

## Deployment

### Vercel

1. Push to GitHub
2. Import in Vercel
3. Set build command: `npm run build:ssr`
4. Set output directory: `dist/koriani-tuna`
5. Add environment variables (EMAIL_USER, EMAIL_PASS)

### Node.js Server

```bash
npm run build:ssr
NODE_ENV=production npm run serve:ssr:koriani-tuna
```

### Docker

Create a Dockerfile:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:ssr
EXPOSE 4000
CMD ["npm", "run", "serve:ssr:koriani-tuna"]
```
