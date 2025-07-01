export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'draft';
  createdAt: Date;
  updatedAt: Date;
  owner: string;
  progress: number;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}