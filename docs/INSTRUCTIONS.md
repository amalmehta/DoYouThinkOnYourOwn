# Instructions

## Use it

Open the [live page](https://amalmehta.github.io/DoYouThinkOnYourOwn/), press **Start** (or Enter), and answer one question at a time.

- **Keyboard:** 1–4 picks an option, Enter goes to the next question, and ⌘, (Ctrl+, on Windows and Linux) opens Settings. Some browsers keep ⌘, for themselves; the gear button always works.
- **Quit mid-way:** your place is kept in this browser. Come back and press **Resume**.
- **Share:** on the results screen, **Copy a link to your result** gives a link that holds only your four counts. It sits after `#`, so it's never sent to a server.
- **Settings:** appearance (system, light or dark), text size, motion, and clearing past results.

## Run it locally

No build step is needed, only a static file server, because ES modules don't load from `file://`.

```bash
npm start
```

Then open http://127.0.0.1:8765.

## Test it

```bash
npm install
```

```bash
npx playwright install chromium webkit
```

```bash
npm run test:all
```

- `npm test` runs the unit tests (node:test, no install needed): judging rules, number parsing, share links, task content, and AQ-10 scoring.
- `npx playwright test` runs the UI tests in Chromium, WebKit and an iPhone-sized viewport: full flows, keyboard-only use, resuming, shared links, settings, blocked storage, the screener, and no sideways scrolling at 320 px.
- `npm run shots` regenerates `docs/screenshots/` and the PNG icons. It needs `npm start` running.

## Change the questions

Edit `src/tasks.js`. Each task carries its twist, what's true, and sources. Mark anything invented for the test in `invented`. The unit tests check that every task has a source and that invented details are labelled.

## Deploy

GitHub Pages serves the repository root from `main`. Pushing to `main` deploys.
