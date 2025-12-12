export default function Input({ placeholder, value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        padding: "12px 14px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 12,
        color: "white",
        outline: "none",
        fontSize: 15,
        marginTop: 6,
      }}
    />
  );
}
