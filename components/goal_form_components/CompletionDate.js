import React, { useEffect, useState } from 'react'
import { addWeeks, addMonths, addYears, format, differenceInYears, differenceInWeeks } from 'date-fns'


export default function CompletionDate( { data, setter, canProgressSetter } ) {

    const [formatedDate, setFormatedDate] = useState("")
    const [changeRangeColor, setChangeRangeColor] = useState(false);

    let today = new Date();

    useEffect(() => {
        let completion;

        if (data.timePeriod === 'week') {
            completion = addWeeks(today, data.quantityPeriod);
        }
        else if (data.timePeriod === 'month') {
            completion = addMonths(today, data.quantityPeriod);
        }
        else if (data.timePeriod === 'year') {
            completion = addYears(today, data.quantityPeriod);
        }

        setter.setCompletionDate(completion);
        setFormatedDate(format(completion, 'MMMM dd, yyyy'))


        if (differenceInWeeks(completion, today) > 1565) {
            canProgressSetter(false);
            setChangeRangeColor(true);
        }
        else {
            canProgressSetter(true);
            setChangeRangeColor(false);
        }

    }, [data.quantityPeriod, data.timePeriod])

    const handleNumberChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setter.setQuantityPeriod(value);
        }
    }

    return (
        <div className="flex flex-col items-center h-full ">
            <h1 className='text-2xl text-center font-bold mx-2 mb-20'>When do you want to complete this goal?</h1>
            
            <div className="flex items-center justify-center space-x-2 mb-4 text-2xl">
                <span>in</span>

                <button
                onClick={() => {data.quantityPeriod > 1 && setter.setQuantityPeriod(data.quantityPeriod - 1)}}
                className=" p-2 px-3 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                aria-label="Decrease number"
                >-</button>
           
                <input type="number" value={data.quantityPeriod} onChange={handleNumberChange}
                className=" w-16 h-16 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" min="1"/>
  
                <button
                onClick={() => setter.setQuantityPeriod(data.quantityPeriod + 1)}
                className=" p-2 px-3 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                aria-label="Increase number"
                >+</button>

                <select
                value={data.timePeriod} onChange={(e) => setter.setTimePeriod(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="week">week{data.quantityPeriod !== 1 ? 's' : ''}</option>
                    <option value="month">month{data.quantityPeriod !== 1 ? 's' : ''}</option>
                    <option value="year">year{data.quantityPeriod !== 1 ? 's' : ''}</option>
                </select>
            </div>

            <div className='flex flex-col gap-4'>
                <span className='text-2xl rounded- mt-14 bg-slate-800 text-white p-6 px-4'>
                    on {formatedDate}
                </span>         
            </div>

            {
                changeRangeColor &&
                <span className={'mt-4 text-lg text-red-600'}>
                    *maximum range of 30 years
                </span>
            }
        </div>
    )
}
