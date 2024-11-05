'use client'
import GoalComponent from '@/components/GoalComponent';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Dumbbell, Heart, Palette, User, Wallet } from 'lucide-react'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Loading from '@/components/Loading';
import Login from '@/components/Login';

const goal_example = {
	  id: 1,
	  area: "Fitness",
	  name: "Run a Marathon",
	  description: "Train consistently to complete a full marathon.",
	  completionDate: "12-15-2024",
	  reminderFrequency: "Weekly",
	  aiGeneratedText: false,
	  personalText: "Focus on stamina and endurance."
}

const report_example = {
	id: 1,
	goalId: 1,
	date: "10-15-2024",
	progressScale: 3,
	observations: "Completed 5-mile runs twice this week. Need to work on pacing for longer distances."
}
const area_icons = [
    { name: "Fitness", color: "#FF6B6B", icon: Dumbbell, showIcon: false },      
    { name: "Professional", color: "#4E89AE", icon: Briefcase, showIcon: false },
    { name: "Personal", color: "#F4A261", icon: User, showIcon: false },      
    { name: "Relationships", color: "#8E7CC3", icon: Heart, showIcon: false },
    { name: "Finance", color: "#2A9D8F", icon: Wallet, showIcon: false },        
    { name: "Hobbies", color: "#E9C46A", icon: Palette, showIcon: false }     
];

export default function GoalsPage() {

	// Make an array with just the areas of the goals
	//const goal_areas = goals.map(goal => goal.area);

	// Create an array of areas with a new variable for checking the areas that have goals
	//const area_icons = area_options.map(area => ({
	//	...area,
	//	showIcon: goal_areas.includes(area.name)
	//}))

	const [username, setUsername] = useState("User");
	const [goals, setGoals] = useState([])
	const { curUser, userData, loading } = useAuth();

	useEffect(() => {
		if (curUser && curUser.displayName) {
            setUsername(curUser.displayName);
        }
	},[curUser])

	if (loading) {
		return <Loading/>
	}
  
	if (!curUser) {
		return <Login/>
	}

    return (
        <div className='flex flex-col items-center mt-20 gap-10 w-full'>

			<h1 className='text-4xl font-bold text-center px-4'>{username}'s goals</h1>
			<div className='flex flex-col items-center gap-2'>
				<h2 className='text-xl'>Areas include:</h2>
				<div className='flex gap-2'>
					{
						area_icons.map((area, index) => (
							
							area.showIcon &&
							<div key={index} style={{ backgroundColor: area.color + '40'}} className='rounded-full p-4'>
								{<area.icon style={{color: area.color }} size={30}/>}
							</div>
						))
					}
				</div>
			</div>
			
			
			<div className='flex items-center gap-2'>
				<span>Sort by</span>
				<select className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
					<option value="recently_added">Recently Added</option>
					<option value="recently_added">Last Added</option>
					<option value="sooner_to_end">Sooner to End</option>
					<option value="later_to_end">Later to End</option>
					<option value="completed">Completed</option>
					<option value="incomplete">Incomplete</option>
				</select>
			</div>

			<div className='w-full sm:w-4/6 gap-8 flex flex-col mb-8' >
				{
					goals.map((goal, index) => (
						<GoalComponent goal_info={goal} reports_info={goal.reports}/>
					))
				}
			</div>
        </div>
    )
}
