import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

import cx from 'classnames';
import styles from './ElectricalCore.module.css';

import { Ports, Port } from '../Ports';
import { Label } from '../Label';

export const ElectricalCore = ({ symbol, type, label, ports, ...rest }) => {
  const nodeRef = useRef();

  return (
    // The wrapper inline-block div forces <Draggable /> to fit it's content
    <div style={{ display: 'inline-block' }}>
      <Draggable handle='.rdc-handle' nodeRef={nodeRef} {...rest}>
        <div ref={nodeRef}>
          <img
            className={cx(styles.noDrag, 'rdc-handle')}
            src={symbol}
            alt={symbol}
          />

          <Ports>
            {ports.map((port, i) => (
              <Port
                key={i}
                radius={port.radius}
                position={port.position}
                bounds={{ x: 190, y: 190 }} // TODO: Get image size automatically
              />
            ))}
          </Ports>

          <Label
            name={label.name}
            value={label.value}
            unit={label.unit}
            position={label.position}
          />
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
   * A list of the connection ports
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
