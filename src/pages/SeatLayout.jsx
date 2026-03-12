import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import { ClockIcon } from 'lucide-react'
import isoTimeFormat from '../lib/isoTimeFormat'

const SeatLayout = () => {
    const groupRows  = [["A, B"],["C","D"],["E","F"],["G","H"],]

const { id, date } = useParams()
const [selectedSeats, setSelectedSeats] = useState([])
const [selectedTime, setSelectedTime] = useState(null)
const [show, setShow] = useState(null)

const navigate = useNavigate()

const getShow = async () => {
    const foundShow = dummyShowsData.find(s => s.id === id)
    if (foundShow) { setShow({ movie: foundShow, dateTime: dummyDateTimeData }) }
}


const handleSeatClick = (seatId) => {
    
    setSelectedSeats(prev =>
        prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    )
}

const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
        <div className="flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: count }, (_, i) => {
                const seatId = `${row}${i + 1}`
                return (
                    <button
                        key={seatId}
                        onClick={() => handleSeatClick(seatId)}
                        className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${selectedSeats.includes(seatId) ? "bg-primary text-white" : ""}`}
                    >
                        {seatId}
                    </button>
                )
            })}
        </div>
    </div>
)

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
      <img src={assets.screenImage} alt="screen" />
      <p className='text-gray-400 text-sm mb-6'>SCREEN SIDE</p>
      <div className='flex flex-col items-center gap-1'>
        {renderSeats('A')}
        {renderSeats('B')}
        {renderSeats('C')}
        {renderSeats('D')}
        {renderSeats('E')}
        {renderSeats('F')}
        {renderSeats('G')}
        {renderSeats('H')}
      </div>
    </div>
  </div>
) : (<Loading/>)

}

export default SeatLayout
