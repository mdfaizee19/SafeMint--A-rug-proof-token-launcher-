// cache.js - tiny in-memory + localStorage cache
const mem = {};

export function getCache(key) {
  if (mem[key]) return mem[key];
  const str = localStorage.getItem(key);
  if (!str) return null;
  try {
    mem[key] = JSON.parse(str);
    return mem[key];
  } catch {
    return null;
  }
}

export function setCache(key, data) {
  mem[key] = data;
  localStorage.setItem(key, JSON.stringify(data));
}