import { Check, ImagePlus } from 'lucide-react'
import React, { useState } from 'react'

export default function Motivation({data, setter}) {

    const [uploaded, setUploaded] = useState(false);
    const [receive, setReceive] = useState(false);

    return (
        <div className="flex flex-col items-center h-full relative text-lg">
            <h1 className='text-2xl text-center font-bold mx-2'>At last, set up some motivation to achieve your goal</h1>

            <div className='flex flex-col mx-4 mt-8 gap-14'>

                <label className='flex flex-col gap-4'>

                    <div className='flex items-center gap-4 justify-between'>
                        <span>Motivational Image:</span>
                        {
                            !uploaded ?
                            <label className="text-sm cursor-pointer items-center bg-slate-500 bg-opacity-40 border-dotted border-4 border-spacing-24 border-slate-800 text-slate-800 p-2 rounded-md w-fit flex gap-2">
                                Upload Image
                                    <input type="file" name="motivation_img" accept="image/*" onChange={(e) => setter.setMotivationImg(e.target.value)} className="hidden" />
                                <ImagePlus size={25} />
                            </label>
                            :
                            <label className="text-sm cursor-pointer items-center bg-emerald-500 bg-opacity-40 border-2 border-emerald-900 border-spacing-24 text-emerald-900 p-2 rounded-md w-fit flex gap-1">
                                Image Uploaded
                                    <input type="file" name="motivation_img" accept="image/*" onChange={(e) => setter.setMotivationImg(e.target.value)} className="hidden" />
                                <Check size={25} />
                            </label>

                        }
                        
                    </div>
                    <p className='text-slate-500 text-base'>Image that represents your goal or inspires you.</p>
                </label>
                
                <div className='space-y-4'>
                    <label className='flex items-center space-x-4'>
                    <span className='text-lg font-semibold'>Receive AI Text:</span>
                    <button
                        type="button"
                        onClick={() => setter.setHaveAiText(!setter.haveAiText)}
                        className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                        setter.haveAiText
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                    >
                        {setter.haveAiText ? 'Enabled' : 'Disabled'}
                    </button>
                    </label>
                    <p className='text-slate-500 text-sm'>Receive an AI-generated motivational message based on your goal.</p>
                </div>

                <label className='flex flex-col'>
                    Personal Text:
                    <textarea name='personal_text' cols="26" rows="5" className='p-2 border-slate-800 border rounded-md' placeholder="Write your personal text here..." onChange={(e) => setter.setPersonalText(e.target.value)}/>
                </label>
            </div>
        </div>
    )
}
