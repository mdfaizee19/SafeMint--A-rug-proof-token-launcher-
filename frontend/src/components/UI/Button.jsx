export default function Button({ children, onClick, disabled, style }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "12px 20px",
        borderRadius: 12,
        background: disabled
          ? "rgba(255,255,255,0.1)"
          : "linear-gradient(90deg,#00eaff,#00ff9d)",
        border: "none",
        color: disabled ? "#777" : "#000",
        fontWeight: 600,
        fontSize: 16,
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: disabled ? "none" : "0 0 15px rgba(0,255,255,0.2)",
        transition: "0.2s",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
