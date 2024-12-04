'use client'

import { add, differenceInDays, differenceInWeeks, format, isBefore, parseISO } from 'date-fns';
import { Calendar, CalendarCheck, CalendarDays, CalendarRange, Clock, Sun } from 'lucide-react'
import React, { useEffect } from 'react'

const freq_options = [
    { name: "Daily", icon: Sun, disabled: true, min_days: 1, max_days: 31 },
    { name: "Every 3 Days", icon: Clock, disabled: true, min_days: 3, max_days: 91 },
    { name: "Weekly", icon: Calendar , disabled: true, min_days: 7, max_days: 210 },
    { name: "Monthly", icon: CalendarDays , disabled: true, min_days: 31, max_days: 910 },
    { name: "Every 3 Months", icon: CalendarRange, disabled: true, min_days: 93, max_days: 2737  },
    { name: "Yearly", icon: CalendarCheck , disabled: true, min_days: 365, max_days: 10956 }
  ]

export default function Frequency({ data, setter, canProgressSetter }) {
    // TODO: Limit depending on the data from the completion date for max of 30 reminders each goal

    function getDatesBetween(startDate, endDate, frequency) {
        const result = [];

        let freq_object;

        switch (frequency) {
            case 'Daily':
                freq_object = { days: 1 }; break;
            case 'Every 3 Days':
                freq_object = { days: 3 }; break;
            case 'Weekly':
                freq_object = { weeks: 1 }; break;
            case 'Monthly':
                freq_object = { months: 1 }; break;
            case 'Every 3 Months':
                freq_object = { months: 3 }; break;
            case 'Yearly':
                freq_object = { years: 1 }; break;
            default:
                throw new Error('Invalid frequency');
        }

        let current = startDate;
      
        while (isBefore(current, endDate) || current.toISOString() === endDate.toISOString()) {
            result.push(format(current, 'yyyy-MM-dd'));
            current = add(current, freq_object);
        }
        
        console.log(result);

        return result;
    }

    useEffect(() => {
        if (!data.reminderFreq || !data.completionDate) {
            canProgressSetter(false);
            return
        } else {
            canProgressSetter(true);
        }

        let today = new Date();
        let completion = data.completionDate;
        const diff =  differenceInDays(completion, today);

        console.log('diff', diff);
        console.log('completion', completion);

        const endDateObject = new Date(completion);

        console.log(endDateObject);
        const datesBetween = getDatesBetween(today, endDateObject, data.reminderFreq);
        setter.setReminderDates(datesBetween);

        // Set the minimum total of reminders
        const minDaysOption = freq_options.find(option => option.name === data.reminderFreq);
        const minDays = minDaysOption ? minDaysOption.min_days : 1;
        setter.setTotalReminders(Math.floor(diff / minDays));

    }, [data.reminderFreq])

    useEffect(() => {
        // Blocking frequencies that are more than 30 of less than 1 for a goal
        let today = new Date();
        let completion = data.completionDate;
        const diff =  differenceInDays(completion, today);

        freq_options.forEach(option => {
            
            option.disabled = true;
            if (diff > option.min_days && diff < option.max_days) {
                option.disabled = false;
            }
            else {
                if (data.reminderFreq === option.name) {
                    setter.setReminderFreq(null);
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
                    
                    <button key={index} onClick={() => setter.setReminderFreq(option.name)} value={option.name} disabled={option.disabled}
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
