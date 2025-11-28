# beforeyousign.be

**Voor je tekent** - Een educatief platform voor jonge Belgische muzikanten om contracten te begrijpen en hun rechten te kennen.

![beforeyousign.be](https://img.shields.io/badge/status-live-success)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 🎯 Wat is dit?

beforeyousign.be helpt jonge muzikanten in België/Vlaanderen om:
- **Contracten te analyseren** met AI-ondersteuning (Claude Sonnet 4)
- **Red flags te herkennen** in label deals, booking agreements, management contracten
- **Hun rechten te begrijpen** rond naburige rechten, SABAM, PlayRight
- **Betere deals te onderhandelen** met concrete aanbevelingen

## ✨ Features

### 🔍 Contract Checker
- Upload PDF contracten (max 10MB)
- AI-analyse in Nederlands, Frans of Engels
- Score 0-100 gebaseerd op Belgische muziekstandaarden
- Gedetailleerde uitleg van problemen en aanbevelingen
- Exporteer analyse als professionele PDF

### 🎨 Serene Design
- Rustig, minimalistisch design
- Off-white achtergrond (#faf9f7)
- Serif typography (Georgia)
- Mobiel-vriendelijk
- Toegankelijk (WCAG 2.1 AA)

### 🌍 Multi-language
- Nederlands (primair)
- Frans
- Engels

### 📊 Transparantie
- API kosten tracker (development mode)
- Open source componenten
- Privacy-first (geen tracking)

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **AI:** Claude Sonnet 4 (Anthropic)
- **Styling:** Tailwind CSS
- **PDF:** jsPDF + Anthropic PDF reading
- **Deployment:** Vercel
- **Language:** TypeScript

## 📦 Installatie

```bash
# Clone repository
git clone https://github.com/[jouw-username]/beforeyousign.git
cd beforeyousign

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Voeg je ANTHROPIC_API_KEY toe in .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

Create `.env.local` in root:

```bash
ANTHROPIC_API_KEY=sk-ant-...
```

Get your API key from [Anthropic Console](https://console.anthropic.com/)

## 🏗️ Project Structure

```
contract-checker-app/
├── app/
│   ├── api/
│   │   └── analyze-contract/
│   │       └── route.ts          # API endpoint voor contract analyse
│   ├── components/
│   │   ├── AnalysisResults.tsx   # Results weergave
│   │   ├── ApiCreditsMonitor.tsx # API kosten tracker
│   │   ├── ContractUploader.tsx  # Drag & drop upload
│   │   ├── LoadingAnimation.tsx  # Loading state
│   │   ├── PdfExportButton.tsx   # PDF export functionaliteit
│   │   └── i18n-context.tsx      # Internationalisatie
│   ├── layout.tsx
│   ├── page.tsx                  # Homepage
│   └── globals.css
├── backups/                       # Timestamped backups
├── public/
├── DESIGN_GUIDE.md               # Complete design system docs
├── QUICK_REFERENCE.md            # Copy-paste snippets
├── package.json
└── README.md
```

## 🎨 Design System

Het volledige design system is gedocumenteerd in:
- **DESIGN_GUIDE.md** - Uitgebreide guide met principes, kleuren, typography
- **QUICK_REFERENCE.md** - Copy-paste snippets voor snelle development
- **design-guide-printable.html** - Printbare PDF versie

## 🇧🇪 Belgische Muziekstandaarden

Het systeem gebruikt specifieke kennis over de Belgische muziekindustrie:

**Booking Agreements:**
- Standaard commissie: 10-15% (betaald door promotor bovenop artiest fee)
- Red flag: commissie afgetrokken VAN artiest fee

**Management Deals:**
- Fair: 15-20%
- Warning: 20-25%
- Critical: >25%

**Label Deals:**
- Fair royalty: 15-25% van netto opbrengsten
- Warning: <15%
- Critical: <10%

## 🚢 Deployment (Vercel)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push naar GitHub
2. Import project in Vercel
3. Voeg `ANTHROPIC_API_KEY` toe als environment variable
4. Deploy!

## 🧪 Development

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📄 License

MIT License - zie [LICENSE](LICENSE) voor details.

## 🤝 Contributing

Dit is een educatief project voor OHK (Jongerenmuziekcentrum Oostende). Contributions zijn welkom!

1. Fork het project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push naar branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## 📮 Contact

**Jongerenmuziekcentrum OHK**  
Website: [Link naar OHK website]  
Email: [contact email]

**Project Link:** https://github.com/[username]/beforeyousign

---

**Built with ❤️ for young musicians in Belgium**
