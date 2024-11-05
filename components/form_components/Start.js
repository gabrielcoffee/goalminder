import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react'



export default function Start({ canProgressSetter }) {
    
    const { curUser, userData } = useAuth();
    const [isFirstGoal, setIsFirstGoal] = useState(false);
    const [username, setUsername] = useState("User");

    useEffect(() => {
        canProgressSetter(true);

    }, [])

    useEffect(() => {
        if (curUser && curUser.displayName) {
            setUsername(curUser.displayName);
        }
        
        const first = true;
        setIsFirstGoal(first);
    }, [curUser])

    return (
        <div className="flex items-center justify-center h-full">
            <h1 className={'text-4xl font-normal text-center px-4 mb-20'}>
                {
                    isFirstGoal ?
                    <span>Alright <strong>{username}</strong>, let's set your first goal!</span>
                    :
                    <span>Hey <strong>{username}</strong>, let's start creating your new goal!</span>
                }       
            </h1>
        </div>
    )
}
