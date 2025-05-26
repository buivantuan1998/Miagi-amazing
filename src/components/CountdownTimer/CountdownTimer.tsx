import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface CountdownTimerProps {
    targetDate: Date;
    onComplete?: () => void;
}

const TimerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TimeUnit = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 80px;
`;

const TimeValue = styled.div`
    font-size: 2rem;
    font-weight: bold;
    color: #333;
`;

const TimeLabel = styled.div`
    font-size: 0.875rem;
    color: #666;
    text-transform: uppercase;
`;

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = targetDate.getTime() - new Date().getTime();
            
            if (difference <= 0) {
                onComplete?.();
                return {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, onComplete]);

    return (
        <TimerContainer>
            <TimeUnit>
                <TimeValue>{timeLeft.days}</TimeValue>
                <TimeLabel>Ngày</TimeLabel>
            </TimeUnit>
            <TimeUnit>
                <TimeValue>{timeLeft.hours}</TimeValue>
                <TimeLabel>Giờ</TimeLabel>
            </TimeUnit>
            <TimeUnit>
                <TimeValue>{timeLeft.minutes}</TimeValue>
                <TimeLabel>Phút</TimeLabel>
            </TimeUnit>
            <TimeUnit>
                <TimeValue>{timeLeft.seconds}</TimeValue>
                <TimeLabel>Giây</TimeLabel>
            </TimeUnit>
        </TimerContainer>
    );
};

export default CountdownTimer; 