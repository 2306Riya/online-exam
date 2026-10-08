import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useExam } from '../context/ExamContext';
import { SAMPLE_EXAMS } from '../data/exams';
import { ExamCard } from '../components/dashboard/ExamCard';
import { ResultsTable } from '../components/dashboard/ResultsTable';
import { 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Clock, 
  Search, 
  TrendingUp, 
  Sparkles, 
  GraduationCap,
  Filter
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { getUserResults } = useExam();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const userResults = useMemo(() => {
    return currentUser ? getUserResults(currentUser.id) : [];
  }, [currentUser, getUserResults]);

  // Aggregate user stats
  const stats = useMemo(() => {
    const totalTaken = userResults.length;
    if (totalTaken === 0) {
      return { totalTaken: 0, passedCount: 0, avgPercentage: 0, highestScore: 0 };
    }
    const passedCount = userResults.filter((r) => r.isPassed).length;
    const totalPercentage = userResults.reduce((acc, r) => acc + r.percentage, 0);
    const avgPercentage = Math.round(totalPercentage / totalTaken);
    const highestScore = Math.max(...userResults.map((r) => r.percentage));

    return { totalTaken, passedCount, avgPercentage, highestScore };
  }, [userResults]);

  // Map latest result per exam for quick indicators
  const resultsByExamId = useMemo(() => {
    const map: Record<string, any> = {};
    userResults.forEach((r) => {
      if (!map[r.examId]) {
        map[r.examId] = r;
      }
    });
    return map;
  }, [userResults]);

  // Filter exams by query and category
  const filteredExams = useMemo(() => {
    return SAMPLE_EXAMS.filter((exam) => {
      const matchesSearch =
        exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || exam.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categories = ['All', 'General', 'Math', 'Science', 'Language', 'Tech', 'Aptitude'];

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white py-10 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Candidate Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Welcome back, {currentUser?.name}!
              </h1>
              <p className="text-blue-100 text-sm mt-1 max-w-xl">
                Ready for your next challenge? Choose an examination below, manage your time wisely, and review your historical progress.
              </p>
            </div>

            {/* Quick action jump */}
            <div className="flex items-center gap-3">
              <a
                href="#my-results"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold backdrop-blur-md transition-all flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>View My Results ({userResults.length})</span>
              </a>
              <a
                href="#available-exams"
                className="px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 text-xs sm:text-sm font-bold shadow-md shadow-black/10 transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Browse Exams</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Exams Taken
              </p>
              <p className="text-2xl font-black text-slate-900 mt-0.5">
                {stats.totalTaken}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Passed
              </p>
              <p className="text-2xl font-black text-emerald-700 mt-0.5">
                {stats.passedCount}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Average Score
              </p>
              <p className="text-2xl font-black text-indigo-700 mt-0.5">
                {stats.avgPercentage}%
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Top Score
              </p>
              <p className="text-2xl font-black text-amber-700 mt-0.5">
                {stats.highestScore}%
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Available Exams */}
        <section id="available-exams" className="mb-14 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Available Examinations
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Select an exam to read instructions and start your timed test. Pass mark is 40%.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search exams or subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 shadow-2xs"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
            <Filter className="w-4 h-4 text-slate-400 mr-1 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/20'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat === 'All' ? 'All Subjects' : cat}
              </button>
            ))}
          </div>

          {/* Grid of Exams */}
          {filteredExams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map((exam) => (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                  pastResult={resultsByExamId[exam.id]}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="font-semibold text-slate-700">No exams match your search</p>
              <p className="text-xs text-slate-600 mt-1">Try resetting the subject filter or query.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* Section 2: My Past Results */}
        <section id="my-results" className="scroll-mt-24">
          <ResultsTable results={userResults} />
        </section>
      </div>
    </div>
  );
};
