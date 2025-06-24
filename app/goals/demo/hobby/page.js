'use client'
import React, { useEffect, useState } from 'react'
import { ArrowLeft, Briefcase, Dumbbell, File, Heart, Palette, User, Wallet} from 'lucide-react';
import GoalChartComponent from '@/components/GoalChartComponent';
import ProgressReport from '@/components/ProgressReport';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from 'date-fns';

const goal_data =
	{
	  id: "demo/hobby",
	  area: "Hobbies",
	  completion_date: "2025-01-02",
	  description: "I will practice guitar every day, focusing on mastering each part of the song and gradually putting everything together.",
	  goal_name: "Learn and master the song 'Wonderwall' on guitar",
	  have_ai_text: false,
	  motivation_img_url: "https://images.stockcake.com/public/5/c/3/5c33f829-83f2-46ab-9b83-3aa25f1d1175_large/family-guitar-lesson-stockcake.jpg",
	  personal_text: "Mastering this song will be a fun accomplishment and will boost my confidence in playing guitar.",
	  reminder_dates: [
		"2024-12-12",
		"2024-12-13",
		"2024-12-14",
		"2024-12-15",
		"2024-12-16",
		"2024-12-17",
		"2024-12-18",
		"2024-12-19",
		"2024-12-20",
		"2024-12-21",
		"2024-12-22",
		"2024-12-23",
		"2024-12-24",
		"2024-12-25",
		"2024-12-26"
	  ],
	  reminder_freq: "Daily",
	  reports: [
		{ progress: 0 },
		{ progress: 1 },
		{ progress: 1 },
		{ progress: 2 },
		{ progress: 2 },
		{ progress: 3 },
		{ progress: 3 },
		{ progress: 3 },
		{ progress: 3 },
		{ progress: 4 },
		{ progress: 4 }
	  ],
	  text_mood: "Serious",
	  time_of_reminder: "12",
	  total_reminders: 15
	}
  

const area_options = [
    { name: "Fitness", color: "#FF6B6B", icon: Dumbbell },       // Red    - Energy and strength
    { name: "Professional", color: "#4E89AE", icon: Briefcase }, // Blue   - Stability and trust
    { name: "Personal", color: "#F4A261", icon: User },          // Orange - Growth and enthusiasm
    { name: "Relationships", color: "#8E7CC3", icon: Heart },    // Purple - Connection and empathy
    { name: "Finance", color: "#2A9D8F", icon: Wallet },         // Green  - Wealth and balance
    { name: "Hobbies", color: "#E9C46A", icon: Palette }         // Yellow - Creativity and optimism
]

export default function GoalDemoPage() {

    const area_option = area_options.find(option => option.name == goal_data.area);

    return (

        // SHOWS GOAL DATA 
        <div className="flex flex-col gap-4 sm:max-w-[733px] mx-auto">

            <Link href='/' className='flex items-center gap-2 justify-center'>
                <ArrowLeft></ArrowLeft>
                <div className='text-center items-center my-4'><strong>Go back</strong></div>
            </Link>

            <div className='text-2xl flex items-center gap-4 mx-4 mb-2 justify-center'>
                <div style={{ backgroundColor: area_option.color + '40'}} className='rounded-full p-4'>
                    {<area_option.icon style={{color: area_option.color }} size={30}/>}
                </div>
                <span><strong>{goal_data.goal_name}</strong></span>
            </div>
            
            <GoalChartComponent goal_info={goal_data} only_chart={true}/>
            
            <div className='flex flex-col text-xl gap-10 m-2 border p-2 border-slate-400'>

                <div className='flex flex-col'>
                    <h1><strong>Completion:</strong></h1>
                    <p className='text-base'>{formatDate(goal_data.completion_date, "MMMM d, yyyy")}</p>
                </div>

                <div className='flex flex-col'>
                    <h1><strong>Description:</strong></h1>
                    <p className='text-base'>{goal_data.description || '...'}</p>
                </div>

                <div className='flex flex-col'>
                    <h1><strong>Personal Text:</strong></h1>
                    <p className='text-base'>{goal_data.personal_text || '...' }</p>
                </div>


                <div className='flex flex-col gap-2 border-t border-slate-400 p-2'>
                    <h1 className='mt-4'><strong>Details</strong></h1>

                    <div className='mx-2 flex flex-col gap-1'>
                        <span className='text-lg justify-between flex'><strong>Reminder Frequency: </strong>{goal_data.reminder_freq}</span>
                        <span className='text-lg justify-between flex'><strong>Time of Reminder:</strong> {goal_data.time_of_reminder + ":00"}</span>
                        <span className='text-lg justify-between flex'><strong>AI Generated Text:</strong> {goal_data.have_ai_text ? 'Yes' : 'No'}</span>
                        <span className='text-lg justify-between flex'><strong>Text mood on reminder:</strong> {goal_data.text_mood}</span>
                        <div className='text-lg justify-between flex flex-col gap-2 items-center'>
                            <strong>Motivational Image:</strong>
                            {
                                goal_data.motivation_img_url ?
                                <a href={goal_data.motivation_img_url} target='_blank'>
                                <img alt='motivational image' width={10000} height={0} style={{width:'auto',height:'auto'}} src={goal_data.motivation_img_url}></img>
                                </a>
                                : 
                                '...'
                            }
                            
                        </div>
                    </div>
                </div>
            </div>

            <div href='/goals' className='flex items-center gap-2 mb-2 mt-6 justify-center'>
                <File></File>
                <div className='text-center items-center '><strong>Progress Status Reports:</strong></div>
            </div>

            <div>
                { 
                    /* PRINT EVERY PROGRESS REPORT */ 
                    
                    goal_data.reports.map((report, index) => (
                        <ProgressReport key={index} report={report} index={index}/>
                    ))
                }
            </div>
        </div>
      )
}
