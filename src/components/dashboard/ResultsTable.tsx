import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExamResult } from '../../types';
import { 
  Award, 
  Calendar, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface ResultsTableProps {
  results: ExamResult[];
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  const navigate = useNavigate();

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recently';
    }
  };

  if (results.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">No Exam Attempts Yet</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
          You haven’t completed any exams so far. Choose an exam from the list above and test your knowledge!
        </p>
        <a
          href="#available-exams"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20"
        >
          <Sparkles className="w-4 h-4" />
          Take Your First Exam
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">My Past Exam Attempts</h3>
          <p className="text-xs text-slate-600">Track all your recorded scores, passing status, and in-depth reviews</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
          {results.length} Attempt{results.length === 1 ? '' : 's'}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <th className="py-3.5 px-4 sm:px-6">Exam & Subject</th>
              <th className="py-3.5 px-4">Score</th>
              <th className="py-3.5 px-4">Percentage</th>
              <th className="py-3.5 px-4">Result</th>
              <th className="py-3.5 px-4 hidden md:table-cell">Date & Time</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {results.map((result) => (
              <tr key={result.id} className="hover:bg-slate-50/70 transition-colors">
                {/* Exam Title & Subject */}
                <td className="py-4 px-4 sm:px-6">
                  <div>
                    <span className="font-semibold text-slate-900 block">
                      {result.examTitle}
                    </span>
                    <span className="text-xs text-slate-600 font-medium">
                      {result.subject}
                    </span>
                  </div>
                </td>

                {/* Raw Score */}
                <td className="py-4 px-4">
                  <span className="font-semibold text-slate-800">
                    {result.score} <span className="text-xs text-slate-600 font-normal">/ {result.totalQuestions}</span>
                  </span>
                </td>

                {/* Percentage Bar */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          result.isPassed ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${Math.min(result.percentage, 100)}%` }}
                      />
                    </div>
                    <span className="font-semibold text-xs text-slate-700">
                      {result.percentage}%
                    </span>
                  </div>
                </td>

                {/* Pass/Fail Status */}
                <td className="py-4 px-4">
                  {result.isPassed ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Passed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                      <XCircle className="w-3.5 h-3.5" />
                      Failed
                    </span>
                  )}
                </td>

                {/* Date */}
                <td className="py-4 px-4 hidden md:table-cell text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-600" />
                    <span>{formatDate(result.completedAt)}</span>
                  </div>
                </td>

                {/* Action buttons */}
                <td className="py-4 px-4 sm:px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => navigate(`/results/${result.id}`)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      title="View detailed question review"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review</span>
                    </button>
                    <button
                      onClick={() => navigate(`/exam/${result.examId}`)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Retake this exam"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Retake</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
