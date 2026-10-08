import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Exam } from '../../types';
import { 
  Clock, 
  HelpCircle, 
  CheckCircle, 
  AlertTriangle, 
  ArrowLeft, 
  Play, 
  ShieldCheck, 
  BookOpen
} from 'lucide-react';

interface InstructionsScreenProps {
  exam: Exam;
  onStart: () => void;
}

export const InstructionsScreen: React.FC<InstructionsScreenProps> = ({ exam, onStart }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      {/* Back button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-8 text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{exam.subject} Examination</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            {exam.title}
          </h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-2xl">
            {exam.description}
          </p>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <div className="flex items-center gap-1.5 text-blue-200 text-xs mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Duration</span>
              </div>
              <p className="text-lg font-bold text-white">{exam.durationMinutes} Minutes</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <div className="flex items-center gap-1.5 text-blue-200 text-xs mb-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Questions</span>
              </div>
              <p className="text-lg font-bold text-white">{exam.totalQuestions} Questions</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <div className="flex items-center gap-1.5 text-blue-200 text-xs mb-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Passing Mark</span>
              </div>
              <p className="text-lg font-bold text-white">{exam.passingPercentage}%</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <div className="flex items-center gap-1.5 text-blue-200 text-xs mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Difficulty</span>
              </div>
              <p className="text-lg font-bold text-white">{exam.difficulty}</p>
            </div>
          </div>
        </div>

        {/* Instructions Body */}
        <div className="p-8 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              General Instructions & Guidelines
            </h2>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  1
                </span>
                <p>
                  <strong>Timed Session:</strong> Once you click "Begin Examination", the {exam.durationMinutes}-minute countdown will start. If the timer reaches 00:00, your test will be <strong>automatically submitted</strong>.
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  2
                </span>
                <p>
                  <strong>Question Navigation:</strong> Use the "Previous", "Next", or Question Navigator panel on the right to jump between questions at any time.
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  3
                </span>
                <p>
                  <strong>Mark for Review:</strong> You can flag any question by clicking "Mark for Review" to revisit it before final submission.
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  4
                </span>
                <p>
                  <strong>Grading & Passing:</strong> Every question carries equal weight. To pass the exam, you need to score at least <strong>{exam.passingPercentage}%</strong> ({Math.ceil((exam.totalQuestions * exam.passingPercentage) / 100)} correct answers).
                </p>
              </div>
            </div>
          </div>

          {/* Important advisory */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-900 text-xs sm:text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-950 mb-0.5">Do Not Refresh or Close the Page</p>
              <p className="text-amber-800">
                Refreshing the browser or leaving the page during the exam may cause your current session answers to be lost. Ensure you have an uninterrupted connection.
              </p>
            </div>
          </div>

          {/* Ready & Start Action */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600 text-center sm:text-left">
              By starting, you confirm that you are ready to attempt this test under timed conditions.
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="w-1/2 sm:w-auto px-5 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onStart}
                className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Begin Examination</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
