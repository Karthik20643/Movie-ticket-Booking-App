import React from 'react'
import { useLocation } from 'react-router-dom'

const MyBookings = () => {
  const { state } = useLocation()

  if (!state) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-white">
        <h2 className="text-xl font-semibold">My Bookings</h2>
        <p className="text-gray-400 mt-2">You have no recent bookings in this session.</p>
      </div>
    )
  }

  const { movie, showId, date, time, seats } = state

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-white">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

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
    </div>
  )
}

export default MyBookings