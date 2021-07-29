import { useReducer } from 'react';

import { reducer, ACTIONS } from './reducer';
import { initialState } from './initialState';
import { initializer } from './initializer';

export const useSchematic = (initialSchematic) => {
  const initial = { ...initialState, ...initialSchematic };
  const [state, dispatch] = useReducer(reducer, initial, initializer);

  return {
    /**
     * The API to read and write to the schematic
     */
    schematic: {
      /**
       * The schematic object.
       * It contains the schematic in a JSON model.
       */
      data: state.schematic,

      /**
       * Adds a element to the schematic.
       * If the element doesn't have an id, then it creates one.
       *
       * @param {Object} element The element to be added
       */
      add: (element) => {
        dispatch({
          type: ACTIONS.ADD,
          payload: { element },
        });
      },

      /**
       * Deletes a element from the schematic.
       *
       * @param {String} id The id of the element.
       */
      delete: (id) => {
        dispatch({ type: ACTIONS.DELETE, payload: { id } });
      },

      /**
       * Edits the contents of a element.
       *
       * @param {Number} id The id of the element.
       * @param {Object} edits The content to replace on the element.
       */
      edit: (id, edits) => {
        dispatch({ type: ACTIONS.EDIT, payload: { id, edits } });
      },
    },

    /**
     * The API to handle the selection of elements
     */
    selection: {
      /**
       * Handles the elements that are currently being selected
       *
       * @param {*} item
       */
      handleSelecting: (items) => {
        dispatch({
          type: ACTIONS.SELECTING,
          payload: { items },
        });
      },

      /**
       * Handles the elements that have been selected
       *
       * @param {*} items
       */
      handleSelected: (items) => {
        dispatch({
          type: ACTIONS.SELECTED,
          payload: { items },
        });
      },
    },

    /**
     * Everything related to controlling the history of the schematic.
     * In other words, Undo and Redo controls.
     */
    history: {
      /**
       * Undo the last change to the schematic.
       */
      undo: () => {
        dispatch({ type: ACTIONS.UNDO });
      },

      /**
       * Redo the last "undone" change to the schematic.
       */
      redo: () => {
        dispatch({ type: ACTIONS.REDO });
      },

      /**
       * Indicators for the possibility to execute an Undo.
       * Useful for activating and deactivating an Undo button.
       */
      canUndo: state.history.undoStack.length,

      /**
       * Indicator for the possibility to execute Redo.
       * Useful for activating and deactivating a Redo button.
       */
      canRedo: state.history.redoStack.length,
    },
  };
};
