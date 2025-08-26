// Navigation bar component - Fixed header with logo and authentication
import React from 'react'
import { assets } from './../assets/assets';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ClerkProvider, useClerk, useUser, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
    // Navigation and authentication hooks
    const navigate = useNavigate();
    const {user} = useUser();
    const {openSignIn} = useClerk();


  return (
    // Fixed navigation bar with backdrop blur
    <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32'>
      {/* Logo - clickable to navigate home */}
      <img src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' onClick={()=>navigate('/')} />

        {/* Conditional rendering based on user authentication */}
        {
            user ? (
              // Authenticated user - show user button with profile menu
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 rounded-full cursor-pointer hover:opacity-80 transition-opacity",
                    userButtonPopup: "top-[calc(100%+1rem)]",
                    userButtonTrigger: "cursor-pointer focus:shadow-none"
                  }
                }}
              />
            ) : (
              // Unauthenticated user - show sign in button
              <button 
                onClick={openSignIn} 
                className='flex items-center gap-2 rounded-full text-sm font-medium cursor-pointer bg-[#5044E5] hover:bg-[#4035ca] transition-colors text-white px-10 py-2.5'
              >
                Get started <ArrowRight className='w-4 h-4'/>
              </button>
            )
        }

      
    </div>
  )
}

export default Navbar;