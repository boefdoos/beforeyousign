'use client'

import { useState, useEffect } from 'react'
import { useI18n } from './i18n-context'

interface UsageStats {
  inputTokens: number
  outputTokens: number
  totalTokens: number
  estimatedCost: number
  requestCount: number
}

export default function ApiCreditsMonitor() {
  const { language } = useI18n()
  const [stats, setStats] = useState<UsageStats | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [sessionTotal, setSessionTotal] = useState<UsageStats>({
    inputTokens: 0,
    outputTokens: 0,
    totalTokens: 0,
    estimatedCost: 0,
    requestCount: 0
  })

  useEffect(() => {
    const handleUsageUpdate = (event: CustomEvent) => {
      const usage = event.detail
      setStats(usage)
      
      setSessionTotal(prev => ({
        inputTokens: prev.inputTokens + usage.inputTokens,
        outputTokens: prev.outputTokens + usage.outputTokens,
        totalTokens: prev.totalTokens + usage.totalTokens,
        estimatedCost: prev.estimatedCost + usage.estimatedCost,
        requestCount: prev.requestCount + 1
      }))
    }

    window.addEventListener('api-usage-update' as any, handleUsageUpdate)
    return () => window.removeEventListener('api-usage-update' as any, handleUsageUpdate)
  }, [])

  const getText = (key: string) => {
    const texts: any = {
      nl: {
        title: 'Credits',
        sessionTotal: 'Sessie',
        totalTokens: 'Tokens',
        estimatedCost: 'Kosten',
        requests: 'Analyses',
        viewConsole: 'Console',
        noRequests: 'Nog geen analyses',
        info: 'Schattingen – check console voor exacte cijfers'
      },
      fr: {
        title: 'Crédits',
        sessionTotal: 'Session',
        totalTokens: 'Jetons',
        estimatedCost: 'Coûts',
        requests: 'Analyses',
        viewConsole: 'Console',
        noRequests: 'Aucune analyse encore',
        info: 'Estimations – vérifiez la console pour les chiffres exacts'
      },
      en: {
        title: 'Credits',
        sessionTotal: 'Session',
        totalTokens: 'Tokens',
        estimatedCost: 'Cost',
        requests: 'Analyses',
        viewConsole: 'Console',
        noRequests: 'No analyses yet',
        info: 'Estimates – check console for exact figures'
      }
    }
    return texts[language]?.[key] || texts.en[key]
  }

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-6 right-6 bg-[#6c7a89] hover:bg-[#5a6877] text-white px-4 py-2 rounded-sm shadow-sm font-serif text-xs transition-colors z-50 flex items-center gap-2"
      >
        {getText('title')}
        {sessionTotal.requestCount > 0 && (
          <span className="text-[#faf9f7] opacity-70">
            {sessionTotal.requestCount}
          </span>
        )}
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 bg-white rounded-sm shadow-lg border border-[#e8e6e1] p-4 w-72 z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-sm text-[#2d3436]">{getText('title')}</h3>
        <button
          onClick={() => setIsExpanded(false)}
          className="text-[#95a5a6] hover:text-[#636e72]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {sessionTotal.requestCount === 0 ? (
        <p className="text-xs text-[#95a5a6] font-serif text-center py-6">
          {getText('noRequests')}
        </p>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-[#636e72] font-serif">{getText('requests')}</span>
              <span className="text-sm text-[#2d3436] font-serif">{sessionTotal.requestCount}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-[#636e72] font-serif">{getText('totalTokens')}</span>
              <span className="text-sm text-[#2d3436] font-serif">{sessionTotal.totalTokens.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-[#636e72] font-serif">{getText('estimatedCost')}</span>
              <span className="text-sm text-[#2d3436] font-serif font-medium">${sessionTotal.estimatedCost.toFixed(3)}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#e8e6e1] space-y-3">
            <p className="text-xs text-[#95a5a6] font-serif italic leading-relaxed">
              {getText('info')}
            </p>
            <a
              href="https://console.anthropic.com/settings/plans"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#6c7a89] hover:bg-[#5a6877] text-white py-2 rounded-sm text-xs font-serif transition-colors"
            >
              {getText('viewConsole')} →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
