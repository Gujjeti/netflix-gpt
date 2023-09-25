import React, { useEffect } from 'react'

import Header from './Header';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from '../utils/store/moviesSlice';
import useFetch from '../utils/hooks/useFetch';
import VideoInBackground from './VideoInBackground';

const Browse = () => {

  const dispatch = useDispatch()

  const {moviesList, loading, error } = useFetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1')


  useEffect( () =>{

    const getMoviesData = async () =>{
      const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTIONS)
      const json = await data.json();
dispatch(addNowPlayingMovies(json.results))

      //console.log(json.results)
    }

    getMoviesData()

  },[])


  return (
    <div className='bg-black h-full'>
     <Header/>
    <VideoInBackground/>
    </div>
  )
}

export default Browse
