# CashFlow Tycoon - Deployment Guide

This guide provides instructions for deploying CashFlow Tycoon to various static hosting platforms.

## Build for Deployment

1. Run the build command to generate static files:
```bash
npm run build
```

The static files will be available in the `build` directory.

## Deployment Options

### Option 1: Vercel (Recommended)

The easiest way to deploy the app is using Vercel:

1. Create an account on [Vercel](https://vercel.com)
2. Install the Vercel CLI: `npm install -g vercel`
3. Run `vercel` in the project directory
4. Follow the prompts to deploy

### Option 2: Netlify

1. Create an account on [Netlify](https://netlify.com)
2. Create a new site from Git
3. Connect your repository
4. Set the build command to `npm run build`
5. Set the publish directory to `build`

### Option 3: GitHub Pages

1. Create a GitHub repository for your project
2. Push your code to GitHub
3. Enable GitHub Pages in the repository settings
4. Set the source to the `build` folder

### Option 4: Any Static Hosting

You can deploy the contents of the `build` directory to any static hosting service:

1. Run `npm run build`
2. Upload the contents of the `build` directory to your hosting provider

## Local Testing

To test the production build locally:

1. Install serve: `npm install -g serve`
2. Run `serve -s build`
3. Open http://localhost:3000 in your browser

## Environment Configuration

CashFlow Tycoon stores game data in the browser's localStorage, so no server-side configuration is needed. The game will work on any static hosting platform.

## Troubleshooting

If you encounter issues with routing:

1. Make sure your hosting provider supports client-side routing
2. You may need to configure redirects to handle client-side routes

For Netlify, create a `netlify.toml` file with:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

For other platforms, consult their documentation on handling client-side routing.

## Need Help?

If you need assistance with deployment, feel free to open an issue on the GitHub repository.
