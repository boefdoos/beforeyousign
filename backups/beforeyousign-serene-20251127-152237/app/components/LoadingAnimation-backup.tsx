'use client'

import { useState, useEffect } from 'react'
import { useI18n } from './i18n-context'

const loadingQuotes = {
  nl: [
    "Royalties checken... 💰",
    "Naburige rechten nakijken... 🎵",
    "Contract clausules ontcijferen... 🔍",
    "Rode vlaggen zoeken... 🚩",
    "Muziekadvocaat mode: ACTIEF ⚖️",
    "360-deals vermijden... 🎯",
    "Billijke vergoeding berekenen... 🧮",
    "PlayRight consulteren... 📞",
    "Kleine lettertjes lezen... 👓",
    "Masterrechten beschermen... 🛡️",
  ],
  fr: [
    "Vérification des royalties... 💰",
    "Contrôle des droits voisins... 🎵",
    "Décryptage des clauses... 🔍",
    "Recherche de drapeaux rouges... 🚩",
    "Mode avocat musical: ACTIF ⚖️",
    "Éviter les deals 360... 🎯",
    "Calcul rémunération équitable... 🧮",
    "Consultation PlayRight... 📞",
    "Lecture des petits caractères... 👓",
    "Protection des masters... 🛡️",
  ],
  en: [
    "Checking royalties... 💰",
    "Reviewing neighboring rights... 🎵",
    "Decoding contract clauses... 🔍",
    "Hunting for red flags... 🚩",
    "Music lawyer mode: ACTIVE ⚖️",
    "Avoiding 360 deals... 🎯",
    "Calculating fair compensation... 🧮",
    "Consulting PlayRight... 📞",
    "Reading the fine print... 👓",
    "Protecting masters... 🛡️",
  ],
}

export default function LoadingAnimation() {
  const { language } = useI18n()
  const [currentQuote, setCurrentQuote] = useState(0)
  const [progress, setProgress] = useState(0)
  
  const quotes = loadingQuotes[language]

  useEffect(() => {
    // Rotate quotes every 2 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 2000)

    // Simulate progress (but it's actually waiting for API)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev // Don't go to 100%
        return prev + Math.random() * 3
      })
    }, 300)

    return () => {
      clearInterval(quoteInterval)
      clearInterval(progressInterval)
    }
  }, [quotes.length])

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        {/* Animated music note */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Bouncing notes */}
            <svg 
              className="w-16 h-16 text-orange-500 animate-bounce" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
            
            {/* Pulsing circle */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-400 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-center mb-2 text-gray-900">
          {language === 'nl' ? 'Contract analyseren...' :
           language === 'fr' ? 'Analyse du contrat...' :
           'Analyzing contract...'}
        </h3>

        {/* Rotating quote */}
        <p className="text-center text-gray-600 mb-6 h-6 transition-all duration-300">
          {quotes[currentQuote]}
        </p>

        {/* Progress bar */}
        <div className="relative mb-4">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
          
          {/* Percentage */}
          <div className="text-center mt-2 text-sm font-semibold text-orange-600">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Fun fact */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-xs text-orange-800">
          <span className="font-semibold">
            {language === 'nl' ? '💡 Wist je dat? ' :
             language === 'fr' ? '💡 Le saviez-vous? ' :
             '💡 Did you know? '}
          </span>
          {language === 'nl' ? 'Gemiddeld duurt het 2-3 jaar voordat een artist break-even gaat met een label deal.' :
           language === 'fr' ? 'En moyenne, il faut 2-3 ans avant qu\'un artiste atteigne le seuil de rentabilité avec un label.' :
           'On average, it takes 2-3 years for an artist to break even with a label deal.'}
        </div>
      </div>
    </div>
  )
}
