import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/usersSlice";


const Header = () => {


    const navigate = useNavigate();
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();
 

    useEffect(() =>{
   const unsubscribe =  onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const {uid, email, displayName} = user;
            dispatch(addUser({uid:uid, email:email, displayName:displayName}))
            navigate('/browse')
            // ...
          } else {
            navigate('/')
            dispatch(removeUser())
            // User is signed out
            // ...
          }
        });

        return () =>{
            unsubscribe()
        }
      },[])


    const handleLogOut = () =>{
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/')
          }).catch((error) => {
            // An error happened.
          });
    }

  return (
    <div className='flex justify-between logo  px-5 pr-5 z-9 w-full items-center'>
        <div>
        <img src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' width={150} />
      </div>

      <div className='flex items-center justify-center'>



        
       {user && <><span className='text-white flex gap-2 mr-5 border-r-2 pr-3'>
        
        <img src='https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg' alt='' width={30} />{user.displayName} </span>  <button onClick={() => handleLogOut()} className=' text-[#e50914] font-bold text-[12px]  p-1 rounded-[5px]  cursor-pointer'><span className="material-symbols-outlined ">
logout
</span></button></>} 
      </div>
    </div>
  )
}

export default Header
