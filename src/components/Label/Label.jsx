import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

import styles from './Label.module.css';

export const Label = ({ name, value, unit, position, ...rest }) => {
  const nodeRef = useRef();

  return (
    <Draggable defaultPosition={position} nodeRef={nodeRef} {...rest}>
      <div className={styles.label} ref={nodeRef}>
        {`${name} = ${value} ${unit}`}
      </div>
    </Draggable>
  );
};

Label.propTypes = {
  /**
   * The name of the component
   */
  name: PropTypes.string,
  /**
   * The value of the component
   */
  value: PropTypes.string,
  /**
   * The unit of the component
   */
  unit: PropTypes.string,
  /**
   * The position of the label relative to the component
   */
  position: PropTypes.exact({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

Label.defaultProps = {
  position: { x: 0, y: 0 },
};
