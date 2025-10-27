// ...existing code...
import React from 'react'
import MovieCard from '../components/MovieCard'
import { dummyShowsData } from '../assets/assets'
const MovieDetails = () => {    
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