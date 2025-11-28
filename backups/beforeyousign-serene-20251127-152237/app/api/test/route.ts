import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    message: 'API werkt!',
    hasApiKey: !!process.env.ANTHROPIC_API_KEY,
    keyPrefix: process.env.ANTHROPIC_API_KEY?.substring(0, 15) || 'niet gevonden'
  })
}
