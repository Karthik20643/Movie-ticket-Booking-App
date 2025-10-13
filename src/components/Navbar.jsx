import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets' // change to "import assets from '...'" if default export
import { Search as SearchIcon, MenuIcon, XIcon } from 'lucide-react' // or your icon lib

const Navbar = () => {
    const [isopen, setisopen] = useState(false) 
  return (
    <nav>
      <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5">
      
    

      <Link to="/" className="max-md:flex-1">
        <img src={assets.logo} alt="" className="w-36 h-auto" />   
      </Link>

      <div className={`max-md: absolute max-md: top-4 max-md: left-130 max-md: font-medium
max-md: text-lg z-50 flex flex-col md:flex-row items-center
max-md: justify-center gap-8 min-md:px-8 py-3 max-md:h-screen
min-md: rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border
border-gray-300/20 overflow-hidden transition-[width] duration-300 ${isopen ? 'max-md:w-full' : 'max-md:w-0'}`}>
        <XIcon className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer'/>
        <Link to='/'>Home</Link>
        <Link to='/Moviedetails'>MovieDetails</Link>
        <Link to='/Movies'>Movies</Link>
        <Link to='/MyBookings'>MyBookings</Link>
      </div>

      <div className='flex items-center gap-8'>
        <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />
       <button className='px-4 py-1 sm: px-7 sm:py-2 bg-primary
hover: bg-primary-dull transition rounded-full font-medium
cursor-pointer'>Login</button>
      
      </div> 
      <MenuIcon className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer'/>
      </div>   
    </nav>
  )
}

export default Navbar