import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { API_OPTIONS } from '../utils/constants';

const VideoInBackground =  () => {
    const [trailerId, setTrailerId] = useState(null)


    const moviesData = useSelector((state) => state.movies?.nowPlayingMovies);
   const LatestMovie = moviesData && moviesData[0];


    useEffect(() =>{

        
         
           if(LatestMovie) {
            const getmovieVideos = async () =>{
                const videos = await fetch(`https://api.themoviedb.org/3/movie/${LatestMovie.id}/videos?language=en-US`, API_OPTIONS);
                const json = await videos.json();
    
                const trailerVideo =  json.results.filter((item) => {
                    return item.type === "Trailer"
                })
    
                setTrailerId(trailerVideo[0]?.key)
            }

            getmovieVideos()
           }

    },[LatestMovie])

    if(!moviesData){
        return <h1 className='text-4xl text-white font-bold text-center mt-10'>Loading...</h1>
    }
  
   
  
  return (
    <div className='w-screen overflow-hidden relative iframevideo_frame  before:absolute before:top-0 before:w-full before:h-full before:pointer-events-none'>
    <iframe width="100%" className='aspect-video' src={`https://www.youtube.com/embed/${trailerId}?&autoplay=1&mute=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

    <div className='absolute top-[200px] left-[100px] w-[500px]'>
        <h2 className='text-white text-5xl font-bold mb-3'>{LatestMovie.original_title}</h2>
        <p className='text-[#ddd]'>{LatestMovie.overview}</p>
       <div className='flex gap-3'>
      

<button className='btn-white hover:opacity-50 transition ease-linear'>
        <span className="material-symbols-outlined mr-2"> 
play_arrow
</span> Play now</button>

<button className=' btn-gray'>
       <span className="material-symbols-outlined mr-2">
help
</span>  More Info</button>

       </div>
    </div>
    </div>
  )
}

export default VideoInBackground
