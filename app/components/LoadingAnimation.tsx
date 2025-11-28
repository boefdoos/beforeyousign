'use client'

import { useState, useEffect } from 'react'
import { useI18n } from './i18n-context'

export default function LoadingAnimation() {
  const { language } = useI18n()
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const getText = () => {
    switch (language) {
      case 'nl': return 'Aan het onderzoeken'
      case 'fr': return 'Analyse en cours'
      case 'en': return 'Analyzing'
    }
  }

  return (
    <div className="fixed inset-0 bg-[#faf9f7] bg-opacity-95 z-50 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Minimal spinner */}
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 border-2 border-[#e8e6e1] rounded-full"></div>
          <div className="absolute inset-0 border-2 border-[#6c7a89] rounded-full border-t-transparent animate-spin"></div>
        </div>
        
        {/* Text */}
        <p className="text-[#636e72] font-serif">
          {getText()}{dots}
        </p>
      </div>
    </div>
  )
}
