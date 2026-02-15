import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ── stagger helpers ──────────────────────────────────────────────────────────
const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 24 } },
}

// ── tiny confetti burst ──────────────────────────────────────────────────────
const COLORS = ['#f43f5e', '#f97316', '#facc15', '#34d399', '#60a5fa', '#a78bfa', '#f472b6']

function ConfettiBurst({ active }) {
  if (!active) return null
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999 }}>
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: `${20 + Math.random() * 60}%`,
            top:  `${10 + Math.random() * 50}%`,
            width:  Math.random() > 0.5 ? 8 : 6,
            height: Math.random() > 0.5 ? 8 : 6,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            background: COLORS[i % COLORS.length],
          }}
          initial={{ opacity: 0, scale: 0, y: 0, rotate: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.3, 0], y: -65, rotate: [0, 180] }}
          transition={{ delay: i * 0.055, duration: 1.5, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

export default function Home() {
  const [selectedProblem,    setSelectedProblem]    = useState(null)
  const [selectedBahanaTone, setSelectedBahanaTone] = useState(null)
  const [selectedWho,        setSelectedWho]        = useState(null)
  const [inputText,          setInputText]          = useState('')
  const [result,             setResult]             = useState('')
  const [loading,            setLoading]            = useState(false)
  const [burst,              setBurst]              = useState(false)
  const [shake,              setShake]              = useState(false)
  const resultRef = useRef(null)

  const category = [
    { english: 'late_class',    nepali: '📚 Class Dhilo Vayo?' },
    { english: 'homework',      nepali: '📝 Homework Xutyo'    },
    { english: 'office',        nepali: '💼 Office Dhila Vayo' },
    { english: 'relationship',  nepali: '💔 GF/BF Risayo'      },
    { english: 'plan_cancel',   nepali: '❌ Plan Cancel Grne'  },
  ]

  const tones = [
    { english: 'formal',         nepali: '🤵 Aupacharik' },
    { english: 'funny',          nepali: '😂 Ramailo'     },
    { english: 'emotional',      nepali: '🥺 Bhabhuk'     },
    { english: 'flirty',         nepali: '😏 Dharmatic'   },
    { english: 'savage/honest',  nepali: '💀 Savage'      },
  ]

  const whoOptions = [
    { english: 'friend',        nepali: '👫 Saathi'       },
    { english: 'girlfriend',    nepali: '💕 Girlfriend'   },
    { english: 'boyfriend',     nepali: '💙 Boyfriend'    },
    { english: 'parents',       nepali: '👨‍👩‍👦 Buba Aama'   },
    { english: 'teacher',       nepali: '📖 Teacher'      },
    { english: 'boss',          nepali: '💼 Boss'         },
    { english: 'classmate',     nepali: '🎒 Classmate'    },
  ]

  const doShake = () => {
    setShake(true)
    setTimeout(() => setShake(false), 420)
  }

  const handleGenerate = async () => {
    if (!selectedProblem) {
      doShake()
      toast.error('Samasya choose gara pehile bro! 😤')
      return
    }
    if (!selectedWho) {
      doShake()
      toast.error('Kaslai bahana dinu xa? Choose gara! 🤔')
      return
    }
    if (!inputText.trim()) {
      doShake()
      toast.error('Context ta lekh! Telepathy hudaina 🤷')
      return
    }
    if (!selectedBahanaTone) {
      doShake()
      toast.error('Tone ni choose gara yaar 🎭')
      return
    }

    setLoading(true)
    setResult('')
    toast.info('AI le bahana sochiraxu... 🧠', { autoClose: 2000 })

    try {
      const { data } = await axios.post('http://localhost:8080/api/bahana', {
        category: selectedProblem.english,
        context:  inputText.trim(),
        tone:     selectedBahanaTone.english,
        who:      selectedWho.english,
      })

      const bahana = data?.bahana || data?.result || data?.message || JSON.stringify(data)
      setResult(bahana)
      setBurst(true)
      setTimeout(() => setBurst(false), 2000)
      toast.success('Bahana tayar! 🎤🔥')
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Server down xa bro 😭')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* ── styles ───────────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Instrument+Serif:ital@0;1&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #f5f4f0;
          color: #1a1a1a;
          min-height: 100vh;
        }

        /* subtle dot grid bg */
        .bh-page {
          background-color: #f5f4f0;
          background-image: radial-gradient(#dddbd3 1.2px, transparent 1.2px);
          background-size: 24px 24px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 16px 80px;
          position: relative;
          overflow-x: hidden;
        }

        /* soft ambient blobs */
        .blob {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
          z-index: 0;
        }

        /* everything sits above blobs */
        .bh-inner { position: relative; z-index: 1; width: 100%; max-width: 580px; }

        /* ── header ── */
        .bh-header { text-align: center; padding-top: 52px; margin-bottom: 10px; }
        .bh-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(42px, 10vw, 58px);
          font-weight: 400;
          font-style: italic;
          letter-spacing: -0.5px;
          line-height: 1.05;
          color: #111;
        }
        .bh-title span {
          background: linear-gradient(130deg, #f43f5e, #a855f7, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .bh-sub {
          margin-top: 8px;
          font-size: 14px;
          color: #888;
          font-weight: 500;
        }
        .bh-sub strong { color: #555; font-weight: 700; }
        .bh-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 14px;
          background: #fff;
          border: 1.5px solid #e5e0d8;
          border-radius: 100px;
          padding: 7px 18px;
          font-size: 13px;
          font-weight: 600;
          color: #555;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        /* ── section card ── */
        .bh-card {
          background: #fff;
          border: 1.5px solid #e8e3d8;
          border-radius: 20px;
          padding: 24px 20px 20px;
          box-shadow: 0 2px 14px rgba(0,0,0,0.045);
          margin-bottom: 14px;
          position: relative;
        }

        .bh-step {
          position: absolute;
          top: -13px; left: 18px;
          padding: 3px 12px;
          border-radius: 100px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
        }

        .bh-card-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 17px;
          font-weight: 800;
          color: #111;
          margin-bottom: 4px;
        }
        .bh-card-sub { font-size: 12px; color: #bbb; font-weight: 500; margin-bottom: 14px; }

        /* ── chip buttons (category & tone) ── */
        .bh-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .bh-chip {
          padding: 9px 15px;
          border-radius: 12px;
          border: 1.5px solid #e5e0d8;
          background: #faf9f6;
          font-size: 13px;
          font-weight: 600;
          color: #555;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s, color 0.15s,
                      box-shadow 0.15s, transform 0.15s;
          font-family: inherit;
          outline: none;
        }
        .bh-chip:hover {
          background: #f0ece3;
          border-color: #ccc;
          color: #222;
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
        }
        .bh-chip.active {
          background: #111;
          color: #fff;
          border-color: #111;
          box-shadow: 0 4px 14px rgba(0,0,0,0.18);
          transform: translateY(-1px);
        }

        /* ── textarea input ── */
        .bh-input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 14px;
          border: 1.5px solid #e5e0d8;
          background: #faf9f6;
          font-size: 14px;
          font-family: inherit;
          color: #1a1a1a;
          resize: none;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          line-height: 1.65;
        }
        .bh-input::placeholder { color: #c0bdb5; }
        .bh-input:focus {
          border-color: #a78bfa;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(167,139,250,0.12);
        }

        /* ── generate button ── */
        .bh-btn {
          width: 100%;
          padding: 16px;
          border-radius: 16px;
          border: none;
          background: #111;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.01em;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          margin-bottom: 14px;
        }
        .bh-btn:hover:not(:disabled) {
          background: #222;
          box-shadow: 0 8px 28px rgba(0,0,0,0.2);
          transform: translateY(-2px);
        }
        .bh-btn:active:not(:disabled) { transform: translateY(0); }
        .bh-btn:disabled { background: #ccc; cursor: not-allowed; box-shadow: none; }
        /* shimmer */
        .bh-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%);
          background-size: 200% 100%;
          animation: shimmer 2.5s ease-in-out infinite;
        }
        .bh-btn:disabled::after { display: none; }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── result card ── */
        .bh-result {
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 14px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.07);
        }
        .bh-result-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 18px;
        }
        .bh-result-emoji { font-size: 28px; flex-shrink: 0; }
        .bh-result-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 800;
        }
        .bh-result-hint { font-size: 11px; color: #999; margin-top: 1px; }
        .bh-result-pulse {
          width: 9px; height: 9px;
          border-radius: 50%;
          margin-left: auto;
          flex-shrink: 0;
        }
        .bh-result-body {
          padding: 0 18px 18px;
          font-size: 15px;
          line-height: 1.75;
          color: #2a2a2a;
          font-weight: 500;
        }
        .bh-copy-btn {
          display: block;
          width: calc(100% - 36px);
          margin: 0 18px 18px;
          padding: 11px;
          border: none;
          border-radius: 12px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.15s;
        }
        .bh-copy-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .bh-copy-btn:active { transform: translateY(0); }

        /* ── loader ── */
        .bh-loader {
          display: flex; flex-direction: column; align-items: center;
          gap: 12px; padding: 32px;
        }
        .bh-loader-row { display: flex; gap: 14px; }
        .bh-loader-text {
          font-size: 12px; font-weight: 600; color: #bbb;
          text-transform: uppercase; letter-spacing: 0.12em;
        }

        /* ── shake ── */
        @keyframes shake {
          0%,100% { transform: translateX(0) }
          20% { transform: translateX(-5px) }
          40% { transform: translateX(5px) }
          60% { transform: translateX(-4px) }
          80% { transform: translateX(4px) }
        }
        .shake { animation: shake 0.4s ease; }

        /* ── footer ── */
        .bh-footer {
          text-align: center; margin-top: 32px;
          font-size: 12px; color: #ccc; font-weight: 500;
          letter-spacing: 0.04em;
        }

        /* ── toast override ── */
        .Toastify__toast {
          border-radius: 14px !important;
          font-family: 'DM Sans', sans-serif !important;
          font-weight: 600 !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important;
          border: 1.5px solid #e8e3d8 !important;
        }

        /* ── mobile responsive ── */
        @media (max-width: 480px) {
          .bh-page { padding: 0 12px 60px; }
          .bh-header { padding-top: 36px; }
          .bh-title { font-size: 38px; }
          .bh-badge { font-size: 12px; padding: 6px 14px; }
          .bh-card { padding: 22px 14px 16px; border-radius: 16px; }
          .bh-card-title { font-size: 15px; }
          .bh-chip { padding: 8px 12px; font-size: 12px; border-radius: 10px; }
          .bh-input { font-size: 14px; padding: 12px 13px; }
          .bh-btn { padding: 14px; font-size: 15px; border-radius: 14px; }
          .bh-result-body { font-size: 14px; }
          .bh-copy-btn { font-size: 13px; }
          .bh-inner { max-width: 100%; }
        }
      `}</style>

      <ToastContainer position="top-right" autoClose={3000} theme="light" pauseOnHover newestOnTop />
      <ConfettiBurst active={burst} />

      {/* soft ambient color blobs */}
      <div className="blob" style={{ width: 500, height: 500, background: 'rgba(244,63,94,0.07)',  top: '-120px', left: '-150px' }} />
      <div className="blob" style={{ width: 420, height: 420, background: 'rgba(139,92,246,0.07)', bottom: '0',   right: '-100px' }} />
      <div className="blob" style={{ width: 320, height: 320, background: 'rgba(59,130,246,0.05)', top: '38%',    left: '40%' }} />

      <main className="bh-page">
        <div className="bh-inner">

          {/* ── HEADER ─────────────────────────────────────────────────── */}
          <motion.div
            className="bh-header"
            initial={{ opacity: 0, y: -28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, type: 'spring', stiffness: 200, damping: 20 }}
          >
            <h1 className="bh-title">
              <span>Bahana AI</span>
            </h1>
            <p className="bh-sub">Nepali GenZ Excuse Generator · Made with 🔥 by <strong>Pragyan</strong> &amp; <strong> Abhaya</strong></p>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, type: 'spring', stiffness: 260, damping: 20 }}
            >
              <span className="bh-badge">Bahana chaiyo? Bahana AI xa ta! 🎤</span>
            </motion.div>
          </motion.div>

          {/* ── FORM ───────────────────────────────────────────────────── */}
          <motion.div
            className={shake ? 'shake' : ''}
            style={{ marginTop: 32 }}
            variants={list}
            initial="hidden"
            animate="show"
          >

            {/* Step 1 — Category */}
            <motion.div variants={item} className="bh-card">
              <div className="bh-step" style={{ background: '#f43f5e', boxShadow: '0 4px 10px rgba(244,63,94,0.35)' }}>01</div>
              <p className="bh-card-title">K Samasya Paryo?</p>
              <p className="bh-card-sub">Afno scene choose gara</p>
              <div className="bh-chips">
                {category.map((cat, i) => (
                  <motion.button
                    key={i}
                    className={`bh-chip ${selectedProblem?.english === cat.english ? 'active' : ''}`}
                    onClick={() => setSelectedProblem(cat)}
                    whileTap={{ scale: 0.93 }}
                  >
                    {cat.nepali}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Step 2 — Who */}
            <motion.div variants={item} className="bh-card">
              <div className="bh-step" style={{ background: '#f97316', boxShadow: '0 4px 10px rgba(249,115,22,0.35)' }}>02</div>
              <p className="bh-card-title">Kaslai Bahana Dinu Parni?</p>
              <p className="bh-card-sub">Kun manchelai explain garnu xa?</p>
              <div className="bh-chips">
                {whoOptions.map((w, i) => (
                  <motion.button
                    key={i}
                    className={`bh-chip ${selectedWho?.english === w.english ? 'active' : ''}`}
                    onClick={() => setSelectedWho(w)}
                    whileTap={{ scale: 0.93 }}
                  >
                    {w.nepali}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Step 3 — Context */}
            <motion.div variants={item} className="bh-card">
              <div className="bh-step" style={{ background: '#a855f7', boxShadow: '0 4px 10px rgba(168,85,247,0.35)' }}>03</div>
              <p className="bh-card-title">Scene Bata — Context Deu Ta!</p>
              <p className="bh-card-sub">Je bhayo tyo lekh, AI le perfect bahana banaidinxu</p>
              <textarea
                className="bh-input"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Example: Gf sanga aaja coffee date cancel bhayo, uslai lagyo ki maile cheat gariraxu..."
                rows={3}
              />
            </motion.div>

            {/* Step 4 — Tone */}
            <motion.div variants={item} className="bh-card">
              <div className="bh-step" style={{ background: '#3b82f6', boxShadow: '0 4px 10px rgba(59,130,246,0.35)' }}>04</div>
              <p className="bh-card-title">Tone Hera Ta</p>
              <p className="bh-card-sub">Tone choose gara tespaxi bahana laga...</p>
              <div className="bh-chips">
                {tones.map((t, i) => (
                  <motion.button
                    key={i}
                    className={`bh-chip ${selectedBahanaTone?.english === t.english ? 'active' : ''}`}
                    onClick={() => setSelectedBahanaTone(t)}
                    whileTap={{ scale: 0.93 }}
                  >
                    {t.nepali}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Generate button */}
            <motion.div variants={item}>
              <motion.button
                className="bh-btn"
                onClick={handleGenerate}
                disabled={loading}
                whileHover={loading ? {} : { scale: 1.015 }}
                whileTap={loading  ? {} : { scale: 0.975 }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>
                  {loading ? '🔄 Sochiraxu...' : 'Bahana Generate Gara!'}
                </span>
              </motion.button>
            </motion.div>

            {/* ── RESULT ───────────────────────────────────────────────── */}
            <AnimatePresence mode="wait">

              {/* loader */}
              {loading && (
                <motion.div
                  key="loader"
                  className="bh-card"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                >
                  <div className="bh-loader">
                    <div className="bh-loader-row">
                      {['🤔', '💭', '🎤'].map((e, i) => (
                        <motion.span
                          key={i}
                          style={{ fontSize: 28 }}
                          animate={{ y: [0, -14, 0] }}
                          transition={{ delay: i * 0.18, repeat: Infinity, duration: 0.75 }}
                        >{e}</motion.span>
                      ))}
                    </div>
                    <motion.p
                      className="bh-loader-text"
                      animate={{ opacity: [0.35, 1, 0.35] }}
                      transition={{ repeat: Infinity, duration: 1.4 }}
                    >
                      Bahana banaudai xa...
                    </motion.p>
                  </div>
                </motion.div>
              )}

              {/* result */}
              {result && !loading && (
                <motion.div
                  key="result"
                  ref={resultRef}
                  initial={{ opacity: 0, scale: 0.92, y: 22 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -14 }}
                  transition={{ type: 'spring', stiffness: 230, damping: 22 }}
                >
                  <ResultCard
                    result={result}
                    tone={selectedBahanaTone?.english}
                  />
                </motion.div>
              )}

            </AnimatePresence>

          </motion.div>

          {/* ── FOOTER ─────────────────────────────────────────────────── */}
          <motion.footer
            className="bh-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            © 2025 Bahana AI · NepCoderHood 🇳🇵 · Built by <strong style={{ color: '#f43f5e' }}>Pragyan</strong> &amp; <strong style={{ color: '#a855f7' }}>Abhaya</strong>
          </motion.footer>

        </div>
      </main>
    </>
  )
}

// ── Result card (tone-aware) ─────────────────────────────────────────────────
function ResultCard({ result, tone }) {
  const [copied, setCopied] = useState(false)

  const toneMap = {
    formal:          { emoji: '🤵', color: '#6366f1', bg: '#eef2ff', border: '#c7d2fe', label: 'Official Bahana'  },
    funny:           { emoji: '😂', color: '#d97706', bg: '#fffbeb', border: '#fde68a', label: 'Funny Bahana'     },
    emotional:       { emoji: '🥺', color: '#db2777', bg: '#fdf2f8', border: '#fbcfe8', label: 'Bhabhuk Bahana'   },
    flirty:          { emoji: '😏', color: '#e11d48', bg: '#fff1f2', border: '#fecdd3', label: 'Dharmatic Bahana' },
    'savage/honest': { emoji: '💀', color: '#dc2626', bg: '#fef2f2', border: '#fecaca', label: 'Savage Bahana'    },
  }
  const cfg = toneMap[tone] || { emoji: '🎤', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', label: 'Bahana' }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    toast.success('Bahana copied! 📋 Paath gara ab!')
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div
      className="bh-result"
      style={{ background: cfg.bg, border: `1.5px solid ${cfg.border}` }}
    >
      {/* header */}
      <div
        className="bh-result-header"
        style={{ borderBottom: `1.5px solid ${cfg.border}` }}
      >
        <span className="bh-result-emoji">{cfg.emoji}</span>
        <div>
          <p className="bh-result-label" style={{ color: cfg.color }}>{cfg.label} Ready! 🎉</p>
          <p className="bh-result-hint">Copy gara ra paath gara</p>
        </div>
        <motion.div
          className="bh-result-pulse"
          style={{ background: cfg.color }}
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        />
      </div>

      {/* body */}
      <p className="bh-result-body">{result}</p>

      {/* copy */}
      <motion.button
        className="bh-copy-btn"
        style={{ background: cfg.color }}
        onClick={handleCopy}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
      >
        {copied ? '✅ Copied!' : '📋 Copy Bahana'}
      </motion.button>
    </div>
  )
}