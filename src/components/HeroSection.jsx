import { ArrowBigRight, ArrowRight, Calendar1Icon, Clock10Icon } from 'lucide-react'
import React from 'react'
import { assets } from '../assets/assets'
const HeroSection = () => {
  return (
   
<div className="fixed inset-0 flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-35 bg-[url('/backgroundImage.png')] bg-cover bg-center bg-no-repeat overflow-hidden">


<img src={assets.marvelLogo} alt="" className='max-h-15 lg:h-15 mt-20' />
<h1 className='text-5xl md:text-[70px] md:leading-18 font-bold max-w-110'>Guradians <br />of the Galaxy</h1>
      
      <div className='flex items-center gap-7 text-gray-300'>
        <span>action / drama / SciFi</span>
        <div className='flex items-center gap-1'> 
        <Calendar1Icon className='w-4.5 h-4.5'/>2018

        </div>
        <div className='flex items-center gap-4'> 
        <Clock10Icon className='w-4.5 h-4.5'/>2hr 3min

        </div>
      </div>
      <p className='max-w-md text-gray-100 font-thin'> this is a super movie and its brought to you by kabali rajan</p>
      <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md cursor-pointer">
  <span>Explore Movies</span>
  <ArrowRight className="w-4 h-4" />
</button>
      </div>
       )
  
}

export default HeroSection