import { ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import MovieCard from './MovieCard'
import { dummyShowsData } from '../assets/assets'

const FeaturedSection = ({ movies }) => {
  const navigate = useNavigate()
  const [showCenterButton, setShowCenterButton] = useState(false)

  // use passed movies if available, otherwise use movies from assets/dummyShowsData
  const [list, setList] = useState((movies && movies.length) ? movies : dummyShowsData.slice(0, 8))

  useEffect(() => {
    if (movies && movies.length) setList(movies)
  }, [movies])

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setShowCenterButton(!entry.isIntersecting)
      },
      { root: null, threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-visible relative z-10">
      <div className="relative flex items-center justify-between pt-8 pb-6">
        <h2 className="text-white text-lg font-semibold">Now Showing</h2>

        {/* View All - stays visible in header of this section */}
        <button
          onClick={() => navigate('/movies')}
          aria-label="View all movies"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-full shadow-md hover:bg-primary-dull transition"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* cards grid */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {list.map((m) => (
          <MovieCard key={m.id ?? m._id} movie={m} />
        ))}
      </div>

      {/* centered "View more" button that appears only after scrolling a little past the hero */}
      <div className="flex flex-col items-center mt-8">
        <div className="-mt-12 md:-mt-20 w-full flex justify-center">
            {/* <button
              onClick={() => navigate('/movies')}
              aria-label="View more movies"
              className={`flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full shadow-lg transition-transform duration-300 transform
                ${showCenterButton ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-6 pointer-events-none'}`}
            >
              View more
              <ArrowRight className="w-4 h-4" />
            </button> */}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate('/moviedetails')}
            className="px-10 py-3.5 m-5  text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
          >
            Show more
          </button>
        </div>
      </div>

      {/* spacer so following content sits below */}
      <div className="h-6 md:h-10" />
    </section>
  )
}

export default FeaturedSection