import React, { useState } from 'react'
import Markdown  from 'react-markdown'

const Creationitem = ({item}) => {

    const [expanded, setExpanded] = useState(false);


  return (
    <div onClick={() => setExpanded(!expanded)} className='p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer'>
      <div className='flex justify-between items-center' >
        <div>
            <h2 className='font-medium'>{item.prompt}</h2>
            <p className='text-gray-500'>{item.type} - {new Date(item.created_at).toLocaleDateString()}</p>
        </div>
        <button className='bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-2 rounded-full'>{item.type}</button>
      </div>

        {
            expanded && (
                <div>
                    {item.type === 'image' ? (
                        <div>
                            <img src={item.content} alt="AI Generated" className='mt-3 w-full max-w-md rounded-lg' />
                        </div>
                    ) : (
                        <div className='mt-3 max-h-96 overflow-y-auto text-sm text-slate-700 whitespace-pre-wrap'>
                            <Markdown>
                            {item.content}
                            </Markdown>
                        </div>
                    )}
                </div>
        )}


    </div>
  )
}

export default Creationitem
