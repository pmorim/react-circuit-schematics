import React, { useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import useMouse from '@react-hook/mouse-position';
import useDynamicRefs from 'use-dynamic-refs';

import styles from './Schematic.module.css';

import { reducer, initialState } from '../../schematic';
import { Connection } from '../Connection';
import { Node } from '../Node';

export const Schematic = ({ width, height, children, ...rest }) => {
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
};

Schematic.defaultProps = {
  width: 800,
  height: 500,
};
