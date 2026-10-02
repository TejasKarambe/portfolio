/**
 * Cookie and in-device memory management utilities for Tejas's portfolio.
 * Syncs seamlessly with localStorage as fallback/persistence layer.
 */

export function setCookie(name, value, days = 30) {
  try {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const serialized = typeof value === "object" ? JSON.stringify(value) : String(value);
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(serialized)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    // Also save in localStorage for reliability
    localStorage.setItem(`tk_${name}`, serialized);
  } catch (e) {
    console.warn("Cookie set error:", e);
  }
}

export function getCookie(name, defaultValue = null) {
  try {
    const nameEQ = encodeURIComponent(name) + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        const raw = decodeURIComponent(c.substring(nameEQ.length, c.length));
        try {
          return JSON.parse(raw);
        } catch {
          return raw;
        }
      }
    }
    // Fallback to localStorage
    const local = localStorage.getItem(`tk_${name}`);
    if (local !== null) {
      try {
        return JSON.parse(local);
      } catch {
        return local;
      }
    }
  } catch (e) {
    console.warn("Cookie get error:", e);
  }
  return defaultValue;
}

export function deleteCookie(name) {
  try {
    document.cookie = `${encodeURIComponent(name)}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
    localStorage.removeItem(`tk_${name}`);
  } catch (e) {
    console.warn("Cookie delete error:", e);
  }
}

export function getCookieInventory() {
  const items = [];
  try {
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      const c = ca[i].trim();
      if (!c) continue;
      const [key, ...vals] = c.split("=");
      const val = decodeURIComponent(vals.join("="));
      items.push({
        source: "Cookie (HTTP/Document)",
        key: decodeURIComponent(key),
        value: val,
        size: `${c.length} B`,
      });
    }
    // Also list relevant localStorage items
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith("tk_")) {
        const cleanKey = k.replace(/^tk_/, "");
        if (!items.find((it) => it.key === cleanKey)) {
          items.push({
            source: "Device LocalStorage",
            key: cleanKey,
            value: localStorage.getItem(k),
            size: `${(localStorage.getItem(k) || "").length} B`,
          });
        }
      }
    }
  } catch (e) {
    console.warn(e);
  }
  return items;
}

export function clearAllPortfolioMemory() {
  try {
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      const eqPos = ca[i].indexOf("=");
      const name = eqPos > -1 ? ca[i].substr(0, eqPos).trim() : ca[i].trim();
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
    }
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith("tk_")) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch (e) {
    console.warn(e);
  }
}
