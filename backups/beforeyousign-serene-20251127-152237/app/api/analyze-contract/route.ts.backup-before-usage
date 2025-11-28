import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Belgian music industry knowledge
const MUSIC_INDUSTRY_KNOWLEDGE = `CRITICAL BELGIAN MUSIC INDUSTRY STANDARDS:
- Standard booking agent commission: 10-15% paid ON TOP of artist fee by promoter
- Only flag as problematic if: commission deducted FROM artist fee, OR commission >20%, OR unclear payment structure
- Management commission: 15-20% is standard and fair
- PlayRight handles neighboring rights (uitvoerende kunstenaars)
- SABAM handles author rights (componisten)
- 15% booking commission is NORMAL and should NOT be flagged

SCORING RUBRIC (100 points total - always use same criteria):
1. Rights Retention (25 points): Master ownership, exploitation rights, territory
2. Financial Terms (25 points): Royalty rates, advances, recoupment terms
3. Duration & Termination (20 points): Contract length, exit clauses, renewal terms
4. Obligations & Restrictions (15 points): Exclusivity, delivery commitments, creative control
5. Transparency & Fairness (15 points): Accounting, audit rights, payment terms

Score objectively first, then translate explanations. Same contract = same score regardless of language.`

function getAnalysisPrompt(language: string) {
  const prompts = {
    nl: `Je bent een expert in muziekcontracten en naburige rechten in België.

BELANGRIJKE INSTRUCTIES:
1. Analyseer het contract EERST objectief volgens de 100-punten rubric
2. Vertaal DAARNA je bevindingen naar het Nederlands
3. Gebruik ALTIJD dezelfde criteria - hetzelfde contract moet dezelfde score krijgen
4. Gebruik temperatuur 0 voor consistente analyses

Geef een JSON response met exact deze structuur:
{
  "overallScore": 0-100 (gebruik de 5-delige rubric),
  "summary": "2-3 zinnen samenvatting",
  "contractType": "Label Deal / Management / Booking / etc.",
  "redFlags": [
    {
      "severity": "critical" | "warning" | "minor",
      "category": "Rechten" | "Financiën" | "Duur" | "Verplichtingen" | "Transparantie",
      "issue": "Korte beschrijving probleem",
      "explanation": "Gedetailleerde uitleg",
      "recommendation": "Specifiek advies"
    }
  ],
  "positivePoints": ["punt 1", "punt 2", ...],
  "recommendations": ["advies 1", "advies 2", ...],
  "marketComparison": "Hoe verhoudt dit zich tot marktstandaard?",
  "keyQuestions": ["vraag 1 om te stellen", "vraag 2", ...]
}

Belgische standaarden: 15% booking fee = normaal, 15-20% management = fair.
Response moet valid JSON zijn zonder markdown backticks.`,

    fr: `Vous êtes un expert en contrats musicaux et droits voisins en Belgique.

INSTRUCTIONS IMPORTANTES:
1. Analysez le contrat D'ABORD objectivement selon la grille de 100 points
2. Traduisez ENSUITE vos conclusions en français
3. Utilisez TOUJOURS les mêmes critères - même contrat = même score
4. Utilisez température 0 pour des analyses cohérentes

Fournissez une réponse JSON avec exactement cette structure:
{
  "overallScore": 0-100 (utilisez la grille en 5 parties),
  "summary": "Résumé en 2-3 phrases",
  "contractType": "Deal Label / Management / Booking / etc.",
  "redFlags": [
    {
      "severity": "critical" | "warning" | "minor",
      "category": "Droits" | "Finances" | "Durée" | "Obligations" | "Transparence",
      "issue": "Description courte du problème",
      "explanation": "Explication détaillée",
      "recommendation": "Conseil spécifique"
    }
  ],
  "positivePoints": ["point 1", "point 2", ...],
  "recommendations": ["conseil 1", "conseil 2", ...],
  "marketComparison": "Comment cela se compare-t-il au marché?",
  "keyQuestions": ["question 1 à poser", "question 2", ...]
}

Normes belges: 15% commission booking = normal, 15-20% management = juste.
La réponse doit être un JSON valide sans backticks markdown.`,

    en: `You are an expert in music contracts and neighboring rights in Belgium.

IMPORTANT INSTRUCTIONS:
1. Analyze the contract FIRST objectively using the 100-point rubric
2. THEN translate your findings to English
3. ALWAYS use same criteria - same contract = same score
4. Use temperature 0 for consistent analyses

Provide a JSON response with exactly this structure:
{
  "overallScore": 0-100 (use the 5-part rubric),
  "summary": "2-3 sentence summary",
  "contractType": "Label Deal / Management / Booking / etc.",
  "redFlags": [
    {
      "severity": "critical" | "warning" | "minor",
      "category": "Rights" | "Financial" | "Duration" | "Obligations" | "Transparency",
      "issue": "Short problem description",
      "explanation": "Detailed explanation",
      "recommendation": "Specific advice"
    }
  ],
  "positivePoints": ["point 1", "point 2", ...],
  "recommendations": ["advice 1", "advice 2", ...],
  "marketComparison": "How does this compare to market standard?",
  "keyQuestions": ["question 1 to ask", "question 2", ...]
}

Belgian standards: 15% booking fee = normal, 15-20% management = fair.
Response must be valid JSON without markdown backticks.`
  }
  
  return prompts[language as keyof typeof prompts] || prompts.en
}

async function analyzeWithClaude(pdfBase64: string, language: string) {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    temperature: 0, // CRITICAL: 0 for consistent scoring
    system: MUSIC_INDUSTRY_KNOWLEDGE + '\n\n' + getAnalysisPrompt(language),
    messages: [{
      role: 'user',
      content: [
        {
          type: 'document',
          source: {
            type: 'base64',
            media_type: 'application/pdf',
            data: pdfBase64,
          },
        },
        {
          type: 'text',
          text: 'Analyze this music contract according to Belgian standards and provide your analysis in the specified JSON format.',
        },
      ],
    }],
  })

  const responseText = message.content[0].type === 'text' 
    ? message.content[0].text 
    : ''
  
  // Clean markdown artifacts
  let cleanedResponse = responseText.trim()
  if (cleanedResponse.startsWith('```json')) {
    cleanedResponse = cleanedResponse.substring(7)
  }
  if (cleanedResponse.startsWith('```')) {
    cleanedResponse = cleanedResponse.substring(3)
  }
  if (cleanedResponse.endsWith('```')) {
    cleanedResponse = cleanedResponse.substring(0, cleanedResponse.length - 3)
  }
  cleanedResponse = cleanedResponse.trim()
  
  return JSON.parse(cleanedResponse)
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('contract') as File
    const language = (formData.get('language') as string) || 'en'
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    console.log('Processing PDF:', file.name, file.size, 'bytes', 'Language:', language)

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const pdfBase64 = buffer.toString('base64')

    console.log('Sending PDF to Claude for analysis...')

    const analysis = await analyzeWithClaude(pdfBase64, language)
    
    // Add metadata
    analysis.provider = 'claude'
    analysis.timestamp = new Date().toISOString()
    analysis.language = language

    // Round score to nearest 0.5 for consistency
    if (analysis.overallScore) {
      analysis.overallScore = Math.round(analysis.overallScore * 2) / 2
    }

    return NextResponse.json(analysis)

  } catch (error: any) {
    console.error('Analysis error:', error)
    
    if (error.status === 429 || (error.message && error.message.includes('rate_limit'))) {
      return NextResponse.json(
        { error: 'Rate limit reached. Wait 1-2 minutes.' },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: error.message || 'Analysis failed' },
      { status: 500 }
    )
  }
}
