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

    function refresh() {
        if (curUser) {
            fetchUserDataAndGoals(curUser);
        }
    }

    const fetchUserDataAndGoals = async (user) => {
        try {
            setLoading(true);

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
            
        } 
        catch(e) {
            console.log("Error fetching user data and goals: " + e.message);
        } 
        finally {
            setLoading(false);
        }
    }

    const unsubscribe = onAuthStateChanged(auth, async user => {
        
        return unsubscribe;
    })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurUser(user);
                fetchUserDataAndGoals(user);
            } else {
                setCurUser(null);
                setUserData(null);
                setUserGoals([]);
            }
        })

        return unsubscribe;
    }, [])

    const value = {
        curUser,
        userData,
        userGoals,
        setUserData,
        signup,
        login,
        logout,
        refresh,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}