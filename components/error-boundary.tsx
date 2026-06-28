"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  resetKey?: string;
}
interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(err: unknown): State {
    return { hasError: true, message: err instanceof Error ? err.message : String(err) };
  }

  componentDidUpdate(prev: Props) {
    if (prev.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false, message: "" });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="grid h-full min-h-[120px] place-items-center p-4 text-center">
            <div>
              <p className="text-xs font-medium text-red-400">组件渲染失败</p>
              <p className="mt-1 line-clamp-2 text-[10px] text-[var(--muted-2)]">
                {this.state.message}
              </p>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
