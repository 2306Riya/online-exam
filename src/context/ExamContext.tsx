import React, { createContext, useContext, useState, useEffect } from 'react';
import { ExamResult } from '../types';

interface ExamContextType {
  results: ExamResult[];
  saveResult: (result: ExamResult) => void;
  getResultById: (id: string) => ExamResult | undefined;
  getUserResults: (userId: string) => ExamResult[];
  deleteResult: (id: string) => void;
  clearUserResults: (userId: string) => void;
}

const STORAGE_RESULTS_KEY = 'examipro_results';

// Initial sample past result for demonstration
const INITIAL_DEMO_RESULTS: ExamResult[] = [
  {
    id: 'res-demo-general-1',
    userId: 'demo-user-1',
    userName: 'Alex Johnson',
    userEmail: 'alex@example.com',
    examId: 'general-knowledge-101',
    examTitle: 'General Knowledge & Current Affairs',
    subject: 'General Knowledge',
    score: 8,
    totalQuestions: 10,
    correctCount: 8,
    wrongCount: 2,
    unansweredCount: 0,
    percentage: 80,
    isPassed: true,
    timeSpentSeconds: 412,
    completedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    userAnswers: {
      1: 2,
      2: 1,
      3: 2,
      4: 2,
      5: 1,
      6: 1,
      7: 2,
      8: 0, // wrong (0 instead of 1)
      9: 2,
      10: 2, // wrong (2 instead of 1)
    },
    markedForReview: [8, 10],
  },
  {
    id: 'res-demo-cs-2',
    userId: 'demo-user-1',
    userName: 'Alex Johnson',
    userEmail: 'alex@example.com',
    examId: 'computer-basics-programming',
    examTitle: 'Computer Basics & Software Engineering',
    subject: 'Computer Basics',
    score: 9,
    totalQuestions: 10,
    correctCount: 9,
    wrongCount: 1,
    unansweredCount: 0,
    percentage: 90,
    isPassed: true,
    timeSpentSeconds: 320,
    completedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    userAnswers: {
      1: 1,
      2: 1,
      3: 2,
      4: 2,
      5: 2,
      6: 1,
      7: 1,
      8: 2,
      9: 1,
      10: 1, // wrong
    },
    markedForReview: [5],
  },
];

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const ExamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [results, setResults] = useState<ExamResult[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_RESULTS_KEY);
      if (stored) {
        setResults(JSON.parse(stored));
      } else {
        localStorage.setItem(STORAGE_RESULTS_KEY, JSON.stringify(INITIAL_DEMO_RESULTS));
        setResults(INITIAL_DEMO_RESULTS);
      }
    } catch (e) {
      console.error('Failed to load exam results from localStorage:', e);
      setResults(INITIAL_DEMO_RESULTS);
    }
  }, []);

  const saveResult = (result: ExamResult) => {
    setResults((prev) => {
      const updated = [result, ...prev];
      try {
        localStorage.setItem(STORAGE_RESULTS_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save exam result:', err);
      }
      return updated;
    });
  };

  const getResultById = (id: string): ExamResult | undefined => {
    return results.find((r) => r.id === id);
  };

  const getUserResults = (userId: string): ExamResult[] => {
    return results.filter((r) => r.userId === userId);
  };

  const deleteResult = (id: string) => {
    setResults((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      try {
        localStorage.setItem(STORAGE_RESULTS_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to delete result:', err);
      }
      return updated;
    });
  };

  const clearUserResults = (userId: string) => {
    setResults((prev) => {
      const updated = prev.filter((r) => r.userId !== userId);
      try {
        localStorage.setItem(STORAGE_RESULTS_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to clear user results:', err);
      }
      return updated;
    });
  };

  return (
    <ExamContext.Provider
      value={{
        results,
        saveResult,
        getResultById,
        getUserResults,
        deleteResult,
        clearUserResults,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
};
