"use client";
import { cn } from '@/lib/utils';
import React, { useRef, useState } from 'react';

interface ColoredSpotlightItemProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  hoverScale?: boolean;
}

export function ColoredSpotlightItem({
  children,
  className,
  spotlightColor = "rgba(255, 255, 255, 0.1)",
  hoverScale = true,
}: ColoredSpotlightItemProps) {
  const boxWrapper = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [overlayColor, setOverlayColor] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    
    const x = clientX - left;
    const y = clientY - top;
    
    setOverlayColor({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={boxWrapper}
      className={cn(
        'relative rounded-2xl overflow-hidden transition-all duration-300 h-full w-full',
        hoverScale && 'hover:scale-[1.02]',
        className
      )}
    >
      {/* Spotlight Effect - covers whole card */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500",
          isHovered ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `radial-gradient(
            400px circle at ${overlayColor.x}px ${overlayColor.y}px,
            ${spotlightColor},
            transparent 70%
          )`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}