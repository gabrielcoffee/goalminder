'use client'
import React, { useState } from 'react'
import { Dumbbell, Briefcase, User, Heart, Wallet, Palette, Sun, Calendar, Clock, CalendarDays, CalendarRange, CalendarCheck, Check } from "lucide-react"

export default function GoalForm() {

    const [formData, setFormData] = useState({
        area: "Fitness",

        goal_name: "",
        description: "",

        reminder_freq: "",

        completion_date: "",
        
        time_of_reminder: "",
        motivation_pics: {},
        ai_text: 'off',
        personal_text: "",
        start_date: "",
    })


    const area_options = [
        { name: "Fitness", color: "#FF6B6B", icon: Dumbbell },        // Red    - Energy and strength
        { name: "Professional", color: "#4E89AE", icon: Briefcase }, // Blue   - Stability and trust
        { name: "Personal", color: "#F4A261", icon: User },          // Orange - Growth and enthusiasm
        { name: "Relationships", color: "#8E7CC3", icon: Heart },   // Purple - Connection and empathy
        { name: "Finance", color: "#2A9D8F", icon: Wallet },         // Green  - Wealth and balance
        { name: "Hobbies", color: "#E9C46A", icon: Palette }         // Yellow - Creativity and optimism
    ]   

    const freq_options = [
        { name: "Daily", icon: Sun },
        { name: "Every 3 Days", icon: Clock },
        { name: "Weekly", icon: Calendar },
        { name: "Monthly", icon: CalendarDays },
        { name: "Every 3 Months", icon: CalendarRange },
        { name: "Yearly", icon: CalendarCheck }
      ]
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        console.log(name, value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-6 items-center font-normal rounded-xl text-xl'>

            
            <label>
                Goal name:
                <input type="text" name="goal_name" value={formData.goal_name} onChange={handleChange} />
            </label>
            <label>
                Description:
                <textarea type="text" name="description" value={formData.description} onChange={handleChange} />
            </label>
                Area:
                <div className='text-lg grid grid-cols-2 grid-rows-3 sm:grid-cols-3 sm:grid-rows-2 gap-4'>
                    {
                        area_options.map((option, index) => (
                            <label 
                                key={index} 
                                className={`$Active p-8 py-6 flex flex-col items-center cursor-pointer buttonShadow rounded-md duration-100 bg-white border border-slate-800`}
                                style={{ backgroundColor: `${option.color}30` }}
                            >
                                <input
                                    name='area'
                                    type='radio'
                                    className='border-0 outline-none  appearance-none'
                                    value={option.name}
                                    onChange={handleChange}
                                />

                                <option.icon
                                    size={48}
                                    style={{ color: option.color }}
                                    aria-hidden="true"
                                />

                                <span className='text-center' style={{ color: option.color }}>{option.name}</span>
                            </label>
                        ))
                    }
                </div>


                Reminder Frequency:
                <div className='text-lg grid grid-cols-2 grid-rows-3 sm:grid-cols-3 sm:grid-rows-2 gap-4'>
                    {
                        freq_options.map((option, index) => (
                            <label 
                                key={index} 
                                className={'active:duration-0 active:bg-white p-6 flex flex-col items-center cursor-pointer buttonShadow rounded-md duration-200 bg-slate-100 border border-slate-800 '
                                }
                            >
                                <input
                                    name='reminder_freq'
                                    type='radio'
                                    className=' w-0 h-0 p-0 m-0 border-0 outline-none  appearance-none'
                                    value={option.name}
                                    onChange={handleChange}
                                />

                                <option.icon
                                    size={48}
                                    aria-hidden="true"
                                />

                                <span className='text-center'>{option.name}</span>
                            </label>
                        ))
                    }
                </div>
            
            <label>
                Completion Date:
                <input type="date" name="completion_date" value={formData.completion_date} onChange={handleChange} />
            </label>
            
            <label>
                Time of Reminder:
                <input type="time" name="time_of_reminder" value={formData.time_of_reminder} onChange={handleChange} />
            </label>
            <label>
                Motivation Pictures:
                <input type="file" name="motivation_pics" onChange={handleChange} />
            </label>
            <label>
                AI Text:
                <input type="checkbox" name="ai_text" value={formData.ai_text == 'on' ? 'off' : 'on'} onChange={handleChange} />
            </label>
            <label>
                Personal Text:
                <textarea name="personal_text" value={formData.personal_text} onChange={handleChange} />
            </label>
            <label>
                Start Date:
                <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} />
            </label>

            <button type='submit'>Submit data</button>
            </form>
        </div>
    )
}
