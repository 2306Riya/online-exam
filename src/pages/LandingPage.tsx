import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, 
  ArrowRight, 
  Clock, 
  Award, 
  CheckCircle2, 
  BarChart3, 
  UserPlus, 
  BookOpen, 
  HelpCircle, 
  ShieldCheck, 
  Sparkles,
  Zap
} from 'lucide-react';
import { SAMPLE_EXAMS } from '../data/exams';

export const LandingPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-slate-900 text-white pt-16 pb-24 md:pt-24 md:pb-32">
        {/* Subtle background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[300px] h-[300px] bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Top Tag Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Next-Generation Online Examination Suite</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight sm:leading-tight mb-6">
              Online Examination <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-300">
                Platform for Smart Learners
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-blue-100/90 leading-relaxed max-w-2xl mx-auto mb-10">
              Test your knowledge with timed multiple-choice assessments across 6 core subjects. Enjoy instant grading, in-depth question reviews, and progress tracking with zero hassle.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {currentUser ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-slate-900 bg-white hover:bg-blue-50 shadow-lg shadow-black/20 hover:shadow-xl transition-all"
                >
                  <span>Go to My Dashboard</span>
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </button>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-slate-900 bg-white hover:bg-blue-50 shadow-lg shadow-black/20 hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Create Free Account</span>
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                  </Link>
                  <Link
                    to="/signin"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all"
                  >
                    <span>Sign In</span>
                  </Link>
                </>
              )}
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-10 border-t border-white/10 text-left">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-300">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Real-Time</p>
                  <p className="text-xs text-blue-200">Auto-submit Timers</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Instant Results</p>
                  <p className="text-xs text-blue-200">Immediate 40% Pass Check</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Review Every Q</p>
                  <p className="text-xs text-blue-200">Detailed Explanations</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Browser Stored</p>
                  <p className="text-xs text-blue-200">Private in localStorage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest block mb-2">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              How ExamiPro Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              From signing up to analyzing your final score, experience a seamless test journey designed for focus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 relative hover:border-blue-400 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-lg mb-5 shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                Sign Up
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Create your candidate account with your name, email, and password in just a few clicks. No setup fee.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 relative hover:border-blue-400 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-lg mb-5 shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                Choose an Exam
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Select from General Knowledge, Math, Science, English, Computer Basics, or Logical Reasoning.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 relative hover:border-blue-400 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-teal-600 text-white font-bold flex items-center justify-center text-lg mb-5 shadow-sm shadow-teal-500/20 group-hover:scale-105 transition-transform">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                Take the Test
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Read questions one-by-one with 4 options, a countdown timer, navigation palette, and review flags.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 relative hover:border-blue-400 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-lg mb-5 shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                See Your Result
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Receive instant grade metrics (Pass/Fail at 40%), answer analysis, and step-by-step solutions for every question.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Exams Showcase */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-blue-600 font-bold text-xs uppercase tracking-widest block mb-2">
                Available Mock Exams
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Explore Our Test Catalog
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Each mock examination contains 10 rigorous multiple choice questions with 4 distinct options.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to={currentUser ? "/dashboard" : "/signup"}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                <span>View All Exams & Start</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_EXAMS.map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-all hover:border-blue-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      {exam.subject}
                    </span>
                    <span className="text-xs text-slate-600 font-medium">
                      {exam.durationMinutes} mins
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">
                    {exam.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-4">
                    {exam.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">
                    10 Questions • 4 Options
                  </span>
                  <Link
                    to={currentUser ? `/exam/${exam.id}` : "/signin"}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    <span>Attempt Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready Banner */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Ready to test your readiness today?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Create your account in under 30 seconds or test right away using our built-in demo profile.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-3.5 rounded-xl bg-white text-blue-700 font-bold text-sm shadow-lg hover:bg-blue-50 transition-all"
            >
              Get Started Free
            </Link>
            <Link
              to="/signin"
              className="px-8 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm border border-blue-500 transition-all"
            >
              Sign In to Your Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
