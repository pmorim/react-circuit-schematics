import React, { forwardRef } from 'react';
import { PropTypes } from 'prop-types';

import styles from './Node.module.css';

export const Node = forwardRef(({ radius, color, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      className={styles.node}
      style={{ width: radius * 2, height: radius * 2, backgroundColor: color }}
      {...rest}
    />
  );
});

Node.propTypes = {
  /**
   * The radius of the node
   */
  radius: PropTypes.number,
  /**
   * The color of the node
   */
  color: PropTypes.string,
};

Node.defaultProps = {
  radius: 7,
  color: '#6495ED',
};
