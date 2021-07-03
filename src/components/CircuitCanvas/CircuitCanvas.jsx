import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './CircuitCanvas.module.css';

import useMouse from '@react-hook/mouse-position';
import { v4 as uuidv4 } from 'uuid';

export const CircuitCanvas = ({ width, height, children, ...rest }) => {
  const canvasRef = useRef();
  const mouse = useMouse(canvasRef);

  return (
    <div
      ref={canvasRef}
      className={styles.CircuitCanvas}
      style={{ width, height, position: 'relative' }}
      {...rest}
    >
      {React.Children.map(children, (child) => React.cloneElement(child, {}))}
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
