# PCN - Pixel | Code | Network

Web agencija . Kompletan, produkcijski spreman React.js sajt.

## Pokretanje

```bash
# Instaliraj zavisnosti
npm install --legacy-peer-deps

# Development server
npm run dev

# Produkcioni build
npm run build

# Pregled produkcione verzije
npm run preview
```

## Tehnicki stack

- React 19 + Vite 8
- React Router v6 - SPA navigacija
- i18next + react-i18next - visejezicnost (SR, EN, DE, RU)
- Framer Motion - animacije i prelazi
- React Helmet Async - SEO meta tagovi
- CSS Modules - stilizacija sa varijablama

## Jezici

- Srpski (sr) - podrazumevani
- Engleski (en)
- Nemacki (de)
- Ruski (ru)

Jezik se bira kroz switcher u navigaciji i cuva u localStorage.

## Dizajn

- VS Code inspirisana paleta boja
- Dark / Light mode sa localStorage persist-om
- Responsive: Mobile < 768px, Tablet 768-1024px, Desktop > 1024px, Wide > 1440px
- Fontovi: Space Grotesk, Inter, JetBrains Mono

## Funkcionalnosti

- Svi tekstovi prevedeni na 4 jezika
- Dark i light mode funkcionalan
- Sajt responzivan na svim breakpointima
- Animacije sa Framer Motion (lazy, on-scroll)
- Kontakt forma sa validacijom
- SEO meta tagovi (React Helmet Async)
- Favicon i web manifest
- Code splitting po rutama i chunk-ovima
- Lazy loading za sve sekcije
