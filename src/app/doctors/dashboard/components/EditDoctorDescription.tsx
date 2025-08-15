"use client";
import React, { useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function EditDoctorDescription() {
    const [value, setValue] = useState('');

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link',],
            ['blockquote', 'code-block'],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['clean'],
        ],
    };
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list',
        'align',
        'link',
        'blockquote', 'code-block',
        'indent',
    ];

    return (
        <div className="container mx-auto py-4 max-w-7xl">
            <p className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-400 to-cyan-400">
                A well-written description builds trust, let your experience and care shine through.
            </p>
            <div className="bg-white shadow-xl rounded-lg p-4 pb-16">
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    modules={modules}
                    formats={formats}
                    className="h-96"
                />
            </div>
        </div>
    );
}