import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicSearch } from './pages/PublicSearch';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CandidateProvider } from './context/CandidateContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <CandidateProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicSearch />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard/*"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </CandidateProvider>
    </AuthProvider>
  );
}

export default App;