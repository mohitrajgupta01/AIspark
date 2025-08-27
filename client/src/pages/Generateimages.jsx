// AI Image Generator page - Generate images using AI with different styles
import React from 'react'
import { Image, Sparkles, Download } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

// Set base URL for API calls
axios.defaults.baseURL= import.meta.env.VITE_BASE_URL;

const Generateimages = () => {
    // Available image styles for generation
    const imageStyle = [ 'Realistic', '3D', 'Cartoon', 'Anime', 'Pixel Art', 'Line Art', 'Flat', 'Isometric', 'Low Poly', 'Origami', 'Silhouette', 'Claymation', 'Paper Cutout', 'Woodcut', 'Etching', 'Embroidery', 'Neon Sign', 'Glitch Art' ]
        
    // State management for form inputs and generated content
    const [selectedStyle, setSelectedStyle] = useState('Realistic')
    const [input, setInput] = useState('')
    const [publish, setPublish] = useState(false)
    const [loading,setLoading]=useState(false)
    const [content,setContent]= useState('')
    const {getToken} = useAuth()
        
    // Handle form submission to generate image
    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        try {
            setLoading(true)
            // Create prompt combining user input and selected style
            const prompt = `Generate an image of ${input} in the style ${selectedStyle}`

            const {data} = await axios.post('/api/ai/generate-image', {prompt,publish},
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
            link.download = `ai-generated-image-${Date.now()}.png`
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
      
    {/* Left column - Image generation form */}
    <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>

        {/* Form header */}
        <div className='flex items-center gap-3'>
            <Sparkles className='w-6 text-[#00AD25]'/>
            <h1 className='text-xl font-semibold '>AI Image Generator</h1>
        </div>

        {/* Image description input */}
        <p className='mt-6 text-sm font-medium'>Describe Your Image</p>

        <textarea 
            rows={4} 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' 
            placeholder='Describe your image here...' 
            required
        />

        {/* Style selection */}
        <p className='mt-4 text-sm font-medium'>Style</p>

        <div className='mt-4 flex gap-3 flex-wrap'>
            {/* Map through available styles */}
            {imageStyle.map((item) => (
                <span 
                    onClick={() => setSelectedStyle(item)} 
                    className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                        selectedStyle === item
                            ? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' 
                            : 'text-gray-500 border-gray-300 hover:bg-gray-50'
                    }`} 
                    key={item}
                >
                    {item}
                </span>
            ))}
        </div>

        {/* Public/private toggle */}
        <div className='mt-6 flex items-center gap-2'>
            <label className='relative cursor-pointer'>
                <input 
                    type="checkbox"
                    onChange={(e) => setPublish(e.target.checked)}
                    checked={publish}
                    className='sr-only peer'
                />
                <div className='w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition-colors duration-200'>
                </div>
                <span className='absolute left-1 top-1 w-3 h-3 bg-white
                rounded-full transition-transform duration-200 peer-checked:translate-x-4'></span>
            </label> 
            <p className='text-sm'>Make this image Public</p>
        </div>

        {/* Generate button */}
        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#00AD25] hover:from-[#04FF50] hover:to-[#4C9FFF] text-white px-4 py-2
        mt-6 text-sm rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg active:scale-[0.98]'>
            {loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> :<Image className='w-4 h-4'/>}
            
            Generate Image
        </button>

    </form>

    {/* Right column - Generated image display */}
    <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col
      border border-gray-200 min-h-96  '>
        {/* Display area header */}
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <Image className='w-5 h-5 text-[#00AD25]'/>
                <h1 className='text-xl font-semibold'>Generated Image</h1>
            </div>
            {content && (
                <button 
                    onClick={downloadImage}
                    className='flex items-center gap-2 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors duration-200'
                >
                    <Download className='w-4 h-4'/>
                    Download
                </button>
            )}
        </div>

        {/* Conditional rendering - placeholder or generated image */}
        {
            !content ? (
                // Placeholder when no image is generated
                <div className='flex-1 flex justify-center items-center'>
                 <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                  <Image className='w-9 h-9 '/>
                  <p>Enter a topic and click "Generate Image" to get started</p>
                 </div>
                </div>
            ):(
                // Display generated image
                <div className='mt-3 h-full'>
                    <img src={content} alt="image" className='w-full h-full' />
                </div>
            )
        }

        </div>

    </div>

  )
}

export default Generateimages
