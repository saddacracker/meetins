import { useState, useEffect } from 'react'

export function useOnline() {
    const [online, setOnline] = useState(false);

    function offlineHandler () {
        setOnline(false)
    }
    
    function onlineHandler () {
        setOnline(true)
    }

    useEffect (() => {
        // initiallize `onLine` property inside useEffect because `window` is not available until the DOM is rendered
        setOnline(window.navigator.onLine);

        window.addEventListener('online', onlineHandler)
        window.addEventListener('offline', offlineHandler)
    
        return () => {
            window.removeEventListener('online', onlineHandler)
            window.removeEventListener('offline', offlineHandler)
        }
    }, [])

    return online;
}