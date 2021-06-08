import { Connection } from '../../components/Connection';
import { Port } from '../../components/Ports';

export default {
  title: 'Advanced/Connection',
  component: Connection,
  parameters: {
    docs: {
      description: {
        component:
          'The Connection component is used to connect ports or nodes.',
      },
    },
  },
};

export const PortConnection = (args) => <Connection {...args} />;
