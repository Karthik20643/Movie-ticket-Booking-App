import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const PLACEHOLDER = assets?.screenImage || '/placeholder-poster.jpg'
const TMDB_BASE = 'https://image.tmdb.org/t/p/w500'

function formatMinutes(mins) {
  if (!mins || Number.isNaN(Number(mins))) return ''
  const m = Number(mins)
  const h = Math.floor(m / 60)
  const r = m % 60
  return `${h > 0 ? h + 'h' : ''}${h > 0 && r > 0 ? ' ' : ''}${r > 0 ? r + 'm' : ''}`.trim()
}

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()
  if (!movie) return null

  const m = movie.movie ?? movie
  const id = m.id ?? m._id ?? ''
  const title = m.title || m.name || 'Untitled'
  const year = (m.release_date || m.year || '').toString().slice(0, 4) || '—'
  const genres = Array.isArray(m.genres) ? m.genres.slice(0, 2).map(g => g.name || g).join(', ') : ''

  // common runtime fields: runtime, duration, length, runtimeMinutes, runtime_minutes, run_time
  const minutes = m.runtime ?? m.duration ?? m.length ?? m.runtimeMinutes ?? m.runtime_minutes ?? m.run_time ?? m.runTime ?? 0
  const timeStr = formatMinutes(minutes)

  const imagePath = (m.poster_path || m.backdrop_path || m.poster || m.backdrop || '').toString()
  const imageUrl = imagePath ? (imagePath.startsWith('http') ? imagePath : `${TMDB_BASE}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`) : PLACEHOLDER

  return (
    <article className="rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-800 shadow-xl w-full">
      <Link to={`/MovieDetails/${id}`} className="block">
        <div className="w-full h-44 md:h-48 bg-gray-800 relative">
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER }}
          />
        </div>
      </Link>

      <div className="p-4 md:p-5">
        <h3 className="text-sm md:text-base text-white font-semibold leading-tight mb-2 line-clamp-2">
          {title}
        </h3>

        <p className="text-xs text-gray-400 mb-4">
          {year}{genres ? ` · ${genres}` : ''}{timeStr ? ` · ${timeStr}` : ''}
        </p>

        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/MovieDetails/${id}`)}
            className="px-4 py-2 bg-primary text-white text-sm rounded-full shadow-md hover:brightness-95 transition"
          >
            Buy Ticket
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="font-medium">4.5</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default MovieCard