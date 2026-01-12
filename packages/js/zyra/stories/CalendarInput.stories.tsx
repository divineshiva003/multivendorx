import React, { useState, useEffect } from 'react';

import CalendarInput from '../src/components/CalendarInput';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateObject, toDateObject } from 'react-multi-date-picker';

const meta: Meta<typeof CalendarInput> = {
    title: 'Zyra/Components/CalendarInput',
    component: CalendarInput,
    tags: ['autodocs'],
};

const today = new DateObject().format('YYYY-MM-DD');


export default meta;
type Story = StoryObj<typeof CalendarInput>;


const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
    maxWidth: '260px',
};

const labelStyle = {
    fontSize: '13px',
    fontWeight: 500,
};

const errorStyle = {
    color: '#d63638',
    fontSize: '12px',
};

const proTagStyle = `
.admin-pro-tag {
    background: #805ad5;
    color: #fff;
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 4px;
    margin-left: 6px;
}
`;


const formatDateValue = (date: any): string => {
    if (Array.isArray(date)) {
        return date
            .map((d) =>
                Array.isArray(d)
                    ? `${d[0].format('YYYY-MM-DD')} - ${d[1].format('YYYY-MM-DD')}`
                    : d.format('YYYY-MM-DD')
            )
            .join(', ');
    }
    return (date as DateObject).format('YYYY-MM-DD');
};


export const DefaultDate: Story = {
    render: () => {
        const [value, setValue] = useState(today);

        return (
            <div style={wrapperStyle}>
                <style>{proTagStyle}</style>
                <CalendarInput
                    wrapperClass="calendar-input-wrapper"
                    inputClass="calendar-input"
                    value={value}
                    onChange={(date) => setValue(formatDateValue(date))}
                />
            </div>
        );
    },
};

export const MultipleDates: Story = {
    render: () => {
        const [value, setValue] = useState('2025-12-19, 2025-12-20, 2025-12-22');

        return (
            <div style={wrapperStyle}>
                <CalendarInput
                    value={value}
                    multiple
                    onChange={(date) => setValue(formatDateValue(date))}
                />
            </div>
        );
    },
};

export const RangeDates: Story = {
    render: () => {
        const [value, setValue] = useState('2025-12-19 - 2025-12-25');

        return (
            <div style={wrapperStyle}>
                <CalendarInput
                    value={value}
                    range
                    onChange={(date) => setValue(formatDateValue(date))}
                />
            </div>
        );
    },
};

export const ErrorState: Story = {
    render: () => {
        const [value] = useState('');

        return (
            <div style={wrapperStyle}>
                <label style={labelStyle}>Start Date *</label>
                <CalendarInput value={value} />
                <span style={errorStyle}>This field is required</span>
            </div>
        );
    },
};

export const RequiredField: Story = {
    render: () => {
        const [value, setValue] = useState('');

        return (
            <div style={wrapperStyle}>
                <label style={labelStyle}>
                    Booking Date <span style={{ color: '#d63638' }}>*</span>
                </label>
                <CalendarInput
                    value={value}
                    onChange={(date) => setValue(formatDateValue(date))}
                />
            </div>
        );
    },
};

export const MinMaxRange: Story = {
    render: () => {
        const [value, setValue] = useState(`2025-12-20 - ${today}`);

        return (
            <div style={wrapperStyle}>
                <CalendarInput
                    value={value}
                    range
                    onChange={(date) => setValue(formatDateValue(date))}
                />
            </div>
        );
    },
};



export const WithProTag: Story = {
    render: () => {
        const [value, setValue] = useState('2025-12-19');

        return (
            <div style={wrapperStyle}>
                <style>{proTagStyle}</style>
                <CalendarInput
                    value={value}
                    proSetting
                    onChange={(date) => setValue(formatDateValue(date))}
                />
            </div>
        );
    },
};
