import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error for debugging (will be stripped in production)
    console.error('⚠️ Component Error Boundary caught:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    globalThis.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Oops! Something broke</h2>
            <p className="text-white/60 mb-6">
              A component failed to load. This is usually temporary.
            </p>
            <button
              onClick={this.handleReload}
              className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              Reload Page
            </button>
            {import.meta.env.DEV && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-white/40 hover:text-white/60 text-sm">
                  Dev Info
                </summary>
                <pre className="mt-2 bg-white/5 p-3 rounded text-xs text-white/40 overflow-auto max-h-40">
                  {this.state.error?.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
