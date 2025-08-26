import { useUser, useClerk, Protect } from '@clerk/clerk-react'
import { Eraser, FileText, Hash, Home, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react';
import React from 'react'
import { NavLink } from 'react-router-dom';

const navItems = [
    { to : '/ai', label: 'Dashboard',Icon: Home},
    { to : '/ai/write-article', label: 'Write Artical',Icon: SquarePen },
    { to : '/ai/blog-titles', label: 'Blog Titles',Icon: Hash},
    { to : '/ai/generate-images', label: 'Generate Images',Icon: Image},
    { to : '/ai/remove-object', label: 'Remove Object',Icon: Scissors },
    { to : '/ai/remove-background', label: 'Remove Background',Icon: Eraser },
    { to : '/ai/review-resume', label: 'Review Resume',Icon: FileText },
    { to : '/ai/community', label: 'Community',Icon: Users },
]

const Sidebar = ({sidebar, setSidebar}) => {
    const {user} = useUser();
    const clerk = useClerk();
    const signOut = () => clerk.signOut();
    const openProfile = () => clerk.openUserProfile();


  return (
    

    <div className={`w-60 bg-white border-r border-gray-200 flex flex-col
    items-start max-sm:fixed top-14 left-0 h-[calc(100vh-3.5rem)] ${sidebar ? 'translate-x-0' : '-translate-x-full'} 
    transition-all duration-300 ease-in-out z-50 shadow-lg sm:shadow-none sm:translate-x-0 sm:relative sm:top-0`}>
        <div className='w-full  py-3 border-b'>
            <img src={user.imageUrl} alt="user avatar" className='w-12 h-12 rounded-full mx-auto' />
            <h1 className='mt-2 text-center text-sm font-medium'>{user.fullName}</h1>
            <div className='px-6 mt-5 text-sm text-gray-600 font-medium'>
                {navItems.map(({to,label,Icon}) => (
                    <NavLink key={to} to={to} end={to==='/ai'} onClick={()=>setSidebar(false)}
                    className={({isActive})=>`px-3.5 py-2 flex items-center gap-3 rounded-lg 
                    ${isActive ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white' : ''}`}>
                            {({isActive}) => (
                                <>
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-white': ''}`}/>
                                    {label}
                                </>
                            )}
                    </NavLink>
                   )) }
            </div>
        </div>
        <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'>
            <div onClick={openProfile} className='flex gap-2 items-center cursor-pointer'>
                <img src={user.imageUrl} alt=""  className='w-8 rounded-full'/> 
                <div>
                    <h1 className='text-sm font-medium'>{user.fullName}</h1>
                    <p className='text-xs text-gray-500'>
                        <Protect plan='premium' fallback="Free">Premium</Protect>
                        Plan
                    </p>
                </div>

            </div>
            <LogOut 
                onClick={() => signOut()} 
                className='w-5 h-5 text-gray-400 hover:text-gray-700 transition cursor-pointer' 
            />
        </div>
    </div>
  )
}

export default Sidebar
