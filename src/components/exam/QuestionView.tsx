import React from 'react';
import { Question } from '../../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  RotateCcw, 
  CheckCircle2, 
  Send 
} from 'lucide-react';

interface QuestionViewProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  selectedOption: number | undefined;
  isMarkedForReview: boolean;
  onSelectOption: (optionIndex: number) => void;
  onClearOption: () => void;
  onToggleMarkForReview: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmitClick: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export const QuestionView: React.FC<QuestionViewProps> = ({
  question,
  questionIndex,
  totalQuestions,
  selectedOption,
  isMarkedForReview,
  onSelectOption,
  onClearOption,
  onToggleMarkForReview,
  onNext,
  onPrev,
  onSubmitClick,
}) => {
  const isFirst = questionIndex === 0;
  const isLast = questionIndex === totalQuestions - 1;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between min-h-[520px]">
      {/* Top Question Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 font-bold text-xs sm:text-sm rounded-lg border border-blue-100">
            Question {questionIndex + 1} of {totalQuestions}
          </span>
          {isMarkedForReview && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg border border-amber-200">
              <Bookmark className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              Marked for Review
            </span>
          )}
        </div>

        {/* Action: Mark for review button */}
        <button
          type="button"
          onClick={onToggleMarkForReview}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
            isMarkedForReview
              ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-xs'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isMarkedForReview ? 'fill-amber-600 text-amber-600' : 'text-slate-400'}`} />
          <span>{isMarkedForReview ? 'Unmark Review' : 'Mark for Review'}</span>
        </button>
      </div>

      {/* Question Content & Options */}
      <div className="p-5 sm:p-8 flex-1">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed mb-6">
          {question.question}
        </h2>

        {/* 4 Options Grid/Stack */}
        <div className="space-y-3">
          {question.options.map((optionText, index) => {
            const isSelected = selectedOption === index;
            const letter = OPTION_LETTERS[index] || `${index + 1}`;

            return (
              <label
                key={index}
                onClick={() => onSelectOption(index)}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer select-none group ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500/20'
                    : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50/60 bg-white'
                }`}
              >
                {/* Radio Circle & Letter */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700'
                  }`}
                >
                  {letter}
                </div>

                {/* Option Text */}
                <div className="flex-1 text-sm font-medium text-slate-800 leading-normal">
                  {optionText}
                </div>

                {/* Radio selection checkmark */}
                <div className="shrink-0">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-slate-300 group-hover:border-slate-400 bg-white'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>

                {/* Hidden native radio for accessibility */}
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  checked={isSelected}
                  onChange={() => onSelectOption(index)}
                  className="sr-only"
                />
              </label>
            );
          })}
        </div>

        {/* Clear Choice action */}
        {selectedOption !== undefined && (
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onClearOption}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Choice</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation Toolbar */}
      <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-3">
        {/* Previous Button */}
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirst}
          className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            isFirst
              ? 'text-slate-300 cursor-not-allowed bg-transparent'
              : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 shadow-xs'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {/* Next or Submit Button */}
        <div className="flex items-center gap-2">
          {!isLast ? (
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-all"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmitClick}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-500/20 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Submit Exam</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
