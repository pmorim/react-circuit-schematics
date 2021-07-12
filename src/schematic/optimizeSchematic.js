/**
 * Optimizes a schematic.
 *
 * Removes all 'virtual' nodes, i.e., the nodes that only have less than 3
 * connections.
 *
 * @param {Object} state The current schematic
 * @returns The optimized schematic
 */
export const optimizeSchematic = (state) => {
  // Remove 'virtual' nodes
  for (const node of state.schematic.nodes) {
    // Count the number of connections to the node
    const numConn = 0;
    for (const conn of state.schematic.connections)
      if (conn.start === node.id || conn.end === node.id) numConn++;

    // Delete the node if it is 'virtual'
    if (numConn < 3)
      state.schematic.nodes = state.schematic.nodes.filter(
        (n) => n.id !== node.id,
      );
  }

  return state;
};
