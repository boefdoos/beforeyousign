'use client'

import { useI18n } from './i18n-context'
import PdfExportButton from './PdfExportButton'

interface Props {
  analysis: any
  onReset: () => void
}

export default function AnalysisResults({ analysis, onReset }: Props) {
  const { t, language } = useI18n()

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'text-[#b85450]'
      case 'warning': return 'text-[#d4a574]'
      case 'minor': return 'text-[#6c7a89]'
      default: return 'text-[#636e72]'
    }
  }

  const getSeverityBg = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'bg-[#fdf6f6] border-[#e8d5d5]'
      case 'warning': return 'bg-[#fdf9f5] border-[#e8e0d5]'
      case 'minor': return 'bg-[#f5f7f8] border-[#dde3e6]'
      default: return 'bg-[#faf9f7] border-[#e8e6e1]'
    }
  }

  const getNewDocText = () => {
    switch (language) {
      case 'nl': return 'Nieuw contract'
      case 'fr': return 'Nouveau contrat'
      case 'en': return 'New contract'
    }
  }

  return (
    <div className="space-y-12">
      {/* Header with score */}
      <div className="space-y-6">
        <div className="flex items-baseline gap-3">
          <div className="text-5xl font-serif text-[#2d3436] tracking-tight">
            {(analysis.overallScore / 10).toFixed(1)}
          </div>
          <div className="text-xl text-[#95a5a6] font-serif">/10</div>
        </div>
        
        {analysis.contractType && (
          <p className="text-sm text-[#636e72] font-serif italic">
            {analysis.contractType}
          </p>
        )}
      </div>

      {/* Summary */}
      {analysis.summary && (
        <div className="space-y-3">
          <p className="text-[#2d3436] font-serif leading-relaxed">
            {analysis.summary}
          </p>
        </div>
      )}

      {/* Red Flags */}
      {analysis.redFlags && analysis.redFlags.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-wider text-[#636e72] font-serif">
            {t('results.redFlags')}
          </h2>
          
          <div className="space-y-4">
            {analysis.redFlags.map((flag: any, idx: number) => (
              <div 
                key={idx} 
                className={`p-6 border rounded-sm ${getSeverityBg(flag.severity)}`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className={`font-serif ${getSeverityColor(flag.severity)}`}>
                      {flag.category}
                    </h3>
                    <span className={`text-xs uppercase tracking-wider ${getSeverityColor(flag.severity)}`}>
                      {flag.severity}
                    </span>
                  </div>
                  
                  <p className="font-serif text-[#2d3436] font-medium">
                    {flag.issue}
                  </p>
                  
                  <p className="text-sm text-[#636e72] font-serif leading-relaxed">
                    {flag.explanation}
                  </p>
                  
                  {flag.recommendation && (
                    <div className="pt-3 mt-3 border-t border-[#e8e6e1]">
                      <p className="text-sm text-[#2d3436] font-serif italic">
                        {flag.recommendation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Positive Points */}
      {analysis.positivePoints && analysis.positivePoints.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-wider text-[#636e72] font-serif">
            {t('results.positivePoints')}
          </h2>
          
          <div className="space-y-2">
            {analysis.positivePoints.map((point: string, idx: number) => (
              <div key={idx} className="flex gap-3">
                <span className="text-[#7fa99b] mt-1">✓</span>
                <p className="text-sm text-[#2d3436] font-serif flex-1">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-wider text-[#636e72] font-serif">
            {t('results.recommendations')}
          </h2>
          
          <div className="space-y-3">
            {analysis.recommendations.map((rec: string, idx: number) => (
              <p key={idx} className="text-sm text-[#2d3436] font-serif leading-relaxed pl-6 relative">
                <span className="absolute left-0 text-[#95a5a6]">{idx + 1}.</span>
                {rec}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4 pt-8 border-t border-[#e8e6e1]">
        <PdfExportButton analysis={analysis} />
        
        <button
          onClick={onReset}
          className="
            px-6 py-3
            text-[#636e72] hover:text-[#2d3436]
            font-serif text-sm
            border border-[#e8e6e1] hover:border-[#6c7a89]
            rounded-sm
            transition-colors
          "
        >
          {getNewDocText()}
        </button>
      </div>

      {/* Disclaimer */}
      <div className="pt-8 border-t border-[#e8e6e1]">
        <p className="text-xs text-[#95a5a6] font-serif italic leading-relaxed">
          {t('disclaimer.text')}
        </p>
      </div>
    </div>
  )
}
