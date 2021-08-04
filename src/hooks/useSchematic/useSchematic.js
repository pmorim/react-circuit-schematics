import { useState, useCallback } from 'react';
import { cloneDeep, isEqual, isFunction } from 'lodash';

import { useHistory } from '../useHistory';

/**
 * A React Hook that takes care of the logic required to run a schematic.
 *
 * @param {Object} initialSchematic The initial value of the schematic.
 * @param {Object} options Extra options to define optional behaviour.
 * @returns {Object} Properties and methods that control the schematic.
 */
export const useSchematic = (initialSchematic = {}, options = {}) => {
  const [schematic, setSchematic] = useState({
    components: [],
    nodes: [],
    connections: [],
    ...initialSchematic,
  });

  const history = useHistory(setSchematic, options?.maxHistoryLength ?? 10);

  /**
   * Adds an element to the schematic.
   *
   * Automatically detects if it is a Component, Node or Connection
   * by it's properties.
   *
   * @param {Object} element The element to be added.
   */
  const add = useCallback(
    (element) => {
      setSchematic((oldSchematic) => {
        // Make a clone of the current schematic
        const newSchematic = cloneDeep(oldSchematic);

        // Where should the element be added?
        let where = 'nodes';
        if (element.hasOwnProperty('ports')) {
          where = 'components';
        } else if (element.hasOwnProperty('start')) {
          where = 'connections';
        }

        // Add the new element to the schematic
        newSchematic[where].push({ id: uuidv4(), ...element });

        // If the changes are valid, save the old schematic
        if (!isEqual(oldSchematic, newSchematic)) history.save(oldSchematic);

        return newSchematic;
      });
    },
    [setSchematic],
  );

  /**
   * Deletes an element from the schematic.
   *
   * Searches for the element that has the given id, and removes it from the
   * schematic. Note that if multiple elements share the same id, they will all
   * be deleted.
   *
   * @param {String} id The id of the element to be deleted.
   */
  const deleteById = useCallback(
    (id) => {
      useSchematic((oldSchematic) => {
        // Make a clone of the current schematic
        const newSchematic = cloneDeep(oldSchematic);

        // Delete the element
        for (const type in newSchematic)
          newSchematic[type] = newSchematic[type].filter(
            (elem) => elem.id !== id,
          );

        // Delete the connections to the element
        newSchematic.connections.filter((conn) => {
          const isConnected = false;
          for (const port of element.ports)
            if (port.id === conn.start || port.id === conn.end)
              isConnected = true;
          return !isConnected;
        });

        // If the changes are valid, save the old schematic
        if (!isEqual(oldSchematic, newSchematic)) history.save(oldSchematic);

        return newSchematic;
      });
    },
    [setSchematic],
  );

  /**
   * Applies certain edits to the specified element.
   *
   * Searches for the element that has the given id, and applies the given
   * edits. Note that if multiple elements share the same id, they will all
   * be edited. The edits can be directly passed and added to the element, but,
   * if a more complex edit is required, you can pass a callback to be applied
   * to the element.
   *
   * @param {String} id The id of the element to be edited.
   * @param {any} edits If it's a function, apply it to the correct element.
   * Otherwise, apply the given edits (Object) to the state.
   */
  const editById = useCallback(
    (id, edits) => {
      setSchematic((oldSchematic) => {
        // Make a clone of the current schematic
        const newSchematic = cloneDeep(oldSchematic);

        // Apply the edits
        for (const type in newSchematic) {
          newSchematic[type] = newSchematic[type].map((elem) => {
            if (elem.id !== id) return elem;
            return isFunction(edits) ? edits(elem) : { ...elem, ...edits };
          });
        }

        // If the changes are valid, save the old schematic
        if (!isEqual(oldSchematic, newSchematic)) history.save(oldSchematic);

        return newSchematic;
      });
    },
    [setSchematic],
  );

  /**
   * Return the relevant data to the user.
   */
  return {
    schematic: {
      data: schematic,
      add,
      deleteById,
      editById,
    },

    history,
  };
};
