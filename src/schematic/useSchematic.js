import { useReducer } from 'react';

import { reducer, ACTIONS } from './reducer';
import { initialState } from './initialState';
import { initializer } from './initializer';

export const useSchematic = (initialSchematic) => {
  const initial = { ...initialState, ...initialSchematic };
  const [state, dispatch] = useReducer(reducer, initial, initializer);

  return {
    /**
     * The schematic object.
     * It contains the schematic in a JSON model.
     */
    schematic: state.schematic,

    /**
     * Adds a component to the schematic.
     * If the component doesn't have an id, then it creates one.
     *
     * @param {Object} component The component to be added
     */
    addComponent: (component) => {
      dispatch({
        type: ACTIONS.ADD,
        payload: {
          where: 'components',
          element: component,
        },
      });
    },

    /**
     * Deletes a component from the schematic.
     *
     * @param {String} id The id of the component.
     */
    deleteComponent: (id) => {
      dispatch({ type: ACTIONS.DELETE, payload: { id } });
    },

    /**
     * Edits the contents of a component.
     *
     * @param {Number} id The id of the component.
     * @param {Object} edits The content to replace on the component.
     */
    editComponent: (id, edits) => {
      dispatch({ type: ACTIONS.EDIT, payload: { id, edits } });
    },

    /**
     *
     */
    selection: {
      /**
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
