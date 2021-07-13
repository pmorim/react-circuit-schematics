import React, { useRef } from 'react';
import useDynamicRefs from 'use-dynamic-refs';
import useMouse from '@react-hook/mouse-position';

import PropTypes from 'prop-types';

import { ElectricalCore } from '../ElectricalCore';
import { Connection } from '../Connection';
import { Node } from '../Node';

export const Schematic = ({
  data,
  width,
  height,
  gridSize,
  gridColor,
  componentSize,
  children,
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

        // Grid shader
        backgroundImage: `radial-gradient(
          circle,
          ${gridColor} 1px,
          transparent 1px
        )`,
        backgroundSize: `${gridSize}px ${gridSize}px`,
      }}
      {...rest}
    >
      {children}

      {data.components?.map((comp) => {
        // Pre-build the port refs
        comp.ports.forEach((port) => (port.ref = setRef(port.id)));

        return (
          <ElectricalCore
            key={comp.id}
            grid={[gridSize, gridSize]}
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
  width: PropTypes.number,
  /**
   * The height of the canvas
   */
  height: PropTypes.number,
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
  width: 800,
  height: 500,
  gridSize: 10,
  gridColor: '#777',
  componentSize: 100,
};
