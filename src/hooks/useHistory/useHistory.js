import { useState, useMemo, useCallback } from 'react';

export const useHistory = (value, setter) => {
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
      curr.redoStack.push(value);
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
      curr.undoStack.push(value);
      state = curr.redoStack.pop();
      return curr;
    });

    setter(state);
  }, [value, setter, setHistory]);

  return { undo, redo, canUndo, canRedo };
};
