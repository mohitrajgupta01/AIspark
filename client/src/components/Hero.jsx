// Hero section component - Main landing page banner
import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    // Navigation hook for routing to different pages
    const navigate = useNavigate();
  return (
    <div 
      style={{backgroundImage: `url(${assets.gradientBackground})`}}
      className='px-4 sm:px-20 xl:px-32 flex flex-col w-full 
      justify-center items-center pt-20 min-h-screen bg-cover bg-no-repeat'
    >

        {/* Main heading and description section */}
        <div className='text-center mb-6'>

            <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:max-w-xl m auto
            max-sm:text-xs text-gray-600'>Create amazing content <br /> with 
            <spam className='text-primary'> AI tools</spam></h1>


            <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600'>Transform your content creation with our suite of premium AI tools.
                write articles, generate images, and review resumes effortlessly.
            </p>

        </div>

        {/* Call-to-action buttons */}
        <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
            <button onClick={()=>navigate('/ai')}  className='bg-primary text-white px-10 py-3 rounded-lg
            hover:scale-102 active:scale-95 transition cursor-pointer'> Start creating Now</button>


            <button className='bg-white px-10 py-3 rounded-lg border border-gray-300 hover:scale-102
            active:scale-95 transition cursor-pointer'>Watch demo</button>
        </div>

        {/* Trust indicator with user count */}
        <div  className='flex items-center gap-4 mt-8  mx -auto text-gray-600'> 
            <img src={assets.user_group} alt="" className='h-8' /> Trusted by over 1000+ users 
        </div>
      
    </div>
  )
}

export default Hero;
