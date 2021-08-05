import React, { useRef, useState, useEffect, useMemo } from 'react';
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
    id,
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
    handlePortClick,
    onDragStop,
    onLabelDragStop,
    ...rest
  }) => {
    const draggableRef = useRef();

    const boundingRef = useRef();
    const [bounds, setBounds] = useState({ x: 0, y: 0 });
    const [renderCount, setRenderCount] = useState(0);

    const [isGrabbing, setIsGrabbing] = useState(false);

    /**
     * Calculate which SVG to use
     */
    const src = useMemo(() => {
      const src = svgMap.get(type);
      return Array.isArray(src) ? src[altImageIdx ?? 0] : src;
    }, [altImageIdx]);

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

    return (
      <Draggable
        handle='.rcs-handle'
        nodeRef={draggableRef}
        position={position}
        positionOffset={{ x: 5, y: 5 }}
        onStart={() => setIsGrabbing(true)}
        onStop={(e, position) => {
          setIsGrabbing(false);
          onDragStop(id, position);
        }}
        grid={[gridSize, gridSize]}
        {...rest}
      >
        <div className={styles.wrapper} ref={draggableRef}>
          <div ref={selectableRef}>
            <img
              className={cx(
                styles.noDrag,
                'rcs-handle',
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
              return (
                <Port
                  key={i}
                  ref={port.ref}
                  bounds={bounds}
                  onClick={() => handlePortClick?.(port.id)}
                  rotation={position?.angle}
                  {...port}
                />
              );
            })}

            <Label
              gridSize={gridSize}
              onDragStop={onLabelDragStop}
              {...label}
            />
          </div>
        </div>
      </Draggable>
    );
  },
);

ElectricalCore.propTypes = {
  /**
   * The unique id of the component
   */
  id: PropTypes.string,
  /**
   * The type of the component
   */
  type: PropTypes.string.isRequired,
  /**
   * The position of the component
   */
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
    angle: PropTypes.number,
  }),
  /**
   * The label of the component
   */
  label: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
    unit: PropTypes.string,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }),
  /**
   * An array of the connection ports
   */
  ports: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string,
      position: PropTypes.shape({
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

ElectricalCore.defaultProps = {
  position: { x: 0, y: 0 },
  size: 100,
  gridSize: 10,
  altImageIdx: 0,
  selectionColor: '#6495ED',
};
