import React from 'react';
import PropTypes from 'prop-types';

import styles from './Port.module.css';

export const Port = React.forwardRef(
  ({ position, bounds, properties, ...rest }, ref) => {
    return (
      <div
        className={styles.port}
        style={{
          // The size of the port
          width: properties.radius * 2,
          height: properties.radius * 2,

          // The coloring
          backgroundColor: properties.color,

          // The positioning of the port
          left: position.x * bounds.x - properties.radius,
          top: position.y * bounds.y - properties.radius,
        }}
        {...rest}
      >
        <div ref={ref} />
      </div>
    );
  },
);

Port.propTypes = {
  /**
   * The relative position of the Port. Range between `0` and `1`
   */
  position: PropTypes.exact({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  /**
   * The bounding box of the Port's position
   */
  bounds: PropTypes.exact({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  /**
   * Optional properties of the Port
   */
  properties: PropTypes.exact({
    radius: PropTypes.number,
    color: PropTypes.string,
  }),
};

Port.defaultProps = {
  properties: {
    radius: 6,
    color: '#bbb',
  },
  position: { x: 0.5, y: 0.5 },
  bounds: { x: 1, y: 1 },
};
