import React from 'react';
import { Timer } from 'lucide-react';
import { differenceInSeconds } from 'date-fns';

interface TestTimerProps {
  endTime: Date;
  onTimeExpired: () => void;
}

export default function TestTimer({ endTime, onTimeExpired }: TestTimerProps) {
  const [timeLeft, setTimeLeft] = React.useState(differenceInSeconds(new Date(endTime), new Date()));

  React.useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = differenceInSeconds(new Date(endTime), new Date());
      if (newTimeLeft <= 0) {
        clearInterval(timer);
        onTimeExpired();
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onTimeExpired]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft <= 300) return 'text-red-600'; // Last 5 minutes
    if (timeLeft <= 900) return 'text-yellow-600'; // Last 15 minutes
    return 'text-gray-600';
  };

  return (
    <div className={`flex items-center gap-2 ${getTimerColor()}`}>
      <Timer className="w-5 h-5" />
      <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
    </div>
  );
}