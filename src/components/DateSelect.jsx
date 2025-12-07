import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const DateSelect = ({ dateTime = [], id, onSelect = () => {}, onBook = () => {} }) => {
  const sampleDates = [
    { date: '2025-07-24', label: 'Morning' },
    { date: '2025-07-25', label: 'Noon' },
    { date: '2025-07-26', label: 'Evening' },
    { date: '2025-07-27', label: 'Night' },
    { date: '2025-07-28', label: 'Late' }
  ]

  const list = Array.isArray(dateTime) && dateTime.length ? dateTime : sampleDates

  const [selected, setSelected] = useState(list[0] ?? null)
  const listRef = useRef(null)
  const itemRefs = useRef([])
  const navigate = useNavigate()

  const handleBook = () => {
    if (!selected) {
      alert('Please select a date')
      return
    }
    const slug = typeof selected === 'object' ? (selected.date ?? selected.label) : String(selected)
    navigate(`/movies/${id}/${encodeURIComponent(slug)}`)
    window.scrollTo(0, 0)
    onBook(selected)
  }

  useEffect(() => {
    setSelected(list[0] ?? null)
  }, [id, dateTime])

  useEffect(() => {
    const idx = list.indexOf(selected)
    if (idx >= 0 && itemRefs.current[idx]) {
      itemRefs.current[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [selected, list])

  const handleSelect = (d) => {
    setSelected(d)
    onSelect(d)
  }

  const scrollBy = (dir = 1) => {
    if (!listRef.current) return
    const el = listRef.current
    el.scrollBy({ left: (el.clientWidth / 2) * dir, behavior: 'smooth' })
  }

  const toDayMonth = (d) => {
    const dateVal = typeof d === 'object' ? (d.date ?? d.time ?? d.start ?? null) : String(d)
    const dt = dateVal ? new Date(dateVal) : null
    return {
      day: dt ? dt.getDate() : '',
      month: dt ? dt.toLocaleString('en-US', { month: 'short' }) : ''
    }
  }

  return (
    <div className="w-full rounded-xl bg-gradient-to-r from-black/30 via-black/20 to-black/10 p-1">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-white">Choose Date</h3>
        <button
          type="button"
          onClick={handleBook}
          className="ml-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium shadow"
        >
          Book Now
        </button>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Previous"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div
          ref={listRef}
          className="flex gap-2.5 overflow-x-auto no-scrollbar px-4 py-1.5 scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {list.map((d, i) => {
            const { day, month } = toDayMonth(d)
            const label =
              typeof d === 'object' ? (d.label ?? d.time ?? d.start ?? d.date ?? d.time_str ?? '') : String(d)
            const isSelected = selected === d

            return (
              <button
                key={i}
                ref={(el) => (itemRefs.current[i] = el)}
                type="button"
                onClick={() => handleSelect(d)}
                className={`min-w-[70px] flex-shrink-0 flex flex-col items-center gap-1 px-2 py-1.5 rounded-full text-center transition-transform duration-150
                  ${isSelected ? 'bg-primary text-white scale-105 shadow-lg' : 'bg-white/5 text-gray-200 hover:bg-white/10'}`}
              >
                {day ? (
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold leading-none">{day}</span>
                    <span className="text-xs uppercase">{month}</span>
                  </div>
                ) : null}
                <div className="text-xs truncate max-w-[72px]">{label}</div>
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Next"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default DateSelect