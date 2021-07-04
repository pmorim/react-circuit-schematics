import React, { useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import useMouse from '@react-hook/mouse-position';

import styles from './CircuitCanvas.module.css';

import { reducer, initialState, initializer } from '../../schematic';
import { Connection } from '../Connection';
import { Node } from '../Node';

export const CircuitCanvas = ({ width, height, children, ...rest }) => {
  const [state, dispatch] = useReducer(reducer, initialState, initializer);

  const canvasRef = useRef();
  const mouse = useMouse(canvasRef);

  return (
    <div
      ref={canvasRef}
      className={styles.CircuitCanvas}
      style={{ width, height, position: 'relative' }}
      {...rest}
    >
      {children}

      {state.schematic.nodes.map((node) => (
        <Node key={node.id} {...node} />
      ))}
      {state.schematic.connections.map((conn) => (
        <Connection key={conn.id} {...conn} />
      ))}
    </div>
  );
};

CircuitCanvas.propTypes = {
  /**
   * The width of the canvas
   */
  width: PropTypes.number,
  /**
   * The height of the canvas
   */
  height: PropTypes.number,
};

CircuitCanvas.defaultProps = {
  width: 800,
  height: 500,
};
