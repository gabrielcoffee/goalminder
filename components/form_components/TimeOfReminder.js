import { AlarmClock, Clock12, Moon, Sunset } from 'lucide-react'
import React, { useEffect } from 'react'

const time_reminders = [
    { name: "Midnight", time: '12AM', icon: Moon,     real_time: '0' },
    { name: "Morning", time: '6AM', icon: AlarmClock, real_time: '6' },
    { name: "Noon", time: '12PM', icon: Clock12,      real_time: '12' },
    { name: "Evening", time: '6PM', icon: Sunset,     real_time: '18' },
]

export default function TimeOfReminder({data, setter, canProgressSetter }) {

    useEffect(() => {
        if (!data) {
            canProgressSetter(false);
        } else {
            canProgressSetter(true);
        }
    }, [data])
        
    return (
        <div className="flex flex-col items-center h-full relative">
            <h1 className='text-2xl text-center font-bold'>When would you like to receive the reminders?</h1>
            
            <div className='grid grid-cols-2 grid-rows-2 mt-14 mx-4 gap-4 text-xl'>
            {
                time_reminders.map((option, index) => (

                    <button key={index} onClick={() => setter(option.real_time)} value={option.name}
                    className={'flex flex-col justify-center items-center border-[1px] border-slate-400 rounded-md px-8 py-4 gap-4 ' +  (data === option.real_time && 'bg-slate-700 text-white')}
                    >
                        <div style={{ borderColor: option.color }} className='bg-opacity-60 rounded-full p-4 bg-slate-200 text-slate-800'>
                            {<option.icon size={50}/>}
                        </div>

                        <div className='flex-col flex gap-2'>
                            <span>{option.name}</span>
                            <span className='text-slate-400 text-sm'>{option.time}</span>
                        </div>
                        
                    </button>
                ))
            }
            </div>
        </div>
    )
}
