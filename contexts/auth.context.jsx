import React, { useEffect, useState, useContext, createContext, useCallback } from "react";
import { createPostReq } from "../apis/factory.api";
import { ADD_USER } from "../apis/variables";
import { walletConnection } from "../utils/walletConnection";
import { useRouter } from "next/router";

// INITIALIZE 1: CREATE AUTH CONTEXT
const AuthContext = createContext();

// CONTEXT WRAPPER: PROVIDES AUTH
function AuthProvider({ children }) {
    // INITIALIZE 2: DEFINE STATES
    const router = useRouter() 
    const [user, setUser] = useState(null)

    const [active, setActive] = useState(false);

    // SETS USER WHEN ACTIVE USER IS DETECTED
    useEffect(() => {
        setActive(() => !active)
        let userStorage = localStorage.getItem('user')
        if(!userStorage) return;
        userStorage = JSON.parse(userStorage)
        setUser(userStorage)
    }, []);

    const createUser = useCallback(async(walletAddress) => {
        if(!walletAddress) return
        const payload = {walletAddress: walletAddress}
        createPostReq(ADD_USER, payload).then(res => {
            localStorage.setItem('user', JSON.stringify(res.data))
            localStorage.setItem('sessionId', res.data.sessionId)
            localStorage.setItem('isWalletConnected', true)
            setUser(res.data)
            router.push('/')
        }).catch(err => [
            console.log(err)
        ])
    });

    const updateUser = useCallback(async(newData) => {
        localStorage.setItem('user', JSON.stringify(newData))
        setUser(newData)
    });
    
    // IF NO USER REDIRECT TO LOGIN PAGE
    // to be uncommented when want to ensure user should not leave login page if not authorised
    if (!active) return <div>Loading.. .</div>

    return (
        <AuthContext.Provider value={{ user, createUser,updateUser }}>{children}</AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);

// EXPORT CONTEXT
export default AuthProvider;
