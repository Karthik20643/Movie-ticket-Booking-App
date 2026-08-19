import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Checkout = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-white">
        <h2 className="text-xl font-semibold">No booking data</h2>
        <p className="text-gray-400 mt-2">Please select seats from a show first.</p>
      </div>
    )
  }

  const { movie, showId, date, time, seats } = state

  const handleConfirm = () => {
    // Placeholder: here you would call booking API
    alert(`Confirmed ${seats.length} seats for ${movie?.title || movie?.name} on ${date} at ${time?.time || time}`)
    navigate('/mybookings')
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-white">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="bg-white/5 rounded-lg p-6 mb-6">
        <div className="text-sm text-gray-400">Movie</div>
        <div className="font-medium text-lg">{movie?.title || movie?.name}</div>
        <div className="text-sm text-gray-400 mt-2">Show ID: {showId}</div>
        <div className="text-sm text-gray-400">Date: {date}</div>
        <div className="text-sm text-gray-400">Time: {time?.time || time}</div>
        <div className="text-sm text-gray-400 mt-2">Seats:</div>
        <div className="flex flex-wrap gap-2 mt-2">
          {Array.isArray(seats) && seats.map((s) => (
            <span key={s} className="px-3 py-1 bg-primary text-black rounded">{s}</span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={handleConfirm} className="px-4 py-2 bg-primary text-black rounded font-medium">Confirm & Pay</button>
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-white/6 text-white rounded">Back</button>
      </div>
    </div>
  )
}

export default Checkout
