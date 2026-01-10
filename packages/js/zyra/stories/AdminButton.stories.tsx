import type { Meta, StoryObj } from '@storybook/react-vite';
import AdminButton from '../src/components/UI/AdminButton';

const meta: Meta<typeof AdminButton> = {
  title: 'Zyra/Components/UI/AdminButton',
  component: AdminButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    wrapperClass: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof AdminButton>;

/* -------------------- Stories -------------------- */

export const SingleButton: Story = {
  args: {
    buttons: {
      text: 'Save',
      icon: 'save',
      onClick: () => alert('Save clicked'),
    },
    wrapperClass: 'center',
  },
};

export const MultipleButtons: Story = {
  args: {
    buttons: [
      {
        text: 'Edit',
        icon: 'edit',
        className: 'primary',
        onClick: () => alert('Edit clicked'),
      },
      {
        text: 'Delete',
        icon: 'delete',
        className: 'danger',
        onClick: () => alert('Delete clicked'),
      },
    ],
    wrapperClass: 'center',
  },
};

export const LeftAligned: Story = {
  args: {
    buttons: {
      text: 'Back',
      icon: 'arrow-left',
      onClick: () => alert('Back clicked'),
    },
    wrapperClass: 'left',
  },
};

export const RightAligned: Story = {
  args: {
    buttons: {
      text: 'Next',
      icon: 'arrow-right',
      onClick: () => alert('Next clicked'),
    },
    wrapperClass: 'right',
  },
};

export const NoIcon: Story = {
  args: {
    buttons: {
      text: 'Submit',
      onClick: () => alert('Submit clicked'),
    },
    wrapperClass: 'center',
  },
};
