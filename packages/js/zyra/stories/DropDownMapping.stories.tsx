// import DropDownMapping from '../src/components/DropDownMapping';
// import type { Meta, StoryObj } from '@storybook/react-vite';

// const meta: Meta<typeof DropDownMapping> = {
//     title: 'Zyra/Components/DropDownMapping',
//     component: DropDownMapping,
//     tags: ['autodocs'],
// };

// export default meta;

// type Story = StoryObj<typeof DropDownMapping>;

// export const TestSyncMap: Story = {
//     args: {
//         description: 'Map fields between systems to keep data in sync.',
//         proSetting: true,
//         proSettingChanged: () => false,
//         value: [
//             ['email', 'user_email'],
//             ['name', 'full_name'],
//         ] as [string, string][],
//         onChange: (newValue) => {
//             console.log('Sync map changed:', newValue);
//         },
//         syncFieldsMap: {
//             wordpress: {
//                 heading: 'WordPress',
//                 fields: {
//                     firstname: 'First name',
//                     lastname: 'Last name',
//                     username: 'User name',
//                     password: 'Password',
//                 },
//             },
//             moodle: {
//                 heading: 'Moodle',
//                 fields: {
//                     firstname: 'First name',
//                     lastname: 'Last name',
//                     username: 'User name',
//                     password: 'Password',
//                 },
//             },
//         },
//     },
//     render: (args) => {
//         return <DropDownMapping {...args} />;
//     },
// };


import DropDownMapping from '../src/components/DropDownMapping';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof DropDownMapping> = {
    title: 'Zyra/Components/DropDownMapping',
    component: DropDownMapping,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DropDownMapping>;


export const TestSyncMap: Story = {
    args: {
        description: 'Map fields between systems to keep data in sync.',
        proSetting: true,
        proSettingChanged: () => false,
        value: [
            ['email', 'user_email'],
            ['name', 'full_name'],
        ] as [string, string][],
        onChange: (newValue) => {
            console.log('Sync map changed:', newValue);
        },
        syncFieldsMap: {
            wordpress: {
                heading: 'WordPress',
                fields: {
                    firstname: 'First name',
                    lastname: 'Last name',
                    username: 'User name',
                    password: 'Password',
                },
            },
            moodle: {
                heading: 'Moodle',
                fields: {
                    firstname: 'First name',
                    lastname: 'Last name',
                    username: 'User name',
                    password: 'Password',
                },
            },
        },
    },
    render: (args) => {
        return <DropDownMapping {...args} />;
    },
};

export const ReadOnlyMapping: Story = {
    args: {
        ...TestSyncMap.args,
        description: 'Mappings are locked due to Pro restrictions.',
        proSettingChanged: () => true, // 🔒 disables interactions
        value: [
            ['email', 'user_email'],
            ['username', 'username'],
        ],
        onChange: (v) => console.log('Read-only map:', v),
        syncFieldsMap: {
            wordpress: {
                heading: 'WordPress',
                fields: {
                    email: 'Email (Required)',
                    username: 'Username (Required)',
                },
            },
            moodle: {
                heading: 'Moodle',
                fields: {
                    user_email: 'Password (Required)',
                    username: 'Full name (Required)',
                },
            },
        },
    },
};


export const EmptyState: Story = {
    args: {
        description: 'Start by adding your first field mapping.',
        proSettingChanged: () => false,
        value: [],
        onChange: (v) => console.log(v),
        syncFieldsMap: {
            wordpress: {
                heading: 'WordPress',
                fields: {
                    email: 'Email',
                    username: 'Username',
                    password: 'Password',
                    fullname: 'Full Name',

                },
            },
            moodle: {
                heading: 'Moodle',
                fields: {
                    email: 'Email',
                    username: 'Username',
                    password: 'Password',
                    fullname: 'Full Name',
                },
            },
        },
    },
};

export const LargeFieldSet: Story = {
    args: {
        description: 'Large number of fields (enterprise scale).',
        proSettingChanged: () => false,
        value: [
            ['field_1', 'field_1'],
            ['field_2', 'field_2'],
            ['field_3', 'field_3'],
        ],
        onChange: (v) => console.log(v),
        syncFieldsMap: {
            wordpress: {
                heading: 'WordPress',
                fields: Object.fromEntries(
                    Array.from({ length: 20 }).map((_, i) => [
                        `field_${i + 1}`,
                        `Field ${i + 1}`,
                    ])
                ),
            },
            moodle: {
                heading: 'Moodle',
                fields: Object.fromEntries(
                    Array.from({ length: 20 }).map((_, i) => [
                        `field_${i + 1}`,
                        `Field ${i + 1}`,
                    ])
                ),
            },
        },
    },
};



export const InvalidMapping: Story = {
    args: {
        description: 'Invalid or conflicting field mappings.',
        proSettingChanged: () => false,
        value: [
            ['email', 'email'], // ❌ conflicting example
        ],
        onChange: (v) => console.log(v),
        syncFieldsMap: {
            wordpress: {
                heading: 'WordPress',
                fields: {
                    email: 'Email',
                    username: 'Username',
                },
            },
            moodle: {
                heading: 'Moodle',
                fields: {
                    email: 'Email',
                    username: 'Username',
                },
            },
        },
    },
};


export const RecommendedMappings: Story = {
    args: {
        description: 'Recommended mappings are pre-configured.',
        proSettingChanged: () => false,
        value: [
            ['email', 'email'],
            ['username', 'username'],
        ],
        onChange: (v) => console.log(v),
        syncFieldsMap: {
            wordpress: {
                heading: 'WordPress',
                fields: {
                    email: 'Email (Recommended)',
                    username: 'Username (Recommended)',
                    name: 'Name',
                    fullname: 'Full Name',
                    password: 'Password',
                },
            },
            moodle: {
                heading: 'Moodle',
                fields: {
                    email: 'Email',
                    username: 'Username',
                    fullname: 'Full Name',
                    password: 'Password',
                },
            },
        },
    },
};
