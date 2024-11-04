import { Check, ImagePlus } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function Motivation({data, setter}) {

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setter.setMotivationImg(file);
    }

    return (
        <div className="flex flex-col items-center h-full relative text-lg">
            <h1 className='text-2xl text-center font-bold mx-2'>At last, set up some motivation to achieve your goal</h1>

            <div className='flex flex-col mx-6 mt-8 gap-14'>

                <label className='flex flex-col'>

                    <div className='flex items-center gap-4 justify-between'>
                        <span>Motivational Image:</span>
                        {
                            data.motivationImg == null ?
                            <label className="text-sm cursor-pointer items-center bg-slate-500 bg-opacity-40 border-dotted border-4 border-spacing-24 border-slate-800 text-slate-800 p-2 rounded-md w-fit flex gap-2">
                                Upload Image
                                    <input type="file" name="motivation_img" accept="image/*" onChange={handleFileChange} className="hidden" />
                                <ImagePlus size={25} />
                            </label>
                            :
                            <label className="text-sm cursor-pointer items-center bg-emerald-500 bg-opacity-40 border-2 border-emerald-900 border-spacing-24 text-emerald-900 p-2 rounded-md w-fit flex gap-1">
                                Image Uploaded {data.motivationImg.name}
                                    <input type="file" name="motivation_img" accept="image/*" onChange={handleFileChange} className="hidden" />
                                <Check size={25} />
                            </label>

                        }
                        
                    </div>
                    <span className='text-slate-500 text-sm mt-2'>Image that represents your goal or inspires you.</span>
                </label>
                
                <div className='space-y-2'>
                    <div className='flex items-center space-x-4 justify-between'>
                    <span className='text-lg'>Receive AI Text:</span>
                    <button
                        type="button"
                        onClick={() => setter.setHaveAiText(!data.haveAiText)}
                        className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                        data.haveAiText
                            ? 'bg-emerald-600 text-white active:bg-emerald-700 sm:hover:bg-emerald-700'
                            : 'bg-red-600 text-white active:bg-red-700 sm:hover:bg-red-700'
                        }`}
                    >
                        {data.haveAiText ? 'Enabled' : 'Disabled'}
                    </button>
                    </div>
                    <p className='text-slate-500 text-sm'>Receive an AI-generated motivational message based on your goal.</p>
                </div>

                <label className='flex flex-col'>
                    Personal Text:
                    <textarea name='personal_text' rows="5" className={'p-2 text-base border-slate-800 border rounded-md'} placeholder="Write your personal text here..." onChange={(e) => setter.setPersonalText(e.target.value)}/>
                    <p className='text-slate-500 text-sm'>You will receive this text on your e-mail reminders.</p>
                </label>
            </div>
        </div>
    )
}
