import styled, { keyframes } from "styled-components";
import tw from "twin.macro";
import { Text } from "zmp-ui";

export const Wrapper = styled.div`
  ${tw`flex flex-col items-center justify-center h-screen text-center text-white`};
  background: linear-gradient(135deg, #ff9a9e, #fad0c4);
  overflow: hidden;
`;

export const Title = styled(Text.Title)`
  ${tw`text-white mb-4`};
  animation: bounceIn 2s ease forwards;
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
`;

export const Countdown = styled.div`
  font-size: 5rem;
  font-weight: bold;
  animation: ${pulse} 1s infinite ease-in-out;
`;

const fadeIn = keyframes`
  to {
    opacity: 1;
  }
`;

export const FinalMessage = styled.div`
  font-size: 1.8rem;
  margin-top: 30px;
  opacity: 0;
  animation: ${fadeIn} 2s ease forwards;
  animation-delay: 1s;
`;

const fall = keyframes`
  0% {
    transform: translateY(-100px) rotate(0deg);
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
  }
`;

export const Confetti = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: gold;
  animation: ${fall} 3s infinite;
  opacity: 0.8;
`;
