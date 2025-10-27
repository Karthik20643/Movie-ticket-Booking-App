// ...existing code...
import React from 'react'
import { dummyShowsData } from '../assets/assets'
import MovieCard from '../components/MovieCard'

const Movies = () => {
  return dummyShowsData.length > 0 ? (
    <div className="max-w-7xl mx-auto px-6 py-12 flex items-start gap-12">
      {/* left text column (aligned left beside poster) */}
      <div className="w-1/2 text-left">
        <h2 className="text-2xl font-semibold text-white">English Movie</h2>
      </div>

      {/* right column for poster/image */}
      <div className="w-1/2 flex justify-end">
        {/* poster area */}
      </div>

      {/* movie cards grid — gap works because this container is a grid with gap-5 */}
      <h1 className='text-lg font-medium my-4 w-1/2'> Now showing </h1>
      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {dummyShowsData.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  ) : (
    <div />
  )
}

export default Movies
// ...existing code...