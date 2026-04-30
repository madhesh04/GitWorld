"use client";
import React from 'react';

export function PixSpinner({ size = 16, color = "var(--amber)" }: { size?: number, color?: string }) {
  return (
    <span style={{
      display: "inline-block", width: size, height: size, position: "relative",
      animation: "spin-pix 0.8s steps(8) infinite",
    }}>
      <span style={{ position: "absolute", top: 0, left: 0, width: size/2 - 1, height: size/2 - 1, background: color }} />
      <span style={{ position: "absolute", top: 0, right: 0, width: size/2 - 1, height: size/2 - 1, background: color, opacity: 0.7 }} />
      <span style={{ position: "absolute", bottom: 0, right: 0, width: size/2 - 1, height: size/2 - 1, background: color, opacity: 0.4 }} />
      <span style={{ position: "absolute", bottom: 0, left: 0, width: size/2 - 1, height: size/2 - 1, background: color, opacity: 0.2 }} />
    </span>
  );
}
