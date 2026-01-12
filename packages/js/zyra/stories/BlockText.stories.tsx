// import BlockText from '../src/components/BlockText';
// import type { Meta, StoryObj } from '@storybook/react-vite';

// const meta: Meta<typeof BlockText> = {
//     title: 'Zyra/Components/BlockText',
//     component: BlockText,
//     tags: ['autodocs'],
// };

// export default meta;

// type Story = StoryObj<typeof BlockText>;

// export const TestBlockText: Story = {
//     args: {
//         blockTextClass: 'settings-metabox-description-code',
//         value: 'This is a demo block of text.',
//     },
//     render: (args) => {
//         return <BlockText {...args} />;
//     },
// };



import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import BlockText from '../src/components/BlockText';

/**
 * Inline styles for Storybook ONLY
 * (No external CSS files used)
 */
const StoryStyles = () => (
    <style>
        {`
        .settings-metabox-description-code {
            padding: 14px 16px;
            border-radius: 6px;
            font-family: Inter, system-ui, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            margin: 12px 0;
        }

        .metabox-note-wrapper {
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }

        .metabox-note-wrapper i {
            font-size: 16px;
            margin-top: 2px;
        }

        .metabox-note-wrapper .details {
            flex: 1;
        }

        .metabox-note-wrapper .title {
            font-weight: 600;
            margin-bottom: 4px;
        }

        /* Variants */
        .info {
            background: #eef5ff;
            border-left: 4px solid #3b82f6;
            color: #1e3a8a;
        }

        .warning {
            background: #fff7ed;
            border-left: 4px solid #f97316;
            color: #7c2d12;
        }

        .error {
            background: #fef2f2;
            border-left: 4px solid #ef4444;
            color: #7f1d1d;
        }

        .success {
            background: #ecfdf5;
            border-left: 4px solid #10b981;
            color: #065f46;
        }

        .helper {
            background: #f8fafc;
            border-left: 4px solid #64748b;
            color: #334155;
        }

        .security {
            background: #fdf4ff;
            border-left: 4px solid #a855f7;
            color: #581c87;
        }

        .settings-metabox-description-code a {
            color: inherit;
            text-decoration: underline;
        }
        `}
    </style>
);

const meta: Meta<typeof BlockText> = {
    title: 'Zyra/Components/BlockText',
    component: BlockText,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <>
                <StoryStyles />
                <Story />
            </>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof BlockText>;

export const TestBlockText: Story = {
    args: {
        blockTextClass: 'settings-metabox-description-code',
        value: 'This is a demo block of text.',
    },
    render: (args) => {
        return <BlockText {...args} />;
    },
};

export const InfoDefault: Story = {
    args: {
        blockTextClass: 'settings-metabox-description-code info',
        title: 'Information',
        value: 'This is a basic informational message for users.',
    },
};

export const Warning: Story = {
    args: {
        blockTextClass: 'settings-metabox-description-code warning',
        title: 'Warning',
        value: 'Changing this setting may affect existing data.',
    },
};

export const Error: Story = {
    args: {
        blockTextClass: 'settings-metabox-description-code error',
        title: 'Error',
        value: 'An unexpected error occurred. Please review your configuration.',
    },
};

export const Success: Story = {
    args: {
        blockTextClass: 'settings-metabox-description-code success',
        title: 'Success',
        value: 'Your settings have been saved successfully.',
    },
};

export const WithoutTitle: Story = {
    args: {
        blockTextClass: 'settings-metabox-description-code info',
        value: 'This block intentionally does not include a title.',
    },
};

export const LongContent: Story = {
    args: {
        blockTextClass: 'settings-metabox-description-code info',
        title: 'Detailed Explanation',
        value: `
            This is a long block of text designed to test how the component
            behaves with extensive content. It should wrap properly, maintain
            spacing, and not overflow or break the layout across screen sizes.
        `,
    },
};

export const RichHTML: Story = {
    args: {
        blockTextClass: 'settings-metabox-description-code info',
        title: 'Learn More',
        value: `
            Please refer to the
            <a href="https://example.com" target="_blank">documentation</a>
            for additional information.<br />
            <strong>Note:</strong> This action can be reverted later.
        `,
    },
};

export const SettingsHelper: Story = {
    args: {
        blockTextClass: 'settings-metabox-description-code helper',
        title: 'How this works',
        value: 'This option controls how data is synced across modules.',
    },
};

export const SecurityNotice: Story = {
    args: {
        blockTextClass: 'settings-metabox-description-code security',
        title: 'Security Notice',
        value: 'Ensure proper permissions are configured to avoid vulnerabilities.',
    },
};


