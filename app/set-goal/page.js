'use client'
import AreaSelection from '@/components/form_components/AreaSelection';
import CompletionDate from '@/components/form_components/CompletionDate';
import Frequency from '@/components/form_components/Frequency';
import Motivation from '@/components/form_components/Motivation';
import NameDesc from '@/components/form_components/NameDesc';
import Start from '@/components/form_components/Start';
import TimeOfReminder from '@/components/form_components/TimeOfReminder';
import Loading from '@/components/Loading';
import Login from '@/components/Login';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { ArrowLeft, ArrowRight, BookCheck, Play } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'


export default function SetGoalPage() {
    const [step, setStep] = useState(0);

    /// FORM COMPONENTS ///
    const [area, setArea] = useState(null);
    const [goalName, setGoalName] = useState("");
    const [description, setDescription] = useState("");
    const [quantityPeriod, setQuantityPeriod] = useState(1);    // Not sent in the db (completiondate) 
    const [timePeriod, setTimePeriod] = useState('week');       // Not sent in the db (completiondate) 
    const [completionDate, setCompletionDate] = useState("")
    const [reminderFreq, setReminderFreq] = useState(null);
    const [totalReminders, setTotalReminders] = useState(0);
    const [timeOfReminder, setTimeOfReminder] = useState(null);
    const [motivationImg, setMotivationImg] = useState(null);   // Not sent in the db (only url in the function handle goal Creation)
    const [personalText, setPersonalText] = useState("");
    const [haveAiText, setHaveAiText] = useState(false);

    const [canProgress, setCanProgress] = useState(true);

    const steps_components = [
        { 
            comp: <Start/> 
        },
        { 
            comp: <AreaSelection/>, 
            data: area, 
            setter: setArea 
        },
        {
            comp: <NameDesc/>,
            data: { goalName, description },
            setter: { setGoalName, setDescription } 
        },
        {
            comp: <CompletionDate/>,
            data: { quantityPeriod, timePeriod }, 
            setter: { setQuantityPeriod, setTimePeriod, setCompletionDate } 
        },
        {
            comp: <Frequency/>,
            data: { reminderFreq, completionDate },
            setter: { setReminderFreq, setTotalReminders }
        },
        {
            comp: <TimeOfReminder/>,
            data: timeOfReminder,
            setter: setTimeOfReminder
        },
        {
            comp: <Motivation/>,
            data: { motivationImg, haveAiText, personalText }, 
            setter: { setMotivationImg, setHaveAiText, setPersonalText }
        },
    ]

    const totalSteps = steps_components.length-1;

    const { curUser, loading } = useAuth();

	useEffect(() => {
		if (!curUser) {
			return 
		}
	}, [curUser])

    async function handleGoalCreation() {

        const userId = curUser.uid;
        const goalsCollectionRef = collection(db, 'users', userId, 'goals');

        let result;
        
        // SAVING IMG WITH FIREBASE FIRESTORE
        const storage = getStorage();
        try {
            const storageRef = ref(storage, `goals/${userId}/${motivationImg.name}`);
            const snapshot = await uploadBytes(storageRef, motivationImg); // Upload the file to Firebase Storage
            const imageUrl = await getDownloadURL(snapshot.ref); // Get the download URL after the upload is complete

            result = {
                area:               area,
                goal_name:          goalName,
                description:        description,
                completion_date:    completionDate,
                reminder_freq:      reminderFreq,
                time_of_reminder:   timeOfReminder,
                total_reminders:    totalReminders,
                motivation_img_url: imageUrl,
                personal_text:      personalText,
                have_ai_text:       haveAiText,
                reports:            []
            }
        } catch (error) {
            console.error("SET GOAL - Error uploading the image:", error);
        }

        // Save the new goal to the database
        try {
            await addDoc(goalsCollectionRef, result);
            console.log('Goal ' + result.goal_name + ' succesfully saved on database');
        } catch (e) {
            console.log("ERROR ON SET GOAL: " + e.message);
        }
        window.location.href = '/goals';
    }

    if (!curUser) {
        return <Login/>
    }

    if (loading) {
        return <Loading/>
    }

    return (
        <div className={'flex flex-col h-screen relative '}>   
            {   
                step !== 0 &&
                <div className={'p-4 text-xl'}>
                    <span>{`${step} of ${totalSteps}`}</span>
                </div>
            }

            { // Shows each step of the goal form
                React.cloneElement(steps_components[step].comp, {
                    data: steps_components[step].data,
                    setter: steps_components[step].setter,
                    canProgressSetter: setCanProgress
                })
            }

            <div className='w-full h-32 fixed bottom-0 bg-gradient-to-t from-white to-transparent'>

            </div>

            <div className='mt-24 flex gap-4 items-center m-4 sticky bottom-10 justify-center'>
                { // show or not the go back button
                    step !== 0 &&
                    <button className='rounded-sm border-[1px] p-5 border-slate-800 bg-white text-slate-800
                    active:bg-slate-800 active:text-white sm:hover:bg-slate-800 sm:hover:text-white' 
                    onClick={() => { step !== 0 && setStep(step - 1)}}>
                        <ArrowLeft size={36}/>
                    </button>
                }

                {
                    step !== totalSteps ?
                    <button className='flex gap-4 bg-emerald-800 active:bg-emerald-700 sm:hover:bg-emerald-700 text-white rounded-sm items-center
                        py-5 w-full sm:w-[20rem] justify-center text-2xl' onClick={() => { step !== totalSteps && canProgress && setStep(step + 1) }}>
                        { // text from the green button
                            step === 0 ? 'Start' :
                            'Continue'
                        }

                        { // icon to show
                            step === 0 ? <Play size={36}/> :
                            <ArrowRight size={36}/>
                        }
                    </button>
                    :
                    <button className='flex gap-4 bg-emerald-800 active:bg-emerald-700 sm:hover:bg-emerald-700 text-white rounded-sm items-center
                        py-5 w-full sm:w-[20rem] justify-center text-2xl' onClick={handleGoalCreation}>
                        <span>Confirm</span>
                        <BookCheck size={36}/>
                    </button>
                }
            </div>
        </div>
    )
}

// Bellow is commented code for uploading images that I may use in the future 

/*
// UPLOADING IMAGES IN IMGUR
const formData = new FormData();
formData.append('file', motivationImg);

try {
    const response = await fetch("https://api.imgur.com/3/upload", {
        method: "POST",
        headers: {
        Authorization: "Client-ID " + process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID,
        Accept: "application/json",
    },
        body: formData,
    });
    
    const data = await response.json();

    if (data.success) {
        console.log("Uploaded Image URL:", data.data.link);
        setMotivationImgUrl(data.data.link);
        console.log('mot img', motivationImgUrl)
    } else {
        console.error("Imgur upload failed:", data);
    }
} catch (error) {
    console.error("Error uploading image:", error);
}
*/

// UPLOADTHING 
/*
try {
    const [result] = await startUpload([file]);
    setMotivationImgUrl(result.fileUrl);
    console.log("Uploaded motivation img on the url: ", motivationImgUrl);
} catch (error) {
    console.error("Upload failed:", error);
}
    */