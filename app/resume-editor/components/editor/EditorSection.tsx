// app/resume-editor/components/editor/EditorSection.tsx
import React from 'react';

interface EditorSectionProps {
    id: string;
    title: string;
    children: React.ReactNode;
}

const EditorSection = ({ id, title, children }: EditorSectionProps) => {
    return (
        <section id={id} className="grid gap-y-6">
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        <div className="h-4 w-4 bg-zinc-300 dark:bg-zinc-600 rounded-sm"></div>
                    </button>
                    <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">{title}</h2>
                </div>
            </header>
            <main className="grid gap-4">
                {children}
            </main>
        </section>
    );
};

export default EditorSection;