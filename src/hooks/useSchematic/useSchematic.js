import { useState, useCallback } from 'react';
import { useHistory } from '../useHistory';

export const useSchematic = (initialSchematic, options) => {
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
   * @param {Object} element The element to be added
   */
  const add = useCallback(
    (element) => {
      setSchematic((schematic) => {
        // Where should the element be added?
        let where = 'nodes';
        if (element.hasOwnProperty('ports')) {
          where = 'components';
        } else if (element.hasOwnProperty('start')) {
          where = 'connections';
        }

        // Add the new element to the schematic
        schematic[where].push({ id: uuidv4(), ...element });
        return schematic;
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
      useSchematic((schematic) => {
        // Delete the element
        for (const type in schematic)
          schematic[type] = schematic[type].filter((elem) => elem.id !== id);

        // Delete the connections to the element
        schematic.connections.filter((conn) => {
          const isConnected = false;
          for (const port of element.ports)
            if (port.id === conn.start || port.id === conn.end)
              isConnected = true;
          return !isConnected;
        });

        return schematic;
      });
    },
    [setSchematic],
  );

  /**
   * Applies certain edits to the specified element.
   *
   * @param {String} id The id of the element to be edited.
   * @param {Object} edits The edits to be applied to the element.
   * @param {Function} cb The callback to be executed to apply the edits.
   */
  const editById = useCallback(
    (id, edits, cb) => {
      if (cb) setSchematic(cb);
      else
        setSchematic((schematic) => {
          for (const type in schematic) {
            let elem = schematic[type].find((elem) => elem.id === id);
            if (elem) elem = { ...elem, ...edits };
          }

          return schematic;
        });
    },
    [setSchematic],
  );

  /**
   * Return the relevant data to the user
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
