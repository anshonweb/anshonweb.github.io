"use client";

import { useEffect, useState } from "react";

export default function SpotifyNowPlaying() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch("/api/now-playing");
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      }
    };
    
    // Poll every 10 seconds securely against local proxy
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!data || !data.isPlaying) return null;

  return (
    <a
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.8rem",
        textDecoration: "none",
        marginTop: "0.5rem",
        padding: "0.5rem 0.6rem",
        borderRadius: "6px",
        transition: "background 0.2s ease",
        width: "fit-content",
        maxWidth: "280px"
      }}
    >
      <div style={{ 
        position: "relative", 
        width: "44px", 
        height: "44px", 
        borderRadius: "4px", 
        overflow: "hidden",
        flexShrink: 0,
        border: "1px solid var(--border)",
        opacity: 0.9
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={data.albumImageUrl} 
          alt={data.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "2px", alignItems: "flex-start", overflow: "hidden" }}>
        <div style={{ 
          fontSize: "0.80rem", 
          color: "var(--text)", 
          fontWeight: 600, 
          display: "flex", 
          alignItems: "center", 
          gap: "8px",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          maxWidth: "100%"
        }}>
          {data.title}
          <div style={{ 
            width: "6px", 
            height: "6px", 
            backgroundColor: "#1db954", 
            borderRadius: "50%",
            flexShrink: 0,
            boxShadow: "0 0 8px #1db954"
          }}></div>
        </div>
        <div style={{ 
          fontSize: "0.70rem", 
          color: "var(--text-dim)",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          maxWidth: "100%"
        }}>
          {data.artist}
        </div>
      </div>
    </a>
  );
}