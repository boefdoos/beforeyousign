import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function getSystemPrompt(language: string): string {
  const translations = {
    nl: { rights: 'Rechten', financial: 'Financiën', duration: 'Duur', obligations: 'Verplichtingen', transparency: 'Transparantie' },
    fr: { rights: 'Droits', financial: 'Finances', duration: 'Durée', obligations: 'Obligations', transparency: 'Transparence' },
    en: { rights: 'Rights', financial: 'Financial', duration: 'Duration', obligations: 'Obligations', transparency: 'Transparency' }
  }
  const cats = translations[language as keyof typeof translations] || translations.en

  return `You are a music contract analyzer for Belgian/Flemish musicians. Work in two phases.

PHASE 1 - OBJECTIVE ANALYSIS (language-independent):

Systematically check these 20 contract elements:

PAYMENT (category: ${cats.financial}):
1. Advance/upfront payment present? (If absent → WARNING)
2. Payment terms clearly defined? (If absent → CRITICAL)
3. Payment guaranteed vs "when received"? (If only when received → CRITICAL)
4. Commission/royalty rate 10-25%? (If >25% or <10% → severity per rules)
5. Accounting/reporting schedule clear? (If vague → WARNING)

TERMINATION (category: ${cats.duration}):
6. Termination clause exists? (If absent → CRITICAL)
7. Contract term <3 years? (If 3-5 years → WARNING, if >5 years → CRITICAL)
8. Renewal process clear with notice? (If auto-renewal no notice → WARNING)
9. Artist can exit with reasonable notice? (If no exit → CRITICAL)

FORCE MAJEURE (category: ${cats.financial}):
10. Force majeure compensation provided? (If zero compensation → WARNING)
11. Cancellation terms balanced? (If one-sided → WARNING)

RIGHTS (category: ${cats.rights}):
12. Artist retains/regains master ownership? (If loses permanently → CRITICAL)
13. Artist can use recordings elsewhere? (If exclusive forever → CRITICAL)
14. Rights revert after term? (If no reversion → WARNING)

OBLIGATIONS (category: ${cats.obligations}):
15. Delivery/performance terms clear? (If vague → MINOR)
16. Exclusivity scope reasonable? (If >3 years no compensation → match severity)
17. Behavioral requirements fair? (If arbitrary sanctions → WARNING)

TRANSPARENCY (category: ${cats.transparency}):
18. Audit rights adequate? (If <1x/year → WARNING)
19. Dispute resolution fair? (If one-sided → MINOR)
20. All costs clearly listed? (If hidden costs → WARNING)

SEVERITY ASSIGNMENT RULES (apply mechanically):
- CRITICAL: No payment terms, no termination, loses masters permanently, exclusive >5 years, rate >25%, rights transferred without consent
- WARNING: No advance, force majeure no compensation, rate 20-25% or 10-15%, term 3-5 years, auto-renewal, limited audit, vague schedule, arbitrary sanctions
- MINOR: Ambiguities, missing optional clauses, one-sided but standard

BELGIAN STANDARDS (reference):
- Booking: 10-15% paid by promoter on top (not deducted from artist)
- Management: 15-20% fair, 20-25% high, >25% excessive
- Advance payments: Standard in fair contracts
- Force majeure: Should include partial compensation

SCORING (0-100):
- Rights: 0-25 points (items 12-14)
- Financial: 0-25 points (items 1-5, 10-11)
- Duration: 0-20 points (items 6-9)
- Obligations: 0-15 points (items 15-17)
- Transparency: 0-15 points (items 18-20)

CRITICAL INSTRUCTION: Include ALL items that fail AND match severity criteria in your redFlags array. Do not omit issues. Same contract must produce same issues across languages.

PHASE 2 - TRANSLATION:

Translate your Phase 1 findings to ${language === 'nl' ? 'Nederlands' : language === 'fr' ? 'français' : 'English'}.

OUTPUT ONLY THIS JSON STRUCTURE (no other text, no markdown, no decorations):

{
  "overallScore": 0,
  "summary": "2-3 sentence overview",
  "contractType": "type in target language",
  "redFlags": [
    {
      "severity": "critical or warning or minor",
      "category": "one of: ${Object.values(cats).join(', ')}",
      "issue": "short issue description",
      "explanation": "detailed explanation",
      "recommendation": "specific actionable advice"
    }
  ],
  "positivePoints": ["point 1", "point 2"],
  "recommendations": ["recommendation 1", "recommendation 2"]
}

VALIDATION BEFORE OUTPUT:
- Checked all 20 items?
- Included every failed item matching severity?
- Used mechanical severity rules?
- Output is pure JSON without markdown backticks or decorative lines?
- No text before or after JSON?

OUTPUT PURE JSON ONLY. NO MARKDOWN. NO DECORATIONS. NO THINKING TEXT.`
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('contract') as File
    const language = (formData.get('language') as string) || 'nl'
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log(`Analyzing contract in ${language}...`)

    const buffer = await file.arrayBuffer()
    const base64PDF = Buffer.from(buffer).toString('base64')

    const systemPrompt = getSystemPrompt(language)

    const userPrompt = language === 'nl'
      ? 'Analyseer dit muziekcontract volgens de 20-punten checklist. Geef alleen valid JSON terug, geen andere tekst.'
      : language === 'fr'
      ? 'Analysez ce contrat musical selon la checklist de 20 points. Retournez uniquement du JSON valide, pas d\'autre texte.'
      : 'Analyze this music contract using the 20-point checklist. Return only valid JSON, no other text.'

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      temperature: 0,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'document',
              source: {
                type: 'base64',
                media_type: 'application/pdf',
                data: base64PDF,
              },
            },
            {
              type: 'text',
              text: userPrompt,
            },
          ],
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    let responseText = content.text.trim()
    
    // Log raw response for debugging
    console.log('Raw Claude response (first 200 chars):', responseText.substring(0, 200))

    // Aggressive cleaning - remove any markdown or decorative elements
    responseText = responseText
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .replace(/^[=\-_*]+\s*$/gm, '') // Remove lines with only decorative chars
      .replace(/^#+\s+.*/gm, '') // Remove markdown headers
      .trim()

    // Find the actual JSON object
    const jsonStart = responseText.indexOf('{')
    const jsonEnd = responseText.lastIndexOf('}')
    
    if (jsonStart === -1 || jsonEnd === -1) {
      console.error('No JSON object found in response:', responseText.substring(0, 500))
      throw new Error('Claude did not return valid JSON structure')
    }

    responseText = responseText.substring(jsonStart, jsonEnd + 1)

    console.log('Cleaned response (first 200 chars):', responseText.substring(0, 200))

    const analysis = JSON.parse(responseText)

    // Validate structure
    if (!analysis.overallScore || !analysis.redFlags || !Array.isArray(analysis.redFlags)) {
      throw new Error('Invalid analysis structure: missing required fields')
    }

    const usage = {
      inputTokens: message.usage.input_tokens,
      outputTokens: message.usage.output_tokens,
      totalTokens: message.usage.input_tokens + message.usage.output_tokens,
      estimatedCost: (
        (message.usage.input_tokens * 0.003 / 1000) + 
        (message.usage.output_tokens * 0.015 / 1000)
      ).toFixed(4)
    }

    console.log(`Analysis complete: Score ${analysis.overallScore}/100, ${analysis.redFlags.length} issues found`)

    return NextResponse.json({
      ...analysis,
      usage
    })

  } catch (error: any) {
    console.error('Analysis error:', error)
    console.error('Error stack:', error.stack)
    
    if (error.message?.includes('rate_limit')) {
      return NextResponse.json(
        { error: 'Rate limit bereikt. Probeer het over een minuut opnieuw.' },
        { status: 429 }
      )
    }

    if (error.message?.includes('JSON')) {
      return NextResponse.json(
        { error: `JSON parsing error: ${error.message}. Check server logs for details.` },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: error.message || 'Analysis failed' },
      { status: 500 }
    )
  }
}
