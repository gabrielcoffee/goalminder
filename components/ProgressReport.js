import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import Loading from './Loading';

const progress_bg_colors = [
    '',
    'bg-red-600',
    'bg-yellow-500',
    'bg-green-600',
    'bg-blue-500'
]

export default function ProgressReport({ report, index }) {

    const widthClass = {
        0: 'w-0/4',
        1: 'w-1/4',
        2: 'w-2/4',
        3: 'w-3/4',
        4: 'w-4/4',
    }[report.progress];

    return (
        <div key={index} className='flex flex-col gap-4 border shadow-md border-slate-600 p-2 m-2 rounded-lg bg-slate-100'>
            <h1><strong className='text-lg'>Report #{index+1}</strong><br></br>{format(report.date,'MMMM dd, yyyy')}</h1>

            <span>{report.progress == 0 && 'No progress...'}</span>

            <div className='mx-2 flex flex-col gap-4'>
                <span className='text-lg flex'></span>

                <div>
                    <div className={'h-4 ' + progress_bg_colors[report.progress] + ' ' + widthClass}></div>
                    <div className={'px-2 text-lg justify-between flex'}>
                        <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span>
                    </div>
                </div>
                <span className='text-lg justify-between flex flex-col'>
                    <strong>Observations:</strong>
                    <span className='text-base'>{report.observations || "..."}</span>
                </span>
            </div>
        </div>
    )
}
