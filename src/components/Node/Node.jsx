import React, { forwardRef } from 'react';
import { PropTypes } from 'prop-types';

import styles from './Node.module.css';

import { Label } from '../Label';

export const Node = forwardRef(
  ({ position, label, properties, ...rest }, ref) => {
    return (
      <>
        <div
          className={styles.node}
          style={{
            // Positioning of the node
            left: position.x,
            top: position.y,

            // Properties of the node
            width: (properties.radius ?? 6) * 2,
            height: (properties.radius ?? 6) * 2,
            backgroundColor: properties.color ?? '#6495ED',
            opacity: properties.opacity ?? 1,
          }}
          {...rest}
        >
          <div ref={ref} />
        </div>

        <Label {...label} />
      </>
    );
  },
);

Node.propTypes = {
  /**
   * The position of the node
   */
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  /**
   * The label of the node
   */
  label: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.number,
    unit: PropTypes.string,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }),
  /**
   * The optional properties fo the node
   */
  properties: PropTypes.shape({
    color: PropTypes.string,
    radius: PropTypes.number,
    opacity: PropTypes.number,
  }),
};

Node.defaultProps = {
  position: { x: 0, y: 0 },
  properties: { radius: 6, color: '#6495ED', opacity: 1 },
};
