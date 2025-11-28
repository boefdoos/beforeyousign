#!/bin/bash

# Script om de API route aan te passen voor meertaligheid
# Run dit in ~/Documents/contract-checker-app/

echo "🔧 Updating API route for multilingual support..."

# Backup maken
cp app/api/analyze-contract/route.ts app/api/analyze-contract/route.ts.backup-i18n

# Voeg language support toe na formData regel
sed -i '' '/const formData = await request.formData()/a\
\
    // Get language parameter\
    const language = formData.get('\''language'\'') as string || '\''nl'\''\
    \
    // Language instructions for AI\
    const languageInstructions: Record<string, string> = {\
      '\''nl'\'': '\''BELANGRIJK: Geef de HELE analyse in het NEDERLANDS. Alle secties (summary, redFlags, positivePoints, recommendations, marketComparison, keyQuestions) moeten in het Nederlands zijn.'\'',\
      '\''fr'\'': '\''IMPORTANT: Donnez TOUTE l\\'\''analyse en FRANÇAIS. Toutes les sections (summary, redFlags, positivePoints, recommendations, marketComparison, keyQuestions) doivent être en français.'\'',\
      '\''en'\'': '\''IMPORTANT: Provide the ENTIRE analysis in ENGLISH. All sections (summary, redFlags, positivePoints, recommendations, marketComparison, keyQuestions) must be in English.'\''\
    }\
' app/api/analyze-contract/route.ts

# Voeg language instructie toe aan AI prompt (vlak voor JSON format)
sed -i '' '/Provide analysis in this EXACT JSON format/i\
${languageInstructions[language]}\
\
' app/api/analyze-contract/route.ts

echo "✅ API route updated successfully!"
echo "📋 Backup saved as: app/api/analyze-contract/route.ts.backup-i18n"
echo ""
echo "Next steps:"
echo "1. Restart your dev server (Ctrl+C then 'npm run dev')"
echo "2. Test with different languages (NL/FR/EN)"
