export async function fetchTokens() {
  const res = await fetch("http://localhost:4000/tokens");
  return await res.json();
}
