# XSun's Personal Blog

A modern, minimalist personal blog built with Next.js, Tailwind CSS, and TypeScript. This is the main repository for https://xsun4231.github.io

## Features

- 🚀 **Fast & Modern**: Built with Next.js 14 and React 19
- 🎨 **Beautiful Design**: Clean, responsive design with Tailwind CSS
- 🌓 **Dark/Light Mode**: Automatic theme switching with system preference detection
- 🔍 **Fast Search**: Instant search across all posts
- 📱 **Mobile Responsive**: Fully responsive design
- 📝 **Markdown Support**: Write posts in Markdown
- ⚡ **Static Export**: Optimized for GitHub Pages deployment
- 🤖 **Automated Deployment**: GitHub Actions for automatic deployment

## Project Structure

```
xsun4231.github.io/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── posts/             # Blog post pages
│   ├── about/             # About page
│   ├── archive/           # Archive page
│   ├── tags/              # Tags page
│   ├── search/            # Search page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── header.tsx        # Site header
│   ├── footer.tsx        # Site footer
│   ├── search-bar.tsx    # Search component
│   └── post-list.tsx     # Post listing component
├── content/              # Blog post content (Markdown files)
├── lib/                  # Utility functions
├── public/               # Static assets
└── .github/workflows/    # GitHub Actions workflows
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/xsun4231/xsun4231.github.io.git
   cd xsun4231.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Adding New Posts

1. Create a new Markdown file in `content/posts/` with the following frontmatter:
   ```yaml
   ---
   title: "Your Post Title"
   date: "2024-01-01"
   excerpt: "Brief description of your post"
   tags: ["tag1", "tag2"]
   ---
   
   Your post content here...
   ```

2. The post will automatically appear on the homepage and in search results.

### Building for Production

```bash
npm run build
npm run export
```

The static site will be generated in the `out/` directory.

## Deployment

### GitHub Pages Deployment

This blog is configured for automatic deployment to GitHub Pages:

1. **Workflow**: Pushes to the `develop` branch trigger automatic deployment
2. **Deployment**: The site is built and deployed to GitHub Pages
3. **GitHub Pages**: Serves the site directly from the main branch

### Manual Deployment

1. Build the site:
   ```bash
   npm run build
   npm run export
   ```

2. Deploy the `out/` directory to your hosting service.

## Configuration

### Environment Variables

- `NEXT_PUBLIC_BASE_PATH`: Base path for GitHub Pages (empty for root domain)

### Customization

1. **Theme Colors**: Edit `app/globals.css` to customize color variables
2. **Layout**: Modify components in `components/` directory
3. **Styling**: Update `tailwind.config.ts` for custom Tailwind configuration

## Features in Detail

### Search Functionality
- Instant search across post titles, excerpts, and tags
- Keyboard shortcut: `Ctrl+K` to focus search
- Search results page with filtering

### Theme Switching
- Light/dark mode toggle
- System preference detection
- Persistent theme preference

### Performance
- Static site generation for fast loading
- Image optimization
- Code splitting and lazy loading

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- GitHub: [@xsun4231](https://github.com/xsun4231)
- Email: xsun4231@gmail.com