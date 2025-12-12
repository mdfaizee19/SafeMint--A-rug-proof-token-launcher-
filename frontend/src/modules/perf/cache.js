// SPEED DEMON PERFORMANCE ENGINE
// SWR cache + memory + localStorage

const mem = {};

export async function swr(key, fetcher, ttl = 3000) {
  const now = Date.now();

  // return memory cache
  if (mem[key] && now - mem[key].ts < ttl) {
    return mem[key].data;
  }

  // return localStorage fallback
  const ls = localStorage.getItem(key);
  if (ls) {
    mem[key] = { data: JSON.parse(ls), ts: now };
    fetcher().then((fresh) => {
      mem[key] = { data: fresh, ts: Date.now() };
      localStorage.setItem(key, JSON.stringify(fresh));
    });
    return JSON.parse(ls);
  }

  // fetch fresh
  const fresh = await fetcher();
  mem[key] = { data: fresh, ts: now };
  localStorage.setItem(key, JSON.stringify(fresh));
  return fresh;
}
