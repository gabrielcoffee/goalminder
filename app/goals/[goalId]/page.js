'use client'
import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react'
import Loading from '@/components/Loading';
import Login from '@/components/Login';
import { ArrowLeft, BarChart, Briefcase, CalendarIcon, Dumbbell, Flag, FlagIcon, Heart, Palette, RepeatIcon, User, Wallet } from 'lucide-react';
import GoalNotFound from '@/components/GoalNotFound';
import { Bar, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import GoalChartComponent from '@/components/GoalChartComponent';
import Link from 'next/link';
import { formatDate } from 'date-fns';

const area_options = [
    { name: "Fitness", color: "#FF6B6B", icon: Dumbbell },       // Red    - Energy and strength
    { name: "Professional", color: "#4E89AE", icon: Briefcase }, // Blue   - Stability and trust
    { name: "Personal", color: "#F4A261", icon: User },          // Orange - Growth and enthusiasm
    { name: "Relationships", color: "#8E7CC3", icon: Heart },    // Purple - Connection and empathy
    { name: "Finance", color: "#2A9D8F", icon: Wallet },         // Green  - Wealth and balance
    { name: "Hobbies", color: "#E9C46A", icon: Palette }         // Yellow - Creativity and optimism
]

export default function GoalInfoPage({ params }) {

	const [username, setUsername] = useState("User");
    const [goalData, setGoalData] = useState({});
    const [notFound, setNotFound] = useState(true);

    const [showModalDelete, setShowModalDelete] = useState(false);

	const { curUser, userGoals, loading } = useAuth();

	useEffect(() => {
		if (curUser && curUser.displayName) {
            setUsername(curUser.displayName);
        }
	},[curUser])

	useEffect(() => {
		if (userGoals) {
            const goal = userGoals.find(goal => goal.id === params.goalId);
            if (goal) {
                setGoalData(goal);
                setNotFound(false);
            } else {
                setNotFound(true);
            }
        }
	}, [userGoals])

    const handleDeleteGoal = () => {
        
    }
  
	if (!curUser) {
		return <Login/>
	}

	if (loading) {
		return <Loading/>
	}

    if (notFound) {
        return <GoalNotFound/>
    }

    // Creates dummy data for showing 30 bars on the chart
    const numDummyBars = goalData.total_reminders - goalData.reports.length;
    const dummyData = new Array(numDummyBars).fill({progress_scale: 0})
    const finalData = [...goalData.reports, ...dummyData];

    const area_option = area_options.find(option => option.name == goalData.area);

    return (
        // SHOWS ONLY WHEN DELETING A GOAL
        showModalDelete ?
        <div className='flex flex-col justify-center items-center fixed inset-0'>

            <div className='border border-slate-400 rounded-lg p-4 m-4 space-y-8'>
                <span>Are you sure you want to the delete the goal: </span>

                <div className='flex items-center '>
                    <div className='rounded-full p-2'>
                        {<area_option.icon style={{color: area_option.color }} size={30}/>}
                    </div>
                    <span className='w-full'>{goalData.goal_name}</span>
                </div>

                <div className='flex justify-around'>
                    <button onClick={() => setShowModalDelete(false)} >Cancel</button>
                    <button className='text-red-600' onClick={handleDeleteGoal}>Delete Goal</button>
                </div>
            </div>
            
        </div>
        :
        // SHOWS GOAL DATA 
        <div className="flex flex-col gap-4 sm:max-w-[733px] mx-auto">

            <Link href='/goals' className='flex items-center gap-2 justify-center'>
                <ArrowLeft></ArrowLeft>
                <div className='text-center items-center my-4'><strong>Go back</strong></div>
            </Link>

            <div className='text-2xl flex items-center gap-4 mx-4 mb-2 justify-center'>
                <div style={{ backgroundColor: area_option.color + '40'}} className='rounded-full p-4'>
                    {<area_option.icon style={{color: area_option.color }} size={30}/>}
                </div>
                <span><strong>{goalData.goal_name}</strong></span>
            </div>
            
            <GoalChartComponent goal_info={goalData} reports_info={goalData.reports} only_chart={true}/>
            
            <div className='flex flex-col text-xl gap-10 m-4'>

                <div className='flex flex-col'>
                    <h1><strong>Completion:</strong></h1>
                    <p className='text-base'>{formatDate(goalData.completion_date, "MMMM d, yyyy")}</p>
                </div>

                <div className='flex flex-col'>
                    <h1><strong>Description:</strong></h1>
                    <p className='text-base'>{goalData.description || '...'}</p>
                </div>

                <div className='flex flex-col'>
                    <h1><strong>Personal Text:</strong></h1>
                    <p className='text-base'>{goalData.personal_text || '...' }</p>
                </div>


                <div className='flex flex-col gap-2 border border-slate-400 p-2 rounded-lg'>
                    <h1><strong>Details</strong></h1>

                    <div className='mx-2 flex flex-col gap-1'>
                        <span className='text-lg justify-between flex'><strong>Reminder Frequency: </strong>{goalData.reminder_freq}</span>
                        <span className='text-lg justify-between flex'><strong>Time of Reminder:</strong> {goalData.time_of_reminder}</span>
                        <span className='text-lg justify-between flex'><strong>AI Generated Text:</strong> {goalData.have_ai_text ? 'Yes' : 'No'}</span>
                        <div className='text-lg justify-between flex items-center'>
                            <strong>Motivational Image:</strong>
                            {
                                goalData.motivation_img_url ?
                                <a href={goalData.motivation_img_url} target='_blank'>
                                <img width={250} src={goalData.motivation_img_url}></img>
                                </a>
                                : 
                                '...'
                            }
                            
                        </div>
                    </div>
                    
                </div>
            </div>
            <button onClick={() => setShowModalDelete(true)} className='text-center items-center p-4 text-red-600 bg-red-50'>Delete Goal</button>
        </div>
      )
}
