# Tauri Basemap
[Basemap.de world vector](https://basemap.de/produkte-und-dienste/web-vektor-world/) with a custom [photon geocoder](https://photon.komoot.io/) interface packaged as tauri app for any device. 

[![Tauri Basemap](https://github.com/user-attachments/assets/399fc3aa-9046-4bc9-820c-4d3887f9f619)](https://www.youtube.com/watch?v=b0tNk9DrmFs)

Served mainly as a simple learning project for myself but thought it might be useful to share. 

App here: https://do-me.github.io/tauri-basemap/

## How to build bundles 

With npm installed: 

- `npm create tauri-app@latest`
- run through the wizard with these settings: 

```bash
(base) ➜  tauri npm create tauri-app@latest
✔ Project name · basemap-test
✔ Identifier · com.basemap-test.app
✔ Choose which language to use for your frontend · TypeScript / JavaScript - (pnpm, yarn, npm, deno, bun)
✔ Choose your package manager · npm
✔ Choose your UI template · Vanilla
✔ Choose your UI flavor · JavaScript
```

- under `/basemap-test` run `npm install`
- then under `/basemap-test/src` simply overwrite the following files with the ones from this repo
  - `index.html`
  - `main.js`
  - `styles.css`

- for testing locally run `npm run tauri dev`
- for building e.g. dmg or macos app `npm run tauri build`. The resulting .app-file weighs only 9Mb and starts instantly.
- I added the `basemap.app` to this repo but note that you should NEVER blindly trust random .app-files from the web. Instead, it's best to build it yourself.

## To Do: 
- Build Windows, iOS & Android files




