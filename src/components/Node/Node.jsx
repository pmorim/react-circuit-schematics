import React, { forwardRef } from 'react';
import { PropTypes } from 'prop-types';

import styles from './Node.module.css';

export const Node = forwardRef(({ position, properties, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      className={styles.node}
      style={{
        // Positioning of the node
        left: position.x - properties.radius,
        top: position.y - properties.radius,

        // Properties of the node
        width: properties.radius * 2,
        height: properties.radius * 2,
        backgroundColor: properties.color,
      }}
      {...rest}
    />
  );
});

Node.propTypes = {
  /**
   * The position of the node
   */
  position: PropTypes.exact({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  /**
   * The optional properties fo the node
   */
  properties: PropTypes.exact({
    color: PropTypes.string,
    radius: PropTypes.number,
  }),
};

Node.defaultProps = {
  position: { x: 0, y: 0 },
  properties: { radius: 7, color: '#6495ED' },
};
