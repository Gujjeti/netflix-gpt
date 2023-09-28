import React from 'react'
import HeadingTitle from './HeadingTitle'

const MovieCard = ({movie}) => {
  return (
<>

    
<div className=" rounded overflow-hidden shadow-lg bg-white ">
  <img className="w-full" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="Sunset in the mountains"/>

  
</div>
</>

   
  )
}

export default MovieCard
