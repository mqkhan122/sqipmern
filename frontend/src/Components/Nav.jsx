import React from 'react'
import logo from '../assets/pngwing.com (1).png'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoServerOutline } from "react-icons/io5";
const Nav = () => {
  return (
    <>
     <section className='flex bg-gray-50 justify-between px-10 items-center shadow-2xs '>
        <div>
            <img src={logo} width={"130px"} alt="" />
        </div>

        <div>
            <ul className='flex gap-5 font-semibold'>
                <li>Home</li>
                <li>Experince</li>
                <li>Services</li>
            </ul>
        </div>

        <div className='flex gap-2 items-center '>
            <h4>Become a Host</h4>
            <IoServerOutline className='w-9 bg-gray-200 h-9 p-2 rounded-2xl' />
            <GiHamburgerMenu className='w-9 bg-gray-200 h-9 p-2 rounded-2xl' />
        </div>
     </section>
    </>
  )
}

export default Nav