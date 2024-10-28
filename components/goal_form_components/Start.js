import React from 'react'



export default function Start() {
    const isFirstGoal = false;
    const username = 'John';

    return (
        <div className="flex items-center justify-center h-full">
            <h1 className={'text-4xl font-bold text-center px-4 mb-20'}>
                {
                    isFirstGoal ?
                    <span>Alright <strong>{username}</strong>, let's set your first goal!</span>
                    :
                    <span>Hey <strong>{username}</strong>, how about we set a new goal!</span>
                }       
            </h1>
        </div>
    )
}
