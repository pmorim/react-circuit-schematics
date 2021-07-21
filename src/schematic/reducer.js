import { v4 as uuidv4 } from 'uuid';
import { findKey } from 'lodash';

import { optimizeSchematic } from './optimizeSchematic';

export const ACTIONS = {
  ADD: 'add',
  DELETE: 'delete',
  EDIT: 'edit',
  SELECTING: 'selecting',
  SELECTED: 'selected',
  CONNECT: 'connect',
  UNDO: 'undo',
  REDO: 'redo',
};

export const reducer = (state, action) => {
  // Save the previous state to the `history` object.
  if (action.type === ACTIONS.UNDO)
    state.history.redoStack.push(state.schematic);
  else state.history.undoStack.push(state.schematic);

  switch (action.type) {
    /**
     * Adds the given element with a randomly generated id
     * If the element already contained an id, than use that one
     *
     * Usage:
     * ```js
     * dispatch({
     *  type: ACTIONS.ADD,
     *  payload: {
     *    where: 'components',
     *    element: {...}
     *  },
     * });
     * ```
     */
    case ACTIONS.ADD:
      state.schematic[action.payload.where].push({
        id: uuidv4(),
        ...action.payload.element,
      });
      break;

    /**
     * Deletes an element by the given id.
     * Delete all connections to that element as well.
     *
     * Usage:
     * ```js
     * dispatch({
     *  type: ACTIONS.DELETE,
     *  payload: {
     *    id: '...',
     *  },
     * });
     * ```
     */
    case ACTIONS.DELETE:
      // Find the type of element
      const type = findKey(state.schematic, (group) =>
        group.find((elem) => elem.id === action.payload.id),
      );

      // Find the element itself
      const element = state.schematic[type].find(
        (elem) => elem.id === action.payload.id,
      );

      // Delete the element
      state.schematic[type] = state.schematic[key].filter(
        (elem) => elem.id !== action.payload.id,
      );

      // Delete the connections to the element
      state.schematic.connections.filter((conn) => {
        for (const port of element.ports)
          return port.id !== conn.start && port.id !== conn.end;
      });

      break;

    /**
     * Edits the contents of an element by the given id.
     *
     * Usage:
     * ```js
     * dispatch({
     *  type: ACTIONS.EDIT,
     *  payload: {
     *    id: '...',
     *    edits: {...},
     *  },
     * });
     * ```
     */
    case ACTIONS.EDIT:
      for (const type in state.schematic) {
        elem = state.schematic[type].find(
          (elem) => elem.id === action.payload.id,
        );

        if (!elem) continue;
        elem = { ...elem, ...action.payload.edits };
      }

      break;

    /**
     * Adds a component to the selecting array.
     */
    case ACTIONS.SELECTING:
      state.selection.selecting.push(
        action.payload.items.map((item) => item.props.id),
      );
      break;

    /**
     * Selects the components and clears the selecting
     */
    case ACTIONS.SELECTED:
      state.selection.selected = action.payload.items.map(
        (item) => item.props.id,
      );
      state.selection.selecting = [];

    /**
     * Creates a connection between two elements.
     *
     * Usage:
     * ```js
     * dispatch({
     *  type: ACTIONS.CONNECT,
     *  payload: {
     *    start: '...',
     *    end: '...'
     *  },
     * })
     * ```
     */
    case ACTIONS.CONNECT:
      state.schematic.connections.push({ id: uuidv4(), ...action.payload });
      break;

    /**
     * Undo the last change to the schematic.
     *
     * Usage:
     * ```js
     * dispatch({ type: ACTIONS.UNDO });
     * ```
     */
    case ACTIONS.UNDO:
      state.schematic = state.history.undoStack.pop();
      break;

    /**
     * Redo the last "undone" change to the schematic.
     *
     * Usage:
     * ```js
     * dispatch({ type: ACTIONS.REDO });
     * ```
     */
    case ACTIONS.REDO:
      state.schematic = state.history.redoStack.pop();
      break;

    /**
     * Throw error if the given action type is not defined.
     */
    default:
      throw new Error('Action type not supported.');
  }

  // Return the updated schematic
  if (!state.settings.optimize) return state;
  return optimizeSchematic(state);
};
