import React, { useState } from 'react'

function Home() {

  const [selectedTone, setSelectedTone] = useState("Normal")
  const [inputText, setInputText] = useState("")
  const [result, setResult] = useState("")

  const tones = [
    "Normal",
    "Casual",
    "Samanye",
    "Romantic",
    "Natak",
    "Comedy",
    "Serious"
  ]

  const handleGenerate = () => {
    if (!inputText) return
    setResult(` ${inputText}`)
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">

      <h1 className="text-3xl font-bold mb-2">Bahana AI</h1>
      <p className="text-lg mb-8 text-center">
        Bahana AI is a language model created by NepCoderHood.
      </p>

      {/* Container with max width */}
      <div className="w-full max-w-xl flex flex-col gap-5">

        <h2 className="text-xl font-semibold">Choose a tone</h2>

        <div className="flex flex-wrap gap-3">
          {tones.map((tone, index) => (
            <button
              key={index}
              onClick={() => setSelectedTone(tone)}
              className={`px-4 py-2 rounded-lg border transition 
                ${selectedTone === tone 
                  ? "bg-black text-white" 
                  : "bg-white hover:bg-gray-200"}`}
            >
              {tone}
            </button>
          ))}
        </div>

        {/* Input */}
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Example: Gf sanga aaja coffee date cancel"
          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Button */}
        <button
          onClick={handleGenerate}
          className="w-full px-4 py-3 rounded-lg bg-black text-white hover:opacity-90 transition"
        >
          Generate
        </button>

        {/* Result */}
        {result && (
          <textarea
            value={result}
            readOnly
            className="w-full px-4 py-3 rounded-lg border bg-white resize-none"
            rows={3}
          />
        )}

      </div>

    </main>
  )
}

export default Home
