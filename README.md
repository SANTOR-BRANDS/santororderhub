# SANTOR Order Hub 🍽️

**Live Site**: https://santororderhub.vercel.app  
**Website**: www.santorbrands.com

Premium Asian foodd ordering platform featuring three restaurant brands: Restory, Nirvana, and Mejai Hai Yum.

## ✨ Features

- 🔒 **Enterprise Security** - Production-ready security headers
- 🚀 **SEO Optimized** - Full meta tags, JSON-LD, sitemap
- 🤖 **LLM Ready** - AI-friendly `/api/ai-recommend` endpoint
- 📊 **Analytics Enabled** - Vercel Web Analytics & Speed Insights
- 🌐 **Bilingual** - English & Thai language support
- 📱 **Mobile First** - Responsive design

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔐 Security

Security headers configured in `vercel.json`:
- HSTS with preload
- XSS protection
- Clickjacking prevention
- CSP policy

Verify in production:
```bash
curl -I https://santororderhub.vercel.app
```

## 📈 SEO & Analytics

### Sitemap & Robots
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`
- AI Endpoint: `/api/ai-recommend`

### Vercel Analytics Setup
Analytics packages are pre-installed (`@vercel/analytics` and `@vercel/speed-insights`).

To enable data collection:
1. Go to Vercel Dashboard → Project → Analytics
2. Enable Web Analytics
3. Enable Speed Insights
4. Deploy and visit your site to start collecting data

### Lighthouse Targets
- SEO: ≥ 90
- Accessibility: ≥ 90
- Performance: ≥ 80

## 🛠️ Tech Stack

- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **SEO**: React Helmet Async + JSON-LD
- **Analytics**: @vercel/analytics + @vercel/speed-insights
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions + Dependabot

## 📦 Deployment

### Via Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

### Via GitHub
Push to main branch - auto-deploys via Vercel integration

## 🧪 Testing & Quality

```bash
# Lint code
npm run lint

# Type check
npm run typecheck

# Security audit
npm audit

# Run all checks (CI)
npm run lint && npm run build && npm audit
```

## 📚 Documentation

- [Acceptance Tests](./docs/acceptance.md) - Performance targets & checklists
- [Security Policy](./.github/security.md) - Security headers & best practices

## 🤝 Contributing

1. Code changes trigger CI pipeline
2. Dependabot monitors dependencies weekly
3. Pre-commit hooks ensure code quality

---

Built with ❤️ by SANTOR BRANDS
