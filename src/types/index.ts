export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation: string;
  codeSnippet?: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  category: 'Tech' | 'Science' | 'Math' | 'Language' | 'Aptitude' | 'General';
  description: string;
  durationMinutes: number;
  totalQuestions: number;
  passingPercentage: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  icon: string;
  questions: Question[];
}

export interface ExamResult {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  examId: string;
  examTitle: string;
  subject: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  percentage: number;
  isPassed: boolean;
  timeSpentSeconds: number;
  completedAt: string;
  userAnswers: Record<number, number>; // questionId -> selectedOptionIndex
  markedForReview: number[]; // array of questionIds
}
