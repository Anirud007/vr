import { useState, useEffect } from 'react';
import { Project } from '../types';

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Customer Onboarding Automation',
    description: 'Streamline the customer onboarding process with automated workflows and validation checks.',
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-28'),
    owner: 'John Doe',
    progress: 75,
    priority: 'high',
    dueDate: new Date('2024-02-15'),
  },
  {
    id: '2',
    name: 'Invoice Processing System',
    description: 'Automated invoice processing and approval workflow for accounting department.',
    status: 'completed',
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2024-01-10'),
    owner: 'Jane Smith',
    progress: 100,
    priority: 'medium',
    dueDate: new Date('2024-01-10'),
  },
  {
    id: '3',
    name: 'Employee Performance Analytics',
    description: 'Dashboard for tracking and analyzing employee performance metrics.',
    status: 'on-hold',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-25'),
    owner: 'Mike Johnson',
    progress: 30,
    priority: 'low',
  },
];

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
      } else {
        setProjects(mockProjects);
        localStorage.setItem('projects', JSON.stringify(mockProjects));
      }
      setLoading(false);
    }, 800);
  }, []);

  const createProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    const updatedProjects = projects.map(project =>
      project.id === id
        ? { ...project, ...updates, updatedAt: new Date() }
        : project
    );
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  return {
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
  };
};