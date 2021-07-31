import React, { useRef } from 'react';
import { SelectableGroup } from 'react-selectable-fast';
import useDynamicRefs from 'use-dynamic-refs';
import useMouse from '@react-hook/mouse-position';

import PropTypes from 'prop-types';

import { useMouseGrid } from '../../hooks/useMouseGrid';
import { ElectricalCore } from '../ElectricalCore';
import { Connection } from '../Connection';
import { Node } from '../Node';

export const Schematic = ({
  data,
  width,
  height,
  schematic,
  selection,
  gridSize,
  gridColor,
  componentSize,
  children,
  duringSelection,
  onSelectionFinish,
  ...rest
}) => {
  const [getRef, setRef] = useDynamicRefs();

  const canvasRef = useRef();
  const mouse = useMouse(canvasRef);

  return (
    <div
      ref={canvasRef}
      style={{
        width,
        height,
        position: 'relative',
        zIndex: 0,

        // Grid
        padding: gridSize,
        backgroundImage: `radial-gradient(
          circle,
          ${gridColor} 1px,
          transparent 1px
          )`,
        backgroundSize: `${gridSize}px ${gridSize}px`,
      }}
      {...rest}
    >
      <SelectableGroup
        clickClassName='rdc-handle'
        duringSelection={selection.handleSelecting}
        onSelectionFinish={selection.handleSelected}
        enableDeselect
        resetOnStart
        deselectOnEsc
      >
        {children}

        {data.components?.map((comp) => {
          // Pre-build the port refs
          comp.ports.forEach((port) => (port.ref = setRef(port.id)));

          return (
            <ElectricalCore
              key={comp.id}
              gridSize={gridSize}
              size={componentSize}
              {...comp}
            />
          );
        })}

        {data.nodes?.map((node) => (
          <Node key={node.id} ref={setRef(node.id)} {...node} />
        ))}

        {data.connections?.map((conn) => (
          <Connection
            key={conn.id}
            start={getRef(conn.start)}
            end={getRef(conn.end)}
          />
        ))}
      </SelectableGroup>
    </div>
  );
};

Schematic.propTypes = {
  /**
   * The schematic data
   */
  data: PropTypes.any,
  /**
   * The width of the canvas
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The height of the canvas
   */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The size of the grid units, in pixels
   */
  gridSize: PropTypes.number,
  /**
   * The color of the grid dots
   */
  gridColor: PropTypes.string,
  /**
   * The size of the component
   */
  componentSize: PropTypes.number,
};

Schematic.defaultProps = {
  data: {},
  width: '100%',
  height: '100%',
  gridSize: 10,
  gridColor: '#777',
  componentSize: 100,
};
