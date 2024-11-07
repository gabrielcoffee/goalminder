import React from 'react'
import HeroButton from './HeroButton'

export default function GoalNotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
        <div className='flex flex-col gap-10 mb-32'>

        <span className='text-xl'>
            No goal was found...
        </span>

        <HeroButton href="/">Return to HomePage</HeroButton>
        </div>
    </div>
  )
}
