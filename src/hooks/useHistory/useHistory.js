import { useState, useMemo, useCallback } from 'react';

export const useHistory = (value, setter, maxHistoryLength = 10) => {
  const [history, setHistory] = useState({ undoStack: [], redoStack: [] });

  /**
   * Memoized values to enable/disable buttons
   */
  const canUndo = useMemo(() => !!history.undoStack.length, [history]);
  const canRedo = useMemo(() => !!history.redoStack.length, [history]);

  /**
   * Set the value to its previous state
   */
  const undo = useCallback(() => {
    setter((prev) => {
      const curr = prev;

      setHistory((hist) => {
        if (hist.redoStack.push(prev) > maxHistoryLength)
          hist.redoStack.shift();
        curr = hist.undoStack.pop();
        return hist;
      });

      return curr;
    });
  }, [value, setter, setHistory]);

  /**
   * Return the value to its recent state
   */
  const redo = useCallback(() => {
    setter((prev) => {
      const curr = prev;

      setHistory((hist) => {
        if (hist.undoStack.push(prev) > maxHistoryLength)
          hist.undoStack.shift();
        curr = hist.redoStack.pop();
        return hist;
      });

      return curr;
    });
  }, [value, setter, setHistory]);

  return { undo, redo, canUndo, canRedo };
};
