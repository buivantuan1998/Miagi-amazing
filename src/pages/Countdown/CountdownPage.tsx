import React, { FC, useEffect, useState } from "react";
import {
  Wrapper,
  Title,
  Countdown,
  FinalMessage,
  Confetti,
} from "./index";

interface ConfettiItem {
  id: number;
  left: string;
  color: string;
  duration: string;
}

const CountdownTimer: FC = () => {
  const [count, setCount] = useState(10);
  const [finished, setFinished] = useState(false);
  const [confettiList, setConfettiList] = useState<ConfettiItem[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const confettiArray = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      duration: `${2 + Math.random() * 2}s`,
    }));
    setConfettiList(confettiArray);
  }, []);

  return (
    <Wrapper>
      {confettiList.map(({ id, left, color, duration }) => (
        <Confetti
          key={id}
          style={{
            left,
            backgroundColor: color,
            animationDuration: duration,
          }}
        />
      ))}

      {/* <Title size="small">🎉 Chúc mừng sinh nhật Miagi 6 tuổi 🎂</Title> */}
      <div className="mt-[50%]">🎉 Chúc mừng sinh nhật Miagi 6 tuổi 🎂</div>

      {!finished ? (
        <Countdown>{count}</Countdown>
      ) : (
        <FinalMessage>🎈 Chúc bé Miagi luôn vui vẻ và hạnh phúc! 🎁</FinalMessage>
      )}
    </Wrapper>
  );
};

export default CountdownTimer;
