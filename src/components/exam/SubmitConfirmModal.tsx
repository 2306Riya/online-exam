import React from 'react';
import { AlertTriangle, CheckCircle2, Clock, Bookmark, X } from 'lucide-react';

interface SubmitConfirmModalProps {
  isOpen: boolean;
  totalQuestions: number;
  answeredCount: number;
  unansweredCount: number;
  markedCount: number;
  secondsRemaining: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export const SubmitConfirmModal: React.FC<SubmitConfirmModalProps> = ({
  isOpen,
  totalQuestions,
  answeredCount,
  unansweredCount,
  markedCount,
  secondsRemaining,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              unansweredCount > 0 ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {unansweredCount > 0 ? (
                <AlertTriangle className="w-5 h-5" />
              ) : (
                <CheckCircle2 className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">
                Submit Examination?
              </h3>
              <p className="text-xs text-slate-600">Review your test progress before final submission</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Breakdown Stats */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3">
              <span className="text-2xl font-black text-emerald-700 block">
                {answeredCount}
              </span>
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                Answered
              </span>
            </div>

            <div className="bg-slate-100 border border-slate-200 rounded-2xl p-3">
              <span className="text-2xl font-black text-slate-700 block">
                {unansweredCount}
              </span>
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                Unanswered
              </span>
            </div>

            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3">
              <span className="text-2xl font-black text-amber-700 block">
                {markedCount}
              </span>
              <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider">
                Marked
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between px-4 py-2.5 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-900">
            <div className="flex items-center gap-2 font-medium">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Remaining Time:</span>
            </div>
            <span className="font-mono font-bold text-sm text-blue-700">
              {timeFormatted}
            </span>
          </div>

          {unansweredCount > 0 ? (
            <div className="p-3 bg-amber-50/90 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                You still have <strong>{unansweredCount} unanswered</strong> question{unansweredCount > 1 ? 's' : ''}. Unanswered questions will receive 0 marks.
              </span>
            </div>
          ) : (
            <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs text-emerald-900 leading-relaxed flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Great job! You have answered all {totalQuestions} questions. Are you ready to see your final score?
              </span>
            </div>
          )}
        </div>

        {/* Modal Buttons */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors"
          >
            Continue Test
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/20 transition-all"
          >
            Yes, Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
};
