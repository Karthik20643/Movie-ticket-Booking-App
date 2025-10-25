import React from 'react'
import { Play } from 'lucide-react'
import { dummyTrailers } from '../assets/assets'

const TrailerSection = ({ trailers = [] }) => {
  const list = (trailers && trailers.length) ? trailers : dummyTrailers

  return (
    <section className="trailer-section px-6 md:px-16 lg:px-24 xl:px-44 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-lg font-semibold">Trailers</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {list.length ? (
          list.map((t, i) => (
            <a
              key={t.videoUrl ?? t.image ?? i}
              href={t.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg overflow-hidden bg-zinc-900 block"
              aria-label={`Open trailer: ${t.title ?? `Trailer ${i + 1}`}`}
            >
              <div className="relative w-full h-44 md:h-48 bg-gray-800">
                <img
                  src={t.image}
                  alt={t.title ?? `Trailer ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-black/50 text-white opacity-95 transition-transform duration-200 group-hover:scale-110">
                    <Play className="w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="p-3">
                {t.title && <h3 className="text-sm text-white font-medium truncate">{t.title}</h3>}
                {t.channel && <p className="text-xs text-gray-400 mt-1">{t.channel}</p>}
              </div>
            </a>
          ))
        ) : (
          <p className="text-gray-400">No trailers available</p>
        )}
      </div>
    </section>
  )
}

export default TrailerSection