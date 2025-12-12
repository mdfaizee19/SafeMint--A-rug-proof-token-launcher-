// ADOPTION PHASE ENGINE
// Encourages 50–100+ wallet interactions

export function getReferralLink(token) {
  return `${window.location.origin}/?ref=${token}`;
}

export function recordReferral(token) {
  fetch(`http://localhost:4000/refer/${token}`, {
    method: "POST"
  }).catch(() => {});
}

export function shareOnX(text) {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

export function shareOnTelegram(text) {
  const url = `https://t.me/share/url?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}
