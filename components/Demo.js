'use client'
import React from 'react'
import GoalChartComponent from './GoalChartComponent';
import { useAuth } from '@/context/AuthContext';

// Demo data
  const goalsDemo = [
	{
	  id: "demo/fitness",
	  area: "Fitness",
	  completion_date: "2025-02-03",
	  goal_name: "Achieve 100 push-ups in a row",
	  reminder_freq: "Weekly",
	  reports: [
		{ progress: 1 },
		{ progress: 2 },
		{ progress: 3 },
		{ progress: 2 },
		{ progress: 3 },
		{ progress: 4 },
		{ progress: 2 },
		{ progress: 4 },
	  ],
	  total_reminders: 9
	},
	{
	  id: "demo/professional",
	  area: "Professional",
	  completion_date: "2026-05-15",
	  goal_name: "Complete a certification course in my field",
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
	  total_reminders: 10
	},
	{
	  id: "demo/hobby",
	  area: "Hobbies",
	  completion_date: "2025-01-02",
	  goal_name: "Learn and master the song 'Wonderwall' on guitar",
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
		{ progress: 4 },
	  ],
	  total_reminders: 15
	}
  ];
  

  
export default function Demo() {

	const { curUser } = useAuth();

	if (curUser) {
		return
	}

	return (
		
			<div className='w-full sm:w-4/6 mb-8 gap-4 flex flex-col' >

				<div className='mb-6 mt-20'>Play with our demo. Click on any goal:</div>
					
				<div className='w-full gap-8 flex flex-col mb-8 items-center justify-center' >
					{
						goalsDemo.map((goal) => (
							<GoalChartComponent key={goal.id} goal_info={goal} />
						))
					}
				</div>
			</div>
	)
}
