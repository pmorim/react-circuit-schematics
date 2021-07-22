import React from 'react';
import { Editable } from './Editable';

export const DefaultLabel = ({
  name,
  value,
  multiplier,
  unit,
  onNameChange,
  onValueChange,
  onMultiplierChange,
  ...rest
}) => {
  return (
    <b>
      {name && (
        <Editable onInput={onNameChange} {...rest}>
          {name}
        </Editable>
      )}
      {value && (
        <>
          {' = '}
          <Editable onInput={onValueChange} {...rest}>
            {value instanceof Object ? (
              <>
                {value.re}
                {value.im >= 0 ? ' + ' : ' - '}
                {Math.abs(value.im)}
                {value.imUnit ?? 'j'}
              </>
            ) : (
              value
            )}
          </Editable>
        </>
      )}{' '}
      {multiplier && (
        <Editable onInput={onMultiplierChange} {...rest}>
          {multiplier}
        </Editable>
      )}
      {unit}
    </b>
  );
};
