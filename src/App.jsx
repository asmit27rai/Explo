import { useState } from 'react'
import PredictionForm from './components/PredictionForm'

function App() {
  const [result, setResult] = useState(null)

  const handlePrediction = async (inputs) => {
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(inputs).toString()
      });
  
      if (!response.ok) throw new Error('Prediction failed');
      
      const data = await response.json();
      setResult(data.prediction);
      
    } catch (error) {
      console.error('Error:', error);
      alert('Prediction failed: ' + error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">Melt Pool Length Predictor</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PredictionForm onSubmit={handlePrediction} />
        </div>

        {result && (
          <div className="p-4 bg-green-100 rounded-lg text-center text-xl">
            Predicted Melt Pool Length: {result.toFixed(2)} mm
          </div>
        )}
      </div>
    </div>
  )
}

export default App
