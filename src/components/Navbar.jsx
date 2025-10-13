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

      <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col md:flex-row items-center justify-center gap-8 px-4 py-3 md:px-0 md:py-0 bg-black/70 backdrop-blur md:bg-transparent rounded-md md:rounded-none border-gray-300/20 md:border-0 overflow-hidden transition-all duration-300 ${isopen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <XIcon className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' onClick={() => setisopen(prev => !prev)} />
        <Link to='/' onClick={() => { window.scrollTo(0, 0); setisopen(false); }}>Home</Link>
        <Link to='/Moviedetails' onClick={() => { window.scrollTo(0, 0); setisopen(false); }}>MovieDetails</Link>
        <Link to='/Movies' onClick={() => { window.scrollTo(0, 0); setisopen(false); }}>Movies</Link>
        <Link to='/MyBookings' onClick={() => { window.scrollTo(0, 0); setisopen(false); }}>MyBookings</Link>
      </div>

      <div className='flex items-center gap-8'>
        <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />
       <button className='px-4 py-1 sm: px-7 sm:py-2 bg-primary
hover: bg-primary-dull transition rounded-full font-medium
cursor-pointer'>Login</button>
      
      </div> 
      <MenuIcon className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer' onClick={() => setisopen(prev => !prev)} />
      </div>   
    </nav>
  )
}

export default Navbar