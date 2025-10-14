import React from 'react'
import { Calendar1Icon, Clock10Icon, ArrowRight } from 'lucide-react'
import { assets } from '../assets/assets'

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-top bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${assets.backgroundImage ?? '/backgroundImage.png'})`,
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
      }}
    >
      {/* offset content by navbar height so hero bg starts at the exact top behind nav */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-36 pt-16 md:pt-20 pb-16">
        <img
          src={assets.marvelLogo}
          alt="logo"
          className="w-auto max-w-xs md:max-w-sm h-auto object-contain mb-6"
        />

        <h1 className="text-5xl md:text-[70px] md:leading-tight font-bold max-w-3xl text-white">
          Guardians <br /> of the Galaxy
        </h1>

        <div className="flex items-center gap-6 text-gray-300 mt-4">
          <span>Action | Adventure | Sci‑Fi</span>
          <div className="flex items-center gap-2">
            <Calendar1Icon className="w-4 h-4" /> 2018
          </div>
          <div className="flex items-center gap-2">
            <Clock10Icon className="w-4 h-4" /> 2h 8m
          </div>
        </div>

        <p className="max-w-md text-gray-200 font-light mt-4">
          In a post-apocalyptic world where cities ride on wheels and consume each other to survive...
        </p>

        <div className="mt-6">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md cursor-pointer">
            Explore Movies
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection