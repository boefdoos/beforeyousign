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
  const [isDragging, setIsDragging] = useState(false)
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
        body: formData,
      })
      
      if (response.status === 429) {
        const data = await response.json()
        setError(data.error || t('upload.rateLimit'))
        setLoading(false)
        return
      }
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Analysis failed')
      }
      
      const data = await response.json()
      
      // Dispatch usage info to monitor component
      if (data.usage) {
        const event = new CustomEvent('api-usage-update', { 
          detail: data.usage 
        })
        window.dispatchEvent(event)
      }
      
      onAnalysisComplete(data)
    } catch (err: any) {
      console.error('Error:', err)
      setError(err.message || 'Analysis error')
    } finally {
      setLoading(false)
    }
  }

  // Drag & Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const droppedFile = files[0]
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile)
        setError('')
      } else {
        setError(language === 'nl' ? 'Alleen PDF bestanden zijn toegestaan' : 
                 language === 'fr' ? 'Seuls les fichiers PDF sont autorisés' :
                 'Only PDF files are allowed')
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setFile(files[0])
      setError('')
    }
  }

  const getDropzoneText = () => {
    switch (language) {
      case 'nl': return 'Sleep je contract hierheen'
      case 'fr': return 'Glissez votre contrat ici'
      case 'en': return 'Drop your contract here'
    }
  }

  const getClickText = () => {
    switch (language) {
      case 'nl': return 'of klik om te kiezen'
      case 'fr': return 'ou cliquez pour choisir'
      case 'en': return 'or click to choose'
    }
  }

  const getAnalyzeText = () => {
    switch (language) {
      case 'nl': return 'Onderzoeken'
      case 'fr': return 'Analyser'
      case 'en': return 'Analyze'
    }
  }

  const getAnalyzingText = () => {
    switch (language) {
      case 'nl': return 'Aan het onderzoeken...'
      case 'fr': return 'Analyse en cours...'
      case 'en': return 'Analyzing...'
    }
  }

  return (
    <>
      {loading && <LoadingAnimation />}
      
      <div className="space-y-8">
        {/* Dropzone */}
        <div 
          onClick={() => fileInputRef.current?.click()} 
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-sm p-16 text-center cursor-pointer
            transition-all duration-300
            ${file 
              ? 'border-[#7fa99b] bg-[#f5f7f6]'
              : isDragging
              ? 'border-[#6c7a89] bg-[#f5f7f8] scale-[1.02]'
              : 'border-[#e8e6e1] hover:border-[#6c7a89] bg-white'
            }
          `}
        >
          <input 
            ref={fileInputRef} 
            type="file" 
            accept=".pdf" 
            onChange={handleFileSelect}
            className="hidden" 
          />
          
          {!file ? (
            <div className="space-y-4">
              <svg 
                className={`w-12 h-12 mx-auto transition-colors ${
                  isDragging ? 'text-[#6c7a89]' : 'text-[#95a5a6]'
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1} 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                />
              </svg>
              <div>
                <p className="text-[#636e72] font-serif">{getDropzoneText()}</p>
                <p className="text-sm text-[#95a5a6] font-serif mt-2">{getClickText()}</p>
              </div>
              <p className="text-xs text-[#95a5a6] font-serif">PDF</p>
            </div>
          ) : (
            <div className="space-y-3">
              <svg 
                className="w-10 h-10 mx-auto text-[#7fa99b]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <p className="text-[#2d3436] font-serif text-sm">{file.name}</p>
              <p className="text-xs text-[#95a5a6] font-serif">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="p-4 bg-[#fdf6f6] border border-[#e8d5d5] rounded-sm">
            <p className="text-sm text-[#b85450] font-serif">{error}</p>
          </div>
        )}

        {/* Analyze button */}
        <button 
          onClick={handleAnalyze} 
          disabled={!file || loading} 
          className="
            w-full py-4 px-6 
            bg-[#6c7a89] hover:bg-[#5a6877] 
            disabled:bg-[#e8e6e1] disabled:cursor-not-allowed
            text-white disabled:text-[#95a5a6]
            font-serif text-sm tracking-wide
            rounded-sm
            transition-colors
          "
        >
          {loading ? getAnalyzingText() : getAnalyzeText()}
        </button>
      </div>
    </>
  )
}
