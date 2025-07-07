// app/resume-editor/components/editor/EditorPanel.tsx
import React, { useState } from 'react';
import { ResumeData } from '../../../types';
import { Plus } from 'lucide-react';
import PersonalInfoEditor from './PersonalInfoEditor';
import EditorSection from './EditorSection'; // A new generic component
import ProjectForm from '../../../components/forms/ProjectForm';
import ExperienceForm from '../../../components/forms/ExperienceForm';
import EducationForm from '../../../components/forms/EducationForm';
import SkillsForm from '../../../components/forms/SkillsForm';

// Helper component for dividers
const SectionDivider = () => (
  <div data-orientation="horizontal" role="none" className="h-px w-full shrink-0 bg-zinc-200 dark:bg-zinc-700"></div>
);

// Helper component for the "Add New Item" button
const AddItemButton = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
    <button
        onClick={onClick}
        className="inline-flex h-9 w-full scale-100 items-center justify-center gap-x-2 rounded-sm border-2 border-dashed border-secondary bg-transparent px-5 py-6 font-medium leading-relaxed text-zinc-600 ring-offset-background transition-[transform,background-color] hover:border-zinc-400 hover:bg-secondary-accent hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500"
    >
        <Plus size={14} />
        {children}
    </button>
);

interface EditorPanelProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData | undefined>>;
  expandedSections: { [key: string]: boolean };
  toggleSection: (section: string) => void;
}

const EditorPanel = ({ resumeData, setResumeData }: EditorPanelProps) => {
    const [showForms, setShowForms] = useState({
        experience: false,
        education: false,
        projects: false,
        skills: false,
    });

    const handleFormToggle = (form: keyof typeof showForms, value: boolean) => {
        setShowForms(prev => ({ ...prev, [form]: value }));
    };

    // Generic save handlers (implement API calls as needed)
    const handleSave = (form: keyof typeof showForms) => {
        console.log(`Saving ${form}...`);
        // Add API logic here, then close form on success
        handleFormToggle(form, false);
        // window.location.reload(); // Or update state without reloading
    };
    
    // Define your sections here to make the return statement cleaner
    const sections = [
        { id: 'profiles', title: 'Profiles' },
        { id: 'experience', title: 'Experience', form: <ExperienceForm onSave={() => handleSave('experience')} onCancel={() => handleFormToggle('experience', false)} /> },
        { id: 'education', title: 'Education', form: <EducationForm onSave={() => handleSave('education')} onCancel={() => handleFormToggle('education', false)} /> },
        { id: 'skills', title: 'Skills', form: <SkillsForm onSave={() => handleSave('skills')} onCancel={() => handleFormToggle('skills', false)} /> },
        { id: 'languages', title: 'Languages' },
        { id: 'awards', title: 'Awards' },
        { id: 'certifications', title: 'Certifications' },
        { id: 'interests', title: 'Interests' },
        { id: 'projects', title: 'Projects', form: <ProjectForm onSave={() => handleSave('projects')} onCancel={() => handleFormToggle('projects', false)} /> },
        { id: 'publications', title: 'Publications' },
        { id: 'volunteer', title: 'Volunteering' },
        { id: 'references', title: 'References' },
    ];

    return (
        <div className="grid gap-y-10 p-6 @container/left">
            <PersonalInfoEditor data={resumeData.personalInfo} setData={setResumeData} />

            <SectionDivider />

            {/* Summary Section */}
            <EditorSection id="summary" title="Summary">
                <div className="flex flex-wrap gap-0.5 border p-1 dark:border-zinc-700">
                    {/* Placeholder for toolbar buttons */}
                    <button className="h-8 w-8 rounded transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"></button>
                    <button className="h-8 w-8 rounded transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"></button>
                    <button className="h-8 w-8 rounded transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"></button>
                </div>
                <div
                    contentEditable="true"
                    className="prose prose-sm dark:prose-invert min-h-[160px] w-full max-w-none overflow-y-auto rounded-sm border bg-transparent p-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 dark:border-zinc-700"
                >
                </div>
            </EditorSection>
            
            {sections.map(section => (
                <React.Fragment key={section.id}>
                    <SectionDivider />
                    <EditorSection id={section.id} title={section.title}>
                        {showForms[section.id as keyof typeof showForms] ? (
                            section.form
                        ) : (
                            <AddItemButton onClick={() => handleFormToggle(section.id as keyof typeof showForms, true)}>
                                Add a new item
                            </AddItemButton>
                        )}
                    </EditorSection>
                </React.Fragment>
            ))}

            <SectionDivider />

            <button className="inline-flex h-10 scale-100 items-center justify-center rounded-sm border bg-transparent px-6 text-sm font-medium ring-offset-background transition-[transform,background-color] hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 active:scale-95 dark:border-zinc-700 dark:hover:bg-zinc-800">
                <Plus size={16} className="mr-2" />
                <span className="ml-2">Add a new section</span>
            </button>
        </div>
    );
};

export default EditorPanel;