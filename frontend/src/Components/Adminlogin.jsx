import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Adminlogin = () => {
  let [email,setEmail] = useState('')
  let [password,setPassword] = useState('')
  let [message,setErrorMsg] = useState('')
 let navigator =  useNavigate()

 function finalsubmit(e) {
  e.preventDefault();
  axios.post('http://localhost:3333/api/adminlogin', { email, password })
    .then(res => {
      if (res.data.success) {
        localStorage.setItem("admintoken", res.data.token); // ✅ Save token
        alert("Login successful");
        navigator("/adminpage"); // ✅ Navigate only after token stored
      } else {
        alert(res.data.message);
      }
    })
    .catch(err => {
      console.error(err);
    });
}
 return (
    <> 
    
    
     <section className='h-100  flex flex-col leading-8.5 justify-center items-center'>
        <h1 className='text-3xl font-semibold text-center'>Admin Login </h1>

         {message && (
          <p className='text-red-500 mb-3'>{message}</p>
        )}


        <form action="" onSubmit={finalsubmit}>
            <div>
            <label htmlFor="">Email</label> <br />
            <input type="text"  onChange={(e)=>setEmail(e.target.value)}  className='border rounded  w-100 px-1' placeholder='Enter Admin Email' /> 
            </div>

              <div>
            <label htmlFor="">Password</label> <br />
            <input type="password"  onChange={(e)=>setPassword(e.target.value)} className='border rounded  w-100 px-1' placeholder='Enter Admin Password' /> 
            </div>

              <div>
            
            <button className='border rounded  w-100 mt-3 bg-green-400 py-1 text-white hover:bg-white hover:text-black '>Login</button> 
            </div>
        </form>
     </section>

    </>
  )
}

export default Adminlogin