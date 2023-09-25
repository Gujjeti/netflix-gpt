import React, { useState, useEffect } from 'react'
import { API_OPTIONS } from '../constants';

const useFetch = (url) => {

    const [moviesList, setMoviesList] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    
  useEffect( () =>{
    setLoading(true)
    setMoviesList(null);
    setError(null);
    const getMoviesData = async () =>{
      const data = await fetch(url, API_OPTIONS)
      const json = await data.json();
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
