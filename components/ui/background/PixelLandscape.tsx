"use client";
import React from 'react';

export function PixelLandscape() {
  return (
    <div className="scene-bg" aria-hidden="true" style={{ zIndex: 0 }}>
      <div className="horizon-glow" />
      <div className="mountain-line" />
      <div className="tree-line" />
    </div>
  );
}
