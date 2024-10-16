import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
    // Get the initial value from localStorage or use the provided initialValue
    const [storedValue, setStoredValue] = useState<T>(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    // Function to set the value in both state and localStorage
    const setValue = (value: T) => {
        setStoredValue(value);
        localStorage.setItem(key, JSON.stringify(value));
    };

    // Effect to update state when localStorage changes
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

    return [storedValue, setValue] as const;
}

export default useLocalStorage;
