# beforeyousign.be Quick Reference
*Copy-paste snippets voor snelle development*

## 🎨 Colors (Copy deze exact)
```css
--paper: #faf9f7
--ink: #2d3436
--ink-light: #636e72
--accent: #6c7a89
--accent-soft: #95a5a6
--border: #e8e6e1
--green: #7fa99b
--amber: #d4a574
--red: #b85450
```

## ✍️ Font Sizes (Gebruik alleen deze)
```
9px  = text-xs    (footnotes)
10px = text-sm    (labels)
11px = text-base  (body)
14px = text-lg    (subheads)
18px = text-xl    (titles)
24px = text-2xl   (page titles)
32px = text-3xl   (hero)
48px = text-4xl   (large numbers)
```

## 📐 Spacing (4px increments only)
```
p-2  = 8px   (within components)
p-3  = 12px  (related items)
p-4  = 16px  (between items)
p-6  = 24px  (small sections)
p-8  = 32px  (medium sections)
p-12 = 48px  (large sections)
p-16 = 64px  (major sections)
```

---

## 🚀 Starter Templates

### New Page
```jsx
'use client'

export default function PageName() {
  return (
    <main className="min-h-screen bg-[#faf9f7] py-20 px-6">
      <div className="max-w-2xl mx-auto">
        
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-serif text-[#2d3436] mb-3">
            titel hier
          </h1>
          <p className="text-sm text-[#636e72] font-serif italic">
            beforeyousign.be
          </p>
        </header>

        <div className="space-y-12">
          {/* content */}
        </div>
        
      </div>
    </main>
  )
}
```

### Primary Button
```jsx
<button className="
  w-full py-4 px-6
  bg-[#6c7a89] hover:bg-[#5a6877]
  text-white font-serif text-sm
  rounded-sm transition-colors
">
  Tekst
</button>
```

### Secondary Button
```jsx
<button className="
  px-6 py-3
  text-[#636e72] hover:text-[#2d3436]
  font-serif text-sm
  border border-[#e8e6e1] hover:border-[#6c7a89]
  rounded-sm transition-colors
">
  Tekst
</button>
```

### Input Field
```jsx
<input className="
  w-full px-4 py-3
  bg-white border-2 border-[#e8e6e1]
  focus:border-[#6c7a89]
  rounded-sm font-serif text-base
  transition-colors
" />
```

### Content Box
```jsx
<div className="p-6 bg-white border border-[#e8e6e1] rounded-sm">
  {content}
</div>
```

### Severity Box
```jsx
// Critical
<div className="p-6 bg-[#fdf6f6] border-l-2 border-l-[#b85450] rounded-sm">

// Warning
<div className="p-6 bg-[#fdf9f5] border-l-2 border-l-[#d4a574] rounded-sm">

// Minor
<div className="p-6 bg-[#f5f7f8] border-l-2 border-l-[#6c7a89] rounded-sm">
```

### Section Header
```jsx
<h2 className="text-xs uppercase tracking-wider text-[#636e72] font-serif mb-6">
  SECTIE TITEL
</h2>
```

### Body Text
```jsx
<p className="text-base font-serif text-[#2d3436] leading-relaxed">
  Lorem ipsum...
</p>
```

### Metadata/Small Text
```jsx
<span className="text-sm text-[#636e72] font-serif italic">
  subtekst
</span>
```

### List with Checkmarks
```jsx
<div className="space-y-3">
  <div className="flex gap-3">
    <span className="text-[#7fa99b]">✓</span>
    <p className="text-sm text-[#2d3436] font-serif">Item</p>
  </div>
</div>
```

### Divider
```jsx
<div className="border-t border-[#e8e6e1] my-8" />
```

---

## 💬 Chat Interface

### User Message (right)
```jsx
<div className="flex justify-end mb-6">
  <div className="max-w-[80%] px-6 py-4 bg-white border border-[#e8e6e1] rounded-sm">
    <p className="text-base font-serif text-[#2d3436]">{message}</p>
  </div>
</div>
```

### Bot Message (left)
```jsx
<div className="flex justify-start mb-6">
  <div className="max-w-[80%] px-6 py-4 bg-[#f5f7f8] border border-[#e8e6e1] rounded-sm">
    <p className="text-base font-serif text-[#2d3436] leading-relaxed">{message}</p>
  </div>
</div>
```

