import { useState } from 'react'

export default function PredictionForm({ onSubmit }) {
  const [inputs, setInputs] = useState({})

  const parameters = [
    'Power', 'Velocity', 'density', 'Cp', 'k', 'melting T',
    'Y (wt%)', 'Zn (wt%)', 'Mg (wt%)', 'Si (wt%)', 'Al (wt%)',
    'Sn (wt%)', 'Zr (wt%)', 'W (wt%)', 'Ti (wt%)', 'V (wt%)',
    'Co (wt%)', 'Cu (wt%)', 'Ta (wt%)', 'Nb (wt%)', 'Ni (wt.%)',
    'Cr (wt.%)', 'Fe (wt.%)', 'Mn (wt%)', 'Mo (wt.%)', 'ohe_sub', 'ohe_mat'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(inputs)
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg shadow-lg">
      {parameters.map((param) => (
        <div key={param} className="flex flex-col">
          <label className="text-sm font-medium">{param}</label>
          <input
            type="number"
            step="0.01"
            className="mt-1 p-2 border rounded-md"
            onChange={(e) => setInputs({...inputs, [param]: parseFloat(e.target.value)})}
          />
        </div>
      ))}
      <button
        type="submit"
        className="col-span-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Predict Melt Pool Length
      </button>
    </form>
  )
}