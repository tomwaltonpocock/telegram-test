import React, { useState, useEffect } from 'react';

export default function TimeAndWelcome( { name} ) {
     /* update time and date */

    const [hasMounted, setHasMounted] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 10000);
  
        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="text-9xl font-medium text-white">
                {hasMounted && currentDate.toLocaleString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="flex items-center justify-center text-4xl font-semibold text-white">
                {hasMounted && ( currentDate.getHours() < 12 ? "Good morning, " : currentDate.getHours() < 18 ? "Good afternoon, " : "Good evening, " )+ name}
            </div> 
        </div>
    );
}