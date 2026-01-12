import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import CatalogCustomizer from '../src/components/CatalogCustomizer';

const meta: Meta<typeof CatalogCustomizer> = {
    title: 'Zyra/Components/CatalogCustomizer',
    component: CatalogCustomizer,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CatalogCustomizer>;

const SAMPLE_IMAGE =
    'https://greendroprecycling.com/wp-content/uploads/2017/04/GreenDrop_Station_Aluminum_Can_Coke.jpg';

const baseArgs = {
    onChange: (key: string, value: any) => {
        console.log('Catalog change:', key, value);
    },
    SampleProduct: SAMPLE_IMAGE,
    proUrl: 'https://example.com/upgrade',
};


export const TestCatalogCustomizer: Story = {
    args: {
        ...baseArgs,
        proSetting: true,
        setting: {
            layout: 'grid',
            showImages: true,
        },
    },
};


export const FreeUser: Story = {
    args: {
        ...baseArgs,
        proSetting: false,
        setting: {},
    },
};

export const ProUserFullCustomization: Story = {
    args: {
        ...baseArgs,
        proSetting: true,
        setting: {
            enquiry_button: {
                button_text: 'Send Enquiry',
                button_background_color: '#6b4eff',
            },
            quote_button: {
                button_text: 'Request Quote',
            },
        },
    },
};


export const SavedLayoutRestored: Story = {
    args: {
        ...baseArgs,
        proSetting: true,
        setting: {
            shop_page_possition_setting: {
                additional_input: 'product_description',
                custom_button: 'additional_input',
            },
            shop_page_button_position_setting: [
                'quote_button',
                'enquiry_button',
            ],
        },
    },
};


export const PriceHidden: Story = {
    args: {
        ...baseArgs,
        proSetting: true,
        setting: {
            hide_product_price: true,
        },
    },
};

export const ButtonsReordered: Story = {
    args: {
        ...baseArgs,
        proSetting: true,
        setting: {
            shop_page_button_position_setting: [
                'quote_button',
                'enquiry_button',
            ],
            enquiry_button: {
                button_text: 'Ask Us',
            },
            quote_button: {
                button_text: 'Quick Quote',
            },
        },
    },
};


export const AdditionalInputFilled: Story = {
    args: {
        ...baseArgs,
        proSetting: true,
        setting: {
            additional_input: 'Enter your serial number',
        },
    },
};


export const NoProductImage: Story = {
    args: {
        ...baseArgs,
        proSetting: true,
        SampleProduct: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTeKDYWM13QvRu7VBv3FwEaIrXhB8jn1pGdw&s',
        setting: {},
    },
};
