# AGENTS.md

Welcome to the `portfolio-home` repository. This is a personal portfolio website.

## Core Directives for Agents

1. **Static HTML/CSS Only**: This is a static HTML site. Do NOT introduce or suggest any JavaScript frameworks (e.g., React, Vue, Svelte) or CSS preprocessors (e.g., Sass, Tailwind). Stick to vanilla HTML, CSS, and minimal JS.
2. **No Build Steps**: Do not add build tools like Webpack, Vite, or npm scripts for building. The site is served directly as-is via GitHub Pages.
3. **Typography**: Use standard fonts as configured in the site. Avoid cliché AI aesthetics.
4. **Project Cards**: When adding new projects, follow the existing structure. Use the `<a class="index-row">` pattern defined in `index.html`.
5. **Commit Messages & PRs**: Keep commit messages and PR comments casual, clean, and developer-focused. Never mention "AI", "AI slop", "LLM", or agent tooling in commit messages, branch names, or PR descriptions.

## Project Card Structure

To add a new project to the portfolio, use the following HTML snippet in the "Selected work" section of `index.html`:

```html
<a class="index-row" href="portfolio/link_to_project.html">
  <span class="index-row__tag">Category · Tags</span>
  <span class="index-row__body">
    <h3>Project Title</h3>
    <p>A concise, professional description of the project.</p>
  </span>
  <span class="index-row__meta">Tools · Languages · Frameworks</span>
  <span class="index-row__preview">
    <img src="img/thumbs/image.jpg" alt="" loading="lazy" />
  </span>
</a>
```

Keep changes minimal and maintain the established design system.
