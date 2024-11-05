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
                console.log('user: ',user);

                setCurUser(user);

                if (!user) {
                    console.log('No user found');
                    return
                }

                // If user exists fetch data from firestore database
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                let firebaseData = {}

                if (docSnap.exists()) {
                    console.log('Found user data');
                    firebaseData = docSnap.data();
                }
                setUserData(firebaseData);
                
            } catch(e) {
                console.log(e.message);
            } finally {
                setLoading(false);
            }
            return unsubscribe;
        })
        
    }, [])

    const value = {
        curUser,
        userData,
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