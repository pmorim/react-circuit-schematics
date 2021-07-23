import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

import { DefaultLabel } from './DefaultLabel';

export const Label = ({ as, position, gridSize, ...rest }) => {
  const draggableRef = useRef();

  return (
    <Draggable
      defaultPosition={position}
      nodeRef={draggableRef}
      grid={[gridSize, gridSize]}
      {...rest}
    >
      <div ref={draggableRef}>
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
   * The function to execute when the use changes the name of the component.
   * Use this to update the state of the component's name.
   */
  onNameChange: PropTypes.func,
  /**
   * The function to execute when the use changes the value of the component.
   * Use this to update the state of the component's value.
   */
  onValueChange: PropTypes.func,
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
};

Label.defaultProps = {
  position: { x: 0, y: 0 },
  gridSize: 10,
};
