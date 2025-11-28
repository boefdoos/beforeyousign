'use client'

import { useState } from 'react'
import { I18nProvider, useI18n } from './components/i18n-context'
import ContractUploader from './components/ContractUploader'
import AnalysisResults from './components/AnalysisResults'

function LanguageSelector() {
  const { language, setLanguage } = useI18n()
  
  return (
    <div className="flex gap-2 justify-center mb-8">
      <button
        onClick={() => setLanguage('nl')}
        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
          language === 'nl'
            ? 'bg-orange-500 text-white shadow-lg'
            : 'bg-white text-gray-700 hover:bg-orange-50 border-2 border-gray-200'
        }`}
      >
        🇳🇱 NL
      </button>
      <button
        onClick={() => setLanguage('fr')}
        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
          language === 'fr'
            ? 'bg-orange-500 text-white shadow-lg'
            : 'bg-white text-gray-700 hover:bg-orange-50 border-2 border-gray-200'
        }`}
      >
        🇫🇷 FR
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
          language === 'en'
            ? 'bg-orange-500 text-white shadow-lg'
            : 'bg-white text-gray-700 hover:bg-orange-50 border-2 border-gray-200'
        }`}
      >
        🇬🇧 EN
      </button>
    </div>
  )
}

function HomeContent() {
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const { language } = useI18n()

  const getTitle = () => {
    return 'BeforeISign.be'
  }

  const getSubtitle = () => {
    switch (language) {
      case 'nl': return 'Professionele muziekcontract analyse powered by AI'
      case 'fr': return 'Analyse professionnelle de contrats musicaux par IA'
      case 'en': return 'Professional music contract analysis powered by AI'
    }
  }

  const getStandards = () => {
    switch (language) {
      case 'nl': return 'Belgische muziekindustrie standaarden • PlayRight • SABAM'
      case 'fr': return 'Standards de l\'industrie musicale belge • PlayRight • SABAM'
      case 'en': return 'Belgian music industry standards • PlayRight • SABAM'
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-lg mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {getTitle()}
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            {getSubtitle()}
          </p>
          <p className="text-sm text-gray-500">
            {getStandards()}
          </p>
        </header>

        {/* Only show language selector when NOT showing results */}
        {!analysis && <LanguageSelector />}

        {!analysis ? (
          <ContractUploader 
            onAnalysisComplete={setAnalysis}
            loading={loading}
            setLoading={setLoading}
          />
        ) : (
          <AnalysisResults 
            analysis={analysis}
            onReset={() => setAnalysis(null)}
          />
        )}

        <footer className="text-center mt-12 text-sm text-gray-500">
          <p>
            {language === 'nl' ? '⚠️ Educatieve tool - geen juridisch advies' :
             language === 'fr' ? '⚠️ Outil éducatif - pas de conseil juridique' :
             '⚠️ Educational tool - not legal advice'}
          </p>
          <p className="mt-2">
            {language === 'nl' ? 'Raadpleeg altijd een muziekadvocaat voor belangrijke beslissingen' :
             language === 'fr' ? 'Consultez toujours un avocat musical pour les décisions importantes' :
             'Always consult a music lawyer for important decisions'}
          </p>
        </footer>
      </div>
    </main>
  )
}

export default function Home() {
  return (
    <I18nProvider>
      <HomeContent />
    </I18nProvider>
  )
}
