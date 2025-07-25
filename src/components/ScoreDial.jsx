// src/components/ScoreDial.jsx

import React from "react";

// Dial color by score
function getScoreColor(score) {
  if (score <= 3) return "#e36464";   // Red
  if (score <= 6) return "#ffb347";   // Orange
  return "#59c47e";                   // Green
}

export default function ScoreDial({ score = 0, max = 10 }) {
  const percentage = Math.max(0, Math.min(score / max, 1));
  const radius = 50, stroke = 12, size = 120;
  const dash = 2 * Math.PI * radius;
  const color = getScoreColor(score);

  return (
    <svg width={size} height={size} className="score-dial">
      {/* BG */}
      <circle cx={size/2} cy={size/2} r={radius} stroke="#ececec" strokeWidth={stroke} fill="none"/>
      {/* Progress */}
      <circle
        cx={size/2}
        cy={size/2}
        r={radius}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={dash}
        strokeDashoffset={dash * (1 - percentage)}
        style={{transition: "stroke 0.4s, stroke-dashoffset 0.4s"}}
        transform={`rotate(-90, ${size/2}, ${size/2})`}
      />
      {/* Score */}
      <text x={size/2} y={size/2+8} textAnchor="middle" fontSize="32" fontWeight="bold" fill={color}>{score}</text>
      <text x={size/2} y={size/2+28} textAnchor="middle" fontSize="16" fill="#aaa">/10</text>
    </svg>
  );
}
