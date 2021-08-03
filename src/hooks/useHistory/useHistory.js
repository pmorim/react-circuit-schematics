import { useState, useMemo, useCallback } from 'react';

export const useHistory = (value, setter, maxHistoryLength = 10) => {
  const [history, setHistory] = useState({ undoStack: [], redoStack: [] });

  /**
   * Makes a change to the history
   * Adds the given change to the undo stack
   */
  const makeChange = useCallback(
    (change) =>
      setHistory((hist) => {
        if (hist.undoStack.push(change) > maxLength) hist.undoStack.shift();
        return hist;
      }),
    [setHistory],
  );

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

  return { makeChange, undo, redo, canUndo, canRedo };
};
