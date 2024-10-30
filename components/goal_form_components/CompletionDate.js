import React, { useEffect, useState } from 'react'
import { addWeeks, addMonths, addYears, format } from 'date-fns'


export default function CompletionDate( { data, setter, canProgressSetter} ) {

    const [quantity, setQuantity] = useState(1);
    const [timePeriod, setTimePeriod] = useState('week');
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        
        if (!data) {
            canProgressSetter(false);
        } else {
            canProgressSetter(true);
        } 

    }, [data])

    useEffect(() => {
        let finishDate = new Date();

        if (timePeriod === 'week') {
            finishDate = addWeeks(finishDate, quantity);
        } 
        else if (timePeriod === 'month') {
            finishDate = addMonths(finishDate, quantity);
        } 
        else if (timePeriod === 'year') {
            finishDate = addYears(finishDate, quantity);
        }

        setDate(finishDate);
        setter(finishDate);

    }, [timePeriod, quantity])

    const handleNumberChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    }

    return (
        <div className="flex flex-col items-center h-full ">
            <h1 className='text-2xl text-center font-bold mx-2 mb-20'>When do you want to complete this goal?</h1>
            
            <div className="flex items-center justify-center space-x-2 mb-4 text-2xl">
                <span>in</span>

                <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className=" p-2 px-3 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                aria-label="Decrease number"
                >-</button>
           
                <input type="number" value={quantity} onChange={handleNumberChange}
                className=" w-16 h-16 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" min="1"/>
  
                <button
                onClick={() => setQuantity(quantity + 1)}
                className=" p-2 px-3 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                aria-label="Increase number"
                >+</button>

                <select
                value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="week">week{quantity !== 1 ? 's' : ''}</option>
                    <option value="month">month{quantity !== 1 ? 's' : ''}</option>
                    <option value="year">year{quantity !== 1 ? 's' : ''}</option>
                </select>
            </div>

            <span className='text-2xl rounded-xl my-12 bg-slate-800 text-white p-6 px-4'>
                {format(date, 'MMMM dd, yyyy')}
            </span>

            <span className='text-lg absolute bottom-36'>
                *maximum range of 30 years
            </span>

        </div>
    )
}
