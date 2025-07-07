// app/resume-editor/components/editor/PersonalInfoEditor.tsx
import React from 'react';
import { PersonalInfo, ResumeData } from '../../../types';

interface Props {
  data: PersonalInfo | undefined;
  setData: React.Dispatch<React.SetStateAction<ResumeData | undefined>>;
}

const InputField = ({ label, id, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; id: string }) => (
    <div className="space-y-1.5">
        <label className="text-sm font-medium leading-none" htmlFor={id}>{label}</label>
        <input
            id={id}
            className="flex h-9 w-full rounded border border-zinc-300 bg-transparent px-3 py-1 text-sm ring-offset-background transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed dark:border-zinc-700"
            {...props}
        />
    </div>
);


const PersonalInfoEditor = ({ data, setData }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        personalInfo: { ...prev.personalInfo, [name]: value } as PersonalInfo,
      };
    });
  };
  
  const IconPlaceholder = () => <div className="h-4 w-4 bg-zinc-300 dark:bg-zinc-600 rounded-sm"></div>;

  return (
    <section id="basics" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <button className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
             <IconPlaceholder />
          </button>
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">Basics</h2>
        </div>
      </header>
      <main className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-x-4">
            <div className="group relative cursor-pointer">
              <span className="relative flex h-14 w-14 shrink-0 overflow-hidden rounded-full bg-zinc-200">
                <img className="aspect-square h-full w-full object-cover" src={data?.picture || ''} alt="Profile" />
              </span>
              {/* Overlay logic can be added here */}
            </div>
            <div className="flex w-full flex-col gap-y-1.5">
              <label className="text-sm font-medium" htmlFor="basics.picture.url">Picture URL</label>
              <input
                id="basics.picture.url"
                name="picture"
                // value={data?.picture}
                onChange={handleChange}
                placeholder="https://..."
                className="flex h-9 w-full rounded border border-zinc-300 bg-transparent px-3 py-1 text-sm ring-offset-background transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed dark:border-zinc-700"
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-2">
            <InputField label="Full Name" id="basics.name" name="name" value={data?.name} onChange={handleChange} />
        </div>
        <div className="sm:col-span-2">
            <InputField label="Headline" id="basics.headline" name="headline" value={data?.headline} onChange={handleChange} />
        </div>
        
        <InputField label="Email" id="basics.email" name="email" value={data?.email} onChange={handleChange} placeholder="john.doe@example.com" />
        <InputField label="Website" id="basics.url" name="url" value={data?.url} onChange={handleChange} placeholder="https://example.com" />
        <InputField label="Phone" id="basics.phone" name="phone" value={data?.phone} onChange={handleChange} placeholder="+1 (123) 456-7890" />
        <InputField label="Location" id="basics.location" name="location" value={data?.location} onChange={handleChange} />
      </main>
    </section>
  );
};

export default PersonalInfoEditor;