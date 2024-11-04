'use client'
import GoalComponent from '@/components/GoalComponent';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Dumbbell, Heart, Palette, User, Wallet } from 'lucide-react'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Loading from '@/components/Loading';
import Login from '@/components/Login';

const goals = [
	{
	  id: 1,
	  area: "Fitness",
	  name: "Run a Marathon",
	  description: "Train consistently to complete a full marathon.",
	  completionDate: "12-15-2024",
	  reminderFrequency: "Weekly",
	  aiGeneratedText: false,
	  personalText: "Focus on stamina and endurance."
	},
	{
	  id: 2,
	  area: "Professional",
	  name: "Learn React",
	  description: "Complete an online course in React and build a project.",
	  completionDate: "01-30-2025",
	  reminderFrequency: "Daily",
	  aiGeneratedText: true,
	  personalText: "React is essential for front-end development."
	},
	{
	  id: 3,
	  area: "Personal",
	  name: "Read 12 Books",
	  description: "Read at least one book per month on self-improvement.",
	  completionDate: "12-31-2024",
	  reminderFrequency: "Monthly",
	  aiGeneratedText: false,
	  personalText: "Aim for a mix of fiction and non-fiction."
	}
  ];

  // Progress reports for Goal 1: "Run a Marathon"
const fit = [
	{
	  id: 1,
	  goalId: 1,
	  date: "10-15-2024",
	  progressScale: 3,
	  observations: "Completed 5-mile runs twice this week. Need to work on pacing for longer distances."
	},
	{
	  id: 2,
	  goalId: 1,
	  date: "10-25-2024",
	  progressScale: 4,
	  observations: "Ran 10 miles comfortably. Hydration is a key focus area during long runs."
	},
	{
	  id: 3,
	  goalId: 1,
	  date: "11-05-2024",
	  progressScale: 2,
	  observations: "Finished a 15-mile run. Feeling strong and on track to reach marathon distance."
	}
  ];
  
  // Progress reports for Goal 2: "Learn React"
  const pro = [
	{
	  id: 4,
	  goalId: 2,
	  date: "10-20-2024",
	  progressScale: 0,
	  observations: "Completed modules on React basics. Need to review the concepts of state and props."
	},
	{
	  id: 5,
	  goalId: 2,
	  date: "10-30-2024",
	  progressScale: 1,
	  observations: "Started building a small project. Encountering challenges with routing and component structure."
	},
	{
	  id: 6,
	  goalId: 2,
	  date: "11-10-2024",
	  progressScale: 4,
	  observations: "Progressing well. Completed a CRUD app to solidify understanding of React fundamentals."
	}
  ];
  
  // Progress reports for Goal 3: "Read 12 Books"
  const per = [
	{
	  id: 7,
	  goalId: 3,
	  date: "10-15-2024",
	  progressScale: 4,
	  observations: "Finished one book on personal development. Starting the next book on productivity."
	},
	{
	  id: 8,
	  goalId: 3,
	  date: "10-31-2024",
	  progressScale: 3,
	  observations: "On track with reading goals. Finished another book this month."
	},
	{
	  id: 9,
	  goalId: 3,
	  date: "11-10-2024",
	  progressScale: 4,
	  observations: "Halfway through a new book on mindfulness. Feeling motivated to keep the pace."
	}
];

const area_options = [
    { name: "Fitness", color: "#FF6B6B", icon: Dumbbell },       // Red    - Energy and strength
    { name: "Professional", color: "#4E89AE", icon: Briefcase }, // Blue   - Stability and trust
    { name: "Personal", color: "#F4A261", icon: User },          // Orange - Growth and enthusiasm
    { name: "Relationships", color: "#8E7CC3", icon: Heart },    // Purple - Connection and empathy
    { name: "Finance", color: "#2A9D8F", icon: Wallet },         // Green  - Wealth and balance
    { name: "Hobbies", color: "#E9C46A", icon: Palette }         // Yellow - Creativity and optimism
]

export default function GoalsPage() {
	const username = 'John'

	// Make an array with just the areas of the goals
	const goal_areas = goals.map(goal => goal.area);

	// Create an array of areas with a new variable for checking the areas that have goals
	const area_icons = area_options.map(area => ({
		...area,
		showIcon: goal_areas.includes(area.name)
	}))

	const { curUser, userData, loading } = useAuth();
	const { data, setData } = useState(null);

	useEffect(() => {
		if (!curUser || !userData) {
			return 
		}
		setData(userData);
	}, [curUser, userData])

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

				<GoalComponent goal_info={goals[0]} reports_info={fit}/>
				<GoalComponent goal_info={goals[1]} reports_info={pro}/>
				<GoalComponent goal_info={goals[2]} reports_info={per}/>
			</div>
        </div>
    )
}
