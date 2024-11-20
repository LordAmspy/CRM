import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, LogOut, PlusCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCandidates } from '../context/CandidateContext';
import { CandidateTable } from '../components/CandidateTable';
import { CandidateForm } from '../components/CandidateForm';
import { SearchBar } from '../components/SearchBar';
import { Analytics } from '../components/Analytics';
import type { Candidate } from '../types';

export function Dashboard() {
  const [showForm, setShowForm] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [editingCandidate, setEditingCandidate] = React.useState<Candidate | null>(null);
  const { logout } = useAuth();
  const { candidates, addCandidate, updateCandidate } = useCandidates();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddCandidate = (newCandidate: Omit<Candidate, 'id'>) => {
    addCandidate(newCandidate);
    setShowForm(false);
  };

  const handleEditCandidate = (candidate: Candidate) => {
    setEditingCandidate(candidate);
    setShowForm(true);
  };

  const handleUpdateCandidate = (updatedCandidate: Omit<Candidate, 'id'>) => {
    if (editingCandidate) {
      updateCandidate(editingCandidate.id, updatedCandidate);
      setEditingCandidate(null);
      setShowForm(false);
    }
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.phoneNumber.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Database className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">CRM Dashboard</span>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Analytics candidates={candidates} />

        <div className="flex justify-between items-center mb-6">
          <div className="w-full max-w-md">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add New
          </button>
        </div>

        <div className="bg-white shadow rounded-lg">
          {filteredCandidates.length > 0 ? (
            <CandidateTable 
              candidates={filteredCandidates}
              onEdit={handleEditCandidate}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No candidates found. Add your first candidate by clicking the "Add New" button.</p>
            </div>
          )}
        </div>

        {showForm && (
          <CandidateForm
            onSubmit={editingCandidate ? handleUpdateCandidate : handleAddCandidate}
            onClose={() => {
              setShowForm(false);
              setEditingCandidate(null);
            }}
            initialData={editingCandidate || undefined}
          />
        )}
      </div>
    </div>
  );
}