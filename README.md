# Fluvie Marketing Website

[![Deploy](https://github.com/SimonErich/fluvie_website/actions/workflows/deploy.yml/badge.svg)](https://github.com/SimonErich/fluvie_website/actions/workflows/deploy.yml)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Ffluvie.dev)](https://fluvie.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

The marketing website for Fluvie, deployed to GitHub Pages at [fluvie.dev](https://fluvie.dev).

## Related Projects

| Project | Description |
|---------|-------------|
| [📦 fluvie](https://github.com/SimonErich/fluvie) | Main Flutter package for programmatic video generation |
| [🤖 fluvie_mcp_server](https://github.com/SimonErich/fluvie_mcp_server) | MCP server for AI-assisted development |
| [🌐 fluvie_website](https://github.com/SimonErich/fluvie_website) | Marketing website source code (this repo) |

## Structure

```
website/
├── index.html              # Main page (single-page design)
├── CNAME                   # Custom domain configuration
├── .nojekyll              # Disable Jekyll processing
├── assets/
│   ├── css/
│   │   ├── main.css       # Design system & components
│   │   └── animations.css # Scroll animations & transitions
│   ├── js/
│   │   ├── main.js        # Core interactions
│   │   ├── code-editor.js # Monaco Editor integration
│   │   └── smooth-scroll.js # Smooth scrolling polyfill
│   └── images/
│       ├── logo.svg       # Fluvie logo
│       ├── architecture.svg # Architecture diagram
│       ├── favicon.svg    # Favicon source
│       ├── og-image.png   # Social sharing image
│       ├── favicon/       # Generated favicon files
│       └── templates/     # Template preview images
└── README.md              # This file
```

## Deployment

### GitHub Pages Setup

1. **Enable GitHub Pages** in repository settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/website`
   - Save

2. **Configure Custom Domain** (fluvie.dev):
   - The `CNAME` file already contains `fluvie.dev`
   - In your DNS provider (e.g., Cloudflare, Namecheap):
     ```
     Type: CNAME
     Name: @
     Value: simonerich.github.io
     TTL: Auto
     ```
   - Or for apex domain:
     ```
     Type: A
     Name: @
     Value: 185.199.108.153
     Value: 185.199.109.153
     Value: 185.199.110.153
     Value: 185.199.111.153
     ```
   - For www subdomain:
     ```
     Type: CNAME
     Name: www
     Value: simonerich.github.io
     ```

3. **Verify deployment**:
   - Visit https://simonerich.github.io/fluvie/
   - After DNS propagation: https://fluvie.dev/

### Local Development

To preview the site locally:

```bash
# Option 1: Python HTTP server
cd website
python3 -m http.server 8000
# Visit: http://localhost:8000

# Option 2: Node.js http-server
npm install -g http-server
cd website
http-server -p 8000
# Visit: http://localhost:8000

# Option 3: VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

## Assets TODO

The following assets are placeholders and should be replaced for production:

### High Priority
- [ ] **Favicon PNGs**: Generate proper PNG favicons from `favicon.svg`
  ```bash
  cd assets/images
  convert favicon.svg -resize 16x16 favicon/favicon-16x16.png
  convert favicon.svg -resize 32x32 favicon/favicon-32x32.png
  convert favicon.svg -resize 180x180 favicon/apple-touch-icon.png
  ```

- [ ] **Template Screenshots**: Render actual videos from example templates and take screenshots
  - Replace `templates/neon-gate.jpg`
  - Replace `templates/liquid-minutes.jpg`
  - Replace `templates/grid-shuffle.jpg`
  - Replace `templates/summary-poster.jpg`

### Medium Priority
- [ ] **Demo Videos**: Create short MP4 demos for hero section
  - Render "Hello Fluvie" example → `assets/videos/demo-intro.mp4`
  - Consider adding to hero section as looping background

- [ ] **OG Image**: Update `og-image.png` with actual rendered screenshot if desired
  - Current version is SVG-based, works but could be more visual

### Optional Enhancements
- [ ] Add more template previews
- [ ] Create animated GIFs for feature demonstrations
- [ ] Add video background to hero section

## Content Updates

To update content:

1. **Text changes**: Edit `index.html` directly
2. **Styling changes**: Modify `assets/css/main.css`
3. **Code examples**: Update `assets/js/code-editor.js` (codeExamples object)
4. **Add new sections**: Follow existing HTML structure in `index.html`

## SEO & Performance

Current optimizations:

- ✅ Semantic HTML5 structure
- ✅ Schema.org structured data (SoftwareApplication)
- ✅ Open Graph meta tags
- ✅ Twitter Card meta tags
- ✅ Mobile-responsive design
- ✅ Accessible (ARIA labels, alt text)
- ✅ Fast loading (no heavy frameworks)
- ✅ Smooth scroll animations

Target Lighthouse scores:
- Performance: 95+
- SEO: 100
- Accessibility: 95+
- Best Practices: 95+

## Technologies

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript**: No frameworks for maximum performance
- **Monaco Editor**: VS Code editor for code playground
- **SVG**: Scalable graphics for logos and diagrams

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile Safari: iOS 12+
- Mobile Chrome: Latest

## License

The website code is part of the Fluvie project and is licensed under the MIT License.

## Questions?

For issues or suggestions about the website, please open an issue on GitHub:
https://github.com/SimonErich/fluvie_website/issues
