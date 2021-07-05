import React, { useRef, useState, useEffect } from 'react';
import useDynamicRefs from 'use-dynamic-refs';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

import cx from 'classnames';
import styles from './ElectricalCore.module.css';

import { svgMap } from '../../assets';
import { Port } from '../Port';
import { Label } from '../Label';

export const ElectricalCore = ({ type, position, label, ports, ...rest }) => {
  const draggableRef = useRef();
  const boundingRef = useRef();

  const [bounds, setBounds] = useState({ x: 0, y: 0 });
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    // Calculate the bounds of the component image
    const newBounds = {
      x: boundingRef.current?.offsetWidth,
      y: boundingRef.current?.offsetHeight,
    };

    // Update the bounds or force re-render
    if (newBounds.x && newBounds.y) setBounds(newBounds);
    else setRenderCount(renderCount + 1);
  }, [boundingRef, renderCount]);

  return (
    <div className={styles.wrapper}>
      <Draggable
        defaultPosition={position}
        handle='.rdc-handle'
        nodeRef={draggableRef}
        {...rest}
      >
        <div ref={draggableRef}>
          <img
            className={cx(styles.noDrag, 'rdc-handle')}
            ref={boundingRef}
            src={svgMap.get(type)}
            alt={type}
          />

          {ports.map((port, i) => {
            const { id, ...temp } = port;
            return <Port key={i} ref={port.ref} bounds={bounds} {...temp} />;
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
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      position: PropTypes.exact({
        x: PropTypes.number,
        y: PropTypes.number,
      }).isRequired,
      ref: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any }),
      ]).isRequired,
    }),
  ).isRequired,
};
