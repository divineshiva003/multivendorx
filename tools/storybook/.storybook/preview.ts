// import 'packages/js/zyra/src/styles/common.scss';

import type { Preview } from '@storybook/react-vite';


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;