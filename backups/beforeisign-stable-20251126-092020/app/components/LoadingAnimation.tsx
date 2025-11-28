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
    // Rotate quotes every 3 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 3000)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev
        return prev + Math.random() * 3
      })
    }, 400)

    return () => {
      clearInterval(quoteInterval)
      clearInterval(progressInterval)
    }
  }, [quotes.length])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mb-4 animate-pulse">
            <svg className="w-10 h-10 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {language === 'nl' ? 'Contract wordt geanalyseerd...' : 
             language === 'fr' ? 'Analyse du contrat...' : 
             'Analyzing contract...'}
          </h2>
          <p className="text-gray-600 text-lg mb-4">{quotes[currentQuote]}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-orange-400 to-orange-600 h-4 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
          </div>
        </div>
        
        <p className="text-center text-sm text-gray-500">
          {language === 'nl' ? 'Dit kan 10-30 seconden duren...' : 
           language === 'fr' ? 'Cela peut prendre 10-30 secondes...' : 
           'This may take 10-30 seconds...'}
        </p>
      </div>
    </div>
  )
}
