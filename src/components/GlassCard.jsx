// @ts-ignore;
import React from 'react';

export function GlassCard({
  children,
  className = '',
  hover = true
}) {
  return <div className={`
        bg-white/10 backdrop-blur-xl
        border border-white/20
        rounded-2xl
        shadow-xl
        ${hover ? 'hover:bg-white/15 hover:scale-[1.02] hover:shadow-2xl' : ''}
        transition-all duration-300
        ${className}
      `}>
      {children}
    </div>;
}