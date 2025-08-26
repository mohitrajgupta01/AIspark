// AI Tools component - Display grid of available AI tools
import React from 'react'
import { AiToolsData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const AiTools = () => {
    // Navigation and user hooks
    const navigate = useNavigate();
    const {user}= useUser();
  return (
    <div className='px-4 sm:px-20 xl:px-32 my-24'>
      {/* Section header with title and description */}
      <div className='text-center space-y-4'>
        <h2 className='text-gray-700 text-[42px] font-semibold'>Powerful AI Tools</h2>
        <p className='text-gray-500 max-w-lg mx-auto'>Everything you need to create ,enhance , and optimize your content with cutting
           edge AI technology.
        </p>
      </div>

      {/* Grid of AI tool cards */}
        <div className='flex flex-wrap mt-10 justify-center'>
                {/* Map through each AI tool and create a card */}
                {AiToolsData.map((tool, index)=>(
                    <div key={index} className='p-8 m-4 max-w-xs rounded-lg border-[#FDFDFE]
                    shadow-lg border border-gray-100 hover:-translate-y-1 transition-all duration-300
                    cursor-pointer' onClick={()=> user && navigate(tool.path)}>
                            {/* Tool icon with gradient background */}
                            <tool.Icon className='w-12 h-12 p-3 text-white rounded-xl' 
                            style={{background:`linear-gradient(to bottom,${tool.bg.from},${tool.bg.to}
                            )`}}/>

                            {/* Tool title and description */}
                            <h3 className='mt-6 mb-3 text-lg front-semibold'>{tool.title}</h3>
                            <p className='text-grey-400 text-sm max-w-[95%]'>{tool.description}</p>
                        
                    </div>
                ))}
        </div>


    </div>
  )
}

export default AiTools
