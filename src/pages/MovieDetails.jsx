import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
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
  const runtime = timeFormat(m.runtime)

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
            {(() => {
              const showId = String(m._id ?? m.id ?? '')
              const times = Array.isArray(show.date_time)
                ? show.date_time.filter(t => {
                    const candidate = String(t.showId ?? t.movieId ?? t.id ?? t.show_id ?? '')
                    return candidate === showId
                  })
                : []

              return (
                <ul className="text-sm text-gray-400 list-disc pl-5">
                  {times.map((t, i) => {
                    const timeVal = t.time ?? t.start ?? t.showTime ?? t.time_str ?? ''
                    const note = t.note ?? t.desc ?? t.description ?? ''
                    return (
                      <li key={i} className="mb-1">
                        <span className="font-medium text-white">{timeVal || JSON.stringify(t)}</span>
                        {note ? <span className="text-gray-400 ml-2">— {note}</span> : null}
                      </li>
                    )
                  })}
                </ul>
              )
            })()}

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
                <Heart className="w-5 h-5 text-white" />
              </button>
            </div>
            <div>
              <a href="">Your Favourite Cast</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails