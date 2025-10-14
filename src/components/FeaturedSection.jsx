import { ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const FeaturedSection = () => {
  const navigate = useNavigate()
  const [showCenterButton, setShowCenterButton] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const threshold = 80 // how far past hero to show the centered button
    const onScroll = () => {
      const heroBottom = hero.getBoundingClientRect().bottom + window.scrollY - window.innerHeight + 0
      // show when we've scrolled slightly past hero bottom
      setShowCenterButton(window.scrollY > hero.offsetTop + hero.offsetHeight - threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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

      {/* centered "View more" button that appears only after scrolling a little past the hero */}
      <div className="flex justify-center">
        <div className="-mt-12 md:-mt-20 w-full flex justify-center">
          <button
            onClick={() => navigate('/movies')}
            aria-label="View more movies"
            className={`flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full shadow-lg transition-transform duration-300 transform
              ${showCenterButton ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-6 pointer-events-none'}`}
          >
            View more
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* spacer so following content sits below */}
      <div className="h-6 md:h-10" />
    </section>
  )
}

export default FeaturedSection