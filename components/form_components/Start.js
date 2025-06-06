import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react'
import Loading from '@/components/Loading';

const maxGoals = 6;

export default function Start({ canProgressSetter }) {
    
    const { curUser, userGoals, loading } = useAuth();
    const [isFirstGoal, setIsFirstGoal] = useState(false);
    const [username, setUsername] = useState("User");
    const [hitLimit, setHitLimit] = useState(true);

    useEffect(() => {
        canProgressSetter(false);
    }, [])

    useEffect(() => {
        if (curUser && curUser.displayName) {
            setUsername(curUser.displayName);
        }
    }, [curUser])

    useEffect(() => {
		if (userGoals) {
            if (userGoals.length >= maxGoals) {
                setHitLimit(true);
                canProgressSetter(false);
            }
            else if (userGoals.length < maxGoals) {
                setHitLimit(false);
                canProgressSetter(true);
            }
            
            if (userGoals.length == 0) {
                setIsFirstGoal(true);
                canProgressSetter(true);
            }
		}
        else {
            setIsFirstGoal(true);
            canProgressSetter(true);
        }
	}, [userGoals])

    return (
        hitLimit ?
    
        <div className="flex items-center justify-center h-full">
            <h1 className={'text-3xl font-normal text-center px-4 mb-20'}>
                <div className='flex flex-col'>
                    <span>Sorry <strong>{username}</strong>, but you have reached your limit of {maxGoals} goals.</span>
                    <span className='text-2xl mt-10 mx-2'> Delete a current goal to create a new one.</span>
                </div>
            </h1>
        </div>

        :

        <div className="flex items-center justify-center h-full">
            <h1 className={'text-3xl font-normal text-center px-4 mb-20'}>
                {
                    isFirstGoal ?
                    <span>Alright <strong>{username}</strong>, let&apos;s set your first goal!</span>
                    :
                    <span>Hey <strong>{username}</strong>, let&apos;s create a new goal!</span>
                }       
            </h1>
        </div>
    )
}
