import React from 'react'
import GoalChartComponent from './GoalChartComponent';

const goalsDemo = 
[
	{
	  "reminder_freq": "Weekly",
	  "completion_date": "02-03-2025",
	  "area": "Fitness",
	  "have_ai_text": false,
	  "total_reminders": 8,
	  "time_of_reminder": "6",
	  "goal_name": "Achieve 100 push-ups in a row"
	},
	{
	  "reminder_freq": "Monthly",
	  "completion_date": "05-15-2025",
	  "area": "Professional",
	  "have_ai_text": false,
	  "total_reminders": 6,
	  "time_of_reminder": "9",
	  "goal_name": "Get a promotion at work"
	},
	{
	  "reminder_freq": "Bi-weekly",
	  "completion_date": "12-01-2025",
	  "area": "Hobbies",
	  "have_ai_text": false,
	  "total_reminders": 12,
	  "time_of_reminder": "3",
	  "goal_name": "Learn and master the song 'Wonderwall' on guitar"
	}
];



  
export default function Demo() {


	return (
		<div>
			<div className='w-full sm:w-4/6 gap-8 flex flex-col mb-8' >
				Demo
			</div>
		</div>
	)
}
