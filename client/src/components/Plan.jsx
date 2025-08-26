import React from 'react'
import { PricingTable } from '@clerk/clerk-react'

const Plan = () => {
  return (
    <div className='max-w-2xl mx-auto z-20 py-24'>
      <div className='text-center'>
        <h1 className='text-slate-700 text-[42px] font-semibold'>Choose Your Plan</h1>
        <p className='text-gray-500 max-w-lg mx-auto'>Select the plan that best fits your needs and start transforming your ideas into reality with AI Spark.</p>
      </div>

      <div className='mt-14 max-sm:mx-8 mb-20'>
          <PricingTable/>
      </div>
    </div>
  )
}

export default Plan
