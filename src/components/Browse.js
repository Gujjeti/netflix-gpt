import React, { useEffect } from 'react'

import Header from './Header';
import { API_OPTIONS } from '../utils/constants';
import { addNowPlayingMovies } from '../utils/store/moviesSlice';
import useFetch from '../utils/hooks/useFetch';
import VideoInBackground from './VideoInBackground';
import MoviesList from './MoviesList';
import { useSelector } from 'react-redux';

const Browse = () => {



  const now_playing = useFetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1')
  const trending = useFetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US')
 const popular = useFetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1');
  return (
    <div className='bg-black'>
     <Header/>
    <VideoInBackground/>
   
    <div className='moviesContainer -mt-[120px] relative'>
    <MoviesList title={"Now Playing"} movies={now_playing.moviesList} />
    <MoviesList title={"Most Popular"} movies={popular.moviesList} />
    <MoviesList title={"Trending"} movies={trending.moviesList} />
    </div>
    </div>

    
  )
}

export default Browse
