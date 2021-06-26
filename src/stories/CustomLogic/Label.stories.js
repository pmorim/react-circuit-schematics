import { Label } from '../../components/Label';

export default {
  title: 'Custom Logic/Label',
  component: Label,
  argTypes: {
    as: { control: { type: null } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The Label component displays to the user the name, value and unit of the electrical component. It is also able to be dragged around.',
      },
    },
  },
};

const Template = (args) => <Label {...args} />;

export const ResistorLabel = Template.bind({});
ResistorLabel.args = {
  name: 'R1',
  value: '10k',
  unit: 'Ω',
};

export const CustomLabel = Template.bind({});
CustomLabel.args = {
  name: 'R1',
  value: '10k',
  unit: 'Ω',
  as: ({ name, value, unit }) => (
    <>
      <div>Hi, I'm a custom label</div>
      <div>
        My name is <b>{name}</b> and I'm worth{' '}
        <b>
          {value} {unit}
        </b>
      </div>
    </>
  ),
};
