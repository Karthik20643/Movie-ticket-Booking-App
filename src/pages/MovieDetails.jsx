// ...existing code...
import React, { useState } from 'react'
import MovieCard from '../components/MovieCard'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import { useParams } from 'react-router'
const MovieDetails = () => {    
  const {id} = useParams()
    const[show, setshow] = useState(null);
    const getshow = async()=>{
      const show = dummyShowsData.find(show=> show.id === id)
      setshow({
        movie:show,
        date_time:dummyDateTimeData
      })
    }
  return (
    <div>
        <p>moviedetails</p>
        
<div >
  {dummyShowsData.map((movie)=>(
            <MovieCard movie = {movie} key={movie._id} />

  ))}
  
  </div>   </div>
  )
}

export default MovieDetails
// ...existing code...