import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { API_OPTIONS } from '../utils/constants';

const VideoInBackground =  () => {
    const [trailerId, setTrailerId] = useState(null)

    const moviesData = useSelector((state) => state.movies?.nowPlayingMovies);

    const LatestMovie =  moviesData && moviesData[0];


    useEffect(() =>{

        const getmovieVideos = async () =>{
            const videos = await fetch(`https://api.themoviedb.org/3/movie/${565770}/videos?language=en-US`, API_OPTIONS);
            const json = await videos.json();

            const trailerVideo =  json.results.filter((item) => {
                return item.type === "Trailer"
            })

            setTrailerId(trailerVideo[0].key)
        }
        
            getmovieVideos()

    },[])

    if(!moviesData){
        return <h1 className='text-4xl text-white font-bold text-center mt-10'>Loading...</h1>
    }
  
   
  
  return (
    <div className='w-full h-[700px]'>
    <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${trailerId}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
  )
}

export default VideoInBackground
