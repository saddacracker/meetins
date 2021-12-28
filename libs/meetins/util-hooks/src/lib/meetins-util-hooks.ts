import { useState, useEffect } from 'react'

export function useOnline() {
    const [online, setOnline] = useState(true);

    function offlineHandler () {
        setOnline(false)
    }
    
    function onlineHandler () {
        setOnline(true)
    }

    useEffect (() => {
        window.addEventListener('online', onlineHandler)
        window.addEventListener('offline', offlineHandler)
    
        return () => {
            window.removeEventListener('online', onlineHandler)
            window.removeEventListener('offline', offlineHandler)
        }
    }, [])

    return online;
}