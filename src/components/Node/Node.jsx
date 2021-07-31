import React, { forwardRef, useRef } from 'react';
import Draggable from 'react-draggable';
import { PropTypes } from 'prop-types';

import cx from 'classnames';
import styles from './Node.module.css';

import { Label } from '../Label';

export const Node = forwardRef(
  ({ position, label, properties, gridSize, ...rest }, ref) => {
    const draggableRef = useRef();

    return (
      <Draggable
        handle='.rcs-handle'
        defaultPosition={position}
        nodeRef={draggableRef}
        grid={[gridSize, gridSize]}
        {...rest}
      >
        <div ref={draggableRef}>
          <div
            className={cx(styles.node, 'rcs-handle')}
            style={{
              width: (properties.radius ?? 6) * 2,
              height: (properties.radius ?? 6) * 2,
              backgroundColor: properties.color ?? '#6495ED',
              opacity: properties.opacity ?? 1,
            }}
            {...rest}
          >
            <div ref={ref} />
          </div>

          <Label gridSize={gridSize} {...label} />
        </div>
      </Draggable>
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
  /**
   * The size of the grid, i.e., the amount of pixels the drag skips
   */
  gridSize: PropTypes.number,
};

Node.defaultProps = {
  position: { x: 0, y: 0 },
  properties: { radius: 6, color: '#6495ED', opacity: 1 },
  gridSize: 10,
};
