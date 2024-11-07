'use client'

import {auth, db} from '@/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useState, useEffect, useContext } from "react";
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [curUser, setCurUser] = useState(null);
    const [userGoals, setUserGoals] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Authorization Handlers
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        setCurUser(null);
        setUserData(null)
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                // Set user to local context state
                setLoading(true);
                setCurUser(user);

                if (!user) {
                    console.log('No user found');
                    return
                }
                console.log('user: ',user);

                // FETCHING USER GENERAL DATA
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                }
                
                // FETCHING USER GOALS DATA               
                const goalsRef = collection(db, 'users', user.uid, 'goals');
                const goalsSnap = await getDocs(goalsRef);

                const goals = goalsSnap.docs.map(goal => ({
                    id: goal.id,
                    ...goal.data()
                }));
                
                setUserGoals(goals);
                
            } catch(e) {
                console.log("ERROR ON AUTH CONTEXT: " + e.message);
            } finally {
                setLoading(false);
            }
            return unsubscribe;
        })
    }, [])

    useEffect(() => {
        if (userData)
            console.log('user data: ', userData);
    }, [userData])

    useEffect(() => {
        if (userGoals && userGoals.length > 0)
            console.log('user goals: ', userGoals);
    }, [userGoals])

    const value = {
        curUser,
        userData,
        userGoals,
        setUserData,
        signup,
        login,
        logout,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}