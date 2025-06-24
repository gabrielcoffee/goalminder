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
	  id: "demo/professional",
	  area: "Professional",
	  completion_date: "2026-05-15",
	  description: "I will complete the certification course in my field by studying consistently and dedicating time to practice what I learn.",
	  goal_name: "Complete a certification course in my field",
	  have_ai_text: false,
	  motivation_img_url: "https://mycareer.aicpa-cima.com/getasset/9d25d30e-702e-4856-8289-3131d3179645/",
	  personal_text: "Getting this certification will boost my career and open up new opportunities for growth and advancement.",
	  reminder_dates: [
		"2025-05-15",
		"2025-08-15",
		"2025-11-15",
		"2026-02-15",
		"2026-05-15"
	  ],
	  reminder_freq: "Every 3 Months",
	  reports: [
		{ progress: 1 },
		{ progress: 2 },
		{ progress: 3 },
		{ progress: 2 },
		{ progress: 4 },
		{ progress: 3 },
		{ progress: 4 },
		{ progress: 2 },
	  ],
	  text_mood: "Rude",
	  time_of_reminder: "18",
	  total_reminders: 10
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
