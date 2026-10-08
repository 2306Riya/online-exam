import React from 'react';
import { GraduationCap, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white">
                Exami<span className="text-blue-400">Pro</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Modern, secure, and intuitive online examination platform designed for self-paced evaluation and continuous learning.
            </p>
          </div>

          {/* Quick Features */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Platform Features
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Real-Time Countdown Timers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant Score Calculation</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Session Storage & Security</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Detailed Explanations & Review</span>
              </li>
            </ul>
          </div>

          {/* Available Subjects */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Subjects Offered
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-slate-400 hover:text-slate-200">General Knowledge</span>
              <span className="text-slate-400 hover:text-slate-200">Mathematics</span>
              <span className="text-slate-400 hover:text-slate-200">Science</span>
              <span className="text-slate-400 hover:text-slate-200">English Grammar</span>
              <span className="text-slate-400 hover:text-slate-200">Computer Basics</span>
              <span className="text-slate-400 hover:text-slate-200">Logical Reasoning</span>
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/signin" className="hover:text-white transition-colors">
                  Sign In to Account
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-white transition-colors">
                  Create New Account
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Candidate Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ExamiPro Platform. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span>Browser-based & Offline Storage Compatible</span>
            <span>Pass Mark: 40%</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
