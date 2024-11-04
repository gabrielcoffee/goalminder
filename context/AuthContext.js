'use client'

import {auth} from '@/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useState, useEffect, useContext } from "react";
import { doc, getDoc } from 'firebase/firestore'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [curUser, setCurUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Authorization Handlers
    function signup(email, password) {
        console.log('user created');
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
                
                console.log('Fetching user data...')

                // If user exists fetch data from firestore database
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log('Found user data');
                    setUserData(docSnap.data);
                }
                
            } catch(e) {
                console.log(e.message);
            } finally {
                setLoading(false);
            }
        })

        return unsubscribe;
        
    }, [])

    const value = {
        curUser,
        userData,
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