'use client'

import { useState, useRef } from 'react'
import { useI18n } from './i18n-context'
import LoadingAnimation from './LoadingAnimation'

interface Props {
  onAnalysisComplete: (analysis: any) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

export default function ContractUploader({ onAnalysisComplete, loading, setLoading }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { t, language } = useI18n()

  const handleAnalyze = async () => {
    if (!file) return
    
    setLoading(true)
    setError('')
    
    try {
      const formData = new FormData()
      formData.append('contract', file)
      formData.append('language', language)
      
      const response = await fetch('/api/analyze-contract', { 
        method: 'POST', 
        body: formData 
      })
      
      if (response.status === 429) {
        const data = await response.json()
        setError(data.message || t('upload.rateLimit'))
        setLoading(false)
        return
      }
      
      if (!response.ok) throw new Error('Analysis failed')
      
      const data = await response.json()
      onAnalysisComplete(data)
    } catch (err: any) {
      setError(err.message || 'Analysis error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading && <LoadingAnimation />}
      
      <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-gray-100">
        {/* Header with icon */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{t('upload.title')}</h2>
            <p className="text-sm text-gray-500">
              {language === 'nl' ? 'Upload je contract voor een professionele analyse' :
               language === 'fr' ? 'Téléchargez votre contrat pour une analyse professionnelle' :
               'Upload your contract for professional analysis'}
            </p>
          </div>
        </div>
      
        {/* Upload zone */}
        <div 
          onClick={() => fileInputRef.current?.click()} 
          className={`border-3 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 ${
            file 
              ? 'border-green-400 bg-green-50 hover:bg-green-100' 
              : 'border-gray-300 bg-gray-50 hover:border-orange-400 hover:bg-orange-50'
          }`}
        >
          <input 
            ref={fileInputRef} 
            type="file" 
            accept=".pdf" 
            onChange={(e) => setFile(e.target.files?.[0] || null)} 
            className="hidden" 
          />
          
          {!file ? (
            <div className="space-y-4">
              {/* Upload icon */}
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center shadow-inner">
                  <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
              </div>
              
              <div>
                <p className="text-lg font-semibold text-gray-700 mb-1">{t('upload.dropzone')}</p>
                <p className="text-sm text-gray-500">PDF, maximum 10MB</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Success icon */}
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center shadow-lg animate-bounce-slow">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <div>
                <p className="text-lg font-bold text-green-700 mb-1">{t('upload.selected')}</p>
                <p className="text-sm text-gray-600 font-medium">{file.name}</p>
                <p className="text-xs text-gray-500 mt-1">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
            <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-red-800 font-semibold">{t('upload.error')}</p>
              <p className="text-red-700 text-sm mt-1">{error}</p>
              {error.includes('Rate limit') && (
                <p className="text-red-600 text-xs mt-2">
                  {t('upload.rateLimitTip')}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Analyze button */}
        <button 
          onClick={handleAnalyze} 
          disabled={!file || loading} 
          className="mt-6 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('upload.analyzing')}
            </>
          ) : (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {t('upload.analyze')}
            </>
          )}
        </button>
      </div>
    </>
  )
}
