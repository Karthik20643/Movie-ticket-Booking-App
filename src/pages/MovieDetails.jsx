import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import DateSelect from '../components/dateselect'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import { Heart, PlayCircleIcon } from 'lucide-react'

function timeFormat(mins) {
  if (mins === null || mins === undefined || Number.isNaN(Number(mins))) return ''
  const m = Math.max(0, Math.floor(Number(mins)))
  const h = Math.floor(m / 60)
  const r = m % 60
  return `${h > 0 ? h + 'h' : ''}${h > 0 && r > 0 ? ' ' : ''}${r > 0 ? r + 'm' : ''}`.trim()
}

const MovieDetails = () => {
  const { id } = useParams()
  const [show, setShow] = useState(null)

  useEffect(() => {
    const found = dummyShowsData.find(
      (s) => String(s.id) === String(id) || String(s._id) === String(id)
    )
    console.debug('MovieDetails: found movie=', found, 'raw date_time=', dummyDateTimeData)
    setShow(found ? { movie: found, date_time: dummyDateTimeData } : null)
  }, [id])

  if (!show || !show.movie) return <div className="p-6 text-gray-400">loading ...</div>

  const m = show.movie
  const year = (m.release_date || '').slice(0, 4) || '—'
  const genres = Array.isArray(m.genres) ? m.genres.map(g => g.name || g).join(', ') : ''
  const runtime = timeFormat ? timeFormat(m.runtime) : ''

  // compute showId and showTimes once and use below
  const showId = String(m._id ?? m.id ?? '')
  const showTimes = Array.isArray(show.date_time)
    ? show.date_time.filter(t => {
        const candidate = String(t.showId ?? t.movieId ?? t.id ?? t.show_id ?? t.movie_id ?? '')
        return candidate === showId
      })
    : []

  // debug — inspect what's actually in date_time and why filter may be empty
  console.debug('MovieDetails showId:', showId, 'filtered showTimes:', showTimes, 'raw date_time:', show.date_time)

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 pt-24 md:pt-28">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <MovieCard movie={m} />
        </div>

        <div className="md:w-2/3 text-white">
          <h1 className="text-2xl font-bold mb-2">{m.title || m.name}</h1>
          <p className="text-sm text-gray-400 mb-3">{year}{genres ? ` · ${genres}` : ''}{runtime ? ` · ${runtime}` : ''}</p>
          <p className="text-gray-300 leading-relaxed">{m.overview}</p>

          <div className="mt-6">
            {/* mounted DateSelect - shows only times for this movie; handle selection via onSelect */}
            <DateSelect
              // while debugging, fall back to raw list so the selector renders and you can inspect items
              dateTime={showTimes.length ? showTimes : (Array.isArray(show.date_time) ? show.date_time : [])}
               id={showId}
               onSelect={(selected) => {
                 console.debug('selected date/time:', selected)
                 // add handler logic here (e.g. set local state or open booking modal)
               }}
             />

            {/* action buttons */}
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-full shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-0.5"
                aria-label="Watch trailer"
              >
                <PlayCircleIcon className="w-5 h-5" />
                <span>Watch Trailer</span>
              </button>

              <a
                href="#buy"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/6 text-white text-sm font-medium rounded-full border border-white/10 hover:bg-white/10 transition"
                aria-label="Buy tickets"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7 4h10v2H7V4zm0 4h10v2H7V8zm-2 8h14v2H5v-2z" />
                </svg>
                <span>Buy Tickets</span>
              </a>

              <button
                type="button"
                aria-label="Add to favorites"
                className="p-2 rounded-full bg-primary hover:bg-primary-dull transition shadow-sm"
              >
                <Heart className="w-5 h-8 text-white" />
              </button>
            </div>  
            <div>
              <h4 className="text-white font-medium mb-2">Your Favourite Cast</h4>
              <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
                <div className="flex items-center gap-8 w-max px-4">
                  {(show.movie.casts || []).slice(0, 10).map((cast, index) => (
                    <div key={index} className="flex flex-col items-center text-center min-w-[72px]">
                      <img
                        src={cast.profile_path || '/placeholder-poster.jpg'}
                        alt={cast.name || ''}
                        className="rounded-full h-20 w-20 object-cover"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/placeholder-poster.jpg' }}
                      />
                      <p className="text-sm text-white mt-2">{cast.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails