<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 300px)",
    gap: 20,
    padding: 20
  }}
>
  {tokens.map(t => (
    <TokenCard key={t.address} token={t} onClick={() => navigate(`/token/${t.address}`)} />
  ))}
</div>
