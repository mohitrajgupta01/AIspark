// Background removal page - Remove backgrounds from images using AI
import { Eraser, Sparkles, Download } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';    

// Set base URL for API calls
axios.defaults.baseURL= import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
    // State management for file input, loading, and processed image
    const [input, setInput] = useState('')
    const [loading,setLoading]=useState(false)
    const [content,setContent]= useState('')
    const {getToken} = useAuth()
        
    // Handle form submission for background removal
    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        try {
            setLoading(true)
            // Create FormData to send image file
            const formData = new FormData()
            formData.append('image', input)

            const {data} = await axios.post('/api/ai/remove-image-background', formData,
            {headers:{Authorization:`Bearer ${await getToken()}`}})

            if (data.success) {
                setContent(data.content)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false)
    }

    // Handle image download
    const downloadImage = async () => {
        try {
            const response = await fetch(content)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `background-removed-${Date.now()}.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
            toast.success('Image downloaded successfully!')
        } catch (error) {
            toast.error('Failed to download image')
        }
    }

  return (
    // Main container with two-column layout 
     <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      
    {/* Left column - File upload form */}
    <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>

        {/* Form header */}
        <div className='flex items-center gap-3'>
            <Sparkles className='w-6 text-[#FF4938]'/>
            <h1 className='text-xl font-semibold'>Background Removal</h1>
        </div>

        {/* File upload section */}
        <p className='mt-6 text-sm font-medium'>Upload Image</p>

        <input 
            type="file" 
            accept='image/*'
            onChange={(e) => setInput(e.target.files[0])}
            className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600' 
            required
        />

        {/* Supported formats info */}
        <p className='text-xs text-gray-500 font-light mt-1'>Supports JPG, PNG , AND other image formats</p>

        {/* Process button */}
        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] hover:from-[#E09938] hover:to-[#E54232] text-white px-4 py-2
        mt-6 text-sm rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg active:scale-[0.98]'>
            {loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> : <Eraser className='w-4 h-4'/>}
            Remove background
        </button>

    </form>

    {/* Right column - Processed image display */}
    <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col
      border border-gray-200 min-h-96  '>
        {/* Display area header */}
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <Eraser className='w-5 h-5 text-[#FF4938]'/>
                <h1 className='text-xl font-semibold'>Processed Image</h1>
            </div>
            {content && (
                <button 
                    onClick={downloadImage}
                    className='flex items-center gap-2 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg transition-colors duration-200'
                >
                    <Download className='w-4 h-4'/>
                    Download
                </button>
            )}
        </div>
        
        {/* Conditional rendering - placeholder or processed image */}
        {
            !content ? (
                // Placeholder when no image is processed
                <div className='flex-1 flex justify-center items-center'>
                 <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                  <Eraser className='w-9 h-9 '/>
                  <p>Upload an image and click "Remove Background" to get started</p>
                 </div>
                </div>
            ): (
                // Display processed image
                <div className='mt-3 h-full'>
                    <img src={content} alt="image" className='mt-3 w-full h-full' />
                </div>
            )
        }

    </div>

    </div>
  )
}

export default RemoveBackground
