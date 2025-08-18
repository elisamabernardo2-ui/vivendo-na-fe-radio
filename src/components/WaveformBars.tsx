import { useState, useEffect } from 'react';

interface WaveformBarsProps {
  isPlaying: boolean;
  barCount?: number;
}

const WaveformBars = ({ isPlaying, barCount = 20 }: WaveformBarsProps) => {
  const [heights, setHeights] = useState<number[]>(
    Array.from({ length: barCount }, () => Math.random() * 40 + 10)
  );

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setHeights(prev => 
        prev.map(() => Math.random() * 40 + 10)
      );
    }, 150);

    return () => clearInterval(interval);
  }, [isPlaying, barCount]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="flex items-center justify-center gap-1">
        {heights.map((height, index) => (
          <div
            key={index}
            className={`bg-divine-gold/60 rounded-full transition-all duration-150 ${
              isPlaying ? 'animate-pulse' : ''
            }`}
            style={{
              width: '3px',
              height: isPlaying ? `${height}px` : '10px',
              transform: `rotate(${(360 / barCount) * index}deg) translateY(-80px)`,
              transformOrigin: '50% 80px'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WaveformBars;