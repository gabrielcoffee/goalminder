import React from "react"
import CallToAction from "./CallToAction";


export default function Hero() {

    return (
        <div className="flex flex-col items-center gap-10 text-center">
            <h1 className={'text-4xl sm:text-6xl sm:mt-24 font-medium text-center mt-16 mx-4'}><span className="font-black">Goalminder</span> helps you keep on track of your goals!</h1>
            <p className="text-lg mx-4">Set new goals, receive email reminders, and track your progress!</p>

            <CallToAction/>
        </div>
    )
}
