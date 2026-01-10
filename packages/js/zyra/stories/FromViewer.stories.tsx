import FormViewer from '../src/components/FormViewer';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof FormViewer> = {
    title: 'Zyra/Components/FormViewer',
    component: FormViewer,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FormViewer>;

export const TestFormViewer: Story = {
    args: {
        formFields: {
            formfieldlist: [
                {
                    id:'username',
                    type: 'text',
                    name: 'username',
                    label: 'Username',
                    placeholder: 'Enter your username',
                    required: true,
                    charlimit: 50,
                },
                {
                    id:'profile_picture',
                    type: 'attachment',
                    name: 'profile_picture',
                    label: 'Profile Picture',
                    placeholder: 'Upload your profile picture',
                    required: false,
                },
                {
                    id:'bio',
                    type: 'textarea',
                    name: 'bio',
                    label: 'Bio',
                    row: 4,
                    col: 50,
                },
                {
                    id:'country',
                    type: 'select',
                    name: 'country',
                    label: 'Country',
                    options: [
                        {
                            value: 'us',
                            label: 'United States',
                            isDefault: true,
                        },
                        { value: 'ca', label: 'Canada' },
                        { value: 'uk', label: 'United Kingdom' },
                    ],
                },
            ],
            buttonsetting: {
                text: 'Submit',
                style: 'primary',
            },
        },
        onSubmit: (data) => {
            console.log('Form submitted:', data);
        },
    },
    render: (args) => {
        return <FormViewer {...args} />;
    },
};
