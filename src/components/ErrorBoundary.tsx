import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  moduleName?: string;
  language?: 'ar' | 'en';
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const isAr = this.props.language !== 'en';
      return (
        <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-rose-500/30 text-center space-y-4 my-4 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">
            {isAr ? `حدث خطأ غير متوقع في وحدة (${this.props.moduleName || 'النظام'})` : `An unexpected error occurred in (${this.props.moduleName || 'System'})`}
          </h3>
          <p className="text-xs font-mono text-rose-300 max-w-lg mx-auto bg-slate-950/80 p-3 rounded-xl border border-rose-500/20 text-left overflow-x-auto">
            {this.state.error?.message || 'Runtime exception caught successfully.'}
          </p>
          <div className="pt-2">
            <button
              onClick={this.handleReset}
              className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs inline-flex items-center gap-2 cursor-pointer transition-all shadow-md"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{isAr ? 'إعادة تحميل الوحدة' : 'Retry Module'}</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
