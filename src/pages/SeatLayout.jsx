import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import { ClockIcon } from 'lucide-react'
import isoTimeFormat from '../lib/isoTimeFormat'

const seatRows = [
  { label: 'A', sections: [2, 3, 2], width: '72%' },
  { label: 'B', sections: [2, 3, 2], width: '76%' },
  { label: 'C', sections: [3, 4, 3], width: '82%' },
  { label: 'D', sections: [3, 4, 3], width: '86%' },
  { label: 'E', sections: [4, 4, 4], width: '92%' },
  { label: 'F', sections: [4, 5, 4], width: '96%' },
  { label: 'G', sections: [4, 5, 4], width: '100%' },
  { label: 'H', sections: [4, 5, 4], width: '100%' },
]

const seatBaseClass = 'h-8 w-8 rounded-lg border border-primary/60 text-xs transition cursor-pointer sm:h-9 sm:w-9'

const SeatLayout = () => {
const { id, date } = useParams()
const [selectedSeats, setSelectedSeats] = useState([])
const [selectedTime, setSelectedTime] = useState(null)
const [show, setShow] = useState(null)

const getShow = async () => {
    const foundShow = dummyShowsData.find(s => s.id === id)
    if (foundShow) { setShow({ movie: foundShow, dateTime: dummyDateTimeData }) }
}


const handleSeatClick = (seatId) => {
    setSelectedSeats(prev =>
        prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    )
}

const renderSeatBlock = (rowLabel, startIndex, count) => (
  <div className='flex items-center justify-center gap-2'>
    {Array.from({ length: count }, (_, index) => {
      const seatId = `${rowLabel}${startIndex + index}`
      const isSelected = selectedSeats.includes(seatId)

      return (
        <button
          key={seatId}
          onClick={() => handleSeatClick(seatId)}
          className={`${seatBaseClass} ${isSelected ? 'bg-primary text-white shadow-[0_0_18px_rgba(248,69,101,0.35)]' : 'bg-white/5 hover:bg-primary/10'}`}
        >
          {seatId}
        </button>
      )
    })}
  </div>
)

const renderSeatRow = ({ label, sections, width }) => {
  let seatNumber = 1

  return (
    <div key={label} className='flex items-center gap-3' style={{ width }}>
      <span className='w-5 text-sm font-semibold text-white/70'>{label}</span>
      <div className='flex flex-1 items-center justify-center gap-3 sm:gap-4'>
        {sections.map((sectionCount, index) => {
          const section = renderSeatBlock(label, seatNumber, sectionCount)
          seatNumber += sectionCount

          return (
            <React.Fragment key={`${label}-${index}`}>
              {section}
              {index < sections.length - 1 && <div className='h-8 w-3 rounded-full bg-white/5 sm:w-5' />}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

useEffect(() => {
    getShow()
}, [])

return show ? (
  <div className='flex flex-col md:flex-row gap-8 px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
    <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
      <p className='text-lg font-semibold px-6'>available timings</p>
      {show.dateTime[date].map((item) => (
        <div key={item.time} onClick={() => setSelectedTime(item)} className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime?.time === item.time ? "bg-primary/20" : ""}`}>
          <ClockIcon className='w-4 h-4'/>
          <p className='text-sm'>{isoTimeFormat(item.time)}</p>
        </div>
      ))}
    </div>
    <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
      <BlurCircle top="-100px" left="-100px"/>
      <BlurCircle bottom="0px" right="0px"/>
      <h1 className='text-2xl font-semibold mb-4'>Select your seat</h1>
      <div className='mb-4 flex w-full max-w-4xl flex-col items-center'>
        <img src={assets.screenImage} alt="screen" className='w-full max-w-2xl drop-shadow-[0_18px_40px_rgba(248,69,101,0.18)]' />
        <p className='text-gray-400 text-sm mt-2'>SCREEN THIS SIDE</p>
      </div>
      <div className='mb-6 flex flex-wrap items-center justify-center gap-4 text-sm text-white/70'>
        <div className='flex items-center gap-2'>
          <span className='h-4 w-4 rounded border border-primary/60 bg-white/5' />
          <span>Available</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='h-4 w-4 rounded border border-primary/60 bg-primary' />
          <span>Selected</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='h-4 w-4 rounded-full bg-white/10' />
          <span>Aisle</span>
        </div>
      </div>
      <div className='w-full max-w-5xl rounded-3xl border border-white/10 bg-white/5 px-3 py-6 backdrop-blur-sm sm:px-6'>
        <div className='flex flex-col items-center gap-3'>
          {seatRows.map(renderSeatRow)}
        </div>
      </div>
    </div>
  </div>
) : (<Loading/>)

}

export default SeatLayout
