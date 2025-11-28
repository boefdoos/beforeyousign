'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'nl' | 'fr' | 'en'

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const translations = {
  nl: {
    // Header
    'app.title': 'Contract Analyse',
    'language.select': 'Taal',
    
    // Upload
    'upload.title': 'Upload je contract',
    'upload.dropzone': 'Klik om PDF te selecteren (max 10MB)',
    'upload.selected': 'Geselecteerd',
    'upload.analyze': 'Analyseer contract',
    'upload.analyzing': 'Bezig met analyseren...',
    'upload.error': 'Fout',
    'upload.rateLimit': 'Te veel aanvragen. Wacht 1-2 minuten.',
    'upload.rateLimitTip': 'Tip: Wacht 1-2 minuten tussen analyses. Voor meer gebruik, vraag hogere limieten aan bij Anthropic.',
    
    // Results
    'results.title': 'Contract Analyse',
    'results.newContract': 'Nieuw contract',
    'results.overallScore': 'Totaalscore',
    'results.type': 'Type',
    'results.critical': 'Kritiek',
    'results.highRisk': 'Hoog risico',
    'results.attention': 'Aandacht',
    'results.positive': 'Positief',
    
    // Severity
    'severity.critical': 'DEALBREAKER',
    'severity.high': 'ERNSTIG',
    'severity.medium': 'AANDACHT',
    'severity.low': 'CHECK',
    
    // Sections
    'section.warnings': 'Aandachtspunten & Waarschuwingen',
    'section.quoteFrom': 'Citaat uit contract:',
    'section.marketComparison': 'Marktvergelijking',
    'section.strongPoints': 'Sterke punten',
    'section.recommendations': 'Aanbevelingen',
    
    // Next Steps
    'nextSteps.title': 'Volgende stappen',
    'nextSteps.1': 'Bespreek alle "kritieke" en "hoog risico" punten met een muziekadvocaat',
    'nextSteps.2': 'Gebruik de aanbevelingen als basis voor onderhandeling',
    'nextSteps.3': 'Vraag verduidelijking bij onduidelijke clausules',
    'nextSteps.4': 'Vergelijk met andere aanbiedingen voor perspectief',
    'nextSteps.5': 'Contacteer PlayRight voor vragen over naburige rechten',
    
    // Disclaimer
    'disclaimer.title': 'Disclaimer',
    'disclaimer.text': 'Deze analyse is bedoeld als educatieve eerste screening en vervangt geen professioneel juridisch advies. Voor belangrijke beslissingen over contracten, raadpleeg altijd een gespecialiseerde muziekadvocaat. De analyse is gebaseerd op algemene marktstandaarden die per situatie kunnen verschillen.',
  },
  
  fr: {
    // Header
    'app.title': 'Analyse de Contrat',
    'language.select': 'Langue',
    
    // Upload
    'upload.title': 'Téléchargez votre contrat',
    'upload.dropzone': 'Cliquez pour sélectionner un PDF (max 10MB)',
    'upload.selected': 'Sélectionné',
    'upload.analyze': 'Analyser le contrat',
    'upload.analyzing': 'Analyse en cours...',
    'upload.error': 'Erreur',
    'upload.rateLimit': 'Trop de requêtes. Attendez 1-2 minutes.',
    'upload.rateLimitTip': 'Conseil: Attendez 1-2 minutes entre les analyses. Pour plus d\'utilisation, demandez des limites plus élevées chez Anthropic.',
    
    // Results
    'results.title': 'Analyse de Contrat',
    'results.newContract': 'Nouveau contrat',
    'results.overallScore': 'Score global',
    'results.type': 'Type',
    'results.critical': 'Critique',
    'results.highRisk': 'Risque élevé',
    'results.attention': 'Attention',
    'results.positive': 'Positif',
    
    // Severity
    'severity.critical': 'DEALBREAKER',
    'severity.high': 'SÉRIEUX',
    'severity.medium': 'ATTENTION',
    'severity.low': 'VÉRIFIER',
    
    // Sections
    'section.warnings': 'Points d\'attention & Avertissements',
    'section.quoteFrom': 'Citation du contrat:',
    'section.marketComparison': 'Comparaison de marché',
    'section.strongPoints': 'Points forts',
    'section.recommendations': 'Recommandations',
    
    // Next Steps
    'nextSteps.title': 'Prochaines étapes',
    'nextSteps.1': 'Discutez de tous les points "critiques" et "à risque élevé" avec un avocat spécialisé en musique',
    'nextSteps.2': 'Utilisez les recommandations comme base de négociation',
    'nextSteps.3': 'Demandez des clarifications sur les clauses ambiguës',
    'nextSteps.4': 'Comparez avec d\'autres offres pour avoir du recul',
    'nextSteps.5': 'Contactez PlayRight pour des questions sur les droits voisins',
    
    // Disclaimer
    'disclaimer.title': 'Avertissement',
    'disclaimer.text': 'Cette analyse est destinée à un premier contrôle éducatif et ne remplace pas un conseil juridique professionnel. Pour des décisions importantes concernant des contrats, consultez toujours un avocat spécialisé en musique. L\'analyse est basée sur des normes de marché générales qui peuvent varier selon la situation.',
  },
  
  en: {
    // Header
    'app.title': 'Contract Analysis',
    'language.select': 'Language',
    
    // Upload
    'upload.title': 'Upload your contract',
    'upload.dropzone': 'Click to select PDF (max 10MB)',
    'upload.selected': 'Selected',
    'upload.analyze': 'Analyze contract',
    'upload.analyzing': 'Analyzing...',
    'upload.error': 'Error',
    'upload.rateLimit': 'Too many requests. Wait 1-2 minutes.',
    'upload.rateLimitTip': 'Tip: Wait 1-2 minutes between analyses. For more usage, request higher limits at Anthropic.',
    
    // Results
    'results.title': 'Contract Analysis',
    'results.newContract': 'New contract',
    'results.overallScore': 'Overall Score',
    'results.type': 'Type',
    'results.critical': 'Critical',
    'results.highRisk': 'High Risk',
    'results.attention': 'Attention',
    'results.positive': 'Positive',
    
    // Severity
    'severity.critical': 'DEALBREAKER',
    'severity.high': 'SERIOUS',
    'severity.medium': 'ATTENTION',
    'severity.low': 'CHECK',
    
    // Sections
    'section.warnings': 'Points of Attention & Warnings',
    'section.quoteFrom': 'Quote from contract:',
    'section.marketComparison': 'Market Comparison',
    'section.strongPoints': 'Strong Points',
    'section.recommendations': 'Recommendations',
    
    // Next Steps
    'nextSteps.title': 'Next Steps',
    'nextSteps.1': 'Discuss all "critical" and "high risk" points with a music lawyer',
    'nextSteps.2': 'Use the recommendations as basis for negotiation',
    'nextSteps.3': 'Ask for clarification on unclear clauses',
    'nextSteps.4': 'Compare with other offers for perspective',
    'nextSteps.5': 'Contact PlayRight for questions about neighboring rights',
    
    // Disclaimer
    'disclaimer.title': 'Disclaimer',
    'disclaimer.text': 'This analysis is intended as an educational first screening and does not replace professional legal advice. For important decisions about contracts, always consult a specialized music lawyer. The analysis is based on general market standards that may vary per situation.',
  },
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('nl')
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['nl']] || key
  }
  
  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}
