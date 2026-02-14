import React, { useState } from 'react'
import CookieConsent from '../components/CookieConsent'

function Home() {

  const [selectedProblem, setSelectedProblem] = useState("")
  const [selectedBahanaTone, setSelectedBahanaTone] = useState("")
  const [inputText, setInputText] = useState("")
  const [result, setResult] = useState("")

  const tones = [
    "Class Dhilo Vayo?",
    "Homework xutyo",
    "Office Dhila Vayo",
    "Girflfriend Risayo",
    "Plan Cancel grne",
  ]

  const bahanaTone = [
    "Aupacharik (Official)",
    "Ramailo/Funny",
    "Bhabhuk (Emotional)",
    "Dharmatic( Flirty )",
    "Savage / Honest"
  ]

  const handleGenerate = () => {
    if (!inputText) return

    setResult(
      `${inputText}`
    )
  }

  return (
    <main className="flex flex-col items-center relative justify-center min-h-screen bg-gray-100 px-4">
      <CookieConsent />
      <h1 className="text-3xl font-bold mb-2 mt-8">Bahana AI</h1>
      <p className="text-lg mb-8 text-center">
        Bahana AI is a language model created by NepCoderHood.
      </p>

      <div className="w-full max-w-xl flex flex-col gap-5">

        <h2 className="text-xl font-semibold">K Samasya Paryo?</h2>

        <div className="flex flex-wrap gap-3">
          {tones.map((tone, index) => (
            <button
              key={index}
              onClick={() => setSelectedProblem(tone)}
              className={`px-4 py-2 rounded-lg border transition 
                ${selectedProblem === tone 
                  ? "bg-black text-white" 
                  : "bg-white hover:bg-gray-200"}`}
            >
              {tone}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Example: Gf sanga aaja coffee date cancel"
          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black"
        />

        <div>
          <h2 className="text-xl font-semibold">Tone hera ta</h2>
          <p>Tone choose gara tespaxi bahana laga...</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {bahanaTone.map((tone, index) => (
            <button
              key={index}
              onClick={() => setSelectedBahanaTone(tone)}
              className={`px-4 py-2 rounded-lg border transition 
                ${selectedBahanaTone === tone 
                  ? "bg-black text-white" 
                  : "bg-white hover:bg-gray-200"}`}
            >
              {tone}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          className="w-full px-4 py-3 rounded-lg bg-black text-white hover:opacity-90 transition"
        >
          Generate
        </button>

        {result && (
          <textarea
            value={result}
            readOnly
            className="w-full px-4 py-3 rounded-lg border bg-white resize-none"
            rows={4}
          />
        )}

      </div>

      <footer className="mt-8 text-center">
        <p className="text-gray-600">© 2023 Bahana AI. All rights reserved.</p>
      </footer>

      <div className="mt-23"></div>

    </main>
  )
}

export default Home
