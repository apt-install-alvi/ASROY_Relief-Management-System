// src/utils/api.js
// Robust BASE_URL: uses REACT_APP_API_URL when available at build time,
// otherwise falls back to the default dev server URL.
// This guards against `process is not defined` if the file somehow runs in the browser.
export const BASE_URL = (function () {
  try {
    if (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL) {
      return process.env.REACT_APP_API_URL;
    }
  } catch (e) {
    // ignore
  }
  return "http://localhost:5000";
})();

/**
 * Read response text first and try to parse JSON.
 * Returns null for empty body, or throws if body is non-JSON.
 */
export async function safeParseJson(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Server returned non-JSON response:", text);
    throw new Error("Invalid server response (not JSON)");
  }
}
