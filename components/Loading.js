import { Loader } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
        <Loader className='animate-spin mb-28' size={50} />
    </div>
  )
}
