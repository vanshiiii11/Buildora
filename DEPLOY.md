# Deployment Guide — Buildora 🏗️

This guide outlines step-by-step instructions to deploy Buildora to **Vercel** (recommended) or **Netlify**.

Buildora is a front-end React 19 + TypeScript + Vite single-page application with an in-browser state engine and demo datasets. There are no backend database servers or private API keys required to run or deploy.

---

## 🚀 Option 1: Deploy to Vercel (Recommended)

### Method A: Deploy via GitHub (Zero-Config CI/CD)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Polish app, add deployment config and docs"
   git push origin main
   ```

2. **Import into Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** > **"Project"**.
   - Select your GitHub repository (`vanshiiii11/buildora`).

3. **Configure Project Settings**:
   - **Framework Preset**: `Vite` (automatically detected).
   - **Root Directory**: `./` (leave default).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Environment Variables**: None required.

4. **Deploy**:
   - Click **Deploy**. Vercel will build and assign a production URL:
     `https://buildora.vercel.app` (or your chosen project slug).

---

### Method B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project root**:
   ```bash
   vercel --prod
   ```
   Follow the interactive prompts:
   - *Set up and deploy?* `Y`
   - *Which scope?* (Select your account)
   - *Link to existing project?* `N`
   - *What's your project's name?* `buildora`
   - *In which directory is your code located?* `./`
   - *Want to modify these settings?* `N` (uses `vercel.json` automatically).

---

## 🌐 Option 2: Deploy to Netlify (Alternative)

### Method A: Deploy via Netlify Dashboard

1. Push your repository to GitHub.
2. Sign in to [Netlify](https://app.netlify.com/) and click **"Add new site"** > **"Import an existing project"**.
3. Authorize GitHub and select `vanshiiii11/buildora`.
4. Configure build settings:
   - **Base directory**: (leave blank / root)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **"Deploy buildora"**.

### Method B: Deploy via Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```
2. **Build and deploy**:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

---

## 🛠️ Verification Checklist After Deployment

- [ ] Visit the deployed live URL and confirm the landing page renders without console errors.
- [ ] Test the **Dynamic Package Builder**: change property types, floor count, and plot sliders, and confirm the price updates dynamically.
- [ ] Test the **Smart Rule-Based Estimator**: configure parameters and generate the itemized estimation report.
- [ ] Switch roles using the top-right toolbar (Customer → Team Leader → Operations Manager → Admin) and verify persistent session state.
- [ ] Submit a daily site log from the Team Leader console and verify it appears in the Customer Portal.
- [ ] Assign a team leader in Operations Dispatch and confirm workforce roster status.
