import React from 'react';
import PropTypes from 'prop-types';

import styles from './Port.module.css';

export const Port = ({ radius, position, bounds, ...rest }) => {
  return (
    <div
      className={styles.port}
      style={{
        // The size of the port
        width: radius * 2,
        height: radius * 2,

        // The positioning of the port
        left: `calc(${position.x * bounds.x}px - ${radius}px)`,
        top: `calc(${position.y * bounds.y}px - ${radius}px)`,
      }}
      {...rest}
    />
  );
};

Port.propTypes = {
  /**
   * The radius of a port
   */
  radius: PropTypes.number,
  /**
   * The relative position of the port
   */
  position: PropTypes.exact({ x: PropTypes.number, y: PropTypes.number }),
  /**
   * The bounds of the component's electrical symbol's image
   */
  bounds: PropTypes.exact({ x: PropTypes.number, y: PropTypes.number }),
};

Port.defaultProps = {
  radius: 10,
  position: { x: 0, y: 0 },
  bounds: { x: 10, y: 10 },
};
