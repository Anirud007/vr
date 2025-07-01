import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';

function App() {
  const { isAuthenticated, login, signup } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex items-center justify-center">
        <div className="flex-1 max-w-lg">
          <AuthForm
            mode={authMode}
            onSubmit={authMode === 'login' ? login : signup}
            onToggleMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
          />
        </div>
        
        {/* Hero Section - Hidden on mobile */}
        <div className="hidden lg:flex flex-1 items-center justify-center ml-16">
          <div className="text-center">
            <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl p-4">
              <img 
                src="/logo.jpeg" 
                alt="AppInventiv Logo" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Automation Hub
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-md">
              Streamline your business processes with intelligent automation tools designed for analysts.
            </p>
            <div className="grid grid-cols-1 gap-4 text-left max-w-sm mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Project Management</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Process Automation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">Analytics Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;