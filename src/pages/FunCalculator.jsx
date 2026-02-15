// WeirdFloatingCalculator.jsx
import React, { useState, useCallback } from 'react';

const jokes = [
  (n) => `${n}… but in dog years → ${n * 7} 🐶`,
  (n) => `${n}… you just earned ${n} cloud cookies 🍪`,
  (n) => `${n}… the universe approves 😎`,
  (n) => `${n}… cats judge you silently 🐱`,
  (n) => `${n}… nice vibe, keep going 🪴`,
  (n) => `${n}… wow, math ✨`,
];

const asciiArts = [
  '(•‿•)',
  '(ง •̀_•́)ง',
  '¯\\_(ツ)_/¯',
  '(╯°□°）╯︵ ┻━┻',
  'ಠ_ಠ',
  '٩(◕‿◕)۶',
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Very safe mini evaluator (no eval!)
function miniCalc(expr) {
  try {
    const clean = expr.replace(/[^0-9+\-*/.() ]/g, '').trim();
    if (!clean || clean.length > 60) return null;

    // eslint-disable-next-line no-new-func
    const result = new Function(`'use strict'; return (${clean})`)();
    return Number.isFinite(result) ? result : null;
  } catch {
    return null;
  }
}

export default function WeirdFloatingCalculator() {
  const [expr, setExpr] = useState('');
  const [message, setMessage] = useState('');

  const append = useCallback((val) => {
    setExpr((prev) => prev + val);
  }, []);

  const clear = useCallback(() => {
    setExpr('');
    setMessage('');
  }, []);

  const calculate = useCallback(() => {
    if (!expr.trim()) {
      setMessage('...empty space...? 🤔');
      return;
    }

    const num = miniCalc(expr);
    if (num === null) {
      setMessage("That spell didn't work 🤯");
      return;
    }

    const displayNum = Number.isInteger(num) ? num : num.toFixed(3).replace(/\.?0+$/, '');
    const joke = getRandom(jokes)(displayNum);
    const art = Math.random() > 0.55 ? `  ${getRandom(asciiArts)}` : '';

    setMessage(`${joke}${art}`);
  }, [expr]);

  // Instead of grid — using flex + rotation + offset for playful feel
  const numberButtons = ['7','8','9','4','5','6','1','2','3','0','.'];
  const operatorButtons = ['+','-','*','/'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg relative">
        {/* Main card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/40">
          <h1 className="text-4xl font-black text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Magic Weird Calc ✨
          </h1>

          {/* Expression display */}
          <div className="mb-8 bg-gray-900/90 text-white p-5 rounded-2xl text-right text-3xl font-light tracking-wide min-h-[5rem] flex items-center justify-end break-all shadow-inner">
            {expr || '0'}
          </div>

          {/* Result / joke area */}
          {message && (
            <div className="mb-10 text-center text-xl font-medium p-5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border border-purple-200 shadow-sm animate-fade-in">
              {message}
            </div>
          )}

          {/* Floating buttons container */}
          <div className="relative h-[380px] sm:h-[420px] mb-6">
            {/* Numbers — scattered a bit */}
            <div className="absolute inset-0 flex flex-wrap gap-4 justify-center items-center">
              {numberButtons.map((btn, i) => {
                const rotation = (i % 2 === 0 ? '' : '-') + (3 + i % 6);
                const offset = i % 3 * 6 - 12;

                return (
                  <button
                    key={btn}
                    onClick={() => append(btn)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg text-2xl font-bold hover:scale-110 active:scale-95 transition-all duration-150 border border-gray-200 flex items-center justify-center`}
                    style={{
                      transform: `rotate(${rotation}deg) translateY(${offset}px)`,
                    }}
                  >
                    {btn}
                  </button>
                );
              })}
            </div>

            {/* Operators — placed on right side, vertical-ish */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-5">
              {operatorButtons.map((op) => (
                <button
                  key={op}
                  onClick={() => append(op)}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-400 text-white text-3xl font-bold shadow-xl hover:scale-110 active:scale-95 transition-all duration-150 flex items-center justify-center border-2 border-orange-300"
                >
                  {op}
                </button>
              ))}
            </div>

            {/* Big action buttons at bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-6">
              <button
                onClick={clear}
                className="px-10 py-5 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white text-xl font-bold shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
              >
                CLEAR
              </button>

              <button
                onClick={calculate}
                className="px-12 py-5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xl font-bold shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
              >
                =
              </button>
            </div>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-gray-500">
          Warning: may summon unexpected joy or mild chaos
        </p>
      </div>
    </div>
  );
}