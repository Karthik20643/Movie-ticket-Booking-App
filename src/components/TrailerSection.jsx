import React, { useEffect, useState } from 'react'
import { dummyTrailers, assets } from '../assets/assets'
import ReactPlayer from 'react-player'

const PLACEHOLDER = assets?.screenImage || '/placeholder-poster.jpg'

function normalizeImage(src) {
  if (!src) return PLACEHOLDER
  if (src.startsWith('http') || src.startsWith('/')) return src
  return `${process.env.PUBLIC_URL}/${src}`
}

const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(null)
  const [showPlayer, setShowPlayer] = useState(false)

  useEffect(() => {
    if (!Array.isArray(dummyTrailers) || dummyTrailers.length === 0) {
      setCurrentTrailer(null)
      return
    }

    const candidate = dummyTrailers.find(t => Boolean(t.videoUrl || t.url || t.src)) ?? dummyTrailers[0]
    const url = candidate?.videoUrl ?? candidate?.url ?? candidate?.src ?? ''
    setCurrentTrailer({ ...candidate, resolvedUrl: url })
  }, [])

  if (!currentTrailer) {
    return (
      <div className="px-6 md:px-16 lg:px-24">
        <p className="text-gray-400">No trailer available. Check console for debug logs.</p>
      </div>
    )
  }

  const thumb = currentTrailer.image || currentTrailer.thumbnail || currentTrailer.poster || ''
  const thumbUrl = normalizeImage(thumb)
  const url = currentTrailer.resolvedUrl || ''

  return (
    <div className="px-6 md:px-16 lg:px-24">
      <p className="text-white mb-2">Trailers</p>
      <p className="text-xs text-gray-400 mb-4 break-all">Using: {url || '(no url)'}</p>

      <div className="relative">
        {/* preview / player */}
        {!showPlayer && thumbUrl ? (
          <div
            className="relative w-full h-60 md:h-96 bg-gray-800 cursor-pointer overflow-hidden rounded"
            onClick={() => setShowPlayer(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setShowPlayer(true) }}
          >
            <img
              src={thumbUrl}
              alt={currentTrailer.title || 'trailer thumbnail'}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center text-white text-lg">
                ▶
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full" style={{ height: 360 }}>
            <ReactPlayer
              url={url}
              controls
              width="100%"
              height="100%"
              config={{
                file: {
                  attributes: {
                    poster: thumbUrl || undefined
                  }
                }
              }}
            />
          </div>
        )}
      </div>

      {/* thumbnails grid below player - thumbnails now normalized and have hover effect */}
      <div className="grid grid-cols-4 md:gap-8 gap-4 mt-8 max-w-3xl mx-auto">
        {dummyTrailers.map((trailer, idx) => {
          const resolved = trailer.videoUrl ?? trailer.url ?? trailer.src ?? ''
          const image = normalizeImage(trailer.image || trailer.thumbnail || trailer.poster)
          return (
            <div
              key={trailer.id ?? idx}
              className="cursor-pointer overflow-hidden rounded-lg transform transition-transform duration-200 hover:scale-105 hover:brightness-110"
              onClick={() => {
                setCurrentTrailer({ ...trailer, resolvedUrl: resolved })
                setShowPlayer(true)
              }}
            >
              <img
                src={image}
                alt={trailer.title ?? `Trailer ${idx + 1}`}
                className="rounded-lg w-full h-20 md:h-24 object-cover"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TrailerSection