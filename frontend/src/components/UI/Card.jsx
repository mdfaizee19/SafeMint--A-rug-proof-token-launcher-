export default function Card({ children, style, onClick }) {
  return (
    <div
      className="glass-card"
      style={{ ...style, cursor: onClick ? "pointer" : "default" }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
