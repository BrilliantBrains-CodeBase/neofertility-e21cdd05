# Neo Fertility website

Source for https://neofertility.co.in, built with TanStack Start, React and Tailwind.

## Development

Needs Node.js 22 and npm.

```sh
npm ci
npm run dev      # dev server on http://localhost:8080
npm run build    # static build into dist/client/
```

`npm run build` renders every page to static HTML (`dist/client/`), ready for plain
Apache hosting. `public/.htaccess` ships with it.

## Deploy

Every push to `main` builds the site and uploads `dist/client/` to GoDaddy's
`public_html` over SSH. See [.github/workflows/deploy.yml](.github/workflows/deploy.yml),
including the notes on which files in `public_html` it is allowed to touch.
Pushes to the `ci/auto-deploy` branch run the same pipeline as a dry run.
