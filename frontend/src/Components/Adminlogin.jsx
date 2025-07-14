import React from 'react'
import { useNavigate } from 'react-router-dom'

const Adminlogin = () => {
 let navigator =  useNavigate()

  function finalsubmit(e){
    e.preventDefault()
    navigator('/adminpage')

  }
  return (
    <> 
    
    
     <section className='h-100  flex flex-col leading-8.5 justify-center items-center'>
        <h1 className='text-3xl font-semibold text-center'>Admin Login </h1>

        <form action="" onSubmit={finalsubmit}>
            <div>
            <label htmlFor="">Email</label> <br />
            <input type="text" name='uemail'  className='border rounded  w-100 px-1' placeholder='Enter Admin Email' /> 
            </div>

              <div>
            <label htmlFor="">Password</label> <br />
            <input type="text" name='upassword' className='border rounded  w-100 px-1' placeholder='Enter Admin Password' /> 
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