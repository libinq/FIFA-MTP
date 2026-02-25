import { useState, useEffect } from 'react';

const Countdown = () => {
  const targetDate = new Date('2026-05-01T00:00:00');

  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <div className="bg-black/40 backdrop-blur-md border border-fifa-gold/30 rounded-lg p-4 w-20 h-24 md:w-32 md:h-40 flex items-center justify-center shadow-[0_0_15px_rgba(212,160,23,0.2)]">
        <span className="text-3xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 font-mono">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs md:text-sm uppercase tracking-widest mt-2 text-fifa-gold font-semibold">{label}</span>
    </div>
  );

  return (
    <div className="flex justify-center items-center py-10 animate-fade-in">
      <TimeUnit value={timeLeft.days} label="Days" />
      <div className="text-2xl md:text-4xl font-bold text-white/30 self-start mt-8">:</div>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <div className="text-2xl md:text-4xl font-bold text-white/30 self-start mt-8">:</div>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <div className="text-2xl md:text-4xl font-bold text-white/30 self-start mt-8">:</div>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default Countdown;
