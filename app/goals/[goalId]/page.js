'use client'
import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react'
import Loading from '@/components/Loading';
import Login from '@/components/Login';
import { CalendarIcon, FlagIcon, RepeatIcon } from 'lucide-react';
import GoalNotFound from '@/components/GoalNotFound';

export default function GoalInfoPage({ params }) {

	const [username, setUsername] = useState("User");
    const [goalData, setGoalData] = useState({});
    const [notFound, setNotFound] = useState(true);
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

	if (loading) {
		return <Loading/>
	}
  
	if (!curUser) {
		return <Login/>
	}

    if (notFound) {
        return <GoalNotFound/>
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">{goalData.name}</h1>
            <p className="text-xl">{goalData.area}</p>
            <span className="text-sm">Goal ID: {goalData.id}</span>
          </header>
    
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p>{goalData.description}</p>
          </section>
    
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Personal Notes</h2>
            <p>{goalData.personalText}</p>
          </section>
    
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5" />
                <span>Completion Date: {goalData.completionDate}</span>
              </li>
              <li className="flex items-center">
                <RepeatIcon className="mr-2 h-5 w-5" />
                <span>Reminder Frequency: {goalData.reminderFrequency}</span>
              </li>
              <li className="flex items-center">
                <FlagIcon className="mr-2 h-5 w-5" />
                <span>AI Generated: {goalData.aiGeneratedText ? "Yes" : "No"}</span>
              </li>
            </ul>
          </section>
    
          <section>
            <h2 className="text-2xl font-bold mb-4">Progress Reports</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Report ID</th>
                  <th className="text-left">Date</th>
                  <th className="text-left">Progress (0-4)</th>
                  <th className="text-left">Observation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>July 14, 2024</td>
                  <td>3</td>
                  <td>Increased weekly mileage to 30 miles.</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      )
}
