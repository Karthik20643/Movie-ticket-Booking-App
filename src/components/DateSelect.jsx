import React, { useState, useEffect } from 'react'

const DateSelect = ({ dateTime = [], id, onSelect = () => {} }) => {
  const [selected, setSelected] = useState(dateTime[0] ?? null)

  useEffect(() => {
    setSelected(dateTime[0] ?? null)
  }, [dateTime])

  const handleSelect = (d) => {
    setSelected(d)
    onSelect(d)
  }

  return (
    <div id="DateSelect" className="pt-4">
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
        {dateTime.length ? (
          dateTime.map((d, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSelect(d)}
              className={`min-w-[88px] px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                ${selected === d ? 'bg-primary text-white shadow-md' : 'bg-white/5 text-gray-200 hover:bg-white/10'}`}
            >
              {/* try common fields (time/date) or fallback to string */}
              {d.time ?? d.start ?? d.date ?? String(d)}
            </button>
          ))
        ) : (
          <div className="text-sm text-gray-400">No dates available</div>
        )}
      </div>
    </div>
  )
}

export default DateSelect