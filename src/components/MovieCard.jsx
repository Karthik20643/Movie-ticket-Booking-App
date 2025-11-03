import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Star } from 'lucide-react'

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

  // runtime fields
  const minutes = m.runtime ?? m.duration ?? m.length ?? m.runtimeMinutes ?? m.runtime_minutes ?? m.run_time ?? m.runTime ?? 0
  const timeStr = formatMinutes(minutes)

  const imagePath = (m.poster_path || m.backdrop_path || m.poster || m.backdrop || '').toString()
  const imageUrl = imagePath ? (imagePath.startsWith('http') ? imagePath : `${TMDB_BASE}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`) : PLACEHOLDER

  // rating fallback (fixed syntax error)
  const ratingRaw = m.vote_average ?? m.rating ?? m.score ?? 0
  const rating = typeof ratingRaw === 'number'
    ? (Math.round(ratingRaw * 10) / 10).toString()
    : String(ratingRaw).slice(0, 3)

  return (
    <article
      className="rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-800 shadow-xl w-full transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl will-change-transform"
      aria-hidden="false"
    >
      <Link to={`/moviedetails/${id}`} className="block">
        <div className="w-full h-40 md:h-48 bg-gray-800 relative">
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
            type="button"
            onClick={() => navigate(`/moviedetails/${id}`)}
            className="px-4 py-2 bg-primary text-white text-sm rounded-full shadow-md hover:brightness-95 active:scale-95 active:shadow-sm transition cursor-pointer"
          >
            Buy Ticket
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Star className="w-4 h-4 text-red-400" aria-hidden="true" />
            <span className="font-medium">{rating}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default MovieCard