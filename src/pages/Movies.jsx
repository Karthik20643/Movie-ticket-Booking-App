import React from 'react'
import { dummyShowsData } from '../assets/assets'
import MovieCard from '../components/MovieCard'

const Movies = () => {
  return dummyShowsData.length > 0 ? (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* top row: left text + right poster */}
      <div className="flex items-start gap-12">
        <div className="w-1/2 text-left">
          <h2 className="text-2xl font-semibold text-white">English Movie</h2>
        </div>

        <div className="w-1/2 flex justify-end">
          {/* poster area */}
        </div>
      </div>

      {/* Now showing + cards below (full width of container) */}
      <section className="mt-8">
        <h1 className="text-lg font-medium mb-4">Now showing</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {dummyShowsData.map((movie) => (
            <MovieCard movie={movie} key={movie._id} />
          ))}
        </div>
      </section>
    </div>
  ) : (
    <div className="text-lg font-medium mb-4" No shows currently available/>
  )
}

export default Movies