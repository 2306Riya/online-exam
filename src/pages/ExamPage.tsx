import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useExam } from '../context/ExamContext';
import { SAMPLE_EXAMS } from '../data/exams';
import { InstructionsScreen } from '../components/exam/InstructionsScreen';
import { ExamTimer } from '../components/exam/ExamTimer';
import { QuestionView } from '../components/exam/QuestionView';
import { QuestionPalette } from '../components/exam/QuestionPalette';
import { SubmitConfirmModal } from '../components/exam/SubmitConfirmModal';
import { ExamResult } from '../types';
import { 
  ArrowLeft, 
  Send, 
  Menu, 
  X, 
  AlertCircle 
} from 'lucide-react';

export const ExamPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { saveResult } = useExam();

  // Find target exam
  const exam = useMemo(() => {
    return SAMPLE_EXAMS.find((e) => e.id === examId);
  }, [examId]);

  // Exam phase: 'instructions' | 'in_progress' | 'submitted'
  const [examStatus, setExamStatus] = useState<'instructions' | 'in_progress' | 'submitted'>('instructions');

  // Question navigation state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // User responses: questionId -> selectedOption (0, 1, 2, 3)
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});

  // Marked for review questionIds
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);

  // Time state
  const totalSeconds = (exam?.durationMinutes || 10) * 60;
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);

  // Confirmation modal state
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Mobile drawer for Question Palette
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState(false);

  // Reset states if exam changes
  useEffect(() => {
    if (exam) {
      setSecondsRemaining(exam.durationMinutes * 60);
      setUserAnswers({});
      setMarkedForReview([]);
      setCurrentQuestionIndex(0);
      setExamStatus('instructions');
    }
  }, [exam]);

  // Handle Option selection
  const handleSelectOption = (optionIndex: number) => {
    if (!exam) return;
    const currentQ = exam.questions[currentQuestionIndex];
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
  };

  // Clear chosen option
  const handleClearOption = () => {
    if (!exam) return;
    const currentQ = exam.questions[currentQuestionIndex];
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  // Toggle Marked for review
  const handleToggleMarkForReview = () => {
    if (!exam) return;
    const currentQ = exam.questions[currentQuestionIndex];
    setMarkedForReview((prev) => {
      if (prev.includes(currentQ.id)) {
        return prev.filter((id) => id !== currentQ.id);
      } else {
        return [...prev, currentQ.id];
      }
    });
  };

  // Final calculation and submission
  const performSubmission = useCallback(() => {
    if (!exam || !currentUser || examStatus === 'submitted') return;

    setExamStatus('submitted');

    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    exam.questions.forEach((q) => {
      const selected = userAnswers[q.id];
      if (selected === undefined) {
        unansweredCount++;
      } else if (selected === q.correctAnswer) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    const score = correctCount;
    const percentage = Math.round((correctCount / exam.totalQuestions) * 100);
    const isPassed = percentage >= exam.passingPercentage;
    const timeSpentSeconds = totalSeconds - secondsRemaining;

    const resultId = `res-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const examResult: ExamResult = {
      id: resultId,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      examId: exam.id,
      examTitle: exam.title,
      subject: exam.subject,
      score,
      totalQuestions: exam.totalQuestions,
      correctCount,
      wrongCount,
      unansweredCount,
      percentage,
      isPassed,
      timeSpentSeconds,
      completedAt: new Date().toISOString(),
      userAnswers: { ...userAnswers },
      markedForReview: [...markedForReview],
    };

    saveResult(examResult);
    navigate(`/results/${resultId}`, { replace: true });
  }, [exam, currentUser, examStatus, userAnswers, markedForReview, totalSeconds, secondsRemaining, saveResult, navigate]);

  // Auto-submit when timer expires
  const handleTimeUp = useCallback(() => {
    setIsSubmitModalOpen(false);
    performSubmission();
  }, [performSubmission]);

  const handleTimerTick = useCallback(() => {
    setSecondsRemaining((prev) => Math.max(0, prev - 1));
  }, []);

  if (!exam) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center max-w-md shadow-sm">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">Exam Not Found</h2>
          <p className="text-sm text-slate-600 mb-6">
            The examination you are trying to access does not exist or may have been removed.
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

  // 1. Instructions Screen
  if (examStatus === 'instructions') {
    return (
      <div className="min-h-screen bg-slate-50/70">
        <InstructionsScreen
          exam={exam}
          onStart={() => setExamStatus('in_progress')}
        />
      </div>
    );
  }

  // 2. In Progress Exam View
  const currentQuestion = exam.questions[currentQuestionIndex];
  const questionIds = exam.questions.map((q) => q.id);

  const answeredCount = Object.keys(userAnswers).filter(
    (id) => userAnswers[Number(id)] !== undefined
  ).length;
  const unansweredCount = exam.totalQuestions - answeredCount;

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col">
      {/* Exam Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: Exam title & back caution */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Leave / Submit"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-bold text-slate-900 text-sm sm:text-base leading-tight truncate max-w-[200px] sm:max-w-md">
                {exam.title}
              </h1>
              <span className="text-[11px] text-blue-600 font-semibold">
                {exam.subject} • Q{currentQuestionIndex + 1}/{exam.totalQuestions}
              </span>
            </div>
          </div>

          {/* Right: Timer & Submit Button */}
          <div className="flex items-center gap-3">
            <ExamTimer
              totalSeconds={totalSeconds}
              secondsRemaining={secondsRemaining}
              onTick={handleTimerTick}
              onTimeUp={handleTimeUp}
            />

            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit</span>
            </button>

            {/* Mobile palette drawer button */}
            <button
              type="button"
              onClick={() => setIsMobilePaletteOpen(!isMobilePaletteOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
              aria-label="Toggle Question Navigator"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Progress Line */}
        <div className="w-full bg-slate-100 h-1">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / exam.totalQuestions) * 100}%`,
            }}
          />
        </div>
      </header>

      {/* Main Examination Work Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Question View (8 cols) */}
          <div className="lg:col-span-8">
            <QuestionView
              question={currentQuestion}
              questionIndex={currentQuestionIndex}
              totalQuestions={exam.totalQuestions}
              selectedOption={userAnswers[currentQuestion.id]}
              isMarkedForReview={markedForReview.includes(currentQuestion.id)}
              onSelectOption={handleSelectOption}
              onClearOption={handleClearOption}
              onToggleMarkForReview={handleToggleMarkForReview}
              onNext={() =>
                setCurrentQuestionIndex((prev) =>
                  Math.min(exam.totalQuestions - 1, prev + 1)
                )
              }
              onPrev={() =>
                setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
              }
              onSubmitClick={() => setIsSubmitModalOpen(true)}
            />
          </div>

          {/* Desktop Palette Navigator (4 cols) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24">
            <QuestionPalette
              totalQuestions={exam.totalQuestions}
              currentIndex={currentQuestionIndex}
              userAnswers={userAnswers}
              markedForReview={markedForReview}
              questionIds={questionIds}
              onSelectIndex={(idx) => setCurrentQuestionIndex(idx)}
              onSubmitClick={() => setIsSubmitModalOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Mobile Navigator Drawer */}
      {isMobilePaletteOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs"
            onClick={() => setIsMobilePaletteOpen(false)}
          />
          <div className="relative ml-auto w-80 max-w-full bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-base">Question Navigator</span>
              <button
                onClick={() => setIsMobilePaletteOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4">
              <QuestionPalette
                totalQuestions={exam.totalQuestions}
                currentIndex={currentQuestionIndex}
                userAnswers={userAnswers}
                markedForReview={markedForReview}
                questionIds={questionIds}
                onSelectIndex={(idx) => {
                  setCurrentQuestionIndex(idx);
                  setIsMobilePaletteOpen(false);
                }}
                onSubmitClick={() => {
                  setIsMobilePaletteOpen(false);
                  setIsSubmitModalOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirmation Dialog */}
      <SubmitConfirmModal
        isOpen={isSubmitModalOpen}
        totalQuestions={exam.totalQuestions}
        answeredCount={answeredCount}
        unansweredCount={unansweredCount}
        markedCount={markedForReview.length}
        secondsRemaining={secondsRemaining}
        onCancel={() => setIsSubmitModalOpen(false)}
        onConfirm={() => {
          setIsSubmitModalOpen(false);
          performSubmission();
        }}
      />
    </div>
  );
};
