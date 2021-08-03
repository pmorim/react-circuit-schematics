import { useState, useCallback } from 'react';
import { useHistory } from '../useHistory';

export const useSchematic = (initialSchematic) => {
  const [schematic, setSchematic] = useState({
    components: [],
    nodes: [],
    connections: [],
    ...initialSchematic,
  });

  const history = useHistory(schematic, setSchematic);

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

  const editById = useCallback(
    (id, edits, callback) => {
      if (callback) setSchematic(callback);
      else
        setSchematic((schematic) => {
          for (const type in schematic) {
            elem = schematic[type].find((elem) => elem.id === id);
            if (elem) elem = { ...elem, ...edits };
          }

          return schematic;
        });
    },
    [setSchematic],
  );

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
