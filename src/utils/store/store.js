import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";
import moviesSlice from "./moviesSlice";

const store = configureStore({
    reducer:{
        user:usersSlice,
        movies:moviesSlice
    }
})

export default store