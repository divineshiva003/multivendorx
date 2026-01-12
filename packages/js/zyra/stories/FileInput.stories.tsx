import React, { useState } from 'react';
import FileInput from '../src/components/FileInput';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof FileInput> = {
    title: 'Zyra/Components/FileInput',
    component: FileInput,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FileInput>;




export const SingleFileUploaded: Story = {
    args: {
        wrapperClass: 'setting-file-uploader-class',
        imageSrc: 'https://picsum.photos/400/250',
        buttonClass: 'btn btn-purple',
        openUploader: 'Replace Image',
        proSetting: true,
    },
};


export const MultipleFiles: Story = {
    args: {
        wrapperClass: 'setting-file-uploader-class',
        multiple: true,
        imageSrc: [
            'https://picsum.photos/id/1011/200/200',
            'https://picsum.photos/id/1012/200/200',
            'https://picsum.photos/id/1013/200/200',
        ],
        imageWidth: 80,
        imageHeight: 80,
        openUploader: 'Upload Images',
        proSetting: true,
        description: 'You can upload multiple images and select a main image.',
    },
};

export const ReplaceImage: Story = {
    render: (args) => {
        const [image, setImage] = useState<string>(
            'https://picsum.photos/500/300'
        );

        return (
            <FileInput
                {...args}
                imageSrc={image}
                onChange={(value) => {
                    if (typeof value === 'string') {
                        setImage(value);
                    }
                }}
            />
        );
    },
    args: {
        wrapperClass: 'setting-file-uploader-class',
        openUploader: 'Replace Image',
        proSetting: true,
        description: 'Click replace to upload a new image.',
    },
};

export const LockedForFreeUser: Story = {
    render: (args) => {
        return (
            <div
                style={{
                    pointerEvents: 'none', // 🔒 hard lock
                    opacity: 0.6,
                    position: 'relative',
                }}
            >
                <FileInput {...args} />

                {/* Upgrade Overlay */}
                <div
                    style={{
                        pointerEvents: 'auto',
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255,255,255,0.6)',
                    }}
                >
                    <button
                        className="admin-btn btn-purple"
                        onClick={() =>
                            alert('Upgrade to Pro to unlock image uploads')
                        }
                    >
                        Upgrade to Pro
                    </button>
                </div>
            </div>
        );
    },
    args: {
        wrapperClass: 'setting-file-uploader-class locked',
        imageSrc: 'https://picsum.photos/300/180',
        proSetting: false,
        description:
            '<strong>Pro feature:</strong> Image upload is available for Pro users only.',
    },
};


export const ProUserEnabled: Story = {
    args: {
        wrapperClass: 'setting-file-uploader-class',
        imageSrc: 'https://picsum.photos/420/260',
        proSetting: true,
        openUploader: 'Upload New Image',
        description: 'You are a Pro user. Full upload access enabled.',
    },
};


export const FileSizeExceeded: Story = {
    args: {
        wrapperClass: 'setting-file-uploader-class error',
        imageSrc: undefined,
        proSetting: true,
        openUploader: 'Upload Image',
        description:
            '<span style="color:#d63638;">File size exceeds the 2MB limit. Please upload a smaller file.</span>',
    },
};
