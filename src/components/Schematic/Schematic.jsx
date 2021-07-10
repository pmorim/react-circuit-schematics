import React, { useReducer, useRef } from 'react';
import useDynamicRefs from 'use-dynamic-refs';
import useMouse from '@react-hook/mouse-position';

import styles from './Schematic.module.css';
import PropTypes from 'prop-types';

import { reducer, initialState } from '../../schematic';
import { ElectricalCore } from '../ElectricalCore';
import { Connection } from '../Connection';
import { Node } from '../Node';

export const Schematic = ({ width, height, gridSize, children, ...rest }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [getRef, setRef] = useDynamicRefs();

  const canvasRef = useRef();
  const mouse = useMouse(canvasRef);

  return (
    <div
      ref={canvasRef}
      className={styles.Schematic}
      style={{ width, height, position: 'relative' }}
      {...rest}
    >
      {children}

      {state.schematic.components.map((comp) => {
        comp.ports.forEach((port) => (port.ref = setRef(port.id)));
        return (
          <ElectricalCore key={comp.id} grid={[gridSize, gridSize]} {...comp} />
        );
      })}

      {state.schematic.nodes.map((node) => (
        <Node key={node.id} ref={setRef(node.id)} {...node} />
      ))}

      {state.schematic.connections.map((conn) => (
        <Connection
          key={conn.id}
          start={getRef(conn.start)}
          end={getRef(conn.end)}
        />
      ))}
    </div>
  );
};

Schematic.propTypes = {
  /**
   * The width of the canvas
   */
  width: PropTypes.number,
  /**
   * The height of the canvas
   */
  height: PropTypes.number,
  /**
   * The size of the grid units, in pixels
   */
  gridSize: PropTypes.number,
};

Schematic.defaultProps = {
  width: 800,
  height: 500,
  gridSize: 1,
};
