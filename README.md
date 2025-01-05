# Tauri Basemap
[Basemap.de world vector](https://basemap.de/produkte-und-dienste/web-vektor-world/) with a custom [photon geocoder](https://photon.komoot.io/) interface packaged as tauri app for any device. 

Click the image below to view the demo videos on YouTube.

## MacOS
[![Tauri Basemap](https://github.com/user-attachments/assets/399fc3aa-9046-4bc9-820c-4d3887f9f619)](https://youtu.be/b0tNk9DrmFs)

## iOS
[![Tauri Basemap](https://github.com/user-attachments/assets/af288189-396b-407e-bcc6-63113dc5548f)](https://youtu.be/sONjXU4eRss)

## Interactive web-app here: https://do-me.github.io/tauri-basemap/

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

### MacOS
- for testing locally run `npm run tauri dev`
- for building e.g. dmg or macos app `npm run tauri build`. The resulting .app-file weighs only 9Mb and starts instantly.
- I added the `basemap.app` under `builds` to this repo but note that you should NEVER blindly trust random .app-files from the web. Instead, it's best to build it yourself.

### iOS
I didn't manage to get xcode simulator to run the app so I used my real iPhone to test and record the demo. 
There's lots of loopholes in getting everything running properly. Here's a few things to do right from the start: 

1. Install Rust from the command line, with the official method, not with homebrew
2. Install Xcode by downloading the .xip file from apple developer tools, not from the app store
3. If running on a real iPhone via cable, the developer settings must be activated. Also, the first run will fail, as you allow apps you developed yourself in the settings.

This command should work eventually and install the `basemap` app on your phone
- npm run tauri ios dev --host

If you change any files, the app will automatically update within 1-2 seconds. The app remains installed after killing the server or detaching the phone.

You can create a build resulting in an .ipa file with 
- npm run tauri ios build

If an iPhone has dev mode activated you should be able to install it. Still, it's best if you build it yourself!

## To Do: 
- Build Windows & Android files

This is repo is the result of a small learning journey with tauri.




