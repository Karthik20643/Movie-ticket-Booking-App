import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'

const SeatLayout = () => {

const {id,date}  = useParams() 
const [SelectedSeats,setSelectedSeats] = useState([])
const[SelectedTime,setSelectedTime] = useState(null)
const[show,setShow] = useState(null) 

const navigate  = useNavigate()

const getShow =  async () => {

    const show = dummyShowsData.find(show => show.id === id)
    if(show) {   setShow({movie:show,dateTime : dummyDateTimeData})}
    

}




  return (
    <div>
      <p>seatlayout</p>
    </div>
  )
}

export default SeatLayout