import React, { useRef, useCallback } from 'react';
import styles from './Label.module.css';

export const Editable = ({ onInput, children, ...rest }) => {
  const editRef = useRef();

  const setContentEditable = useCallback(
    (value) => {
      editRef.current.contentEditable = value;
    },
    [editRef],
  );

  const handleInput = useCallback(
    (e) => onInput(e.currentTarget.textContent),
    [onInput],
  );

  return (
    <span
      ref={editRef}
      className={styles.editable}
      onDoubleClick={() => setContentEditable(true)}
      onBlur={() => setContentEditable(false)}
      onInput={handleInput}
      suppressContentEditableWarning
      {...rest}
    >
      {children}
    </span>
  );
};
