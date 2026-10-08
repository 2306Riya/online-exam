import React from 'react';
import { Send, Bookmark, CheckCircle2, Circle } from 'lucide-react';

interface QuestionPaletteProps {
  totalQuestions: number;
  currentIndex: number;
  userAnswers: Record<number, number>;
  markedForReview: number[];
  questionIds: number[];
  onSelectIndex: (index: number) => void;
  onSubmitClick: () => void;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  totalQuestions,
  currentIndex,
  userAnswers,
  markedForReview,
  questionIds,
  onSelectIndex,
  onSubmitClick,
}) => {
  // Count states
  const answeredCount = Object.keys(userAnswers).filter(
    (qId) => userAnswers[Number(qId)] !== undefined
  ).length;

  const markedCount = markedForReview.length;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">Question Navigator</h3>
          <span className="text-xs text-slate-600 font-medium">
            {answeredCount}/{totalQuestions} Answered
          </span>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-600 mb-5">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-emerald-500 shrink-0" />
            <span>Answered ({answeredCount})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-slate-200 shrink-0" />
            <span>Unanswered ({unansweredCount})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-amber-500 shrink-0" />
            <span>Marked ({markedCount})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md border-2 border-blue-600 bg-blue-50 shrink-0" />
            <span>Current Active</span>
          </div>
        </div>

        {/* Numbered buttons grid */}
        <div className="grid grid-cols-5 gap-2.5 mb-6">
          {questionIds.map((qId, idx) => {
            const isCurrent = idx === currentIndex;
            const isAnswered = userAnswers[qId] !== undefined;
            const isMarked = markedForReview.includes(qId);

            let bgClass = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
            let borderClass = 'border-transparent';

            if (isAnswered && isMarked) {
              bgClass = 'bg-amber-100 text-amber-900';
              borderClass = 'border-amber-400';
            } else if (isAnswered) {
              bgClass = 'bg-emerald-600 text-white hover:bg-emerald-700';
            } else if (isMarked) {
              bgClass = 'bg-amber-500 text-white hover:bg-amber-600';
            }

            if (isCurrent) {
              borderClass = 'ring-2 ring-blue-600 ring-offset-2';
            }

            return (
              <button
                key={qId}
                type="button"
                onClick={() => onSelectIndex(idx)}
                className={`relative h-10 rounded-xl font-bold text-xs flex items-center justify-center transition-all border ${bgClass} ${borderClass}`}
              >
                <span>{idx + 1}</span>
                {isMarked && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-1 ring-white" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Submit Test button */}
      <div className="pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onSubmitClick}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-all"
        >
          <Send className="w-4 h-4" />
          <span>Submit Examination</span>
        </button>
      </div>
    </div>
  );
};
