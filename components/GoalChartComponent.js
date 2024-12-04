'use client'
import { format, parse } from 'date-fns';
import { Briefcase, Dumbbell, Flag, Heart, Palette, User, Wallet } from 'lucide-react'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const area_options = [
    { name: "Fitness", color: "#FF6B6B", icon: Dumbbell },       // Red    - Energy and strength
    { name: "Professional", color: "#4E89AE", icon: Briefcase }, // Blue   - Stability and trust
    { name: "Personal", color: "#F4A261", icon: User },          // Orange - Growth and enthusiasm
    { name: "Relationships", color: "#8E7CC3", icon: Heart },    // Purple - Connection and empathy
    { name: "Finance", color: "#2A9D8F", icon: Wallet },         // Green  - Wealth and balance
    { name: "Hobbies", color: "#E9C46A", icon: Palette }         // Yellow - Creativity and optimism
]

export default function GoalChartComponent({ goal_info, only_chart }) {

    const option = area_options.find(area => area.name === goal_info.area);

    let numDummyBars = goal_info.reports ? goal_info.total_reminders - goal_info.reports.length : goal_info.total_reminders;

    if (numDummyBars < 0) {
        numDummyBars = 0;
    }

    const dummyData = new Array(numDummyBars).fill({progress: 0})
    const finalReportsData = goal_info.reports ? [...goal_info.reports, ...dummyData] : dummyData;

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, [])

    if (!isClient) {
        return null
    }

    return (
        only_chart ?

        <div className='border mx-2 bg-slate-100 flex flex-col items-center'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center '>
                    <span className='w-full m-2'>Progress reports chart</span>
                </div>
            </div>

            <div className='w-full h-full mr-8' style={{borderColor: option.color, height: 125, pointerEvents: 'none'}}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart id='1' data={finalReportsData}>
                        <XAxis dataKey="date" tick={false} />
                        <YAxis type='number' ticks={[0,1,2,3,4]} interval={0}/>
                        <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3"/>
                        <Bar dataKey="progress" fill={option.color}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        : // NOT ONLY CHARTS

        <Link href={'goals/' + goal_info.id}>
        <button style={{ 
            backgroundColor: option.color + '40',
            borderColor: option.color,
            boxShadow: '3px 3px 1px 1px ' + option.color,
        }} className='myShadow rounded-md border mx-2 bg-slate-100 flex flex-col items-center'>

            
            <div className='flex items-center justify-between'>
                <div className='flex items-center '>
                    <div className='rounded-full p-2'>
                        {<option.icon style={{color: option.color }} size={30}/>}
                    </div>
                    <span className='w-full'>{goal_info.goal_name}</span>
                </div>
                
                <div className='flex items-center'>
                    <div className='rounded-full p-2'>
                        <Flag size={30} style={{color: option.color }}/>
                    </div>
                    <span className='text-sm'>{format(goal_info.completion_date, 'MMMM dd, yyyy')}</span>
                </div>
            </div>
            
            

            <div className='w-full h-full mr-8' style={{borderColor: option.color, height: 125, pointerEvents: 'none'}}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart id='1' data={finalReportsData}>
                        <XAxis dataKey="date" tick={false} />
                        <YAxis type='number' ticks={[0,1,2,3,4]} interval={0}/>
                        <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3"/>
                        <Bar dataKey="progress" fill={option.color}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </button>
        </Link>
    )
}
