import React from 'react'
import { useNavigate } from 'react-router-dom'

const PLACEHOLDER = '/placeholder-poster.jpg'

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()
  if (!movie) return null

  const id = movie.id ?? movie._id ?? ''
  const title = movie.title || movie.name || 'Untitled'

  const releaseDate = movie.release_date || movie.releaseDate || ''
  let year = ''
  if (releaseDate) {
    const d = new Date(releaseDate)
    if (!Number.isNaN(d.getTime())) year = String(d.getFullYear())
  }

  const imagePath = movie.backdrop_path || movie.poster_path || movie.poster || movie.backdrop || ''
  const imageUrl = imagePath
    ? (imagePath.startsWith('http') ? imagePath : `https://image.tmdb.org/t/p/w500${imagePath.startsWith('/') ? '' : '/'}${imagePath}`)
    : PLACEHOLDER

  return (
    <div
      className="flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-64 cursor-pointer"
      onClick={() => navigate(`/MovieDetails/${id}`)}
    >
      <img
        src={imageUrl}
        alt={title}
        className="rounded-lg h-52 w-full object-cover object-right-bottom"
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = PLACEHOLDER
        }}
      />
      <p className="mt-3 font-medium text-white">{title}</p>
      <p className="text-sm text-gray-300 mt-2">{year || '—'}</p>
    </div>
  )
}

export default MovieCard