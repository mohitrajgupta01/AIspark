import { Edit, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';


axios.defaults.baseURL= import.meta.env.VITE_BASE_URL;


const WriteArtical = () => {

    const articalLength = [
        {length:800, text:'Short (500-800 words)'},
        {length:1200, text:'Medium (800-1200 words)'},
        {length:1600, text:'Long (1200+ words)'},
    ]


    const [selectedLength, setSelectedLength] = useState(articalLength[0])
    const [input, setInput] = useState('')
    const [loading,setLoading]=useState(false)
    const [content,setContent]= useState('')

    const {getToken}=useAuth()

    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        try {
            setLoading(true)
            const prompt = `Write an artical about ${input} in ${selectedLength.text}`
            const {data} = await axios.post('/api/ai/generate-article', {prompt,length:selectedLength.length},{
                headers:{Authorization:`Bearer ${await getToken()}`}
            })

            if (data.success) {
                setContent(data.content)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false);
    }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      
    <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>

        <div className='flex items-center gap-3'>
            <Sparkles className='w-6 text-[#4A7AFF]'/>
            <h1 className='text-xl font-semibold '>Artical Configuration</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Artical Topic</p>

        <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' 
            placeholder='The future of artificial intelligence is...' 
            required
        />


        <p className='mt-4 text-sm font-medium'>Artical Length</p>

        <div className='mt-4 flex gap-3 flex-wrap'>
            {articalLength.map((item, index) => (
                <span 
                    onClick={() => setSelectedLength(item)} 
                    className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                        selectedLength.text === item.text 
                            ? 'bg-blue-50 text-blue-700 border-blue-200' 
                            : 'text-gray-500 border-gray-300'
                    }`} 
                    key={index}
                >
                    {item.text}
                </span>
            ))}
        </div>

        <br />


        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] hover:from-[#1959E6] hover:to-[#4C9FFF] text-white px-4 py-2
        mt-6 text-sm rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg active:scale-[0.98]'>
            {
                loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
                : <Edit className='w-4 h-4'/>
            }
            
            Generate Article
        </button>


    </form>


    <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col
      border border-gray-200 min-h-96 max-h-[600px] '>
        <div className='flex items-center gap-3'>
            <Edit className='w-5 h-5 text-[#4A7AFF]'/>
            <h1 className='text-xl font-semibold'>Generated Artical</h1>
        </div>

        {!content ? (

            <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                 <Edit className='w-9 h-9 '/>
                 <p>Enter a topic and click "Generate artical" to get started</p>
            </div>
        </div>

        ) : (

            <div className='mt-3 flex-1 overflow-y-auto max-h-96'>
                    <div className='markdown-content prose prose-sm max-w-none
                    prose-headings:text-gray-800 prose-headings:font-semibold
                    prose-h1:text-xl prose-h1:mb-4 prose-h1:mt-0
                    prose-h2:text-lg prose-h2:mb-3 prose-h2:mt-6
                    prose-h3:text-base prose-h3:mb-2 prose-h3:mt-4
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                    prose-strong:text-gray-800 prose-strong:font-semibold
                    prose-em:text-gray-600 prose-em:italic
                    prose-ul:my-4 prose-ul:pl-8 prose-ul:space-y-2
                    prose-ol:my-4 prose-ol:pl-8 prose-ol:space-y-2
                    prose-li:mb-2 prose-li:text-gray-700 prose-li:leading-relaxed
                    prose-li:marker:text-blue-500 prose-li:marker:font-bold
                    prose-blockquote:border-l-4 prose-blockquote:border-blue-200 
                    prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
                    prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                    prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800
                    [&_ul>li]:relative [&_ul>li]:pl-2
                    [&_ul>li::marker]:content-["●"] [&_ul>li::marker]:text-blue-500 [&_ul>li::marker]:text-lg
                    [&_ol>li]:relative [&_ol>li]:pl-2
                    [&_ol>li::marker]:text-blue-600 [&_ol>li::marker]:font-semibold [&_ol>li::marker]:text-sm
                    [&_ul_ul>li::marker]:content-["◦"] [&_ul_ul>li::marker]:text-gray-400
                    [&_ul_ul_ul>li::marker]:content-["▪"] [&_ul_ul_ul>li::marker]:text-gray-500'>
                        <Markdown>
                        {content}
                        </Markdown>
                    </div>
            </div>


        ) }
        

    </div>




    </div>
  )
}

export default WriteArtical
