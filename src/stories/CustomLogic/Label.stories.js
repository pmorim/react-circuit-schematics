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

export const ResistorLabel = () => <Label name='R1' value='10k' unit='Ω' />;
export const OnlyName = () => <Label name='R1' />;
export const CustomLabel = () => (
  <Label
    name='R1'
    value='10k'
    unit='Ω'
    as={({ name, value, unit }) => (
      <>
        <div>Hi, I'm a custom label</div>
        <div>
          My name is <b>{name}</b> and I'm worth{' '}
          <b>
            {value} {unit}
          </b>
        </div>
      </>
    )}
  />
);
