import React, { useRef, useState, useEffect } from 'react';
import { createSelectable } from 'react-selectable-fast';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

import styles from './ElectricalCore.module.css';
import cx from 'classnames';

import { svgMap } from '../../../assets';
import { Port } from '../Port';
import { Label } from '../Label';

export const ElectricalCore = createSelectable(
  ({
    type,
    position,
    label,
    ports,
    size,
    gridSize,
    altImageIdx,
    imgPath,
    selectableRef,
    isSelected,
    isSelecting,
    selectionColor,
    ...rest
  }) => {
    const draggableRef = useRef();
    const boundingRef = useRef();

    const [bounds, setBounds] = useState({ x: 0, y: 0 });
    const [renderCount, setRenderCount] = useState(0);

    const [isGrabbing, setIsGrabbing] = useState(false);

    // Logic for alternate images
    let src = svgMap.get(type);
    if (Array.isArray(src)) src = src[altImageIdx ?? 0];

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
        const rot = (position?.angle ?? 0) * (Math.PI / 180);

        // Convert to Cartesian coordinates
        x = radius * Math.cos(teta + rot);
        y = radius * Math.sin(teta + rot);

        // Shift the coordinates back
        port.position.x = (x + 1) / 2;
        port.position.y = (y + 1) / 2;
      }
    }, [position]);

    return (
      <Draggable
        handle='.rdc-handle'
        nodeRef={draggableRef}
        defaultPosition={position}
        positionOffset={{ x: 5, y: 5 }}
        onStart={() => setIsGrabbing(true)}
        onStop={() => setIsGrabbing(false)}
        grid={[gridSize, gridSize]}
        {...rest}
      >
        <div className={styles.wrapper} ref={draggableRef}>
          <div ref={selectableRef}>
            <img
              className={cx(
                styles.noDrag,
                'rdc-handle',
                isGrabbing ? styles.grabbing : styles.grab,
              )}
              style={{
                transform: `rotate(${position?.angle ?? 0}deg)`,
                width: size,
                outline: isSelected ? '2px solid #6495ED' : 'none',
              }}
              ref={boundingRef}
              src={imgPath ? imgPath : src}
              alt={type}
            />

            {ports.map((port, i) => {
              return <Port key={i} ref={port.ref} bounds={bounds} {...port} />;
            })}

            <Label gridSize={gridSize} {...label} />
          </div>
        </div>
      </Draggable>
    );
  },
);

ElectricalCore.propTypes = {
  /**
   * The type of the component
   */
  type: PropTypes.string.isRequired,
  /**
   * The position of the component
   */
  position: PropTypes.exact({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
    angle: PropTypes.number,
  }),
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
      id: PropTypes.string,
      type: PropTypes.string,
      position: PropTypes.exact({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
      ref: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any }),
      ]),
    }),
  ),
  /**
   * The size of the component
   */
  size: PropTypes.number,
  /**
   * The size of the grid, i.e., the amount of pixels the drag skips
   */
  gridSize: PropTypes.number,
  /**
   * Index of the alternate images. If `0` then use default image
   */
  altImageIdx: PropTypes.number,
  /**
   * The source path to a custom image to be used by the component
   */
  imgPath: PropTypes.string,
  /**
   * The color of the border when the element is selected
   */
  selectionColor: PropTypes.string,
};

ElectricalCore.defaultArgs = {
  position: { x: 0, y: 0 },
  size: 100,
  gridSize: 10,
  altImageIdx: 0,
  selectionColor: '#6495ED',
};
