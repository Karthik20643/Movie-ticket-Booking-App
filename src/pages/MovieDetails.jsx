import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'

const MovieDetails = () => {
  const { id } = useParams()
  const [show, setshow] = useState(null)

  const getshow = () => {
    const found = dummyShowsData.find(
      s => String(s.id) === String(id) || String(s._id) === String(id)
    )
    setshow({
      movie: found ?? null,
      date_time: dummyDateTimeData
    })
  }

  useEffect(() => {
    getshow()
  }, [id])

  if (!show || !show.movie) return <div className="">loading ...</div>

  return (
    <div className="">
      <div className="">{/* header / poster area */}</div>

      <div className="">
        {typeof show.movie.vote_average === 'number'
          ? `${show.movie.vote_average.toFixed(1)} user_rating`
          : '— user_rating'}
      </div>

      <p className="text-gray-400 mt-2 text-sm leading-tight max-w-x1">
        {show.movie.overview}
      </p>
      <p>{timeFormat(show.movie.runtime)}</p>

      <div>
        {dummyShowsData.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  )
}

export default MovieDetails