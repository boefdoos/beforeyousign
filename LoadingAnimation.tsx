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

const triviaQuestions = {
  nl: [
    {
      question: "Wat is een standaard booking agent commissie?",
      answers: ["5%", "10-15%", "25%", "50%"],
      correct: 1,
      explanation: "10-15% is standaard, en komt BOVENOP de artist fee!"
    },
    {
      question: "Wat zijn 'naburige rechten'?",
      answers: ["Rechten van je buren", "Rechten van uitvoerende kunstenaars", "Rechten van componisten", "Geen idee"],
      correct: 1,
      explanation: "Naburige rechten zijn de rechten van uitvoerende kunstenaars (zangers, muzikanten) - PlayRight beheert deze!"
    },
    {
      question: "Wat is een '360 deal'?",
      answers: ["Een complete draai maken", "Label verdient aan ALLES", "Een ronde tafel vergadering", "Een tournee"],
      correct: 1,
      explanation: "Bij een 360 deal verdient het label aan alle inkomsten (merch, touring, sync, etc.) - niet alleen muziek!"
    },
    {
      question: "Wie beheert auteursrechten in België?",
      answers: ["PlayRight", "SABAM", "Spotify", "De overheid"],
      correct: 1,
      explanation: "SABAM beheert auteursrechten (componisten), PlayRight beheert naburige rechten (uitvoerders)!"
    },
    {
      question: "Wat is 'recoupment' in een deal?",
      answers: ["Een bonus", "Kosten terugverdienen", "Een clausule", "Een feestje"],
      correct: 1,
      explanation: "Recoupment betekent dat je label eerst alle kosten terugverdient voordat JIJ iets krijgt. Let op!"
    }
  ],
  fr: [
    {
      question: "Quelle est la commission standard d'un booking agent?",
      answers: ["5%", "10-15%", "25%", "50%"],
      correct: 1,
      explanation: "10-15% est standard, et vient EN PLUS du cachet de l'artiste!"
    },
    {
      question: "Que sont les 'droits voisins'?",
      answers: ["Droits des voisins", "Droits des interprètes", "Droits des compositeurs", "Aucune idée"],
      correct: 1,
      explanation: "Les droits voisins sont les droits des artistes interprèes (chanteurs, musiciens) - PlayRight les gère!"
    },
    {
      question: "Qu'est-ce qu'un 'deal 360'?",
      answers: ["Faire un tour complet", "Le label gagne sur TOUT", "Une réunion", "Une tournée"],
      correct: 1,
      explanation: "Dans un deal 360, le label gagne sur tous les revenus (merch, tournées, sync, etc.) - pas seulement la musique!"
    },
    {
      question: "Qui gère les droits d'auteur en Belgique?",
      answers: ["PlayRight", "SABAM", "Spotify", "Le gouvernement"],
      correct: 1,
      explanation: "SABAM gère les droits d'auteur (compositeurs), PlayRight gère les droits voisins (interprètes)!"
    },
    {
      question: "Qu'est-ce que le 'recoupment' dans un deal?",
      answers: ["Un bonus", "Récupérer les coûts", "Une clause", "Une fête"],
      correct: 1,
      explanation: "Recoupment signifie que le label récupère d'abord tous les coûts avant que VOUS gagniez quoi que ce soit. Attention!"
    }
  ],
  en: [
    {
      question: "What's a standard booking agent commission?",
      answers: ["5%", "10-15%", "25%", "50%"],
      correct: 1,
      explanation: "10-15% is standard, and comes ON TOP of the artist fee!"
    },
    {
      question: "What are 'neighboring rights'?",
      answers: ["Rights of neighbors", "Rights of performers", "Rights of composers", "No clue"],
      correct: 1,
      explanation: "Neighboring rights are the rights of performing artists (singers, musicians) - PlayRight manages these!"
    },
    {
      question: "What's a '360 deal'?",
      answers: ["Making a full turn", "Label earns from EVERYTHING", "A round table meeting", "A tour"],
      correct: 1,
      explanation: "In a 360 deal, the label earns from all income (merch, touring, sync, etc.) - not just music!"
    },
    {
      question: "Who manages copyrights in Belgium?",
      answers: ["PlayRight", "SABAM", "Spotify", "The government"],
      correct: 1,
      explanation: "SABAM manages copyrights (composers), PlayRight manages neighboring rights (performers)!"
    },
    {
      question: "What is 'recoupment' in a deal?",
      answers: ["A bonus", "Recovering costs", "A clause", "A party"],
      correct: 1,
      explanation: "Recoupment means the label first recovers all costs before YOU earn anything. Watch out!"
    }
  ]
}

