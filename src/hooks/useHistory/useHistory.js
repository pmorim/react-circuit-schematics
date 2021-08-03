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
    const state = null;

    setHistory((curr) => {
      if (curr.redoStack.push(value) >= maxHistoryLength)
        curr.redoStack.shift();
      state = curr.undoStack.pop();
      return curr;
    });

    setter(state);
  }, [value, setter, setHistory]);

  /**
   * Return the value to its recent state
   */
  const redo = useCallback(() => {
    const state = null;

    setHistory((curr) => {
      if (curr.undoStack.push(value) >= maxHistoryLength)
        curr.undoStack.shift();
      state = curr.redoStack.pop();
      return curr;
    });

    setter(state);
  }, [value, setter, setHistory]);

  return { undo, redo, canUndo, canRedo };
};
