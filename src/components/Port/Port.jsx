import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import styles from './Port.module.css';

export const Port = forwardRef(
  ({ radius, color, position, bounds, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={styles.port}
        style={{
          // The size of the port
          width: radius * 2,
          height: radius * 2,

          // The coloring
          backgroundColor: color,

          // The positioning of the port
          left: position.x * bounds.x - radius,
          top: position.y * bounds.y - radius,
        }}
        {...rest}
      />
    );
  },
);

Port.propTypes = {
  /**
   * The radius of a port
   */
  radius: PropTypes.number,
  /**
   * The color of the port
   */
  color: PropTypes.string,
  /**
   * The relative position of the port. Range between `o` and `1`
   */
  position: PropTypes.exact({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  /**
   * The bounding box of the port's position
   */
  bounds: PropTypes.exact({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

Port.defaultProps = {
  radius: 10,
  color: '#bbb',
  position: { x: 0.5, y: 0.5 },
  bounds: { x: 1, y: 1 },
};
