import React, { useState, useEffect } from 'react'
import { API_OPTIONS } from '../constants';
import { addNowPlayingMovies } from '../store/moviesSlice';
import { useDispatch } from 'react-redux';

const useFetch = (url) => {

    const [moviesList, setMoviesList] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    
  useEffect( () =>{
    setLoading(true)
    setMoviesList(null);
    setError(null);
    const getMoviesData = async () =>{
      const data = await fetch(url, API_OPTIONS)
      const json = await data.json();
      dispatch(addNowPlayingMovies(json.results))
      setLoading(false);
      setMoviesList(json.results)

    }

    getMoviesData().catch(err => {
        setLoading(false)
        setError('An error occurred. Awkward..')
    })

  },[])


  return  {moviesList, setLoading, setError}
}

export default useFetch
