import React, { useRef, useState } from 'react'
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile  } from "firebase/auth";

import { auth } from '../utils/firebase'
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/usersSlice';
const Login = () => {

const [isSignInForm, setIsSignInForm] = useState(true);
const [errroMessage, setErrorMessage] = useState(null)

const fullname = useRef();
const email = useRef();
const password = useRef()

const navigate = useNavigate()
const dispatch = useDispatch()
const toggleSignIn = () =>{
    setErrorMessage(null);
    setIsSignInForm(!isSignInForm);
    email.current.value = '';
    password.current.value = '';
    !isSignInForm && ( fullname.current.value = '')
}
const handleSubmit = (e) =>{
e.preventDefault();
  const isNameValid = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(!isSignInForm && fullname.current.value);
const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.current.value);
const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password.current.value)


 if(!isNameValid){
    setErrorMessage("Please enter fullname");
}  
else if(!isEmailValid){
    setErrorMessage("Please enter email id");
}
 else if(!isPasswordValid){
    setErrorMessage("Please enter strong password");
}
else{

    if(!isSignInForm){
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    updateProfile(user, {
        displayName: fullname.current.value
      }).then(() => {
        // Profile updated!
        const {uid, email, displayName} = auth.currentUser;
        console.log(auth.currentUser)
        dispatch(addUser({uid:uid, email:email, displayName:displayName}))
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });

      
    email.current.value = '';
password.current.value = '';
!isSignInForm && ( fullname.current.value = '')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorMessage)
    // ..
  });
    }

    else{
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigate('/browse');
    console.log(user);
    email.current.value = '';
password.current.value = '';
!isSignInForm && ( fullname.current.value = '')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorMessage)
  });
    }
  

    setErrorMessage(null);
}

}

  return (
    <div className='loginPage relative z-10 before:bg-black before:opacity-60 before:absolute before:top-0 before:w-full before:h-full before:-z-50 ' style={{
        backgroundImage: 'url(https://assets.nflxext.com/ffe/siteui/vlv3/f85718e8-fc6d-4954-bca0-f5eaf78e0842/ea44b42b-ba19-4f35-ad27-45090e34a897/IN-en-20230918-popsignuptwoweeks-perspective_alpha_website_large.jpg)',
        backgroundSize:"cover",
        height:"100vh",
        }}>
      
      <Header/>

<div className='bg-[rgba(0,0,0,.75)] rounded-md absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]	 w-[400px] flex justify-center flex-col align-middle p-10'>
<form onSubmit={(e) => handleSubmit(e)} >
        <h2 className='text-white text-3xl font-bold text-left mb-6'>
           
            {isSignInForm ? " Sign In" : " Sign Up"}
            </h2>
        {
            !isSignInForm &&  <div className='form-group w-full mb-4'>
            <input ref={fullname} name='fullname' type='text' placeholder='Full name' className='text-white p-3 w-full bg-[#333333] placeholder-[#8c8c8c] rounded-sm' />
        </div>
        }
        

        <div className='form-group w-full mb-4'>
            <input  ref={email} name='email' type='email' placeholder='Email' className='text-white p-3 w-full bg-[#333333] placeholder-[#8c8c8c] rounded-sm' />
        </div>

        <div className='form-group w-full mb-4'>
            <input  ref={password} name='password' placeholder='Password' className='text-white p-3 w-full bg-[#333333] placeholder-[#8c8c8c] rounded-sm' type='password' />
        </div>
        
        <span className='text-[#e87c03] font-bold'>
            {errroMessage}
        </span>

        <div className='form-group w-full mb-4'>
            <input type='submit' value={isSignInForm ? " Sign In" : " Sign up"} className='bg-[#e50914] text-white font-bold w-full mt-10 p-3 rounded-[5px]   block cursor-pointer' />
        </div>

      </form>
      <p className='font-bold text-[#737373]'>New to Netflix? <span onClick={() => toggleSignIn()} className='cursor-pointer text-white'>
      {isSignInForm ? " Sign up now." : " Sign In"}
        </span> </p>
</div>
      

      
    </div>
  )
}

export default Login
