import ColorSelector from "./color-selector";

export default function Footer() {
  return (
    <footer className="home-footer" style={{ flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
      <div style={{ display: "flex", gap: "0.35rem", alignItems: "center" }}>
        <span>© {new Date().getFullYear()}</span>
        <span style={{ color: "var(--accent)" }}>•</span>
        <span>ansh@unreal:~#</span>
      </div>
      <ColorSelector />
    </footer>
  );
}