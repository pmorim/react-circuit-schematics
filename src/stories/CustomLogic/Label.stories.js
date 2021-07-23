import { Label } from '../../components/Label';

export default {
  title: 'Custom Logic/Label',
  component: Label,
  parameters: {
    docs: {
      description: {
        component:
          'The Label component displays to the user the name, value and unit of the electrical component. It is also able to be dragged around.',
      },
      source: {
        type: 'code',
      },
    },
  },
};

export const ResistorLabel = () => (
  <Label name='R1' value='10' multiplier='k' unit='Ω' />
);

export const ImaginaryValues = () => {
  const data = { name: 'X', unit: 'Ω' };

  return (
    <>
      <Label {...data} value={{ real: 1, imaginary: -2 }} />
      <Label {...data} value={{ modulus: 3, teta: 30 }} />
      {/* ☝ Automatically convert to Cartesian */}

      {/* 👇 Works in polar format as well */}
      <Label {...data} value={{ real: 2, imaginary: 5, format: 'polar' }} />
      <Label {...data} value={{ modulus: 2, teta: 45, format: 'polar' }} />
    </>
  );
};

export const OnlyName = () => <Label name='R1' />;

export const CustomLabelFormat = () => (
  <Label
    name='R1'
    value='10'
    multiplier='k'
    unit='Ω'
    // 👇 This label ignores the given unit
    as={({ name, value, multiplier }) => (
      <>
        <b>
          {name} = {value}
          {multiplier}
        </b>
      </>
    )}
  />
);
