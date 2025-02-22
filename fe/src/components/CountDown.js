import React, { useState, useEffect } from 'react';

const CountDown = () => {
    // Set the target time 18 hours from now
    const targetTime = new Date().getTime() + 18 * 60 * 60 * 1000;

    // Helper function to calculate the remaining time
    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const difference = targetTime - now;

        // Calculate hours, minutes, and seconds from the time difference
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                hours: Math.floor(difference / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000)
            };
        } else {
            timeLeft = { hours: 0, minutes: 0, seconds: 0 };
        }
        return timeLeft;
    };

    // State to store the remaining time
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    // useEffect to update the countdown every second
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft()); // Update the remaining time
        }, 1000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(timer);
    }, []);

    // Display the countdown or the message when the countdown ends
    return (
        <div style={{ textAlign: "center", padding: "50px", color: "#1c1e4f" }}>
            <h1>AfriPredictor Goes Live In:</h1>
            {timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
                <h2>We Are Live Now!</h2>
            ) : (
                <h2>
                    {timeLeft.hours} hours, {timeLeft.minutes} minutes, {timeLeft.seconds} seconds
                </h2>
            )}
        </div>
    );
};

export default CountDown;