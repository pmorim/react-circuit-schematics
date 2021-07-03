import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

import cx from 'classnames';
import styles from './ElectricalCore.module.css';

import { Port } from '../Port';
import { Label } from '../Label';

export const ElectricalCore = ({ symbol, type, label, ports, ...rest }) => {
  const [bounds, setBounds] = useState({ x: 0, y: 0 });
  const [renderCount, setRenderCount] = useState(0);

  const draggableRef = useRef();
  const boundingRef = useRef();

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
    // The wrapper inline-block div forces <Draggable /> to fit it's content
    <div style={{ display: 'inline-block' }}>
      <Draggable handle='.rdc-handle' nodeRef={draggableRef} {...rest}>
        <div ref={draggableRef}>
          <img
            className={cx(styles.noDrag, 'rdc-handle')}
            ref={boundingRef}
            src={symbol}
            alt={symbol}
          />

          <Label {...label} />

          {ports.map((port, i) => (
            <Port
              key={i}
              radius={port.radius}
              position={port.position}
              bounds={bounds}
            />
          ))}
        </div>
      </Draggable>
    </div>
  );
};

ElectricalCore.propTypes = {
  /**
   * Path to the SVG file to be used as the electrical symbol
   */
  symbol: PropTypes.string,
  /**
   * The type of the component
   */
  type: PropTypes.string,
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
  }),
  /**
   * An array of the connection ports
   */
  ports: PropTypes.arrayOf(
    PropTypes.exact({
      type: PropTypes.string,
      position: PropTypes.exact({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    }),
  ),
};
