'use client'

import { useI18n } from './i18n-context'

interface Props {
  analysis: any
}

export default function PdfExportButton({ analysis }: Props) {
  const { language } = useI18n()
  
  const getButtonText = () => {
    switch (language) {
      case 'nl': return 'Bewaar als PDF'
      case 'fr': return 'Enregistrer en PDF'
      case 'en': return 'Save as PDF'
    }
  }

  const exportToPdf = async () => {
    const jsPDF = (await import('jspdf')).default
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    try {
      const pageWidth = 210
      const pageHeight = 297
      const margin = 25
      const contentWidth = pageWidth - (2 * margin)
      const maxY = pageHeight - margin - 20 // Reserve 20mm for footer
      let yPosition = margin
      
      const colors = {
        paper: [250, 249, 247],
        ink: [45, 52, 54],
        inkLight: [99, 110, 114],
        accent: [108, 122, 137],
        accentSoft: [149, 165, 166],
        border: [232, 230, 225],
        criticalBg: [253, 246, 246],
        criticalBorder: [184, 84, 80],
        warningBg: [253, 249, 245],
        warningBorder: [212, 165, 116],
        minorBg: [245, 247, 248],
        minorBorder: [108, 122, 137],
        greenSoft: [127, 169, 155]
      }
      
      const getSeverityColors = (severity: string) => {
        switch (severity?.toLowerCase()) {
          case 'critical':
            return { bg: colors.criticalBg, border: colors.criticalBorder, text: colors.criticalBorder }
          case 'warning':
            return { bg: colors.warningBg, border: colors.warningBorder, text: colors.warningBorder }
          case 'minor':
            return { bg: colors.minorBg, border: colors.minorBorder, text: colors.minorBorder }
          default:
            return { bg: colors.paper, border: colors.accentSoft, text: colors.inkLight }
        }
      }
      
      const addNewPage = () => {
        pdf.addPage()
        pdf.setFillColor(colors.paper[0], colors.paper[1], colors.paper[2])
        pdf.rect(0, 0, pageWidth, pageHeight, 'F')
        yPosition = margin
      }
      
      const checkPageBreak = (heightNeeded: number, force: boolean = false) => {
        if (yPosition + heightNeeded > maxY || force) {
          addNewPage()
          return true
        }
        return false
      }
      
      // Set initial page background
      pdf.setFillColor(colors.paper[0], colors.paper[1], colors.paper[2])
      pdf.rect(0, 0, pageWidth, pageHeight, 'F')
      
      // Header
      pdf.setFontSize(9)
      pdf.setFont('times', 'italic')
      pdf.setTextColor(colors.inkLight[0], colors.inkLight[1], colors.inkLight[2])
      pdf.text('beforeyousign.be', margin, yPosition)
      yPosition += 18
      
      // Score
      pdf.setTextColor(colors.ink[0], colors.ink[1], colors.ink[2])
      pdf.setFontSize(48)
      pdf.setFont('times', 'normal')
      const scoreText = `${(analysis.overallScore / 10).toFixed(1)}`
      pdf.text(scoreText, margin, yPosition)
      
      const scoreWidth = pdf.getTextWidth(scoreText)
      pdf.setFontSize(24)
      pdf.setTextColor(colors.accentSoft[0], colors.accentSoft[1], colors.accentSoft[2])
      pdf.text('/10', margin + scoreWidth + 3, yPosition)
      yPosition += 16
      
      // Contract type
      if (analysis.contractType) {
        pdf.setFontSize(11)
        pdf.setTextColor(colors.inkLight[0], colors.inkLight[1], colors.inkLight[2])
        pdf.setFont('times', 'italic')
        pdf.text(analysis.contractType, margin, yPosition)
        yPosition += 10
      }
      
      // Divider
      yPosition += 2
      pdf.setDrawColor(colors.border[0], colors.border[1], colors.border[2])
      pdf.setLineWidth(0.3)
      pdf.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 10
      
      // Summary
      if (analysis.summary) {
        pdf.setFontSize(11)
        pdf.setFont('times', 'normal')
        pdf.setTextColor(colors.ink[0], colors.ink[1], colors.ink[2])
        
        const summaryLines = pdf.splitTextToSize(analysis.summary, contentWidth)
        for (const line of summaryLines) {
          checkPageBreak(6)
          pdf.text(line, margin, yPosition)
          yPosition += 6
        }
        yPosition += 10
      }
      
      // Red Flags
      if (analysis.redFlags && analysis.redFlags.length > 0) {
        // Check if we should start on new page for red flags section
        const estimatedFirstBoxHeight = 50 // Rough estimate
        if (yPosition + estimatedFirstBoxHeight > maxY - 30) {
          addNewPage()
        }
        
        yPosition += 2
        
        const headers: any = {
          nl: 'AANDACHTSPUNTEN',
          fr: 'POINTS D\'ATTENTION',
          en: 'POINTS OF ATTENTION'
        }
        
        pdf.setFontSize(9)
        pdf.setTextColor(colors.inkLight[0], colors.inkLight[1], colors.inkLight[2])
        pdf.setFont('times', 'normal')
        pdf.text(headers[language] || headers.en, margin, yPosition)
        yPosition += 12
        
        for (let i = 0; i < analysis.redFlags.length; i++) {
          const flag = analysis.redFlags[i]
          const boxColors = getSeverityColors(flag.severity)
          
          // Pre-calculate all content
          pdf.setFont('times', 'normal')
          pdf.setFontSize(10)
          const categoryLines = pdf.splitTextToSize(flag.category, contentWidth - 10)
          
          pdf.setFont('times', 'bold')
          pdf.setFontSize(11)
          const issueLines = pdf.splitTextToSize(flag.issue, contentWidth - 10)
          
          pdf.setFont('times', 'normal')
          pdf.setFontSize(10)
          const explanationLines = pdf.splitTextToSize(flag.explanation, contentWidth - 10)
          
          const recLines = flag.recommendation 
            ? pdf.splitTextToSize(flag.recommendation, contentWidth - 14) 
            : []
          
          // Calculate exact box height
          const boxHeight = 
            8 + // top padding
            (categoryLines.length * 5.5) +
            (issueLines.length * 5.5) +
            2 + // spacing after issue
            (explanationLines.length * 5) +
            (recLines.length > 0 ? (recLines.length * 5) + 12 : 0) +
            8 // bottom padding
          
          // Only break if box really doesn't fit
          if (yPosition + boxHeight > maxY) {
            addNewPage()
          }
          
          const boxStartY = yPosition
          
          // Draw box
          pdf.setFillColor(boxColors.bg[0], boxColors.bg[1], boxColors.bg[2])
          pdf.roundedRect(margin, yPosition, contentWidth, boxHeight, 2, 2, 'F')
          
          pdf.setDrawColor(boxColors.border[0], boxColors.border[1], boxColors.border[2])
          pdf.setLineWidth(1)
          pdf.line(margin, yPosition, margin, yPosition + boxHeight)
          
          // Severity label
          pdf.setFontSize(8)
          pdf.setFont('times', 'normal')
          pdf.setTextColor(boxColors.text[0], boxColors.text[1], boxColors.text[2])
          const severityText = flag.severity.toUpperCase()
          const severityWidth = pdf.getTextWidth(severityText)
          pdf.text(severityText, pageWidth - margin - severityWidth - 5, yPosition + 7)
          
          yPosition += 8
          
          // Category
          pdf.setFontSize(10)
          pdf.setFont('times', 'normal')
          pdf.setTextColor(boxColors.text[0], boxColors.text[1], boxColors.text[2])
          for (const line of categoryLines) {
            pdf.text(line, margin + 5, yPosition)
            yPosition += 5.5
          }
          
          // Issue
          pdf.setFontSize(11)
          pdf.setFont('times', 'bold')
          pdf.setTextColor(colors.ink[0], colors.ink[1], colors.ink[2])
          for (const line of issueLines) {
            pdf.text(line, margin + 5, yPosition)
            yPosition += 5.5
          }
          
          yPosition += 2
          
          // Explanation
          pdf.setFontSize(10)
          pdf.setFont('times', 'normal')
          pdf.setTextColor(colors.inkLight[0], colors.inkLight[1], colors.inkLight[2])
          for (const line of explanationLines) {
            pdf.text(line, margin + 5, yPosition)
            yPosition += 5
          }
          
          // Recommendation
          if (recLines.length > 0) {
            yPosition += 5
            
            const recBoxHeight = (recLines.length * 5) + 8
            
            pdf.setFillColor(255, 255, 255)
            pdf.roundedRect(margin + 5, yPosition - 3, contentWidth - 10, recBoxHeight, 1, 1, 'F')
            
            pdf.setDrawColor(colors.border[0], colors.border[1], colors.border[2])
            pdf.setLineWidth(0.2)
            pdf.roundedRect(margin + 5, yPosition - 3, contentWidth - 10, recBoxHeight, 1, 1, 'S')
            
            yPosition += 1
            
            pdf.setFontSize(10)
            pdf.setFont('times', 'italic')
            pdf.setTextColor(colors.ink[0], colors.ink[1], colors.ink[2])
            for (const line of recLines) {
              pdf.text(line, margin + 7, yPosition)
              yPosition += 5
            }
            yPosition += 3
          }
          
          yPosition = boxStartY + boxHeight + 8
        }
        
        yPosition += 4
      }
      
      // Positive Points
      if (analysis.positivePoints && analysis.positivePoints.length > 0) {
        // Estimate total height needed
        const estimatedHeight = analysis.positivePoints.length * 12 + 20
        if (yPosition + estimatedHeight > maxY - 20) {
          addNewPage()
        }
        
        yPosition += 2
        
        const headers: any = {
          nl: 'STERKE PUNTEN',
          fr: 'POINTS FORTS',
          en: 'POSITIVE POINTS'
        }
        
        pdf.setFontSize(9)
        pdf.setTextColor(colors.inkLight[0], colors.inkLight[1], colors.inkLight[2])
        pdf.setFont('times', 'normal')
        pdf.text(headers[language] || headers.en, margin, yPosition)
        yPosition += 12
        
        pdf.setFontSize(10)
        pdf.setFont('times', 'normal')
        
        for (const point of analysis.positivePoints) {
          const lines = pdf.splitTextToSize(point, contentWidth - 10)
          const neededHeight = lines.length * 5.5 + 3
          
          if (yPosition + neededHeight > maxY) {
            addNewPage()
          }
          
          pdf.setTextColor(colors.greenSoft[0], colors.greenSoft[1], colors.greenSoft[2])
          pdf.text('✓', margin, yPosition)
          
          pdf.setTextColor(colors.ink[0], colors.ink[1], colors.ink[2])
          for (const line of lines) {
            pdf.text(line, margin + 7, yPosition)
            yPosition += 5.5
          }
          yPosition += 3
        }
        
        yPosition += 4
      }
      
      // Recommendations
      if (analysis.recommendations && analysis.recommendations.length > 0) {
        // Estimate total height needed
        const estimatedHeight = analysis.recommendations.length * 15 + 20
        if (yPosition + estimatedHeight > maxY - 20) {
          addNewPage()
        }
        
        yPosition += 2
        
        const headers: any = {
          nl: 'AANBEVELINGEN',
          fr: 'RECOMMANDATIONS',
          en: 'RECOMMENDATIONS'
        }
        
        pdf.setFontSize(9)
        pdf.setTextColor(colors.inkLight[0], colors.inkLight[1], colors.inkLight[2])
        pdf.setFont('times', 'normal')
        pdf.text(headers[language] || headers.en, margin, yPosition)
        yPosition += 12
        
        pdf.setFontSize(10)
        pdf.setFont('times', 'normal')
        pdf.setTextColor(colors.ink[0], colors.ink[1], colors.ink[2])
        
        for (let i = 0; i < analysis.recommendations.length; i++) {
          const recText = `${i + 1}. ${analysis.recommendations[i]}`
          const lines = pdf.splitTextToSize(recText, contentWidth - 2)
          const neededHeight = lines.length * 5.5 + 3
          
          if (yPosition + neededHeight > maxY) {
            addNewPage()
          }
          
          for (const line of lines) {
            pdf.text(line, margin, yPosition)
            yPosition += 5.5
          }
          yPosition += 3
        }
      }
      
      // Footer on all pages
      const totalPages = (pdf as any).internal.getNumberOfPages()
      const footerY = pageHeight - margin + 5
      
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i)
        
        pdf.setDrawColor(colors.border[0], colors.border[1], colors.border[2])
        pdf.setLineWidth(0.3)
        pdf.line(margin, footerY - 3, pageWidth - margin, footerY - 3)
        
        pdf.setFontSize(8)
        pdf.setTextColor(colors.accentSoft[0], colors.accentSoft[1], colors.accentSoft[2])
        pdf.setFont('times', 'italic')
        
        pdf.text('beforeyousign.be', pageWidth / 2, footerY + 2, { align: 'center' })
        pdf.text(`${i} / ${totalPages}`, pageWidth - margin, footerY + 2, { align: 'right' })
      }
      
      const filename = `contract-analysis-${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(filename)
      
    } catch (error) {
      console.error('PDF generation error:', error)
      const errorMsg = language === 'nl' 
        ? 'Er ging iets mis bij het maken van de PDF.'
        : language === 'fr'
        ? 'Une erreur s\'est produite lors de la création du PDF.'
        : 'Something went wrong creating the PDF.'
      alert(errorMsg)
    }
  }
  
  return (
    <button
      onClick={exportToPdf}
      className="
        px-6 py-3
        bg-[#6c7a89] hover:bg-[#5a6877]
        text-white
        font-serif text-sm
        rounded-sm
        transition-colors
        flex items-center gap-2
      "
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      {getButtonText()}
    </button>
  )
}
