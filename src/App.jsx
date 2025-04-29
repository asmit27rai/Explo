import { useState } from 'react'
import PredictionForm from './components/PredictionForm'
import { motion } from 'framer-motion'

function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePrediction = async (inputs) => {
    try {
      setLoading(true)
      setError('')
      setResult(null)
      
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Prediction failed')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text pb-2"
        >
          🔥 Laser Melting Process Optimizer
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-lg p-6 rounded-xl shadow-2xl border border-white/10"
          >
            <PredictionForm onSubmit={handlePrediction} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl shadow-2xl border border-white/10 min-h-[400px] flex items-center justify-center">
              {loading ? (
                <div className="flex flex-col items-center space-y-4">
                  <svg className="animate-spin h-12 w-12 text-cyan-400" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  <span className="text-slate-400">Analyzing parameters...</span>
                </div>
              ) : result ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                  {Object.entries(result).map(([key, value], i) => (
                    <motion.div
                      key={key}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 * i }}
                      className="bg-gradient-to-br from-blue-500/30 to-cyan-500/20 p-5 rounded-xl border border-cyan-400/20"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="bg-cyan-400/20 p-2 rounded-lg">
                          <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-cyan-300">
                            {typeof value === 'number' ? value.toFixed(2) : "N/A"}
                          </p>
                          <p className="text-sm font-medium text-cyan-200 uppercase tracking-wide">
                            {key}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <svg className="mx-auto h-16 w-16 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                  </svg>
                  <p className="text-slate-400">Submit parameters to view predictions</p>
                </div>
              )}
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-3 bg-red-500/20 p-4 rounded-xl border border-red-400/30"
              >
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                </div>
                <div className="text-red-300 text-sm">{error}</div>
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-slate-500 mt-12"
        >
          <p className="text-sm flex items-center justify-center space-x-2">
            <svg className="h-4 w-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <span>Powered by Predictive Analytics</span>
          </p>
        </motion.footer>
      </div>
    </div>
  )
}

export default App