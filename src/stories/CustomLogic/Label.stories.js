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
  <Label name='R1' value='10k' unit='Ω' position={{ x: 20, y: 20 }} />
);
export const OnlyName = () => <Label name='R1' position={{ x: 20, y: 20 }} />;
export const CustomLabel = () => (
  <Label
    name='R1'
    value='10'
    multiplier='k'
    unit='Ω'
    position={{ x: 20, y: 20 }}
    as={({ name, value, unit }) => (
      <>
        <b>
          {name} = {value}
          {multiplier}
        </b>
      </>
    )}
  />
);
