import { useState, useMemo, useCallback } from 'react';

export const useHistory = (setter, maxLength = 10) => {
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
   * Updater of the history state
   */
  const updateHistory = useCallback(
    (isUndo) => {
      setter((prev) => {
        let curr = prev;

        setHistory((hist) => {
          const saveStack = isUndo ? hist.redoStack : hist.undoStack;
          const getStack = isUndo ? hist.undoStack : hist.redoStack;

          if (getStack.length) {
            if (saveStack.push(prev) > maxLength) saveStack.shift();
            curr = getStack.pop();
          }

          return hist;
        });

        return curr;
      });
    },
    [setter, setHistory],
  );

  /**
   * Set the value to its previous state
   */
  const undo = useCallback(() => updateHistory(true), [updateHistory]);
  const redo = useCallback(() => updateHistory(false), [updateHistory]);

  /**
   * Memoized values to enable/disable buttons
   */
  const canUndo = useMemo(() => !!history.undoStack.length, [history]);
  const canRedo = useMemo(() => !!history.redoStack.length, [history]);

  return { makeChange, undo, redo, canUndo, canRedo };
};
