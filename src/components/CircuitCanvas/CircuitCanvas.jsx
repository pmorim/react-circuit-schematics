import React from 'react';
import PropTypes from 'prop-types';

import styles from './CircuitCanvas.module.css';

export const CircuitCanvas = ({ width, height, children, ...rest }) => {
  return (
    <div className={styles.CircuitCanvas} style={{ width, height }} {...rest}>
      {children}
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
