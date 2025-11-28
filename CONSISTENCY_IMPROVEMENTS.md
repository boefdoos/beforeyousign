# Contract Analysis Consistency Improvements

## Probleem

Je observeerde dat hetzelfde contract verschillende waarschuwingen en issues oplevert wanneer het in verschillende talen wordt geanalyseerd. De **score** was al consistent (temperature 0), maar de **inhoud** van red flags verschilde.

### Waarom gebeurde dit?

Ondanks temperature 0 en instructies om "eerst objectief te analyseren", was de prompt nog steeds te open voor interpretatie:
- Geen expliciete checklist van wat altijd moet worden geëvalueerd
- Geen duidelijke criteria voor wanneer iets een "critical" vs "warning" is
- Vertaling en analyse waren verweven in plaats van gescheiden
- Claude kon kiezen welke issues te highlighten

## Oplossing: Checklist-Based Analysis

### Twee-Fase Proces

**FASE 1: Objectieve Evaluatie (Language-agnostic)**
```
1. Werk door VOLLEDIGE checklist (25 items)
2. Score elke categorie gebaseerd op checklist
3. Identificeer ALLE issues die severity criteria ontmoeten
4. Noteer ALLE positieve aspecten
5. Bereken totale score
```

**FASE 2: Vertaling**
```
6. Vertaal bevindingen naar doeltaal
7. Gebruik correcte category namen per taal
8. Behoud ALLE bevindingen uit Fase 1
```

### Expliciete Checklist (25 Items)

**Rights Retention (25 pts)**
- [ ] Master ownership
- [ ] Exploitation rights
- [ ] Territory restrictions
- [ ] Reversion clauses
- [ ] Creative control

**Financial Terms (25 pts)**
- [ ] Royalty/commission rate
- [ ] Advance/upfront payment
- [ ] Recoupment terms
- [ ] Accounting transparency
- [ ] Payment schedule

**Duration & Termination (20 pts)**
- [ ] Contract length
- [ ] Renewal/extension terms
- [ ] Exit clauses
- [ ] Post-term obligations
- [ ] Notice periods

**Obligations & Restrictions (15 pts)**
- [ ] Exclusivity clauses
- [ ] Delivery commitments
- [ ] Performance obligations
- [ ] Promotional requirements
- [ ] Conflicting restrictions

**Transparency & Fairness (15 pts)**
- [ ] Audit rights
- [ ] Dispute resolution
- [ ] Legal jurisdiction
- [ ] Amendment procedures
- [ ] Hidden clauses

### Duidelijke Severity Criteria

**CRITICAL** - MOET aanwezig zijn als EEN van deze waar is:
- Artist verliest master ownership permanent
- Commission/royalty rate >25% of <10%
- Geen termination clause / indefinite contract
- Rechten verkocht/overgedragen zonder consent
- Geen payment terms gedefinieerd
- Exclusieve restricties zonder faire compensatie

**WARNING** - MOET aanwezig zijn als EEN van deze waar is:
- Commission/royalty rate 20-25% of 10-15%
- Contract term >3 jaar zonder review
- Automatische renewal zonder notice
- Beperkte audit rights
- Vage payment schedule
- Restrictieve exclusivity boven industry standard

**MINOR** - Documenteer notabele issues:
- Kleine ambiguïteiten
- Ongebruikelijk maar niet unfair
- Industry-standard clausules die één partij bevoordelen
- Ontbrekende optionele beneficial clausules

## Belgische Standards Geëxpliciteerd

### Booking Deals
- ✓ Standard: 10-15% (paid BY PROMOTER on top)
- ⚠ Red flag: Deducted FROM artist fee
- ⚠ Red flag: >20%

### Management Deals
- ✓ Fair: 15-20%
- ⚠ Warning: 20-25%
- ⚠ Red flag: >25%

### Label Deals
- ✓ Fair royalty: 15-25%
- ⚠ Warning: <15%
- ⚠ Red flag: <10%

### Payment Standards
- ✓ Standard: 50% advance, 50% completion
- ⚠ Red flag: "When received" only

## Consistentie Regels

```
CONSISTENCY RULES in prompt:
- Same contract in NL/FR/EN → same score (±2 pts tolerance)
- Same contract → same critical/warning issues identified
- Only language & translation differ, NOT analysis
- Use checklist systematically - don't skip items
- Document reasoning: "Issue X → severity Y → score Z"
```

## Verwachte Verbetering

### Voorheen (Inconsistent)
```
NL analyse:
- Critical: Geen master ownership reversion
- Warning: Booking fee onduidelijk
Score: 78/100

FR analyse:
- Critical: Duur contract zonder exit
- Warning: Royalty percentage laag
Score: 78/100

→ Zelfde score, VERSCHILLENDE issues!
```

### Na Fix (Consistent)
```
NL analyse:
- Critical: Geen master ownership reversion
- Critical: Duur contract zonder exit
- Warning: Booking fee onduidelijk
- Warning: Royalty percentage laag
Score: 72/100

FR analyse:
- Critical: Pas de réversion de propriété master
- Critical: Contrat longue durée sans sortie
- Warning: Frais de booking peu clair
- Warning: Pourcentage de royalty bas
Score: 72/100

→ Zelfde score, ZELFDE issues (alleen vertaald)!
```

## Installatie

```bash
cd ~/Documents/contract-checker-app

# Backup huidige versie
cp app/api/analyze-contract/route.ts app/api/analyze-contract/route.ts.backup

# Installeer nieuwe versie
cp ~/Downloads/route_with_checklist.ts app/api/analyze-contract/route.ts

# Test met hetzelfde contract in 3 talen
# Vergelijk de red flags - ze zouden nu consistent moeten zijn
```

## Test Protocol

Om te verifiëren dat de fix werkt:

1. **Upload hetzelfde contract 3x:**
   - Keer 1: Nederlands
   - Keer 2: Frans
   - Keer 3: Engels

2. **Vergelijk resultaten:**
   - Score zou identiek moeten zijn (±2 pts)
   - Aantal red flags zou gelijk moeten zijn
   - Severity levels zouden matchen
   - Alleen taal verschilt

3. **Check specifiek:**
   - Kritieke issues aanwezig in alle 3 talen?
   - Warnings consistent?
   - Positieve punten gelijk?
   - Recommendations vergelijkbaar?

## Waarom Dit Zou Moeten Werken

1. **Expliciete Checklist**: Claude kan niet meer "kiezen" wat te evalueren
2. **Harde Severity Criteria**: Objectieve regels wanneer iets critical/warning is
3. **Two-Phase Process**: Analyse ↔ vertaling gescheiden
4. **Consistency Rules**: Expliciet in prompt opgenomen
5. **Temperature 0**: Al aanwezig, nu met betere structuur

## Monitoring

Na deployment, track:
- Consistency score tussen talen (hoeveel % issues matchen?)
- Score variance (hoe groot is verschil tussen talen?)
- User feedback over inconsistenties
- Specifieke categories waar nog verschillen optreden

## Volgende Stap

Als er na deze fix nog inconsistenties zijn:
- Log exact welke issues verschillen
- Verfijn severity criteria verder
- Voeg meer expliciete voorbeelden toe per category
- Overweeg post-processing consistency check

---

**Status:** Ready for testing
**Impact:** High - core functionality improvement
**Risk:** Low - temperature 0 blijft, alleen prompt structuur verbeterd
