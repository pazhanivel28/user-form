import { useEffect, useState } from "react";
export default function SetTimerCount() {
  const [count, setCount] = useState(0);
  let timer;
  const handleStart = () => {
    setCount((count) => count + 1);
  };

  const handleStop = () => {
    clearTimeout(timer);
  };

  const handleReset = () => {
    clearTimeout(timer);
    setCount(0);
  };

  useEffect(() => {
    if (count) {
      timer = setTimeout(handleStart, 1500);
    }
  }, [count]);

  return (
    <div>
      {count}
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>stop</button>
        <button onClick={handleReset}>reset</button>
      </div>
    </div>
  );
}
