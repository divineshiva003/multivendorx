import { useState } from 'react';
import ButtonCustomizer, { ButtonSettings } from '../src/components/ButtonCustomiser';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '../src/global.scss';

const meta: Meta<typeof ButtonCustomizer> = {
    title: 'Zyra/Components/ButtonCustomizer',
    component: ButtonCustomizer,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Interactive button customizer component that allows users to customize button appearance including colors, borders, text styles, and sizes.',
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof ButtonCustomizer>;

export const Default: Story = {
    args: {
        onChange: (key, value, isRestoreDefaults) => {
            console.log('Changed:', key, value, 'Restore:', isRestoreDefaults);
        },
        setting: {
            button_background_color: '#5007aa',
            button_text_color: '#ffffff',
            button_background_color_onhover: '#7030c0',
            button_text_color_onhover: '#ffffff',
            button_border_color: '#5007aa',
            button_border_size: 1,
            button_border_radious: 4,
            button_font_size: 14,
            button_padding: 10,
        },
        text: 'Customize Me',
    },
};

export const Interactive: Story = {
    render: () => {
        const [settings, setSettings] = useState<ButtonSettings>({
            button_background_color: '#5007aa',
            button_text_color: '#ffffff',
            button_background_color_onhover: '#7030c0',
            button_text_color_onhover: '#ffffff',
            button_border_color: '#5007aa',
            button_border_size: 1,
            button_border_radious: 4,
            button_font_size: 14,
            button_padding: 10,
        });

        const handleChange = (key: string, value: any, isRestoreDefaults?: boolean) => {
            if (isRestoreDefaults) {
                setSettings({
                    button_background_color: '#5007aa',
                    button_text_color: '#ffffff',
                    button_background_color_onhover: '#7030c0',
                    button_text_color_onhover: '#ffffff',
                    button_border_color: '#5007aa',
                    button_border_size: 1,
                    button_border_radious: 4,
                    button_font_size: 14,
                    button_padding: 10,
                });
            } else {
                setSettings((prev) => ({
                    ...prev,
                    [key]: value,
                }));
            }
            console.log('Changed:', key, value, 'New settings:', settings);
        };

        return (
            <div style={{ padding: '40px' }}>
                <h3>Interactive Button Customizer</h3>
                <p>Click the button to open the customizer and change colors, borders, sizes, etc.</p>
                
                <ButtonCustomizer
                    onChange={handleChange}
                    setting={settings}
                    text="Click to Customize"
                />

                <div style={{ marginTop: '30px', padding: '15px', background: '#f5f5f5', borderRadius: '4px' }}>
                    <strong>Current Settings:</strong>
                    <pre style={{ fontSize: '12px', marginTop: '10px' }}>
                        {JSON.stringify(settings, null, 2)}
                    </pre>
                </div>
            </div>
        );
    },
};

//     args: {
//         onChange: (key, value) => {
//             console.log('Changed:', key, value);
//         },
//         setting: {
//             button_background_color: '#00eed0',
//             button_text_color: '#000000',
//             button_background_color_onhover: '#0197af',
//             button_text_color_onhover: '#ffffff',
//             button_border_color: '#00eed0',
//             button_border_size: 2,
//             button_border_radious: 8,
//             button_font_size: 16,
//             button_padding: 15,
//         },
//         text: 'Custom Button',
//     },
// };
