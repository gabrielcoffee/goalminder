'use client'
import GoalChartComponent from '@/components/GoalChartComponent';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Dumbbell, Heart, Palette, User, Wallet } from 'lucide-react'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Loading from '@/components/Loading';
import Login from '@/components/Login';

const area_icons_default = [
	{ name: "Fitness", color: "#FF6B6B", icon: Dumbbell, showIcon: false },      
	{ name: "Professional", color: "#4E89AE", icon: Briefcase, showIcon: false },
	{ name: "Personal", color: "#F4A261", icon: User, showIcon: false },      
	{ name: "Relationships", color: "#8E7CC3", icon: Heart, showIcon: false },
	{ name: "Finance", color: "#2A9D8F", icon: Wallet, showIcon: false },        
	{ name: "Hobbies", color: "#E9C46A", icon: Palette, showIcon: false }     
];

export default function GoalsPage() {

	const [username, setUsername] = useState("User");
	const [areaIcons, setAreaIcons] = useState(area_icons_default);

	const { curUser, userGoals, loading } = useAuth();

	useEffect(() => {
		if (curUser && curUser.displayName) {
            setUsername(curUser.displayName);
        }
	},[curUser])

	useEffect(() => {
		if (userGoals) {
			const goal_areas = userGoals.map(goal => goal.area);

			const newAreaIcons = area_icons_default.map(area => ({
				...area,
				showIcon: goal_areas.includes(area.name)
			}))
			setAreaIcons(newAreaIcons);
		}
		console.log(userGoals);
	}, [userGoals])

	if (loading) {
		return <Loading/>
	}
	  
	if (!curUser) {
		return <Login/>
	}

    return (
        <div className='flex flex-col items-center mt-20 gap-10 w-full'>

			<h1 className='text-4xl font-bold text-center px-4'>{username}&apos;s goals</h1>
			<div className='flex flex-col items-center gap-2'>
				<h2 className='text-xl'>Areas include:</h2>
				<div className='flex gap-2 m-2'>
					{
						areaIcons.map((area, index) => (
							
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
					userGoals.map((goal) => (
						<GoalChartComponent key={goal.id} goal_info={goal} />
					))
				}
			</div>
        </div>
    )
}
