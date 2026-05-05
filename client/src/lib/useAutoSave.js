import { useEffect, useRef, useState } from "react";

/**
 * Auto-saves data after a delay since the last change.
 *
 * @param {any} data — the value to save
 * @param {Function} saveFn — async function that saves it (receives data)
 * @param {Object} opts — { delay: ms, enabled: bool }
 * @returns {{ status, lastSavedAt, save }} — status: idle | saving | saved | error
 */
export function useAutoSave(
  data,
  saveFn,
  { delay = 2000, enabled = true } = {},
) {
  const [status, setStatus] = useState("idle");
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const timerRef = useRef(null);
  const isFirstRun = useRef(true);
  const lastSavedRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    // Skip the very first run (initial mount with loaded data)
    if (isFirstRun.current) {
      isFirstRun.current = false;
      lastSavedRef.current = JSON.stringify(data);
      return;
    }

    // Skip if nothing changed
    const currentSerialized = JSON.stringify(data);
    if (currentSerialized === lastSavedRef.current) return;

    // Debounce: clear any pending save and schedule a new one
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      setStatus("saving");
      try {
        await saveFn(data);
        lastSavedRef.current = currentSerialized;
        setLastSavedAt(new Date());
        setStatus("saved");
      } catch (err) {
        console.error("Auto-save failed:", err);
        setStatus("error");
      }
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [data, saveFn, delay, enabled]);

  // Manual save (e.g. before navigation)
  const save = async () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setStatus("saving");
    try {
      await saveFn(data);
      lastSavedRef.current = JSON.stringify(data);
      setLastSavedAt(new Date());
      setStatus("saved");
    } catch (err) {
      console.error("Manual save failed:", err);
      setStatus("error");
    }
  };

  return { status, lastSavedAt, save };
}
