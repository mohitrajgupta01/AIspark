// Community page - Display published AI creations from all users
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react';
import { Heart } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

// Set base URL for API calls
axios.defaults.baseURL= import.meta.env.VITE_BASE_URL;

const Community = () => {
    // State management for creations data and loading
    const [creations, setCreations] = useState([]);
    const {user}= useUser();
    const [loading,setLoading]=useState(true)
    const {getToken}=useAuth()
    
    
    // Function to fetch all published creations from the API
    const fetchCreations = async () => {
        try {
            const {data} = await axios.get('/api/user/get-published-creations', {
                headers:{Authorization:`Bearer ${await getToken()}`}
            })
            if (data.success) {
                setCreations(data.creations)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false)
    }

    // Function to toggle like/unlike on a creation
    const imageLikeToggle = async (Id) => {
        try {
            const {data} = await axios.post('/api/user/toggle-like-creation', {id: Id}, {
                headers:{Authorization:`Bearer ${await getToken()}`}
            })
            if (data.success) {
                toast.success(data.message)
                await fetchCreations(); // Refresh the creations list
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }



    // Fetch creations when user is loaded
    useEffect(() => {
        if(user){
        fetchCreations();
        }
    }, [user])    

  return (
    <div className='flex-1 h-full flex flex-col gap-4 p-6'>
        {/* Page title */}
        <h1 className='text-2xl font-semibold text-slate-700'>Creations</h1>
      
      {/* Main content area with scrollable grid */}
      <div className='bg-white h-full w-full rounded-xl 
      overflow-y-scroll p-3'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
        {
            /* Map through each creation and display as image card */
            creations.map((creations,index)=>(
                <div key={index} className='relative group aspect-square'>
                {/* Creation image */}
                <img src={creations.content} alt="" className='w-full h-full object-cover rounded-lg' />

                {/* Overlay with prompt and like button - shows on hover */}
                <div className='absolute bottom-0 right-0 left-0 flex  gap-2
                items-end justify-end group-hover:justify-between p-3
                group-hover:bg-gradient-to-b from-transparent to-black/80 text-white
                rounded-lg'>
                    {/* Creation prompt - hidden by default, shows on hover */}
                    <p className='text-sm hidden group-hover:block'>{creations.prompt}</p>
                    {/* Like count and heart button */}
                    <div className='flex gap-1 items-center'>
                        <p >{creations.likes.length}</p>
                        <Heart onClick={()=>imageLikeToggle(creations.id)} className={`w-5 h-5 hover:scale-110 cursor-pointer transition-transform
                        ${creations.likes.includes(user?.id) ? 'fill-red-500 text-red-600' : 'text-white'}`} />
                    </div>
                    
                </div>
                </div>
            )) 
        }
        </div>
      </div>
    </div>
  )
}

export default Community
