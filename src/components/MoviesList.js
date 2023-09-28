import React, { useRef, useState } from 'react';

import MovieCard from './MovieCard'
import HeadingTitle from './HeadingTitle'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';



const MoviesList = ({movies, title}) => {

  return (

    <div className="container mx-auto px-10 mb-10">
  <HeadingTitle title={title} />

  <Swiper
        slidesPerView={6}
        spaceBetween={30}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >

{ 
   movies?.length > 0 ? movies.map((movie) =>{
        return  <SwiperSlide  key={movie.id} ><MovieCard movie={movie} /></SwiperSlide>

    }) : <h2 className=' text-red-600 text-center text-2xl font-bold'>No movies found</h2>
   
}

       
      </Swiper>
    
  
</div>

   
  )
}

export default MoviesList
