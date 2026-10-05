# Satnam Singh: Personal Site

Plain, early-web style portfolio. Live at **https://probotisop.github.io**

## Edit content
- Text and links: `constants.ts`
- Resume: replace `public/RESUME_SATNAM.pdf`
- Styling: `index.css`

## Run locally
```
npm install
npm run dev        # http://localhost:3000
npm run build && npm run preview   # http://localhost:4173
```

Pushing to `main` deploys automatically via `.github/workflows/deploy.yml`
(repo Settings → Pages → Source must be **GitHub Actions**).