### Chat Input
```jsx
<div className="sticky bottom-0 bg-[#faf9f7] border-t border-[#e8e6e1] p-6">
  <div className="max-w-2xl mx-auto flex gap-3">
    <input 
      className="flex-1 px-4 py-3 bg-white border-2 border-[#e8e6e1] focus:border-[#6c7a89] rounded-sm font-serif"
      placeholder="Stel een vraag..."
    />
    <button className="px-6 py-3 bg-[#6c7a89] hover:bg-[#5a6877] text-white font-serif text-sm rounded-sm">
      →
    </button>
  </div>
</div>
```

---

## 🎯 Rules (Never Break These)

### Colors
✅ Only use the 9 colors from palette  
❌ Never use pure black (#000) or pure white (#fff) as bg  
✅ Paper (#faf9f7) for backgrounds  
✅ Ink (#2d3436) for main text  

### Typography
✅ Always font-serif  
✅ Only use the 8 sizes listed  
✅ Line-height: leading-relaxed (1.6)  
❌ Never sans-serif (except technical code)  

### Spacing
✅ Only 4px increments (p-2, p-3, p-4, p-6, p-8, p-12, p-16)  
✅ Use max-w-2xl for content width  
✅ Generous whitespace (when in doubt, add more)  

### Interactions
✅ transition-colors (200ms)  
✅ rounded-sm (2px corners)  
✅ Subtle hovers (darken 10%)  
❌ Never bounce, pulse, or wiggle  

---

## 📋 Pre-flight Checklist

Voor elke nieuwe feature:
- [ ] Gebruikt alleen palette kleuren
- [ ] Paper (#faf9f7) achtergrond
- [ ] Serif font overal
- [ ] Max-width: 672px (max-w-2xl)
- [ ] Spacing in 4px increments
- [ ] Transitions ≤ 200ms
- [ ] Werkt op mobile (375px)
- [ ] "beforeyousign.be" lowercase

---

## 🎨 Component Library Location

Herbruikbare components staan in:
```
app/components/
├── ContractUploader.tsx    (drag & drop patroon)
├── LoadingAnimation.tsx     (spinner patroon)
├── PdfExportButton.tsx      (export logica)
├── i18n-context.tsx         (multi-language)
└── ApiCreditsMonitor.tsx    (monitoring patroon)
```

---

## 🔄 Copy-Paste Snippets

### Hele chat interface in 1 keer
```jsx
'use client'

import { useState } from 'react'

export default function Chatbot() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([])
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    setMessages([...messages, { role: 'user', content: input }])
    // TODO: API call here
    setInput('')
  }

  return (
    <main className="h-screen bg-[#faf9f7] flex flex-col">
      
      {/* Header */}
      <header className="border-b border-[#e8e6e1] p-6 bg-[#faf9f7]">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-serif text-[#2d3436]">Chat Titel</h1>
          <p className="text-sm text-[#636e72] font-serif italic">beforeyousign.be</p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-6 py-4 rounded-sm ${
                msg.role === 'user' 
                  ? 'bg-white border border-[#e8e6e1]'
                  : 'bg-[#f5f7f8] border border-[#e8e6e1]'
              }`}>
                <p className="text-base font-serif text-[#2d3436] leading-relaxed">
                  {msg.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-[#e8e6e1] p-6 bg-[#faf9f7]">
        <div className="max-w-2xl mx-auto flex gap-3">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            className="flex-1 px-4 py-3 bg-white border-2 border-[#e8e6e1] focus:border-[#6c7a89] rounded-sm font-serif"
            placeholder="Stel een vraag..."
          />
          <button 
            onClick={send}
            className="px-6 py-3 bg-[#6c7a89] hover:bg-[#5a6877] text-white font-serif text-sm rounded-sm transition-colors"
          >
            →
          </button>
        </div>
      </div>

    </main>
  )
}
```

### Loading spinner
```jsx
<div className="flex items-center justify-center py-12">
  <div className="relative w-12 h-12">
    <div className="absolute inset-0 border-2 border-[#e8e6e1] rounded-full" />
    <div className="absolute inset-0 border-2 border-[#6c7a89] rounded-full border-t-transparent animate-spin" />
  </div>
</div>
```

### Empty state
```jsx
<div className="text-center py-16">
  <p className="text-base text-[#636e72] font-serif italic">
    Nog geen berichten
  </p>
</div>
```

---

**Tip:** Bookmark deze file. Gebruik Cmd+F om snel te vinden wat je nodig hebt.

*Voor uitgebreide uitleg: zie DESIGN_GUIDE.md*
