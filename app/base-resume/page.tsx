'use client';

import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import ExperienceForm from '../components/forms/ExperienceForm';
import ProjectForm from '../components/forms/ProjectForm';
import EducationForm from '../components/forms/EducationForm';
import SkillsForm from '../components/forms/SkillsForm';

// Types for the data from API
interface Experience {
  id: string;
  company: string;
  title: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  bullets: string[];
  userId: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  projectUrl: string | null;
  stack: string[];
  bullets: string[];
  userId: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  gpa: number | null;
  startDate: string;
  endDate: string | null;
  userId: string;
}

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: string;
  userId: string;
}

function formatDate(dateString: string | null | undefined) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('default', { month: 'short', year: 'numeric' });
}

export default function BaseResumePage() {
  // State for data
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  // State for forms
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showSkillsForm, setShowSkillsForm] = useState(false);

  // State for editing
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  // Loading states
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [expRes, projRes, eduRes, skillsRes] = await Promise.all([
        fetch('/api/experience'),
        fetch('/api/project'),
        fetch('/api/education'),
        fetch('/api/skills')
      ]);

      if (expRes.ok) setExperiences(await expRes.json());
      if (projRes.ok) setProjects(await projRes.json());
      if (eduRes.ok) setEducation(await eduRes.json());
      if (skillsRes.ok) setSkills(await skillsRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submissions
  const handleExperienceSubmit = async (data: any) => {
    try {
      const url = '/api/experience';
      const method = editingExperience ? 'PUT' : 'POST';
      const body = editingExperience ? { ...data, id: editingExperience.id } : data;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        await fetchData();
        setShowExperienceForm(false);
        setEditingExperience(null);
      }
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  const handleProjectSubmit = async (data: any) => {
    try {
      const url = '/api/project';
      const method = editingProject ? 'PUT' : 'POST';
      // Map 'name' to 'title' if present
      const body = editingProject
        ? { ...data, id: editingProject.id, title: data.title || data.name }
        : { ...data, title: data.title || data.name };
  
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
  
      if (response.ok) {
        await fetchData();
        setShowProjectForm(false);
        setEditingProject(null);
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleEducationSubmit = async (data: any) => {
    try {
      const url = '/api/education';
      const method = editingEducation ? 'PUT' : 'POST';
      const body = editingEducation ? { ...data, id: editingEducation.id } : data;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        await fetchData();
        setShowEducationForm(false);
        setEditingEducation(null);
      }
    } catch (error) {
      console.error('Error saving education:', error);
    }
  };

  const handleSkillsSubmit = async (data: any) => {
    try {
      const url = '/api/skills';
      const method = editingSkill ? 'PUT' : 'POST';
      const body = editingSkill ? { ...data, id: editingSkill.id } : data;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        await fetchData();
        setShowSkillsForm(false);
        setEditingSkill(null);
      }
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  // Handle delete operations
  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`/api/${type}?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  // Handle edit operations
  const handleEdit = (type: string, item: any) => {
    switch (type) {
      case 'experience':
        setEditingExperience(item);
        setShowExperienceForm(true);
        break;
      case 'project':
        setEditingProject(item);
        setShowProjectForm(true);
        break;
      case 'education':
        setEditingEducation(item);
        setShowEducationForm(true);
        break;
      case 'skills':
        setEditingSkill(item);
        setShowSkillsForm(true);
        break;
    }
  };

  // Cancel edit operations
  const handleCancelEdit = () => {
    setEditingExperience(null);
    setEditingProject(null);
    setEditingEducation(null);
    setEditingSkill(null);
    setShowExperienceForm(false);
    setShowProjectForm(false);
    setShowEducationForm(false);
    setShowSkillsForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-6">
      <h1 className="text-3xl font-bold mb-6">Build Your Resume</h1>
      
      <Accordion type="multiple" className="w-full max-w-none space-y-4">
        {/* Experience Section */}
        <AccordionItem value="experience" className="border rounded-lg w-full">
          <div className="w-full">
            <div className="flex items-center justify-between w-full px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">Work Experience</h2>
              <Button 
                onClick={() => setShowExperienceForm(true)}
                disabled={showExperienceForm}
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </div>
            <AccordionTrigger className="flex-1 px-6 py-2 text-left w-full">
              <span className="text-sm text-muted-foreground">
                {experiences.length} experience{experiences.length !== 1 ? 's' : ''} added
              </span>
            </AccordionTrigger>
          </div>
          <AccordionContent className="px-6 pb-6">
            {showExperienceForm ? (
              <ExperienceForm 
                onSave={handleExperienceSubmit}
                onCancel={handleCancelEdit}
                initialData={editingExperience ? {
                  company: editingExperience.company,
                  jobTitle: editingExperience.title,
                  location: editingExperience.location || '',
                  startDate: editingExperience.startDate.split('T')[0],
                  endDate: editingExperience.endDate ? editingExperience.endDate.split('T')[0] : '',
                  achievements: editingExperience.bullets
                } : undefined}
              />
            ) : (
              <div className="space-y-4">
                {experiences.length === 0 ? (
                  <p className="text-muted-foreground">No experiences added yet.</p>
                ) : (
                  experiences.map((exp) => (
                    <div key={exp.id} className="border rounded-lg p-4 w-full">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold">{exp.title}</h3>
                          <p className="text-sm text-muted-foreground">{exp.company}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(exp.startDate)} - 
                            {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit('experience', exp)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete('experience', exp.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {exp.bullets.length > 0 && (
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {exp.bullets.map((bullet, index) => (
                            <li key={index}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Projects Section */}
        <AccordionItem value="projects" className="border rounded-lg w-full">
          <div className="w-full">
            <div className="flex items-center justify-between w-full px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">Projects</h2>
              <Button 
                onClick={() => setShowProjectForm(true)}
                disabled={showProjectForm}
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </div>
            <AccordionTrigger className="flex-1 px-6 py-2 text-left w-full">
              <span className="text-sm text-muted-foreground">
                {projects.length} project{projects.length !== 1 ? 's' : ''} added
              </span>
            </AccordionTrigger>
          </div>
          <AccordionContent className="px-6 pb-6">
            {showProjectForm ? (
              <ProjectForm 
                onSave={handleProjectSubmit}
                onCancel={handleCancelEdit}
                initialData={editingProject ? {
                  title: editingProject.name,
                  description: editingProject.description,
                  liveUrl: editingProject.projectUrl || '',
                  technologies: editingProject.stack.join(', '),
                  highlights: editingProject.bullets
                } : undefined}
              />
            ) : (
              <div className="space-y-4">
                {projects.length === 0 ? (
                  <p className="text-muted-foreground">No projects added yet.</p>
                ) : (
                  projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4 w-full">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold">{project.name}</h3>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                          {project.stack.length > 0 && (
                            <p className="text-xs text-muted-foreground">
                              Tech: {project.stack.join(', ')}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit('project', project)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete('project', project.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {project.bullets && project.bullets.filter(b => b && b.trim()).length > 0 && (
                        <>
                          <div className="font-semibold text-xs mt-2">Key Contributions:</div>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            {project.bullets.filter(b => b && b.trim()).map((bullet, index) => (
                              <li key={index}>{bullet}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Education Section */}
        <AccordionItem value="education" className="border rounded-lg w-full">
          <div className="w-full">
            <div className="flex items-center justify-between w-full px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">Education</h2>
              <Button 
                onClick={() => setShowEducationForm(true)}
                disabled={showEducationForm}
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </div>
            <AccordionTrigger className="flex-1 px-6 py-2 text-left w-full">
              <span className="text-sm text-muted-foreground">
                {education.length} education{education.length !== 1 ? 's' : ''} added
              </span>
            </AccordionTrigger>
          </div>
          <AccordionContent className="px-6 pb-6">
            {showEducationForm ? (
              <EducationForm 
                onSave={handleEducationSubmit}
                onCancel={handleCancelEdit}
                initialData={editingEducation ? {
                  institution: editingEducation.institution,
                  degree: editingEducation.degree,
                  gpa: editingEducation.gpa?.toString() || '',
                  startDate: editingEducation.startDate.split('T')[0],
                  endDate: editingEducation.endDate ? editingEducation.endDate.split('T')[0] : ''
                } : undefined}
              />
            ) : (
              <div className="space-y-4">
                {education.length === 0 ? (
                  <p className="text-muted-foreground">No education added yet.</p>
                ) : (
                  education.map((edu) => (
                    <div key={edu.id} className="border rounded-lg p-4 w-full">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold">{edu.degree}</h3>
                          <p className="text-sm text-muted-foreground">{edu.institution}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(edu.startDate)} - 
                            {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                          </p>
                          {edu.gpa && (
                            <p className="text-xs text-muted-foreground">GPA: {edu.gpa}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit('education', edu)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete('education', edu.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Skills Section */}
        <AccordionItem value="skills" className="border rounded-lg w-full">
          <div className="w-full">
            <div className="flex items-center justify-between w-full px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">Skills</h2>
              <Button 
                onClick={() => setShowSkillsForm(true)}
                disabled={showSkillsForm}
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </div>
            <AccordionTrigger className="flex-1 px-6 py-2 text-left w-full">
              <span className="text-sm text-muted-foreground">
                {skills.length} skill{skills.length !== 1 ? 's' : ''} added
              </span>
            </AccordionTrigger>
          </div>
          <AccordionContent className="px-6 pb-6">
            {showSkillsForm ? (
              <SkillsForm 
                onSave={handleSkillsSubmit}
                onCancel={handleCancelEdit}
                initialData={editingSkill ? {
                  category: editingSkill.category,
                  skills: [editingSkill.name],
                  proficiencyLevel: editingSkill.proficiency
                } : undefined}
              />
            ) : (
              <div className="space-y-4">
                {skills.length === 0 ? (
                  <p className="text-muted-foreground">No skills added yet.</p>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {skills.map((skill) => (
                        <div key={skill.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold">{skill.name}</h3>
                              <p className="text-sm text-muted-foreground">{skill.category}</p>
                              <p className="text-xs text-muted-foreground">Level: {skill.proficiency}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit('skills', skill)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete('skills', skill.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 space-y-2">
                      <p><b>Programming Languages:</b> {skills.filter(s => s.category === 'Programming Languages').map(s => s.name).join(', ')}</p>
                      <p><b>Frameworks & Libraries:</b> {skills.filter(s => s.category === 'Frameworks & Libraries').map(s => s.name).join(', ')}</p>
                      <p><b>DevOps & Cloud:</b> {skills.filter(s => s.category === 'DevOps & Cloud').map(s => s.name).join(', ')}</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}