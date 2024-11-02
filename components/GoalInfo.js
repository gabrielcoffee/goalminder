'use client'
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



export default function GoalInfo({ goal_info, reports_info}) {

    const color = area_options.find((area) => area.name === goal_info.area).color;
    const option = area_options.find(area => area.name === goal_info.area);

    useEffect(() => {
        console.log(area_options);
    })

    return (
        <button className='rounded-full bg-slate-100 flex items-center'>
            
                <div style={{ backgroundColor: color + '40'}} className='rounded-full p-4'>
                    {<option.icon style={{color: color }} size={40}/>}
                </div>
                <span className='w-full'>{goal_info.name}</span>
            
        </button>
    )
}
