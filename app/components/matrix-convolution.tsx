"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const INPUT_SIZE = 8;
const KERNEL_SIZE = 3;
const OUTPUT_SIZE = INPUT_SIZE - KERNEL_SIZE + 1; // 6

// Generate stable random depth arrays for a matrix
const generateMatrix = (size: number) => {
  return Array.from({ length: size * size }, () => Math.random());
};

export default function MatrixConvolution() {
  const [step, setStep] = useState(0);
  const [inputMatrix, setInputMatrix] = useState<number[]>([]);
  
  useEffect(() => {
    setInputMatrix(generateMatrix(INPUT_SIZE));
  }, []);

  useEffect(() => {
    if (inputMatrix.length === 0) return;
    
    // Animate the sliding kernel filter!
    const interval = setInterval(() => {
      setStep((s) => {
        const next = s + 1;
        if (next >= OUTPUT_SIZE * OUTPUT_SIZE) {
          // Restart animation with newly seeded map
          setInputMatrix(generateMatrix(INPUT_SIZE));
          return 0;
        }
        return next;
      });
    }, 400); // Speed of the convolution stepping
    
    return () => clearInterval(interval);
  }, [inputMatrix]);

  if (inputMatrix.length === 0) return null;

  // Calculate kernel (3x3) geometric bounds based on current output index
  const outY = Math.floor(step / OUTPUT_SIZE);
  const outX = step % OUTPUT_SIZE;

  // The sliding kernel overlaps these exact index bounds in the source
  const kStartX = outX;
  const kStartY = outY;

  const handleRegenerate = () => {
    setInputMatrix(generateMatrix(INPUT_SIZE));
    setStep(0);
  };

  return (
    <div 
      className="matrix-container" 
      onClick={handleRegenerate}
      style={{ cursor: "pointer", transition: "transform 0.1s ease" }}
      title="Click to generate new matrix"
    >
      <div>
        <div className="matrix-title">Input (8×8)</div>
        <div 
          className="matrix-grid" 
          style={{ gridTemplateColumns: `repeat(${INPUT_SIZE}, 1fr)` }}
        >
          {inputMatrix.map((val, i) => {
            const x = i % INPUT_SIZE;
            const y = Math.floor(i / INPUT_SIZE);
            const inKernel = x >= kStartX && x < kStartX + KERNEL_SIZE && y >= kStartY && y < kStartY + KERNEL_SIZE;
            const isCenter = x === kStartX + 1 && y === kStartY + 1;
            
            return (
              <div 
                key={`in-${i}`}
                className={`matrix-cell ${inKernel ? "kernel" : ""} ${isCenter ? "kernel-center" : ""}`}
                style={{ width: 22, height: 22 }}
              >
                {!inKernel && (
                   <div style={{ width: "100%", height: "100%", background: "var(--text)", opacity: val * 0.15 + 0.05 }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="matrix-title">Output (6×6)</div>
        <div 
          className="matrix-grid" 
          style={{ gridTemplateColumns: `repeat(${OUTPUT_SIZE}, 1fr)` }}
        >
          {Array.from({ length: OUTPUT_SIZE * OUTPUT_SIZE }).map((_, i) => {
            const isOutput = i === step;
            const isCalculated = i < step; // Only show calculated colors if past original auto-step
            
            const outIntensity = isCalculated ? ((i * 13) % 100) / 100 : 0;
            
            return (
              <div 
                key={`out-${i}`}
                className={`matrix-cell ${isOutput ? "output-active" : ""}`}
                style={{ width: 30, height: 30 }}
              >
                 {isCalculated && !isOutput && (
                    <div style={{ width: "100%", height: "100%", background: "var(--accent)", opacity: outIntensity * 0.5 + 0.1 }} />
                 )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ flexBasis: "100%", textAlign: "center", color: "var(--text-dim)", fontSize: "0.7rem", marginTop: "-1.5rem", opacity: 0.6, letterSpacing: "0.05em" }}>
        Visualizing a discrete convolution. <Link href="/blog/discrete-convolutions" style={{ textDecoration: "underline", color: "var(--accent)" }}>Read more</Link>
      </div>
    </div>
  );
}
