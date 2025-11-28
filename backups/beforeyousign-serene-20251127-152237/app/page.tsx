'use client'

import { useState } from 'react'
import { I18nProvider, useI18n } from './components/i18n-context'
import ContractUploader from './components/ContractUploader'
import AnalysisResults from './components/AnalysisResults'
import ApiCreditsMonitor from './components/ApiCreditsMonitor'

function LanguageSelector() {
  const { language, setLanguage } = useI18n()
  
  return (
    <div className="flex gap-3 mb-16">
      <button
        onClick={() => setLanguage('nl')}
        className={`px-3 py-1 text-sm font-serif transition-colors ${
          language === 'nl'
            ? 'text-[#2d3436] border-b-2 border-[#6c7a89]'
            : 'text-[#95a5a6] hover:text-[#636e72]'
        }`}
      >
        NL
      </button>
      <button
        onClick={() => setLanguage('fr')}
        className={`px-3 py-1 text-sm font-serif transition-colors ${
          language === 'fr'
            ? 'text-[#2d3436] border-b-2 border-[#6c7a89]'
            : 'text-[#95a5a6] hover:text-[#636e72]'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-sm font-serif transition-colors ${
          language === 'en'
            ? 'text-[#2d3436] border-b-2 border-[#6c7a89]'
            : 'text-[#95a5a6] hover:text-[#636e72]'
        }`}
      >
        EN
      </button>
    </div>
  )
}

function HomeContent() {
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const { language } = useI18n()

  const getTitle = () => {
    switch (language) {
      case 'nl': return 'voor je tekent'
      case 'fr': return 'avant de signer'
      case 'en': return 'before you sign'
    }
  }

  return (
    <main className="min-h-screen bg-[#faf9f7] py-20 px-6">
      <div className="max-w-2xl mx-auto">
        {!analysis && (
          <header className="mb-16 text-center">
            <h1 className="text-4xl font-serif text-[#2d3436] mb-3 tracking-tight">
              {getTitle()}
            </h1>
            <p className="text-sm text-[#636e72] font-serif italic">
              beforeyousign.be
            </p>
          </header>
        )}

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
      </div>

      <ApiCreditsMonitor />
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
