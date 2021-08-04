import React, { useRef, useCallback } from 'react';
import useDynamicRefs from 'use-dynamic-refs';
import { v4 as uuidv4 } from 'uuid';
import { SelectableGroup } from 'react-selectable-fast';

import PropTypes from 'prop-types';

import { useMouseGrid } from '../../hooks/useMouseGrid';
import { ElectricalCore } from '../ElectricalCore';
import { Connection } from '../Connection';
import { Node } from '../Node';
import { ConnectionPoint } from '../ConnectionPoint';

export const Schematic = ({
  schematic,
  history,
  width,
  height,
  gridSize,
  gridColor,
  children,
  ...rest
}) => {
  const [getRef, setRef] = useDynamicRefs();

  const canvasRef = useRef();
  const mousePosition = useMouseGrid(canvasRef, gridSize);

  /**
   * Update the coordinates when the dragging ends
   *
   * Uses the callback version of the `schematic.editById()` because it must
   * not override the rotation of the element.
   *
   * @param {String} id The id of the element that is dragged.
   * @param {Object} position The new coordinates of the element.
   */
  const handleDragStop = useCallback(
    (id, { x, y }) => {
      schematic.editById(id, (elem) => {
        elem.position = { ...elem.position, x, y };
        return elem;
      });
    },
    [schematic?.editById],
  );

  return (
    <div
      ref={canvasRef}
      style={{
        width,
        height,
        position: 'relative',
        zIndex: 0,

        // Grid
        //padding: gridSize,
        backgroundImage: `radial-gradient(
          circle,
          ${gridColor} 1px,
          transparent 1px
          )`,
        backgroundSize: `${gridSize}px ${gridSize}px`,
      }}
      {...rest}
    >
      {/*
      <SelectableGroup
        clickClassName='rdc-handle'
        duringSelection={selection.handleSelecting}
        onSelectionFinish={selection.handleSelected}
        enableDeselect
        resetOnStart
        deselectOnEsc
        >
      */}
      {children}

      <ConnectionPoint ref={setRef('mouse')} position={mousePosition} />

      {schematic?.data?.components?.map((comp) => {
        comp.ports.forEach((port) => (port.ref = setRef(port.id)));
        return (
          <ElectricalCore
            key={comp.id}
            gridSize={gridSize}
            onDragStop={handleDragStop}
            {...comp}
          />
        );
      })}

      {schematic?.data?.nodes?.map((node) => (
        <Node
          key={node.id}
          ref={setRef(node.id)}
          gridSize={gridSize}
          {...node}
        />
      ))}

      {schematic?.data?.connections?.map(
        (conn) =>
          conn.start &&
          conn.end && (
            <Connection
              key={conn.id}
              start={getRef(conn.start)}
              end={getRef(conn.end)}
            />
          ),
      )}
      {/*
        </SelectableGroup>
      */}
    </div>
  );
};

Schematic.propTypes = {
  /**
   * The schematic data
   */
  schematic: PropTypes.object,
  /**
   * The history data
   */
  history: PropTypes.object,
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
};

Schematic.defaultProps = {
  schematic: {},
  width: '100%',
  height: '100%',
  gridSize: 10,
  gridColor: '#777',
};
