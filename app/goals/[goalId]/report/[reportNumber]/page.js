'use client'
import Loading from '@/components/Loading';
import Login from '@/components/Login';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase';
import { format } from 'date-fns';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

const values = [0, 1, 2, 3, 4];
const progressLevels = [
	"0/4 Zero Progress, All Talk 🗣️",
	"1/4 A Little Progress, Mostly Daydreaming 💭",
	"2/4 Getting There, Slowly but Surely 🐌",
	"3/4 Making Moves, Don't Blink! 🚶‍♂️",
	"4/4 Progressing Like a Speeding Train 🚂"
  ];
  
  
  

export default function ReportPage({params}) {
    const [progressValue, setProgressValue] = useState(null);
	const [observations, setObservations] = useState('');
	const { curUser, loading } = useAuth();

	async function handleSubmit() {
		const userId = curUser.uid;
		const reportRef = doc(db, 'users', userId, 'goals', params.goalId, 'reports', params.reportNumber);
		const goalRef = doc(db, 'users', userId, 'goals', params.goalId);

		// Update the report with the progress value and observations
		try {
			await setDoc(reportRef, {
				date: format(new Date(), 'MMMM dd, yyyy'),
				progress: progressValue,
				observations: observations
			});
			console.log('Report submitted');
		}
		catch (e) {
			console.error(e);
		}

		// Redirect to the goal page
		window.location.href = `/goals/${params.goalId}`;
	}

	if (loading) {
        return <Loading/>
    }

    if (!curUser) {
        return <Login/>
    }

    return (
      <div className='flex flex-col justify-center items-center fixed inset-0'>
          <div className='border border-slate-400 rounded-lg p-4 m-4 space-y-8 flex flex-col'>
				<span>Report #{params.reportNumber}</span>
				<span className='text-xl'>How much progress have you made recently on your goal?</span>

				<div className='flex justify-between'>
					{
						values.map((value, index) => (
							<button key={index} onClick={() => setProgressValue(value)} 
							className={'hover:bg-slate-600 hover:text-white text-slate-800 duration-200 p-4 px-6 border ' +  (progressValue === value && 'bg-slate-800 text-white hover:bg-slate-800') }
							>{value}</button>
						))
					}
				</div>

				<span className={'text-center bg-slate-100 p-3 rounded-lg ' + (progressValue === null && ' hidden') }>{progressLevels[progressValue]}</span>

			  	<label className='flex flex-col'>
                    Observations:
                    <textarea value={observations} name='personal_text' rows="5" className={'p-2 text-base border-slate-800 border rounded-md'} placeholder="Any additional information on your progress..." onChange={(e) => setObservations(e.target.value)}/>
            	</label>

				<button onClick={handleSubmit} className='bg-green-800 hover:bg-green-700 active:bg-green-700 text-white py-3'>Submit Progress</button>
          </div>
      </div>
    )
}
