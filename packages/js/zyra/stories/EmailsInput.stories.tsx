// EmailsInput.stories.tsx
import React, { useState } from 'react';
import EmailsInput, { EmailsInputProps } from '../src/components/EmailsInput';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof EmailsInput> = {
    title: 'Zyra/Components/EmailsInput',
    component: EmailsInput,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof EmailsInput>;

export const Default: Story = {
    args: {
        mode: 'multiple',
        placeholder: 'Enter emails...',
        enablePrimary: true,
    },
    render: (args) => {
        const [emails, setEmails] = useState<string[]>([]);
        const [primary, setPrimary] = useState<string | null>(null);

        return (
            <div style={{ width: '400px' }}>
                <EmailsInput
                    {...args}
                    value={emails}
                    primary={primary}
                    onChange={(updated, newPrimary) => {
                        console.log('Emails:', updated, 'Primary:', newPrimary);
                        setEmails(updated);
                        setPrimary(newPrimary);
                    }}
                />
            </div>
        );
    },
};

export const SingleMode: Story = {
    args: {
        mode: 'single',
        placeholder: 'Enter a single email',
    },
    render: (args) => {
        const [emails, setEmails] = useState<string[]>([]);
        return (
            <EmailsInput
                {...args}
                value={emails}
                onChange={(updated) => {
                    console.log('Single mode email:', updated);
                    setEmails(updated);
                }}
            />
        );
    },
};

export const WithMaxLimit: Story = {
    args: {
        mode: 'multiple',
        max: 3,
        placeholder: 'Add up to 3 emails',
    },
    render: (args) => {
        const [emails, setEmails] = useState<string[]>([]);
        return (
            <EmailsInput
                {...args}
                value={emails}
                onChange={(updated) => {
                    console.log('Emails with max limit:', updated);
                    setEmails(updated);
                }}
            />
        );
    },
};

export const Disabled: Story = {
    args: {
        mode: 'multiple',
        placeholder: 'Emails disabled',
        enablePrimary: true,
    },
    render: (args) => {
        const [emails] = useState<string[]>([
            'admin@company.com',
            'support@company.com',
        ]);

        return (
            <div
                style={{
                    width: '420px',
                    pointerEvents: 'none',
                    opacity: 0.55,
                }}
            >
                <EmailsInput
                    {...args}
                    value={emails}
                    primary="admin@company.com"
                    onChange={() => {}}
                />
            </div>
        );
    },
};

export const ReadOnly: Story = {
    args: {
        mode: 'multiple',
        placeholder: 'View only emails',
        enablePrimary: true,
    },
    render: (args) => {
        const [emails] = useState<string[]>([
            'owner@product.io',
            'billing@product.io',
        ]);

        return (
            <div
                style={{
                    width: '420px',
                    cursor: 'default',
                }}
                onKeyDown={(e) => e.preventDefault()}
            >
                <EmailsInput
                    {...args}
                    value={emails}
                    primary="owner@product.io"
                    onChange={() => {}}
                />
                <div
                    style={{
                        fontSize: '12px',
                        color: '#777',
                        marginTop: '6px',
                    }}
                >
                    Read-only mode
                </div>
            </div>
        );
    },
};

export const Prefilled: Story = {
    args: {
        mode: 'multiple',
        enablePrimary: true,
    },
    render: (args) => {
        const [emails, setEmails] = useState<string[]>([
            'admin@site.com',
            'support@site.com',
            'alerts@site.com',
        ]);
        const [primary, setPrimary] = useState<string | null>(
            'admin@site.com'
        );

        return (
            <div style={{ width: '420px' }}>
                <EmailsInput
                    {...args}
                    value={emails}
                    primary={primary}
                    onChange={(updated, newPrimary) => {
                        setEmails(updated);
                        setPrimary(newPrimary);
                    }}
                />
            </div>
        );
    },
};

export const LongEmailOverflow: Story = {
    args: {
        mode: 'multiple',
        enablePrimary: true,
    },
    render: (args) => {
        const [emails, setEmails] = useState<string[]>([
            'averyveryverylongemailaddresswithmultiplesegments.and.labels@subdomain.extremelylongdomainnameexamplecorporation.com',
        ]);
        const [primary, setPrimary] = useState<string | null>(
            'averyveryverylongemailaddresswithmultiplesegments.and.labels@subdomain.extremelylongdomainnameexamplecorporation.com'
        );

        return (
            <div
                style={{
                    width: '360px',
                    border: '1px dashed #ddd',
                    padding: '6px',
                }}
            >
                <EmailsInput
                    {...args}
                    value={emails}
                    primary={primary}
                    onChange={(updated, newPrimary) => {
                        setEmails(updated);
                        setPrimary(newPrimary);
                    }}
                />
            </div>
        );
    },
};

