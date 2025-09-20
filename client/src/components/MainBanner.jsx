import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import banner3 from '../assets/banner.png';

const MainBanner = () => {
  return (
    <div className='relative w-full overflow-hidden'>
      <img 
       
        src={banner3} 
        alt="banner" 
        className='w-full h-auto hidden md:block object-cover'
          style={{
            borderRadius: '10px',
            border: '2px solid #9df1daff',
          }} 
      />
      <img 
        src={assets.main_banner_bg_sm} 
        alt="banner" 
        className='w-full h-auto md:hidden object-cover'
         
      />

      <div
        className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-16 lg:pl-20'
        style={{ animation: 'slideUpFadeIn 1s ease forwards', opacity: 0 }}
      >
        <h1
          className="text-4xl md:text-6xl font-semibold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-[3.75rem] bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-500 bg-clip-text text-transparent"
          style={{
            textShadow: `
              0 3px 12px rgba(0, 128, 255, 0.35),
              0 0 8px rgba(0, 255, 210, 0.3)
            `
          }}
        >
          Freshness You Can Taste,<br /> Savings You Can Feel!
        </h1>

        <div className='flex items-center mt-8 font-medium gap-6'>
          <Link
            to={"/products"}
            className="group flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary-dull transition rounded-lg text-white shadow-lg cursor-pointer font-semibold"
          >
            Shop now
            <img
              className="md:hidden w-5 h-5 transition group-focus:translate-x-1"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>
          <Link
            to={"/products"}
            className="group hidden md:flex items-center gap-2 px-10 py-3 border border-primary rounded-lg text-primary hover:bg-primary-light transition cursor-pointer font-semibold shadow-sm"
          >
            Explore deals
            <img
              className="w-5 h-5 transition group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes slideUpFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default MainBanner
