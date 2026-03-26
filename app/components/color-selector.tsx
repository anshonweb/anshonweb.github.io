"use client";

import { useEffect, useState } from "react";

const COLORS = [
  "#60a5fa", // Default Blue
  "#4ade80", // Hacker Green
  "#fb923c", // Retro Orange
  "#c084fc", // Synth Purple
  "#f43f5e", // Bright Pink
  "#a3a3a3", // Ghost Neutral
  "#be123c", // Deep Crimson
];

export default function ColorSelector() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    // Rehydrate from cache automatically skipping flash!
    const saved = localStorage.getItem("hacker-accent");
    if (saved && COLORS.includes(saved)) {
      setActive(saved);
      document.documentElement.style.setProperty("--accent", saved);
    }
  }, []);

  const handleSelect = (hex: string) => {
    setActive(hex);
    localStorage.setItem("hacker-accent", hex);
    document.documentElement.style.setProperty("--accent", hex);
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginLeft: "1rem" }}>
      {COLORS.map((hex) => (
        <button
          key={hex}
          onClick={() => handleSelect(hex)}
          aria-label={`Select accent color ${hex}`}
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: hex,
            border: active === hex ? `2px solid var(--text)` : "none",
            cursor: "pointer",
            padding: 0,
            opacity: active === hex ? 1 : 0.35,
            transition: "all 0.2s ease",
            outline: "none"
          }}
          title={`Set accent to ${hex}`}
        />
      ))}
    </div>
  );
}
