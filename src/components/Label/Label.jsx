import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import cx from 'classnames';

import styles from './Label.module.css';
import { DefaultLabel } from './DefaultLabel';

export const Label = ({ as, position, gridSize, onDragStop, ...rest }) => {
  const draggableRef = useRef();

  return (
    <Draggable
      bounds='.schematic'
      position={position}
      nodeRef={draggableRef}
      grid={[gridSize, gridSize]}
      onStop={onDragStop}
      {...rest}
    >
      <div
        className={cx(styles.wrapper, styles.unselectable)}
        ref={draggableRef}
      >
        {as ? React.createElement(as, rest) : <DefaultLabel {...rest} />}
      </div>
    </Draggable>
  );
};

Label.propTypes = {
  /**
   * A custom label component. Passes all the given props to it
   */
  as: PropTypes.func,
  /**
   * The name of the component
   */
  name: PropTypes.string,
  /**
   * The value of the component
   */
  value: PropTypes.oneOfType([
    // For real numbers
    PropTypes.number,
    PropTypes.string,

    // For imaginary numbers
    PropTypes.shape({
      modulus: PropTypes.number,
      teta: PropTypes.number,
      real: PropTypes.number,
      imaginary: PropTypes.number,
      imUnit: PropTypes.oneOf(['i', 'j']),
      format: PropTypes.oneOf(['cartesian', 'polar']),

      // How many decimal places to use when converting
      decimalPlaces: PropTypes.number,
    }),
  ]),
  /**
   * The multiplier of the value.
   */
  multiplier: PropTypes.oneOf(['p', 'n', 'u', 'm', '', 'k', 'M', 'G']),
  /**
   * The unit of the component
   */
  unit: PropTypes.string,
  /**
   * The default position of the label relative to the component
   */
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  /**
   * The size of the grid, i.e., the amount of pixels the drag skips
   */
  gridSize: PropTypes.number,
  /**
   * The function to execute when the user changes the contents of the label
   */
  onChange: PropTypes.func,
};

Label.defaultProps = {
  position: { x: 0, y: 0 },
  gridSize: 10,
};
