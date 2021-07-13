import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

import cx from 'classnames';
import styles from './ElectricalCore.module.css';

import { svgMap } from '../../assets';
import { Port } from '../Port';
import { Label } from '../Label';

export const ElectricalCore = ({
  type,
  position,
  label,
  ports,
  size,
  ...rest
}) => {
  const draggableRef = useRef();
  const boundingRef = useRef();

  const [bounds, setBounds] = useState({ x: 0, y: 0 });
  const [renderCount, setRenderCount] = useState(0);

  /**
   * Calculate the bounds of the component
   */
  useEffect(() => {
    // Calculate the bounds of the component's image
    const newBounds = {
      x: boundingRef.current?.offsetWidth,
      y: boundingRef.current?.offsetHeight,
    };

    // Update the bounds or force re-render
    if (newBounds.x && newBounds.y) setBounds(newBounds);
    else setRenderCount(renderCount + 1);
  }, [boundingRef, renderCount]);

  /**
   * Update the port's position to take into account the component's rotation.
   */
  useEffect(() => {
    for (const port of ports) {
      let { x, y } = port.position;

      // Shift the coordinates to origin
      x = x * 2 - 1;
      y = y * 2 - 1;

      // Convert to polar coordinates
      let radius = Math.sqrt(x * x + y * y);
      let teta = Math.atan2(y, x);

      // Convert the component's rotation to radians
      const rot = (position.angle ?? 0) * (Math.PI / 180);

      // Convert to Cartesian coordinates
      x = radius * Math.cos(teta - rot);
      y = radius * Math.sin(teta - rot);

      // Shift the coordinates back
      port.position.x = (x + 1) / 2;
      port.position.y = (y + 1) / 2;
    }
  }, [position]);

  return (
    <div className={styles.wrapper}>
      <Draggable
        handle='.rdc-handle'
        nodeRef={draggableRef}
        defaultPosition={position}
        {...rest}
      >
        <div ref={draggableRef}>
          <img
            className={cx(styles.noDrag, 'rdc-handle')}
            style={{ transform: `rotate(-${position.angle}deg)`, width: size }}
            ref={boundingRef}
            src={svgMap.get(type)}
            alt={type}
          />

          {ports.map((port, i) => {
            return <Port key={i} ref={port.ref} bounds={bounds} {...port} />;
          })}

          <Label {...label} />
        </div>
      </Draggable>
    </div>
  );
};

ElectricalCore.propTypes = {
  /**
   * The type of the component
   */
  type: PropTypes.string.isRequired,
  /**
   * The position of the component
   */
  position: PropTypes.exact({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    z: PropTypes.number,
    angle: PropTypes.number,
  }).isRequired,
  /**
   * The label of the component
   */
  label: PropTypes.exact({
    name: PropTypes.string,
    value: PropTypes.string,
    unit: PropTypes.string,
    position: PropTypes.exact({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }).isRequired,
  /**
   * An array of the connection ports
   */
  ports: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      type: PropTypes.string.isRequired,
      position: PropTypes.exact({
        x: PropTypes.number,
        y: PropTypes.number,
      }).isRequired,
      ref: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any }),
      ]),
    }),
  ).isRequired,
};
