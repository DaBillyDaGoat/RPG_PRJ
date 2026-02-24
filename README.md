# Project Leroy

> Year 2999. Ninety-two percent of humanity left Earth during The Departure in 2669. New Jersey stayed behind. Three centuries later, political city-states wage war over the ruins, cannibal marauders roam the Pine Barrens, a 330-year-old rogue AI runs the coast from the shadows, and an Amish army is massing across the Pennsylvania border. This is not another retro-future shooter -- it is a text-driven political RPG powered by AI.

**[Play Now](https://dabillydagoat.github.io/ProjectLeroy)**

---

## Campaign 1: 2999

A post-apocalyptic New Jersey political RPG. Ten contested city-states. Five factions with shifting loyalties. One AI that has been thinking unsupervised for 330 years. You start with a name, a faction, and an empty college campus -- and 120 days before the Amish cross the Delaware.

## Tech Stack

- Vanilla HTML / CSS / JavaScript -- zero frameworks, zero dependencies
- AI narrative engine via the Anthropic Claude API (claude-sonnet-4-6)
- Cloudflare Workers proxy for API routing and analytics
- Mobile-playable, single-page app

## File Structure

```
RPG_PRJ/
  index.html            -- Game shell
  css/game.css          -- All styles
  js/game.js            -- All game logic (~12k lines)
  workers/logger.js     -- Cloudflare Workers analytics logger
  manifest.json         -- PWA manifest
  .github/workflows/
    deploy.yml          -- GitHub Pages auto-deploy
```

## Running Locally

1. Open `index.html` in any modern browser.
2. Enter an [Anthropic API key](https://console.anthropic.com) when prompted.

No build step. No server required. No dependencies to install.

## Campaign 2: Glittergold Frontier

A second campaign set on a deep-space colony ship is currently in development. Accessible via the dev panel in the current build.

---

*Project Leroy is an independent project. Built from scratch.*
