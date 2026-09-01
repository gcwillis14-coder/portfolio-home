# Portfolio Home

This repository contains the source code for George Willis's personal portfolio website, focusing on geodata, spatial statistics, and applied machine learning.

## Overview

The site is built as a static HTML/CSS project without any heavy frameworks or build steps, aiming for a lightweight footprint, high performance, and long-term maintainability. It catalogs various projects, maps, data studies, and detailed engineering case studies.

## Case Studies

Detailed project write-ups are structured using a reusable case study template (`portfolio/case-study-template.html`) and styling (`assets/case-study.css`). These case studies cover the "why" behind the projects, detailing the architecture, engineering decisions, and core trade-offs.

## Deployment

The portfolio is deployed using GitHub Pages. Any changes pushed to the `main` branch are automatically built and published to the live site. There is no complicated build pipeline, just raw static assets served directly from the repository.

## How to Update

To update the content on the site:

1. **Modify HTML**: Edit `index.html` (or other HTML files in subdirectories) to update text, projects, or publications.
2. **Create a Case Study**: Use `portfolio/case-study-template.html` as a baseline for new detailed project pages.
3. **Update Styling**: Modify `assets/style.css` (or `assets/case-study.css`) for any design changes. The project relies on plain CSS and does not require preprocessors.
4. **Commit and Push**: Commit your changes and push to the `main` branch. GitHub Pages will handle the deployment automatically.
