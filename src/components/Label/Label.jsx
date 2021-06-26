import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

import styles from './Label.module.css';

export const Label = ({ as, name, value, unit, defaultPosition, ...rest }) => {
  const nodeRef = useRef();

  // Custom Label
  if (as) return React.createElement(as, { ref: nodeRef, name, value, unit });

  return (
    <Draggable defaultPosition={defaultPosition} nodeRef={nodeRef} {...rest}>
      <div className={styles.label} ref={nodeRef}>
        <div className={styles.editable} contentEditable>
          {name}
        </div>
        {' = '}
        <div className={styles.editable} contentEditable>
          {value}
        </div>
        {' ' + unit}
      </div>
    </Draggable>
  );
};

Label.propTypes = {
  /**
   * A custom label component. Passes the given 'name', 'value' and 'unit' as
   * children.
   */
  as: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
  /**
   * The name of the component.
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
  defaultPosition: PropTypes.exact({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

Label.defaultProps = {
  defaultPosition: { x: 0, y: 0 },
};
