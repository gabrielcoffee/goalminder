import React, { useEffect } from 'react'

export default function NameDesc(props) {

	const { data, setter, canProgressSetter } = props;

	// ADD NAME EXAMPLE FOR EACH AREA...

	useEffect(() => {
        if (!data.goalName || data.goalName === '') {
            canProgressSetter(false);
        } else {
            canProgressSetter(true);
        }
    }, [data.goalName])

	return (
		<div className="flex flex-col items-center h-full relative">
			<h1 className='text-2xl mx-2 text-center font-bold mb-8'>What is your goal, and how would you describe it?</h1>
			
			<div className="flex flex-col items-center h-full relative gap-8 text-xl">
				<label>
					<span className='flex flex-col'>Goal Name:</span>
					<textarea value={data.goalName} name='name' cols="26" rows="1" className='p-2 text-base resize-none border-slate-800 border rounded-md' placeholder='name example' onChange={(e) => setter.setGoalName(e.target.value)} />
				</label>

				<label className='flex flex-col'>
					<span>Description:</span>
					<textarea value={data.description} name='description' cols="26" rows="5" className='text-base p-2 border-slate-800 border rounded-md' placeholder="Write your description here..." onChange={(e) => setter.setDescription(e.target.value)}/>
				</label>
			</div>
			
		</div>
	)
}
