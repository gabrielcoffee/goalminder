'use client'
import { Briefcase, Dumbbell, Heart, Palette, User, Wallet } from 'lucide-react'
import React, { useEffect } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const area_options = [
    { name: "Fitness", color: "#FF6B6B", icon: Dumbbell },       // Red    - Energy and strength
    { name: "Professional", color: "#4E89AE", icon: Briefcase }, // Blue   - Stability and trust
    { name: "Personal", color: "#F4A261", icon: User },          // Orange - Growth and enthusiasm
    { name: "Relationships", color: "#8E7CC3", icon: Heart },    // Purple - Connection and empathy
    { name: "Finance", color: "#2A9D8F", icon: Wallet },         // Green  - Wealth and balance
    { name: "Hobbies", color: "#E9C46A", icon: Palette }         // Yellow - Creativity and optimism
]

const DEFAULT_BARS = 30;

export default function GoalComponent({ goal_info, reports_info}) {

    const option = area_options.find(area => area.name === goal_info.area);

    const numDummyBars = DEFAULT_BARS - reports_info.length;
    const dummyData = new Array(numDummyBars).fill({progressScale: null})
    const finalData = [...reports_info, ...dummyData];

    useEffect(() => {
        
        
    },[])

    return (
        <div style={{ backgroundColor: option.color + '40'}} className='rounded-sm bg-slate-100 flex flex-col items-center'>
            <div className='flex items-center'>
                <div className='rounded-full p-4'>
                    {<option.icon style={{color: option.color }} size={40}/>}
                </div>
                <span className='w-full'>{goal_info.name}</span>
            </div>

            <div className='border rounded-md border-b-2 p-4' style={{borderColor: option.color }}>
                <BarChart width={400} height={200} data={finalData}>
                    <XAxis dataKey="date" tick={false} />
                    <YAxis type='number' ticks={[0,1,2,3,4]} interval={0}/>
                    <Bar dataKey="progressScale" fill={option.color}/>
                </BarChart>
            </div>

        </div>
    )
}
