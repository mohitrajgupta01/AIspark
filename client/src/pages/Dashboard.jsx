// Dashboard page - User's main dashboard with stats and recent creations
import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Gem, Sparkles } from 'lucide-react'
import { Protect } from '@clerk/clerk-react'
import Creationitem from '../components/Creationitem'

const Dashboard = () => {
    // State for storing user's creations
    const [creation, setCreation]= useState([])
    
    // Function to load dashboard data
    const getDashboardData = async()=>{
        setCreation(dummyCreationData)
    }

    // Load data on component mount
    useEffect(()=>{
        getDashboardData()
    },[])

  return (
    <div className='h-full overflow-y-scroll p-6'>
      {/* Dashboard stats cards */}
      <div className='flex justify-start gap-4 flex-wrap'>
       
        {/* Total creations card */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
            <div className='text-slate-600'>
                <p className='text-sm'>Total Creation</p>
                <h2 className='text-xl font-semibold'>{creation.length}</h2>
            </div>
            <div className='p-3 bg-gradient-to-b from-purple-600 to-blue-500 rounded-lg'>
                <Sparkles className='w-5 text-white'/>
            </div>
        </div>

        {/* Active plan card */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
            <div className='text-slate-600'>
                <p className='text-sm'>Active Plan</p>
                <h2 className='text-xl font-semibold'>
                    <Protect plan='premium' fallback="Free"> Premium</Protect>
                </h2>

            </div>
            <div className='p-3 bg-gradient-to-b from-yellow-600 to-orange-500 rounded-lg'>
                <Gem className='w-5 text-white'/>
            </div>
        </div>

      </div>
      
      {/* Recent creations section */}
      <div className='space-y-3'>
            <p className='mt-6 mb-4'>Recent Creation</p>
            {/* Map through creations and display each item */}
            {
                creation.map((item) => <Creationitem key={item.id} item={item}/>)
            }
      </div>
    </div>
  )
}

export default Dashboard
