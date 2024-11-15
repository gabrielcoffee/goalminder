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
        setUserGoals(null);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurUser(user);
                fetchUserGoals(user);
            } else {
                setCurUser(null);
                setUserGoals([]);
                setLoading(false);
            }
        })
        return unsubscribe;
    }, [])

    const fetchUserGoals = async (user) => {
        try {
            setLoading(true);

            // FETCHING USER GOALS DATA               
            const goalsRef = collection(db, 'users', user.uid, 'goals');
            const goalsSnap = await getDocs(goalsRef);

            const goals = await Promise.all(goalsSnap.docs.map(async (goal) => {

                const reportsRef = collection(db, 'users', user.uid, 'goals', goal.id, 'reports');
                const reportsSnap = await getDocs(reportsRef);

                const reports = reportsSnap.docs.map(report => ({
                    ...report.data()
                }));

                // This is each goal object returned to the array
                return {
                    id: goal.id,
                    ...goal.data(),
                    reports
                }
            }));
            
            setUserGoals(goals);
        } 
        catch(e) {
            console.log("Error fetching user data and goals: " + e.message);
        }
        finally {
            setLoading(false);
        }
    }

    const value = {
        curUser,
        userGoals,
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