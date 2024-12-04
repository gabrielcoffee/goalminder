'use client'
import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react'
import Loading from '@/components/Loading';
import Login from '@/components/Login';
import { ArrowLeft, BarChart, Briefcase, CalendarIcon, Dumbbell, File, Flag, FlagIcon, Heart, Palette, RepeatIcon, User, Wallet } from 'lucide-react';
import GoalNotFound from '@/components/GoalNotFound';
import { Bar, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import GoalChartComponent from '@/components/GoalChartComponent';
import ProgressReport from '@/components/ProgressReport';
import Link from 'next/link';
import { format, formatDate } from 'date-fns';
import { ref } from 'firebase/storage';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';
import Image from 'next/image';

const area_options = [
    { name: "Fitness", color: "#FF6B6B", icon: Dumbbell },       // Red    - Energy and strength
    { name: "Professional", color: "#4E89AE", icon: Briefcase }, // Blue   - Stability and trust
    { name: "Personal", color: "#F4A261", icon: User },          // Orange - Growth and enthusiasm
    { name: "Relationships", color: "#8E7CC3", icon: Heart },    // Purple - Connection and empathy
    { name: "Finance", color: "#2A9D8F", icon: Wallet },         // Green  - Wealth and balance
    { name: "Hobbies", color: "#E9C46A", icon: Palette }         // Yellow - Creativity and optimism
]

export default function GoalInfoPage({ params }) {

    const [goalData, setGoalData] = useState({});
    const [notFound, setNotFound] = useState(true);

    const [showModalDelete, setShowModalDelete] = useState(false);

	const { curUser, userGoals, loading } = useAuth();

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

    async function handleDeleteGoal() {
        const goalRef = doc(db, 'users', curUser.uid, 'goals', params.goalId);
        try {
            await deleteDoc(goalRef);
            console.log('Goal deleted');
        }
        catch (e) {
            console.log(e.message);
        }
        window.location.href = '/goals';
    }
  
	if (loading) {
		return <Loading/>
	}

    if (notFound) {
        return <GoalNotFound/>
    }
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
            
            <GoalChartComponent goal_info={goalData} only_chart={true}/>
            
            <div className='flex flex-col text-xl gap-10 m-2 border p-2 border-slate-400'>

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


                <div className='flex flex-col gap-2 border-t border-slate-400 p-2'>
                    <h1 className='mt-4'><strong>Details</strong></h1>

                    <div className='mx-2 flex flex-col gap-1'>
                        <span className='text-lg justify-between flex'><strong>Reminder Frequency: </strong>{goalData.reminder_freq}</span>
                        <span className='text-lg justify-between flex'><strong>Time of Reminder:</strong> {goalData.time_of_reminder + ":00"}</span>
                        <span className='text-lg justify-between flex'><strong>AI Generated Text:</strong> {goalData.have_ai_text ? 'Yes' : 'No'}</span>
                        <span className='text-lg justify-between flex'><strong>Text mood on reminder:</strong> {goalData.text_mood}</span>
                        <div className='text-lg justify-between flex flex-col gap-2 items-center'>
                            <strong>Motivational Image:</strong>
                            {
                                goalData.motivation_img_url ?
                                <a href={goalData.motivation_img_url} target='_blank'>
                                <Image alt='motivational image' width={10000} height={0} style={{width:'auto',height:'auto'}} src={goalData.motivation_img_url}></Image>
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
                    
                    goalData.reports.map((report, index) => (
                        <ProgressReport key={index} report={report} index={index}/>
                    ))
                }
            </div>

            <button onClick={() => setShowModalDelete(true)} className='m-2 text-center items-center p-4 text-red-600 hover:text-white hover:bg-red-600 active:text-white active:bg-red-600  bg-red-50'>Delete Goal</button>
        </div>
      )
}
