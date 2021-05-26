import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

import cx from 'classnames';
import styles from './ComponentCore.module.css';

import { Ports, Port } from '../Ports';
import { Label } from '../Label';

export const ComponentCore = ({ Symbol, label, ports, ...rest }) => {
  return (
    <Draggable handle='.handle' {...rest}>
      <div>
        <img
          className={cx(styles.noDrag, 'handle')}
          src={Symbol}
          alt={Symbol}
        />

        <Ports>
          {ports.map((port) => (
            <Port />
          ))}
        </Ports>

        <Label>{label}</Label>
      </div>
    </Draggable>
  );
};

ComponentCore.propTypes = {
  /**
   * Path to the SVG file to be used as the electrical symbol
   */
  Symbol: PropTypes.string,
  /**
   * The label of the component
   */
  label: PropTypes.string,
};
