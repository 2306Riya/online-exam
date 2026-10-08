import React, { useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

interface ExamTimerProps {
  totalSeconds: number;
  secondsRemaining: number;
  onTick: () => void;
  onTimeUp: () => void;
}

export const ExamTimer: React.FC<ExamTimerProps> = ({
  totalSeconds,
  secondsRemaining,
  onTick,
  onTimeUp,
}) => {
  useEffect(() => {
    if (secondsRemaining <= 0) {
      onTimeUp();
      return;
    }

    const timerId = setInterval(() => {
      onTick();
    }, 1000);

    return () => clearInterval(timerId);
  }, [secondsRemaining, onTick, onTimeUp]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const progressPercent = Math.max(0, Math.min(100, (secondsRemaining / totalSeconds) * 100));

  const isLowTime = secondsRemaining <= 120; // 2 mins
  const isCriticalTime = secondsRemaining <= 60; // 1 min

  return (
    <div
      className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border transition-all ${
        isCriticalTime
          ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse ring-2 ring-rose-400/20'
          : isLowTime
          ? 'bg-amber-50 border-amber-300 text-amber-700'
          : 'bg-slate-50 border-slate-200 text-slate-700'
      }`}
    >
      {isCriticalTime ? (
        <AlertCircle className="w-4 h-4 text-rose-600 animate-spin" />
      ) : (
        <Clock className={`w-4 h-4 ${isLowTime ? 'text-amber-600' : 'text-blue-600'}`} />
      )}

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600">
            Time Left:
          </span>
          <span className="font-mono text-sm sm:text-base font-bold tracking-tight">
            {formattedTime}
          </span>
        </div>
      </div>
    </div>
  );
};
