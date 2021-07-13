import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

import styles from './Label.module.css';

const DefaultLabel = (props) => (
  <b>
    <div
      className={styles.editable}
      onInput={(e) => props.onNameChange(e.currentTarget.textContent)}
      suppressContentEditableWarning
      contentEditable
    >
      {props.name}
    </div>
    {' = '}
    <div
      className={styles.editable}
      onInput={(e) => props.onValueChange(e.currentTarget.textContent)}
      suppressContentEditableWarning
      contentEditable
    >
      {props.value}
    </div>
    {' ' + props.unit}
  </b>
);

export const Label = ({ as, position, ...rest }) => {
  const nodeRef = useRef();

  return (
    <Draggable defaultPosition={position} nodeRef={nodeRef} {...rest}>
      <div className={styles.label} ref={nodeRef}>
        {as ? React.createElement(as, rest) : <DefaultLabel {...rest} />}
      </div>
    </Draggable>
  );
};

Label.propTypes = {
  /**
   * A custom label component. Passes the given 'name', 'value' and 'unit' as
   * children.
   */
  as: PropTypes.func,
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
  position: PropTypes.exact({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

Label.defaultProps = {
  position: { x: 0, y: 0 },
};
