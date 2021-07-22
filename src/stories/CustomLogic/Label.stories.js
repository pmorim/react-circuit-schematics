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
      <Label {...data} value='1 + 2j' imaginary />
      <Label {...data} value='3 - 7i' imaginary />
      <Label {...data} value='2 + 5j' format='polar' imaginary />
      <Label {...data} value='4 + 6j' format='exp' imaginary />
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
