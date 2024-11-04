import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
    
    const [storedValue, setStoredValue] = useState(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    const setValue = (value) => {
        setStoredValue(value);
        localStorage.setItem(key, JSON.stringify(value));
    };

    useEffect(() => {
        const handleStorageChange = () => {
            const item = localStorage.getItem(key);
            if (item) {
                setStoredValue(JSON.parse(item));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key]);

    return [storedValue, setValue];
}

export default useLocalStorage;
