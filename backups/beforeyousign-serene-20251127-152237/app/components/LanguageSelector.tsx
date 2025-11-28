'use client'

import { useI18n } from './i18n-context'

type LanguageCode = 'nl' | 'fr' | 'en'

export default function LanguageSelector() {
  const { language, setLanguage, t } = useI18n()
  
  const languages: { code: LanguageCode; label: string }[] = [
    { code: 'nl', label: 'NL' },
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
  ]
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 font-medium">{t('language.select')}:</span>
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
              language === lang.code
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  )
}

