import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Exam, ExamResult } from '../../types';
import { 
  Clock, 
  HelpCircle, 
  Award, 
  ChevronRight, 
  Globe, 
  Calculator, 
  Atom, 
  BookOpen, 
  Cpu, 
  Brain,
  CheckCircle2
} from 'lucide-react';

interface ExamCardProps {
  exam: Exam;
  pastResult?: ExamResult;
}

export const ExamCard: React.FC<ExamCardProps> = ({ exam, pastResult }) => {
  const navigate = useNavigate();

  const getIcon = () => {
    switch (exam.icon) {
      case 'Globe': return <Globe className="w-6 h-6 text-blue-600" />;
      case 'Calculator': return <Calculator className="w-6 h-6 text-indigo-600" />;
      case 'Atom': return <Atom className="w-6 h-6 text-teal-600" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-purple-600" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-sky-600" />;
      case 'Brain': return <Brain className="w-6 h-6 text-rose-600" />;
      default: return <Award className="w-6 h-6 text-blue-600" />;
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Hard':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group hover:border-blue-300">
      <div className="p-6">
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
            {getIcon()}
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${getDifficultyColor(exam.difficulty)}`}>
              {exam.difficulty}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-blue-50 text-blue-700 border border-blue-100">
              {exam.subject}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-blue-600 transition-colors mb-2">
          {exam.title}
        </h3>
        <p className="text-sm text-slate-600 line-clamp-2 mb-5">
          {exam.description}
        </p>

        {/* Meta Stats */}
        <div className="grid grid-cols-2 gap-2 py-3 px-3.5 bg-slate-50/80 rounded-xl text-xs text-slate-600 border border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500 shrink-0" />
            <span><strong className="text-slate-800 font-semibold">{exam.durationMinutes}</strong> mins</span>
          </div>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-500 shrink-0" />
            <span><strong className="text-slate-800 font-semibold">{exam.totalQuestions}</strong> questions</span>
          </div>
        </div>

        {/* Previous Attempt Note if available */}
        {pastResult && (
          <div className="flex items-center justify-between px-3 py-2 bg-blue-50/50 rounded-lg border border-blue-100/80 text-xs mb-2">
            <div className="flex items-center gap-1.5 text-blue-800 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Last Attempt:</span>
            </div>
            <span className={`font-semibold ${pastResult.isPassed ? 'text-emerald-700' : 'text-rose-600'}`}>
              {pastResult.score}/{pastResult.totalQuestions} ({pastResult.percentage}%)
            </span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="p-4 bg-slate-50/50 border-t border-slate-100">
        <button
          onClick={() => navigate(`/exam/${exam.id}`)}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/10 hover:shadow-blue-500/25 transition-all group-hover:bg-blue-600"
        >
          <span>{pastResult ? 'Retake Exam' : 'Start Exam'}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
