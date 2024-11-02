'use client'
import { ArrowLeft, ArrowRight, BookCheck, Play } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Start from './goal_form_components/Start';
import Area from './goal_form_components/Area';
import NameDesc from './goal_form_components/NameDesc';
import CompletionDate from './goal_form_components/CompletionDate';
import Frequency from './goal_form_components/Frequency';
import TimeOfReminder from './goal_form_components/TimeOfReminder';
import Motivation from './goal_form_components/Motivation';

export default function SetGoalForm() {
    const [step, setStep] = useState(0);

    /// FORM COMPONENTS ///
    const [area, setArea] = useState(null);
    const [goalName, setGoalName] = useState("");
    const [description, setDescription] = useState("");
    const [quantityPeriod, setQuantityPeriod] = useState(1);
    const [timePeriod, setTimePeriod] = useState('week');
    const [completionDate, setCompletionDate] = useState("")
    const [reminderFreq, setReminderFreq] = useState(null);
    const [timeOfReminder, setTimeOfReminder] = useState(null);
    const [motivationImg, setMotivationImg] = useState(null);
    const [personalText, setPersonalText] = useState("");
    const [haveAiText, setHaveAiText] = useState(false);

    const [canProgress, setCanProgress] = useState(true);

    const result = {
        area:               area,
        goal_name:          goalName,
        description:        description,
        quantity_period:    quantityPeriod,
        time_period:        timePeriod,
        completion_date:    completionDate,
        reminder_freq:      reminderFreq,
        time_of_reminder:   timeOfReminder,
        motivation_img:     motivationImg,
        personal_text:      personalText,
        have_ai_text:       haveAiText
    }

    const handleConfirmation = () => {

    }

    const steps_components = [
        { 
            comp: <Start/> 
        },
        { 
            comp: <Area/>, 
            data: area, 
            setter: setArea 
        },
        {
            comp: <NameDesc/>,
            data: { goalName, description },
            setter: { setGoalName, setDescription } 
        },
        {
            comp: <CompletionDate/>,
            data: { quantityPeriod, timePeriod }, 
            setter: { setQuantityPeriod, setTimePeriod, setCompletionDate } 
        },
        {
            comp: <Frequency/>,
            data: { reminderFreq, completionDate },
            setter: setReminderFreq
        },
        {
            comp: <TimeOfReminder/>,
            data: timeOfReminder,
            setter: setTimeOfReminder
        },
        {
            comp: <Motivation/>,
            data: { motivationImg, haveAiText, personalText }, 
            setter: { setMotivationImg, setHaveAiText, setPersonalText }
        },
    ]

    const totalSteps = steps_components.length-1;

    return (
        <div className='flex flex-col h-screen relative'>   
            {   
                step !== 0 &&
                <div className={'p-4 text-xl'}>
                    <span>{`${step} of ${totalSteps}`}</span>
                </div>
            }

            { // Shows each step of the goal form
                React.cloneElement(steps_components[step].comp, {
                    data: steps_components[step].data,
                    setter: steps_components[step].setter,
                    canProgressSetter: setCanProgress
                })
            }

            <div className='w-full h-32 fixed bottom-0 bg-gradient-to-t from-white to-transparent'>

            </div>

            <div className='mt-24 flex gap-4 items-center m-4 sticky bottom-10 justify-center'>
                { // show or not the go back button
                    step !== 0 &&
                    <button className='rounded-sm border-[1px] p-5 border-slate-800 bg-white text-slate-800
                    active:bg-slate-800 active:text-white sm:hover:bg-slate-800 sm:hover:text-white' 
                    onClick={() => { step !== 0 && setStep(step - 1)}}>
                        <ArrowLeft size={36}/>
                    </button>
                }

                {
                    step !== totalSteps ?
                    <button className='flex gap-4 bg-emerald-800 active:bg-emerald-700 sm:hover:bg-emerald-700 text-white rounded-sm items-center
                        py-5 w-full sm:w-[20rem] justify-center text-2xl' onClick={() => { step !== totalSteps && canProgress && setStep(step + 1) }}>
                        { // text from the green button
                            step === 0 ? 'Start' :
                            'Continue'
                        }

                        { // icon to show
                            step === 0 ? <Play size={36}/> :
                            <ArrowRight size={36}/>
                        }
                    </button>
                    :
                    <button className='flex gap-4 bg-emerald-800 active:bg-emerald-700 sm:hover:bg-emerald-700 text-white rounded-sm items-center
                        py-5 w-full sm:w-[20rem] justify-center text-2xl' onClick={handleConfirmation}>
                        <span>Confirm</span>
                        <BookCheck size={36}/>
                    </button>
                }
            </div>
        </div>
    )
}