import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

import styles from './Label.module.css';

const setContentEditable = (ref, val) => {
  ref.current.contentEditable = val;
};

const DefaultLabel = (props) => {
  const nameRef = useRef();
  const valueRef = useRef();

  return (
    <b>
      <div
        ref={nameRef}
        className={styles.editable}
        onDoubleClick={() => setContentEditable(nameRef, true)}
        onInput={(e) => props.onNameChange(e.currentTarget.textContent)}
        onBlur={() => setContentEditable(nameRef, false)}
        suppressContentEditableWarning
      >
        {props.name}
      </div>
      {' = '}
      <div
        ref={valueRef}
        className={styles.editable}
        onDoubleClick={() => setContentEditable(valueRef, true)}
        onInput={(e) => props.onValueChange(e.currentTarget.textContent)}
        onBlur={() => setContentEditable(valueRef, false)}
        suppressContentEditableWarning
      >
        {props.value}
      </div>
      {' ' + props.unit}
    </b>
  );
};

export const Label = ({ as, position, gridSize, ...rest }) => {
  const draggableRef = useRef();

  return (
    <Draggable
      defaultPosition={position}
      nodeRef={draggableRef}
      grid={[gridSize, gridSize]}
      {...rest}
    >
      <div className={styles.label} ref={draggableRef}>
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
  /**
   * The size of the grid, i.e., the amount of pixels the drag skips
   */
  gridSize: PropTypes.number,
};

Label.defaultProps = {
  position: { x: 0, y: 0 },
  gridSize: 10,
};
