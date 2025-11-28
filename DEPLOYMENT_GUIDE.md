# 🚀 Deployment Guide: beforeyousign.be naar Live

Stap-voor-stap instructies om je app live te zetten via GitHub en Vercel.

---

## Voorbereiding (10 minuten)

### ✅ Checklist voor je begint:

- [ ] Je hebt een GitHub account ([maak er een](https://github.com/signup))
- [ ] Je hebt een Vercel account ([maak er een](https://vercel.com/signup))
- [ ] Je Anthropic API key is beschikbaar ([krijg er een](https://console.anthropic.com/))
- [ ] Git is geïnstalleerd op je Mac (`git --version` in terminal)

---

## Stap 1: GitHub Repository Setup (5 min)

### A. Kopieer bestanden naar je app

```bash
cd ~/Documents/contract-checker-app

# Kopieer README en .env.example
cp ~/Downloads/README.md .
cp ~/Downloads/.env.example .
```

### B. Initialiseer Git repository

```bash
# Check of git al geïnitialiseerd is
git status

# Als er een error is, initialiseer dan:
git init

# Voeg alle bestanden toe
git add .

# Eerste commit
git commit -m "Initial commit: beforeyousign.be contract checker"
```

### C. Maak GitHub repository

1. Ga naar [github.com/new](https://github.com/new)
2. **Repository name:** `beforeyousign` (of `contract-checker`)
3. **Description:** "Contract analysis tool for young Belgian musicians"
4. **Visibility:** 
   - ✅ **Public** (aanbevolen voor open source)
   - ⚪ Private (als je het privé wilt houden)
5. ❌ **Niet** aanvinken: "Add README" (we hebben er al een)
6. Klik **Create repository**

### D. Push naar GitHub

GitHub geeft je na het maken een lijst met commands. Gebruik deze:

```bash
# Voeg remote toe (vervang [username] met jouw GitHub username)
git remote add origin https://github.com/[username]/beforeyousign.git

# Rename branch naar main (als nodig)
git branch -M main

# Push!
git push -u origin main
```

**🎉 Success!** Je code staat nu op GitHub.

---

## Stap 2: Vercel Deployment (5 min)

### A. Import project in Vercel

1. Ga naar [vercel.com](https://vercel.com)
2. Log in (gebruik je GitHub account voor makkelijke integratie)
3. Klik **Add New...** → **Project**
4. Selecteer je `beforeyousign` repository
5. Klik **Import**

### B. Configure project

Vercel detecteert automatisch dat het een Next.js project is.

**Framework Preset:** Next.js (automatisch gedetecteerd) ✅  
**Root Directory:** `./` (standaard) ✅  
**Build Command:** `next build` (standaard) ✅  
**Output Directory:** `.next` (standaard) ✅

### C. Environment Variables toevoegen

**🔐 BELANGRIJK:** Klik op **Environment Variables**

1. **Key:** `ANTHROPIC_API_KEY`
2. **Value:** [Plak hier je Anthropic API key]
3. **Environments:** Selecteer alle 3 (Production, Preview, Development)
4. Klik **Add**

**Let op:** Dit is de enige environment variable die je nodig hebt!

### D. Deploy!

1. Klik **Deploy**
2. Wacht 1-2 minuten terwijl Vercel je app build
3. 🎉 **Success!** Je app is live!

Vercel geeft je een URL zoals: `beforeyousign-abc123.vercel.app`

---

## Stap 3: Custom Domain Setup (Optioneel, 10 min)

### Als je beforeyousign.be wilt gebruiken:

1. **In Vercel:**
   - Ga naar je project
   - Settings → Domains
   - Voeg toe: `beforeyousign.be` en `www.beforeyousign.be`

2. **Bij je domain provider:**
   - Voeg DNS records toe (Vercel geeft je exacte instructies)
   - A Record: `76.76.21.21` (Vercel IP)
   - CNAME voor www: `cname.vercel-dns.com`

3. **Wacht op DNS propagatie (15 min - 48 uur)**

---

## Stap 4: Test je Live App

### Checklist:

- [ ] Ga naar je Vercel URL
- [ ] Upload een test PDF contract
- [ ] Kies een taal (NL/FR/EN)
- [ ] Klik "Onderzoeken"
- [ ] Wacht op analyse resultaat
- [ ] Check of de score verschijnt
- [ ] Test PDF export
- [ ] Test op je telefoon (mobile responsive)

**Als alles werkt: 🎉 Gefeliciteerd!**

---

## Stap 5: Future Updates

Elke keer dat je iets aanpast:

```bash
# In je local project folder
cd ~/Documents/contract-checker-app

# Maak je wijzigingen...
# (edit bestanden in VS Code / je editor)

# Check wat er veranderd is
git status

# Voeg wijzigingen toe
git add .

# Commit met duidelijke message
git commit -m "Fix: improved contract analysis consistency"

# Push naar GitHub
git push

# Vercel detecteert automatisch de push en deploy opnieuw!
```

**Automatic deployments:** Elke push naar `main` branch triggert een nieuwe deployment op Vercel. 🚀

---

## 🆘 Troubleshooting

### "API Key Error" in production

**Probleem:** De API key werkt niet op Vercel.

**Oplossing:**
1. Ga naar Vercel → Project Settings → Environment Variables
2. Check of `ANTHROPIC_API_KEY` correct is ingevoerd
3. Geen spaties voor/na de key
4. Key moet beginnen met `sk-ant-`
5. Redeploy: Deployments → ... menu → Redeploy

### "Build Failed"

**Probleem:** Build errors tijdens deployment.

**Oplossing:**
1. Check Vercel build logs (klik op failed deployment)
2. Vaak TypeScript errors - fix lokaal eerst
3. Test lokaal: `npm run build`
4. Als build lokaal werkt, push opnieuw

### "500 Internal Server Error"

**Probleem:** App draait maar geeft errors bij gebruik.

**Oplossing:**
1. Check Vercel Function Logs (Runtime logs)
2. Vaak: API key mist of is incorrect
3. Check of alle environment variables kloppen

### "Contract analysis hangt"

**Probleem:** Upload werkt maar analyse blijft laden.

**Oplossing:**
1. Check Vercel Function logs
2. Mogelijk: API rate limit bereikt
3. Check Anthropic Console voor usage
4. Mogelijk: PDF te groot (max 10MB)

---

## 📊 Monitoring

### Vercel Dashboard

**Analytics:** Zie hoeveel bezoekers je hebt  
**Speed Insights:** Check performance  
**Logs:** Runtime logs voor debugging  
**Usage:** Function execution time & bandwidth

### Anthropic Console

**Usage:** Hoeveel API calls / tokens gebruikt  
**Billing:** Kosten per maand  
**Rate Limits:** Check of je limits bereikt

---

## 💰 Kosten

### Vercel (Hosting)

**Hobby plan:** GRATIS ✅
- Unlimited deployments
- Automatic HTTPS
- 100GB bandwidth/maand
- 100 uur serverless functions/maand

**Upgrade alleen nodig bij:**
- >100GB bandwidth
- >100 uur functions
- Team collaboration features

### Anthropic (AI API)

**Pay as you go:**
- Claude Sonnet 4: $3 per 1M input tokens, $15 per 1M output tokens
- Gemiddeld contract analysis: ~$0.05 - 0.15 per analyse
- 100 analyses/maand ≈ $5-15/maand

**Kostenbesparing tips:**
- Cache frequently used content
- Limit analyses per user (rate limiting)
- Monitor usage in API credits monitor

---

## 🔒 Security Checklist

- [ ] `.env.local` staat in `.gitignore` (check!)
- [ ] API key NOOIT in code committed
- [ ] Environment variables alleen in Vercel toegevoegd
- [ ] GitHub repo kan public (geen secrets in code)
- [ ] HTTPS automatisch door Vercel ✅
- [ ] Rate limiting overwegen voor production

---

## 📚 Resources

**Vercel:**
- [Docs](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables](https://vercel.com/docs/projects/environment-variables)

**GitHub:**
- [GitHub Docs](https://docs.github.com/)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)

**Anthropic:**
- [API Docs](https://docs.anthropic.com/)
- [Claude Console](https://console.anthropic.com/)
- [Rate Limits](https://docs.anthropic.com/en/api/rate-limits)

---

**Succes met je deployment! 🚀**

Vragen? Check de troubleshooting sectie of open een issue op GitHub.
