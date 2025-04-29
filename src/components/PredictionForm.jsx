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

  const processParams = ['Power', 'Velocity', 'density', 'Cp', 'k', 'melting T']
  const materialParams = parameters.slice(6)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(inputs)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white border-l-4 border-blue-500 pl-3">
          Process Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {processParams.map((param) => (
            <div key={param} className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-white">{param}</label>
              <input
                type="number"
                step="0.01"
                className="mt-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder={`Enter ${param}`}
                onChange={(e) => setInputs({...inputs, [param]: parseFloat(e.target.value)})}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white border-l-4 border-blue-500 pl-3">
          Material Composition (wt%)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {materialParams.map((param) => (
            <div key={param} className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-white">{param.split(' ')[0]}</label>
              <input
                type="number"
                step="0.01"
                className="p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="0.00"
                onChange={(e) => setInputs({...inputs, [param]: parseFloat(e.target.value)})}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
      >
        Predict Melt Pool Length
      </button>
    </form>
  )
}