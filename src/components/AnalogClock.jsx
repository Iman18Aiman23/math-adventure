import React from 'react';

export default function AnalogClock({ hour, minute, size = 200, showNumbers = true }) {
    // Calculate rotation angles
    // Hour hand: 360 deg / 12 hours = 30 deg per hour
    // Minute hand: 360 deg / 60 minutes = 6 deg per minute
    // Plus hour hand offset based on minutes: (30 deg / 60 min) = 0.5 deg per minute
    const minuteRotation = minute * 6;
    const hourRotation = (hour % 12) * 30 + minute * 0.5;

    const center = size / 2;
    const radius = size * 0.45;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Clock Face */}
            <circle cx={center} cy={center} r={radius} fill="white" stroke="var(--color-dark)" strokeWidth="4" />

            {/* Hour markers/numbers */}
            {showNumbers && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => {
                const angle = (num * 30 - 90) * (Math.PI / 180);
                const x = center + (radius * 0.75) * Math.cos(angle);
                const y = center + (radius * 0.75) * Math.sin(angle);
                return (
                    <text
                        key={num}
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{ fontSize: size * 0.1, fontWeight: 'bold', fill: '#000' }}
                    >
                        {num}
                    </text>
                );
            })}

            {/* Minute Hand */}
            <line
                x1={center} y1={center}
                x2={center} y2={center - radius * 0.7}
                stroke="#666" strokeWidth="4" strokeLinecap="round"
                transform={`rotate(${minuteRotation}, ${center}, ${center})`}
            />

            {/* Hour Hand */}
            <line
                x1={center} y1={center}
                x2={center} y2={center - radius * 0.5}
                stroke="var(--color-dark)" strokeWidth="6" strokeLinecap="round"
                transform={`rotate(${hourRotation}, ${center}, ${center})`}
            />

            {/* Center Pin */}
            <circle cx={center} cy={center} r="6" fill="var(--color-dark)" />
        </svg>
    );
}
