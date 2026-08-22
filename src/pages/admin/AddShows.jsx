import React, { useMemo, useState } from 'react'
import { CalendarDays, Clock3, IndianRupee, Plus, Star } from 'lucide-react'
import { dummyShowsData } from '../../assets/assets'

const formatVotes = (value) => {
  if (!value) return '0 Votes'
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k Votes`
  return `${value} Votes`
}

const AddShows = () => {
  const movies = useMemo(() => dummyShowsData || [], [])
  const [selectedMovieId, setSelectedMovieId] = useState(movies[0]?._id || movies[0]?.id || null)
  const [showPrice, setShowPrice] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedSlots, setSelectedSlots] = useState([])
  const [message, setMessage] = useState('')

  const selectedMovie = movies.find(
    (movie) => String(movie._id || movie.id) === String(selectedMovieId)
  )

  const handleMovieSelect = (movieId) => {
    setSelectedMovieId(movieId)
    setSelectedDate('')
    setSelectedTime('')
    setSelectedSlots([])
    setMessage('')
  }

  const handleAddTime = () => {
    if (!selectedDate || !selectedTime) return

    const slot = `${selectedDate} ${selectedTime}`
    setSelectedSlots((current) => {
      if (current.includes(slot)) return current
      return [...current, slot]
    })
    setSelectedTime('')
  }

  const handleAddShow = () => {
    if (!selectedMovie) {
      setMessage('Please select a movie first.')
      return
    }

    if (!showPrice.trim() || !selectedSlots.length) {
      setMessage('Please enter the price and at least one date/time.')
      return
    }

    setMessage(`Show added successfully for ${selectedMovie.title}.`)
    setShowPrice('')
    setSelectedDate('')
    setSelectedTime('')
    setSelectedSlots([])
  }

  return (
    <div className="min-h-full bg-[#05070b] px-2 py-4 text-white md:px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white md:text-3xl">Add Shows</h1>
      </div>

      <div className="space-y-5">
        <div>
          <h2 className="mb-4 text-xl font-medium text-white">Now Playing Movies</h2>

          <div className="flex gap-4 overflow-x-auto pb-4">
            {movies.map((movie) => {
              const movieId = String(movie._id || movie.id)
              const isSelected = selectedMovieId === movieId
              const imageUrl = movie.poster_path || movie.backdrop_path

              return (
                <article
                  key={movieId}
                  className="group relative w-[180px] shrink-0 overflow-hidden rounded-2xl border border-white/5 bg-[#0d1117] shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
                >
                  <button
                    type="button"
                    onClick={() => handleMovieSelect(movieId)}
                    className={`absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-[6px] border transition duration-200 ${
                      isSelected
                        ? 'border-red-400 bg-red-500 text-white shadow-lg shadow-red-900/30'
                        : 'border-white/20 bg-black/25 text-transparent'
                    }`}
                    aria-label={`Select ${movie.title}`}
                  >
                    {isSelected && <span className="text-sm font-bold">✓</span>}
                  </button>

                  <div className="relative h-[250px] w-full overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={movie.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-2 px-2 pb-3 pt-2">
                    <div className="flex items-center justify-between text-[11px] text-gray-200">
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-red-500 text-red-500" />
                        <span>{Number(movie.vote_average || 0).toFixed(1)}</span>
                      </div>
                      <span className="text-gray-400">{formatVotes(movie.vote_count)}</span>
                    </div>

                    <div className="truncate text-sm font-medium text-white">{movie.title}</div>
                    <div className="text-xs text-gray-400">{movie.release_date}</div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        {selectedMovie && (
          <div className="max-w-md rounded-2xl border border-red-500/30 bg-[#120d0f] p-4 shadow-[0_12px_30px_rgba(255,0,0,0.12)]">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-gray-300">Selected Movie</div>
              <div className="rounded-full border border-red-500/50 bg-red-500/10 px-2 py-1 text-xs text-red-300">
                {selectedMovie.title}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-gray-300">Show Price</label>
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                  <IndianRupee className="h-4 w-4 text-white/70" />
                  <input
                    type="number"
                    min="0"
                    value={showPrice}
                    onChange={(e) => setShowPrice(e.target.value)}
                    placeholder="Enter price"
                    className="w-full bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">Select Date and Time</label>

                <div className="space-y-3 rounded-lg border border-white/10 bg-black/10 p-3">
                  <div className="flex items-center gap-2 rounded-md border border-white/10 bg-[#1a1a1f] px-3 py-2">
                    <CalendarDays className="h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-transparent text-white focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 rounded-md border border-white/10 bg-[#1a1a1f] px-3 py-2">
                    <Clock3 className="h-4 w-4 text-gray-400" />
                    <input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full bg-transparent text-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleAddTime}
                    className="flex w-full items-center justify-center gap-2 rounded-md border border-red-500/50 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-200 transition hover:bg-red-500/20"
                  >
                    <Plus className="h-4 w-4" />
                    Add Time
                  </button>
                </div>
              </div>

              <div>
                <div className="mb-2 text-sm text-gray-300">Selected Date-Time</div>
                <div className="space-y-2 rounded-lg border border-white/10 bg-[#1d1d1f] p-3">
                  {selectedSlots.length > 0 ? (
                    selectedSlots.map((slot) => (
                      <div key={slot} className="flex items-center justify-between rounded-md bg-black/20 px-2 py-2 text-sm text-gray-200">
                        <span>{slot}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">No time slot selected yet.</div>
                  )}
                </div>
              </div>

              {message && (
                <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
                  {message}
                </div>
              )}

              <button
                type="button"
                onClick={handleAddShow}
                className="w-full rounded-md bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-400"
              >
                Add Show
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddShows
