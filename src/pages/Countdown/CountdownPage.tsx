import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import PageLayout from '@components/layout/PageLayout';

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const scaleIn = keyframes`
    from { transform: scale(0.5); }
    to { transform: scale(1); }
`;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
    color: white;
    padding: 2rem;
`;

const CountdownNumber = styled.div<{ isActive: boolean }>`
    font-size: 15rem;
    font-weight: bold;
    opacity: ${props => props.isActive ? 1 : 0};
    transform: ${props => props.isActive ? 'scale(1)' : 'scale(0.5)'};
    transition: all 0.3s ease-in-out;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    animation: ${props => props.isActive ? `${fadeIn} 0.3s ease-in-out, ${scaleIn} 0.3s ease-in-out` : 'none'};
`;

const Firework = styled.div<{ x: number; y: number; delay: number }>`
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    left: ${props => props.x}%;
    top: ${props => props.y}%;
    animation: ${keyframes`
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    `} 1s ease-out ${props => props.delay}s infinite;
    background: radial-gradient(circle, 
        #ff0 0%, 
        #f90 20%, 
        #f60 40%, 
        #f30 60%, 
        #f00 80%, 
        transparent 100%
    );
`;

const FireworksContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
`;

const CountdownPage: React.FC = () => {
    const [count, setCount] = useState(10);
    const [showFireworks, setShowFireworks] = useState(false);
    const [fireworks, setFireworks] = useState<Array<{ x: number; y: number; delay: number }>>([]);

    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => {
                setCount(count - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setShowFireworks(true);
            // Generate random fireworks
            const newFireworks = Array.from({ length: 50 }, () => ({
                x: Math.random() * 100,
                y: Math.random() * 100,
                delay: Math.random() * 2
            }));
            setFireworks(newFireworks);
        }
    }, [count]);

    return (
        <PageLayout>
            <PageContainer>
                <CountdownNumber isActive={true}>
                    {count}
                </CountdownNumber>
                {showFireworks && (
                    <FireworksContainer>
                        {fireworks.map((firework, index) => (
                            <Firework
                                key={index}
                                x={firework.x}
                                y={firework.y}
                                delay={firework.delay}
                            />
                        ))}
                    </FireworksContainer>
                )}
            </PageContainer>
        </PageLayout>
    );
};

export default CountdownPage; 