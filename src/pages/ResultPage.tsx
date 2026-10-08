import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useExam } from '../context/ExamContext';
import { SAMPLE_EXAMS } from '../data/exams';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  LayoutDashboard, 
  Clock, 
  TrendingUp, 
  Check, 
  X, 
  Info, 
  Filter, 
  Share2, 
  Printer, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export const ResultPage: React.FC = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const navigate = useNavigate();
  const { getResultById } = useExam();

  const [activeReviewFilter, setActiveReviewFilter] = useState<'all' | 'correct' | 'incorrect' | 'unanswered'>('all');

  const result = useMemo(() => {
    return resultId ? getResultById(resultId) : undefined;
  }, [resultId, getResultById]);

  const exam = useMemo(() => {
    if (!result) return undefined;
    return SAMPLE_EXAMS.find((e) => e.id === result.examId);
  }, [result]);

  if (!result || !exam) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center max-w-md shadow-sm">
          <Award className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">Result Record Not Found</h2>
          <p className="text-sm text-slate-600 mb-6">
            We couldn't locate this exam score. It may have been cleared from storage.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Filter questions for review
  const filteredQuestions = exam.questions.filter((q) => {
    const userChoice = result.userAnswers[q.id];
    if (activeReviewFilter === 'all') return true;
    if (activeReviewFilter === 'unanswered') return userChoice === undefined;
    if (activeReviewFilter === 'correct') return userChoice === q.correctAnswer;
    if (activeReviewFilter === 'incorrect') {
      return userChoice !== undefined && userChoice !== q.correctAnswer;
    }
    return true;
  });

  const minutesSpent = Math.floor(result.timeSpentSeconds / 60);
  const secondsSpent = result.timeSpentSeconds % 60;
  const timeSpentFormatted = `${minutesSpent}m ${secondsSpent}s`;

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      {/* Top Banner / Celebration */}
      <div
        className={`py-12 px-4 sm:px-6 lg:px-8 text-white ${
          result.isPassed
            ? 'bg-gradient-to-r from-emerald-700 via-teal-700 to-blue-800'
            : 'bg-gradient-to-r from-slate-800 via-slate-700 to-rose-900'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5 text-center md:text-left">
              <div
                className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-lg ${
                  result.isPassed
                    ? 'bg-emerald-500/30 border border-emerald-400/40 text-emerald-200'
                    : 'bg-rose-500/30 border border-rose-400/40 text-rose-200'
                }`}
              >
                {result.isPassed ? (
                  <CheckCircle2 className="w-12 h-12 text-white" />
                ) : (
                  <XCircle className="w-12 h-12 text-white" />
                )}
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-wider mb-2">
                  <span>{result.isPassed ? 'Passed Examination' : 'Did Not Pass'}</span>
                  <span>• Pass Mark: {exam.passingPercentage}%</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                  {result.isPassed ? 'Congratulations!' : 'Keep Practicing!'}
                </h1>
                <p className="text-white/80 text-sm mt-1">
                  You scored <strong className="text-white font-bold">{result.score} out of {result.totalQuestions}</strong> ({result.percentage}%) on {result.examTitle}
                </p>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/exam/${result.examId}`)}
                className="px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-blue-600" />
                <span>Retake Exam</span>
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 font-semibold text-xs sm:text-sm backdrop-blur-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Score Breakdown Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs text-center">
            <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block mb-1">
              Final Score
            </span>
            <span className="text-2xl font-black text-slate-900">
              {result.score}/{result.totalQuestions}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs text-center">
            <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block mb-1">
              Percentage
            </span>
            <span className={`text-2xl font-black ${result.isPassed ? 'text-emerald-700' : 'text-rose-600'}`}>
              {result.percentage}%
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs text-center">
            <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block mb-1">
              Correct
            </span>
            <span className="text-2xl font-black text-emerald-700">
              {result.correctCount}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs text-center">
            <span className="text-[11px] font-semibold text-rose-800 uppercase tracking-wider block mb-1">
              Wrong
            </span>
            <span className="text-2xl font-black text-rose-600">
              {result.wrongCount}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs text-center">
            <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block mb-1">
              Skipped
            </span>
            <span className="text-2xl font-black text-slate-700">
              {result.unansweredCount}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs text-center">
            <span className="text-[11px] font-semibold text-blue-800 uppercase tracking-wider block mb-1">
              Time Taken
            </span>
            <span className="text-lg sm:text-xl font-black text-blue-700">
              {timeSpentFormatted}
            </span>
          </div>
        </div>

        {/* Detailed Question Review Section */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-12">
          {/* Review Header & Filters */}
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Question Review & Explanations
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Inspect each question, your chosen response, the correct key, and the complete solution rationale.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setActiveReviewFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeReviewFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All ({exam.questions.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveReviewFilter('correct')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeReviewFilter === 'correct'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Correct ({result.correctCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveReviewFilter('incorrect')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeReviewFilter === 'incorrect'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Wrong ({result.wrongCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveReviewFilter('unanswered')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeReviewFilter === 'unanswered'
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Skipped ({result.unansweredCount})
              </button>
            </div>
          </div>

          {/* List of Questions */}
          <div className="divide-y divide-slate-100">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question, index) => {
                const userChoice = result.userAnswers[question.id];
                const isCorrect = userChoice === question.correctAnswer;
                const isSkipped = userChoice === undefined;

                return (
                  <div key={question.id} className="p-6 sm:p-8 space-y-4">
                    {/* Question Header & Status */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {question.id}
                        </span>
                        <h3 className="font-bold text-slate-900 text-base leading-snug">
                          {question.question}
                        </h3>
                      </div>

                      {/* Status badge */}
                      <div className="shrink-0">
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <Check className="w-3.5 h-3.5" />
                            Correct
                          </span>
                        ) : isSkipped ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                            <HelpCircle className="w-3.5 h-3.5" />
                            Skipped
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                            <X className="w-3.5 h-3.5" />
                            Incorrect
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Options list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {question.options.map((optText, optIdx) => {
                        const isThisUserChoice = userChoice === optIdx;
                        const isThisCorrect = question.correctAnswer === optIdx;

                        let cardStyle = 'border-slate-200 bg-white text-slate-700';
                        let badgeStyle = 'bg-slate-100 text-slate-600';

                        if (isThisCorrect) {
                          cardStyle = 'border-emerald-300 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-500/20';
                          badgeStyle = 'bg-emerald-600 text-white';
                        } else if (isThisUserChoice && !isThisCorrect) {
                          cardStyle = 'border-rose-300 bg-rose-50/70 text-rose-950 ring-1 ring-rose-500/20';
                          badgeStyle = 'bg-rose-600 text-white';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-3.5 rounded-xl border flex items-center gap-3 transition-colors ${cardStyle}`}
                          >
                            <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${badgeStyle}`}>
                              {OPTION_LETTERS[optIdx]}
                            </span>
                            <span className="text-xs sm:text-sm font-medium flex-1">
                              {optText}
                            </span>
                            {isThisCorrect && (
                              <span className="text-xs font-bold text-emerald-700 shrink-0 flex items-center gap-1">
                                <Check className="w-4 h-4" />
                                Correct Key
                              </span>
                            )}
                            {isThisUserChoice && !isThisCorrect && (
                              <span className="text-xs font-bold text-rose-600 shrink-0 flex items-center gap-1">
                                <X className="w-4 h-4" />
                                Your Answer
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed Explanation Note */}
                    <div className="mt-3 p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-blue-950 flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-blue-900 font-semibold block mb-0.5">Explanation:</strong>
                        <span>{question.explanation}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-12 text-center text-slate-500">
                <p className="font-semibold text-slate-700">No questions match this review filter.</p>
                <button
                  onClick={() => setActiveReviewFilter('all')}
                  className="mt-2 text-xs text-blue-600 font-semibold hover:underline"
                >
                  Show all questions
                </button>
              </div>
            )}
          </div>

          {/* Footer review buttons */}
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Return to Candidate Dashboard</span>
            </Link>

            <button
              onClick={() => navigate(`/exam/${result.examId}`)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake This Exam</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
