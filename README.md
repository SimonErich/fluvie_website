# fluvie.dev

The Fluvie marketing site, served at https://fluvie.dev via GitHub Pages.

## How it deploys

The page lives in the Fluvie monorepo under `web/landing/`. The
`Deploy fluvie.dev` workflow (`.github/workflows/deploy.yml`) pulls it from there
and publishes it to Pages. It runs:

- on demand (Actions tab, "Run workflow"),
- daily (a scheduled refresh), and
- when the monorepo sends a `landing-changed` repository_dispatch (optional, for
  instant updates; needs a token with access to this repo).

Edit the page in the monorepo (`web/landing/index.html` and its assets), not
here. The copy committed here is a snapshot; the live site always comes from the
workflow.
