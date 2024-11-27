import React, { useEffect } from 'react'

const text_modes = [
    { name: "Cute 💕"},
    { name: "Friendly 👍"},
    { name: "Serious 🚀"},
    { name: "Rude 💀"},
]

export default function TextMood({data, setter, canProgressSetter }) {

    useEffect(() => {
        if (!data) {
            canProgressSetter(false);
        } else {
            canProgressSetter(true);
        }
    }, [data])
        
    return (
        <div className="flex flex-col items-center h-full relative">
            <h1 className='text-2xl text-center font-bold'>Choose the tone for your reminder messages:</h1>
            
            <div className='grid grid-cols-2 grid-rows-2 mt-14 mx-4 gap-4 text-xl'>
            {
                text_modes.map((option, index) => (

                    <button key={index} onClick={() => setter(option.name.split(' ')[0])}
                    className={'flex flex-col justify-center items-center border-[1px] border-slate-400 rounded-md px-8 py-4 gap-4 ' +  (data === option.name.split(' ')[0] && 'bg-slate-700 text-white')}
                    >

                        <div className='flex-col flex gap-2'>
                            <span className='m-3 text-5xl'>{option.name.split(' ')[1]}</span>
                            <span>{option.name.split(' ')[0]}</span>
                        </div>
                        
                    </button>
                ))
            }
            </div>
        </div>
    )
}
