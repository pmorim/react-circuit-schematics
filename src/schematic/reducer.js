import { v4 as uuidv4 } from 'uuid';
import { findKey } from 'lodash';

// Helper functions
import { optimizeSchematic } from './optimizeSchematic';

export const ACTIONS = {
  ADD: 'add',
  DELETE: 'delete',
  UNDO: 'undo',
  REDO: 'redo',
};

export const reducer = (state, action) => {
  switch (action.type) {
    /**
     * Adds the given element with a randomly generated id
     * If the element already contained an id, than use that one
     */
    case ACTIONS.ADD:
      state.schematic[action.payload.where].push({
        id: uuidv4(),
        ...action.payload.element,
      });
      break;

    /**
     * Deletes an element by the given id
     * Delete all connections to that element as well
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

    case ACTIONS.UNDO:
      break;

    case ACTIONS.REDO:
      break;

    /**
     * Throw error if the given action type is not defined
     */
    default:
      throw new Error('Action type not supported.');
  }

  // Return the updated schematic
  if (!state.settings.optimize) return state;
  return optimizeSchematic(state);
};
