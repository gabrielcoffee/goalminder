import { differenceInDays, differenceInWeeks } from 'date-fns';
import { Calendar, CalendarCheck, CalendarDays, CalendarRange, Clock, Sun } from 'lucide-react'
import React, { useEffect } from 'react'

const freq_options = [
    { name: "Daily", icon: Sun, disabled: false, max_days: 31 },
    { name: "Every 3 Days", icon: Clock, disabled: false, max_days: 91 },
    { name: "Weekly", icon: Calendar , disabled: false, max_days: 210 },
    { name: "Monthly", icon: CalendarDays , disabled: false, max_days: 910 },
    { name: "Every 3 Months", icon: CalendarRange, disabled: false, max_days: 2737  },
    { name: "Yearly", icon: CalendarCheck , disabled: false, max_days: 10956 }
  ]

export default function Frequency({ data, setter, canProgressSetter }) {

    // TODO: Limit depending on the data from the completion date for max of 30 reminders each goal

    useEffect(() => {
        if (!data.reminderFreq) {
            canProgressSetter(false);
        } else {
            canProgressSetter(true);
        }

    }, [data.reminderFreq])

    useEffect(() => {
        // Blocking frequencies that are more than 30 for a goal
        console.log()
        let completion = data.completionDate;
        let today = new Date();

        let diff = differenceInDays(completion, today);

        freq_options.forEach(option => {

            option.disabled = false;
            if (diff > option.max_days) {
                option.disabled = true;
                if (data.reminderFreq === option.name) {
                    setter(null);
                }
            }
        })
    }, [data.completionDate])

    return (
        <div className="flex flex-col items-center h-full relative">
            <h1 className='text-2xl text-center font-bold mx-2'>How frequent should we send the reminders?</h1>
            
            <div className='grid grid-cols-2 grid-rows-3 sm:grid-cols-3 sm:grid-rows-2 mt-8 mx-4 gap-4 text-lg'>
            {
                freq_options.map((option, index) => (
                    
                    <button key={index} onClick={() => setter(option.name)} value={option.name} disabled={option.disabled}
                    className={'flex flex-col justify-center items-center border-[1px] border-slate-400 rounded-md px-4 py-4 gap-4 ' +
                        (data.reminderFreq === option.name && 'bg-slate-700 text-white ') +
                        (option.disabled && ' opacity-40')}
                    >
                        <div style={{ borderColor: option.color }} className='bg-opacity-60 rounded-full p-4 bg-slate-200 text-slate-800'>
                            {<option.icon size={50}/>}
                        </div>

                        <span>{option.name}</span>
                    </button>
                ))
            }
            </div>
        </div>
    )
}