export default function LoadingAnimation() {
  const { language } = useI18n()
  const [currentQuote, setCurrentQuote] = useState(0)
  const [progress, setProgress] = useState(0)
  
  // Trivia game state
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  
  const quotes = loadingQuotes[language]
  const questions = triviaQuestions[language]
  
  // Shuffle function - randomizes answer order
  const shuffleAnswers = (q: any) => {
    const correctAnswer = q.answers[q.correct]
    const shuffled = [...q.answers].sort(() => Math.random() - 0.5)
    return {
      ...q,
      answers: shuffled,
      correct: shuffled.indexOf(correctAnswer)
    }
  }
  
  // Shuffled question state
  const [shuffledQuestion, setShuffledQuestion] = useState(() => shuffleAnswers(questions[0]))

  // Update shuffled question when changing questions or language
  useEffect(() => {
    setShuffledQuestion(shuffleAnswers(questions[currentQuestion]))
    setSelectedAnswer(null)
    setShowExplanation(false)
  }, [currentQuestion, language, questions])

  useEffect(() => {
    // Rotate quotes every 4 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 4000)

    // Simulate progress (but it's actually waiting for API)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev // Don't go to 100%
        return prev + Math.random() * 2
      })
    }, 500)

    return () => {
      clearInterval(quoteInterval)
      clearInterval(progressInterval)
    }
  }, [quotes.length])

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return // Already answered
    
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
    
    if (answerIndex === shuffledQuestion.correct) {
      setScore(score + 1)
    }
    
    // Auto-advance to next question after 4 seconds
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setCurrentQuestion(0) // Loop back to first question
        setScore(0) // Reset score
      }
    }, 4000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mb-4 animate-pulse">
            <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {language === 'nl' ? 'Contract wordt geanalyseerd...' : 
             language === 'fr' ? 'Analyse du contrat...' : 
             'Analyzing contract...'}
          </h2>
          <p className="text-gray-600 mb-4">{quotes[currentQuote]}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Trivia Game */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              {language === 'nl' ? '🎯 Muziekrechten Quiz' : 
               language === 'fr' ? '🎯 Quiz Droits Musicaux' : 
               '🎯 Music Rights Quiz'}
            </h3>
            <span className="text-sm font-semibold text-orange-600">
              {language === 'nl' ? `Score: ${score}/${questions.length}` : 
               language === 'fr' ? `Score: ${score}/${questions.length}` : 
               `Score: ${score}/${questions.length}`}
            </span>
          </div>
          
          <p className="text-gray-800 font-semibold mb-4">{shuffledQuestion.question}</p>
          
          <div className="space-y-2">
            {shuffledQuestion.answers.map((answer: string, index: number) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                  selectedAnswer === null
                    ? 'bg-white hover:bg-orange-50 border-2 border-gray-200 hover:border-orange-300'
                    : index === shuffledQuestion.correct
                    ? 'bg-green-100 border-2 border-green-400 text-green-800'
                    : selectedAnswer === index
                    ? 'bg-red-100 border-2 border-red-400 text-red-800'
                    : 'bg-gray-100 border-2 border-gray-200 text-gray-500'
                }`}
              >
                {answer}
              </button>
            ))}
          </div>
          
          {showExplanation && (
            <div className="mt-4 p-4 bg-white rounded-lg border-2 border-orange-300 animate-fadeIn">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-orange-600">
                  {selectedAnswer === shuffledQuestion.correct ? '✅ Correct!' : '❌ Onjuist'}
                </span>
                <br />
                {shuffledQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Fun fact */}
        <p className="text-center text-xs text-gray-500">
          {language === 'nl' ? '💡 Tip: Deze quiz helpt je de analyse beter te begrijpen!' : 
           language === 'fr' ? '💡 Conseil: Ce quiz vous aide à mieux comprendre l\'analyse!' : 
           '💡 Tip: This quiz helps you understand the analysis better!'}
        </p>
      </div>
    </div>
  )
}
