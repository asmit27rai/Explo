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
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-center bg-gradient-to-r from-emerald-400 to-cyan-500 text-transparent bg-clip-text"
        >
          🚀 Parameter Optimzation
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-black backdrop-blur-md p-8 rounded-2xl shadow-lg"
          >
            <PredictionForm onSubmit={handlePrediction} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl min-h-[16rem] shadow-lg flex items-center justify-center">
              {loading ? (
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-emerald-400" />
              ) : result ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-center">
                  {['Length', 'Depth', 'Width'].map((key, i) => (
                    <motion.div
                      key={key}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 * i }}
                      className="bg-emerald-400/20 border border-emerald-400/40 rounded-xl p-4"
                    >
                      <p className="text-2xl font-bold text-emerald-300">
                        {result[key]?.toFixed(2) || "N/A"}
                      </p>
                      <p className="text-sm text-emerald-100 mt-1 font-medium">
                        {key} (mm)
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-300">Submit parameters to see predictions</p>
              )}
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 bg-red-900/20 p-4 rounded-xl text-center shadow"
              >
                ⚠️ {error}
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-gray-500 mt-10"
        >
          <p className="text-sm">🌟 Explo Done</p>
        </motion.footer>
      </div>
    </div>
  )
}

export default App