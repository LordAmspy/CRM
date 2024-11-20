import React, { createContext, useContext, useState } from 'react';
import type { Candidate } from '../types';

interface CandidateContextType {
  candidates: Candidate[];
  addCandidate: (candidate: Omit<Candidate, 'id'>) => void;
  updateCandidate: (id: string, candidate: Omit<Candidate, 'id'>) => void;
  findCandidateByPhone: (phoneNumber: string) => Candidate | undefined;
}

const CandidateContext = createContext<CandidateContextType | null>(null);

export function CandidateProvider({ children }: { children: React.ReactNode }) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const addCandidate = (newCandidate: Omit<Candidate, 'id'>) => {
    const candidate: Candidate = {
      ...newCandidate,
      id: Math.random().toString(36).substr(2, 9),
    };
    setCandidates([...candidates, candidate]);
  };

  const updateCandidate = (id: string, updatedCandidate: Omit<Candidate, 'id'>) => {
    setCandidates(candidates.map(c => 
      c.id === id ? { ...updatedCandidate, id } : c
    ));
  };

  const findCandidateByPhone = (phoneNumber: string) => {
    return candidates.find(c => c.phoneNumber === phoneNumber);
  };

  return (
    <CandidateContext.Provider value={{ 
      candidates, 
      addCandidate, 
      updateCandidate,
      findCandidateByPhone 
    }}>
      {children}
    </CandidateContext.Provider>
  );
}

export function useCandidates() {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error('useCandidates must be used within a CandidateProvider');
  }
  return context;
}