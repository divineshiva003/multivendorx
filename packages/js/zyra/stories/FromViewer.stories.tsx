import React from 'react';
import FormViewer from '../src/components/FormViewer';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof FormViewer> = {
    title: 'Zyra/Components/FormViewer',
    component: FormViewer,
    parameters: {
        controls: { expanded: false },
    },
};

export default meta;

type Story = StoryObj<typeof FormViewer>;

const countryList = [
    { label: 'United States', value: 'US' },
    { label: 'India', value: 'IN' },
];

const stateList = {
    US: {
        CA: 'California',
        NY: 'New York',
    },
    IN: {
        WB: 'West Bengal',
        MH: 'Maharashtra',
    },
};

export const AllFields: Story = {
    args: {
        formFields: {
            formfieldlist: [
                {
                    id: 'username',
                    type: 'text',
                    name: 'username',
                    label: 'Username',
                },
                {
                    id: 'email',
                    type: 'email',
                    name: 'email',
                    label: 'Email',
                },
                {
                    id: 'bio',
                    type: 'textarea',
                    name: 'bio',
                    label: 'Bio',
                    row: 4,
                },
                {
                    id: 'designation',
                    type: 'multiselect',
                    name: 'designation',
                    label: 'Designation',
                    options: [
                        { label: 'Admin', value: 'admin' },
                        { label: 'User', value: 'user' },
                    ],
                },
                {
                    id: 'profile',
                    type: 'attachment',
                    name: 'profile',
                    label: 'Profile Picture(select a file)',
                },
            ],
        },
        onSubmit: () => {
            console.log('Form submitted');
        },
    },
};

export const RequiredFields: Story = {
    args: {
        formFields: {
            formfieldlist: [
                {
                    id: 'name',
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    required: true,
                },
                {
                    id: 'email',
                    type: 'email',
                    name: 'email',
                    label: 'Email',
                    required: true,
                },
            ],
        },
        onSubmit: () => {},
    },
};

export const AddressDynamicCountryState: Story = {
    args: {
        countryList,
        stateList,
        formFields: {
            formfieldlist: [
                {
                    id: 'address',
                    type: 'address',
                    label: 'Address',
                    fields: [
                        { id: 'country', key: 'country', label: 'Country' },
                        { id: 'state', key: 'state', label: 'State' },
                    ],
                },
            ],
        },
        onSubmit: () => {},
    },
};

export const AttachmentUploaded: Story = {
    args: {
        formFields: {
            formfieldlist: [
                {
                    id: 'profile',
                    type: 'attachment',
                    name: 'profile',
                    label: 'Profile Picture(select a file)',
                },
            ],
        },
        onSubmit: () => {},
    },
};

export const LongContent: Story = {
    args: {
        formFields: {
            formfieldlist: [
                {
                    id: 'longlabel',
                    type: 'text',
                    name: 'longlabel',
                    label:
                        'This is an extremely long label used to test overflow behavior in constrained layouts',
                },
                {
                    id: 'longtextarea',
                    type: 'textarea',
                    name: 'longtextarea',
                    label: 'Long textarea',
                    row: 6,
                },
            ],
        },
        onSubmit: () => {},
    },
};