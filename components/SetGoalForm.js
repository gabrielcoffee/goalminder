'use client'
import { ArrowLeft, ArrowRight, BookCheck, Play } from 'lucide-react';
import React, { useState } from 'react'
import Start from './goal_form_components/Start';
import Area from './goal_form_components/Area';

export default function SetGoalForm() {
    const [step, setStep] = useState(0);

    // Form data for a goal
    const [area, setArea] = useState(null);
    
    const [goalName, setGoalName] = useState("");
    const [description, setDescription] = useState("");

    // Dates and reminder times
    const [completionDate, setCompletionDate] = useState("");
    const [reminderFreq, setReminderFreq] = useState("");
    const [timeOfReminder, setTimeOfReminder] = useState("");

    // Motivation
    const [motivationPics, setMotivationPics] = useState({});
    const [haveAiText, setHaveAiText] = useState(false);
    const [personalText, setPersonalText] = useState();

    const steps_components = [
        <Start/>,
        <Area/>,
    ]

    const totalSteps = steps_components.length;

    return (
        <div className='flex flex-col h-screen'>   
            {   
                step !== 0 &&
                <div className={'p-4 text-xl'}>
                    <span>{`${step} of ${totalSteps}`}</span>
                </div>
            }

            {/* Go through each component to fill the form */}
            {
                steps_components[step]
            }

            <div className='flex gap-4 items-center m-4 sticky bottom-10 justify-center'>
                {
                    step !== 0 &&
                    <button value={-1} className='rounded-sm border-[1px] p-5 border-slate-800 bg-white text-slate-800 active:bg-slate-800 active:text-white sm:hover:bg-slate-800 sm:hover:text-white' onClick={() => { step !== 0 && setStep(step - 1)}}>
                        <ArrowLeft size={36}/>
                    </button>
                }
                

                <button value={+1} className='flex gap-4 bg-emerald-800 active:bg-emerald-700 sm:hover:bg-emerald-700 text-white rounded-sm items-center
                    py-5 w-full sm:w-[20rem] justify-center text-2xl ' onClick={() => { step !== totalSteps && setStep(step + 1) }}>
                    {
                        step === 0 ? 'Start' :
                        step === totalSteps ? 'Confirm Goal' :
                        'Continue'
                    }

                    {
                        step === 0 ? <Play size={36}/> :
                        step === totalSteps ? <BookCheck size={36}/> :
                        <ArrowRight size={36}/>
                    }
                </button>
            </div>
        </div>
    )
}
