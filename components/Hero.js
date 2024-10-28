import React from "react"


export default function Hero() {


    return (
        <div className="flex flex-col items-center gap-16">
            <h1 className={'text-4xl font-bold text-center mt-16 px-4'}>We send reminders of your goals. You check the progress and keep on track!</h1>

            <button className={'bg-slate-800 rounded-sm text-white p-6 px-10 text-xl'}>
              <span>Let's Start</span>
            </button>
        </div>
    )
}
