import React, { useRef, useState, useEffect } from "react";

const CustomCircularSlider = ({
  label,
  value,
  onChange,
  size = 120,         // overall size in pixels
  strokeWidth = 10,   // thickness of the slider track
  knobColor = "#e74c3c",
  progressColorFrom = "#e74c3c",
  progressColorTo = "#1A73E8",
  trackColor = "#eeeeee",
  labelColor = "#fff",
  fontSize = 14,
}) => {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  // Convert value (from min 1 to max 99) to angle in degrees (0 to 360)
  // For a circular slider, we use the fraction of the value relative to the range (1 to 99)
  const fraction = (value - 1) / (99 - 1);
  const angle = fraction * 360;

  // Calculate strokeDashoffset for the progress circle
  const offset = circumference - fraction * circumference;

  // Handler for mouse or touch events on the slider
  const sliderRef = useRef();

  const handleMove = (clientX, clientY) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - (rect.left + center);
    const y = clientY - (rect.top + center);
    // Calculate the angle from the center using arctan2
    let theta = Math.atan2(y, x) * (180 / Math.PI);
    // Adjust theta to range 0-360
    if (theta < 0) theta += 360;
    // Convert theta to slider value in [1, 99]
    const newFraction = theta / 360;
    const newValue = Math.round(newFraction * (99 - 1) + 1);
    onChange(newValue);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    const moveHandler = (e) => {
      handleMove(e.clientX, e.clientY);
    };
    const upHandler = () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseup", upHandler);
    };
    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseup", upHandler);
  };

  const handleTouchStart = (e) => {
    const moveHandler = (e) => {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };
    const upHandler = () => {
      window.removeEventListener("touchmove", moveHandler);
      window.removeEventListener("touchend", upHandler);
    };
    window.addEventListener("touchmove", moveHandler);
    window.addEventListener("touchend", upHandler);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <svg
        ref={sliderRef}
        width={size}
        height={size}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ cursor: "pointer" }}
      >
        {/* Background Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={progressColorFrom}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
        {/* Knob */}
        <circle
          cx={center + radius * Math.cos((angle - 90) * (Math.PI / 180))}
          cy={center + radius * Math.sin((angle - 90) * (Math.PI / 180))}
          r={strokeWidth}
          fill={knobColor}
          stroke="none"
        />
      </svg>
      <div style={{ color: labelColor, fontSize: `${fontSize}px`, marginTop: "5px" }}>
        {label}: {value}%
      </div>
    </div>
  );
};

export default CustomCircularSlider;