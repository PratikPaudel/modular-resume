'use client';

import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
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
      const body = editingProject ? { ...data, id: editingProject.id } : data;

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
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Build Your Resume</h1>
      
      <Tabs defaultValue="experience" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="experience">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Work Experience</CardTitle>
              <Button 
                onClick={() => setShowExperienceForm(true)}
                disabled={showExperienceForm}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </CardHeader>
            <CardContent>
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
                      <div key={exp.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{exp.title}</h3>
                            <p className="text-sm text-muted-foreground">{exp.company}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(exp.startDate).toLocaleDateString()} - 
                              {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Projects</CardTitle>
              <Button 
                onClick={() => setShowProjectForm(true)}
                disabled={showProjectForm}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </CardHeader>
            <CardContent>
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
                      <div key={project.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
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
                        {project.bullets.length > 0 && (
                          <ul className="list-disc list-inside text-sm space-y-1">
                            {project.bullets.map((bullet, index) => (
                              <li key={index}>{bullet}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Education</CardTitle>
              <Button 
                onClick={() => setShowEducationForm(true)}
                disabled={showEducationForm}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </CardHeader>
            <CardContent>
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
                      <div key={edu.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{edu.degree}</h3>
                            <p className="text-sm text-muted-foreground">{edu.institution}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(edu.startDate).toLocaleDateString()} - 
                              {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Present'}
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Skills</CardTitle>
              <Button 
                onClick={() => setShowSkillsForm(true)}
                disabled={showSkillsForm}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </CardHeader>
            <CardContent>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {skills.map((skill) => (
                        <div key={skill.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
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
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
        