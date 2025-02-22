import React, { useRef, useState, useEffect } from "react";

const CustomHorizontalSlider = ({
  label,
  value,
  onChange,
  width = 200,        // overall width in pixels
  height = 10,        // thickness of the slider track
  knobColor = "#e74c3c",
  progressColorFrom = "#e74c3c",
  progressColorTo = "#1A73E8",
  trackColor = "#eeeeee",
  labelColor = "#fff",
  fontSize = 14,
}) => {
  const sliderRef = useRef();
  const knobSize = height * 2;

  // Convert value (1 to 99) to position
  const fraction = (value - 1) / (99 - 1);
  const position = fraction * (width - knobSize);

  const handleMove = (clientX) => {
    const rect = sliderRef.current.getBoundingClientRect();
    let newPos = clientX - rect.left - knobSize / 2;
    newPos = Math.max(0, Math.min(newPos, width - knobSize));
    const newFraction = newPos / (width - knobSize);
    const newValue = Math.round(newFraction * (99 - 1) + 1);
    onChange(newValue);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    const moveHandler = (e) => handleMove(e.clientX);
    const upHandler = () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseup", upHandler);
    };
    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseup", upHandler);
  };

  const handleTouchStart = (e) => {
    const moveHandler = (e) => handleMove(e.touches[0].clientX);
    const upHandler = () => {
      window.removeEventListener("touchmove", moveHandler);
      window.removeEventListener("touchend", upHandler);
    };
    window.addEventListener("touchmove", moveHandler);
    window.addEventListener("touchend", upHandler);
  };

  return (
    <div style={{ textAlign: "center", userSelect: "none" }}>
      <div
        ref={sliderRef}
        style={{
          position: "relative",
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: trackColor,
          borderRadius: "5px",
          margin: "10px auto",
        }}
      >
        {/* Progress Bar */}
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: `${position + knobSize / 2}px`,
            background: `linear-gradient(to right, ${progressColorFrom}, ${progressColorTo})`,
            borderRadius: "5px",
          }}
        ></div>
        {/* Knob */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{
            position: "absolute",
            left: `${position}px`,
            width: `${knobSize}px`,
            height: `${knobSize}px`,
            backgroundColor: knobColor,
            borderRadius: "50%",
            cursor: "pointer",
            transform: "translateY(-50%)",
            top: "50%",
          }}
        ></div>
      </div>
      <div style={{ color: labelColor, fontSize: `${fontSize}px`, marginTop: "5px" }}>
        {label}: {value}%
      </div>
    </div>
  );
};

export default CustomHorizontalSlider;