import { Briefcase, Dumbbell, Heart, Palette, User, Wallet } from 'lucide-react'
import React, { useEffect } from 'react'

const area_options = [
    { name: "Fitness", color: "#FF6B6B", icon: Dumbbell },       // Red    - Energy and strength
    { name: "Professional", color: "#4E89AE", icon: Briefcase }, // Blue   - Stability and trust
    { name: "Personal", color: "#F4A261", icon: User },          // Orange - Growth and enthusiasm
    { name: "Relationships", color: "#8E7CC3", icon: Heart },    // Purple - Connection and empathy
    { name: "Finance", color: "#2A9D8F", icon: Wallet },         // Green  - Wealth and balance
    { name: "Hobbies", color: "#E9C46A", icon: Palette }         // Yellow - Creativity and optimism
]

export default function Area({ data, setter, canProgressSetter }) {

    useEffect(() => {
        if (!data) {
            canProgressSetter(false);
        } else {
            canProgressSetter(true);
        }
    }, [data])

    return (
        <div className="flex flex-col items-center h-full relative">
            <h1 className='text-2xl text-center font-bold mx-2'>What area is your goal in?</h1>
            
            <div className='grid grid-cols-2 grid-rows-3 sm:grid-cols-3 sm:grid-rows-2 mt-14 mx-4 gap-4 text-xl'>
            {
                area_options.map((option, index) => (
                    <button key={index} onClick={() => setter(option.name)} value={option.name}
                    className={'flex flex-col justify-center items-center border-[1px] border-slate-400 rounded-md px-8 py-4 gap-4 ' +  (data === option.name && 'bg-slate-700 text-white')}>
                        <div style={{ backgroundColor: option.color + '40'}} className='rounded-full p-4'>
                            {<option.icon style={{color: option.color }} size={50}/>}
                        </div>

                        <span>{option.name}</span>
                    </button>
                ))
            }
            </div>
        </div>
    )
}
