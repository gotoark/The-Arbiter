'use client';

import { useState, useRef, useEffect } from 'react';
import { ComparisonForm } from '@/components/ComparisonForm';
import { ComparisonResultComponent } from '@/components/ComparisonResult';
import { ComparisonTable } from '@/components/ComparisonTable';
import { ComparisonChart } from '@/components/ComparisonChart';
import { ShareDownloadActions } from '@/components/ShareDownloadActions';
import { SpaceBackground } from '@/components/SpaceBackground';
import { ComparisonRequest, ComparisonResult } from '@/types/comparison';

export default function Home() {
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table' | 'chart'>('cards');
  const resultsRef = useRef<HTMLDivElement>(null);

  // Scroll to results when they become available
  useEffect(() => {
    if (result && resultsRef.current) {
      // Small delay to ensure the content is rendered
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [result]);

  const handleCompare = async (data: ComparisonRequest) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/compare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'SYSTEM FAILURE - COMPARISON ABORTED');
      }

      const comparisonResult: ComparisonResult = await response.json();
      setResult(comparisonResult);
    } catch (err) {
      console.error('API Error:', err);
      
      // Show mock data when API fails
      const { getMockComparison } = await import('@/lib/mockData');
      const mockResult = getMockComparison(data.techStackA, data.techStackB, data.useCase);
      
      setResult(mockResult);
      setError('API TEMPORARILY OFFLINE - DISPLAYING DEMO DATA FROM ARBITER ARCHIVES');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SpaceBackground />
      <main className="min-h-screen py-8 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent blur-lg"></div>
            <h1 
              className="text-6xl md:text-8xl font-black text-cyan-400 mb-4 glitch neon-text-title relative z-10"
              data-text="THE ARBITER"
            >
              THE ARBITER
            </h1>
            <div className="flex items-center justify-center space-x-4 mb-2">
              <div className="h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent flex-1"></div>
              <span className="text-pink-400 font-mono text-sm tracking-widest uppercase">
                TECH STACK REFEREE SYSTEM
              </span>
              <div className="h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent flex-1"></div>
            </div>
            <p className="text-gray-400 font-mono text-sm tracking-wider uppercase">
              OBJECTIVE ANALYSIS • ZERO BIAS • PURE DATA
            </p>
          </div>

          {/* Status indicators */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-mono text-xs uppercase">GROK API ONLINE</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 font-mono text-xs uppercase">ARBITER READY</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              <span className="text-pink-400 font-mono text-xs uppercase">ANALYSIS ENGINE ACTIVE</span>
            </div>
          </div>

          {/* Form */}
          <div className="mb-12">
            <ComparisonForm onSubmit={handleCompare} isLoading={isLoading} />
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-8 cyber-card p-6 rounded-lg border-yellow-400 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
              <div className="flex items-center space-x-3">
                <div className="text-yellow-400 text-2xl">⚠</div>
                <div>
                  <h3 className="text-yellow-400 font-bold uppercase tracking-wider text-sm mb-1">
                    SYSTEM NOTICE
                  </h3>
                  <p className="text-gray-300 font-mono text-sm">{error}</p>
                  <p className="text-gray-400 font-mono text-xs mt-2">
                    ARBITER PROTOCOL: FALLBACK DATA ACTIVATED FOR DEMONSTRATION
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div ref={resultsRef} className="mb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-yellow-400 uppercase tracking-wider neon-text">
                  [ANALYSIS COMPLETE]
                </h2>
                <div className="mt-2 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
              </div>
              
              {/* Share & Download Actions */}
              <ShareDownloadActions result={result} resultsRef={resultsRef} />
              
              {/* View Toggle */}
              <div className="flex justify-center mb-8">
                <div className="cyber-card p-2 rounded-lg border-purple-400 flex space-x-2">
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`px-4 py-2 rounded font-mono text-sm uppercase tracking-wider transition-all ${
                      viewMode === 'cards'
                        ? 'bg-purple-400/20 text-purple-400 border border-purple-400'
                        : 'text-gray-400 hover:text-purple-400'
                    }`}
                  >
                    [ CARD VIEW ]
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-4 py-2 rounded font-mono text-sm uppercase tracking-wider transition-all ${
                      viewMode === 'table'
                        ? 'bg-purple-400/20 text-purple-400 border border-purple-400'
                        : 'text-gray-400 hover:text-purple-400'
                    }`}
                  >
                    [ TABLE VIEW ]
                  </button>
                  <button
                    onClick={() => setViewMode('chart')}
                    className={`px-4 py-2 rounded font-mono text-sm uppercase tracking-wider transition-all ${
                      viewMode === 'chart'
                        ? 'bg-purple-400/20 text-purple-400 border border-purple-400'
                        : 'text-gray-400 hover:text-purple-400'
                    }`}
                  >
                    [ CHART VIEW ]
                  </button>
                </div>
              </div>

              {/* Results Display */}
              {viewMode === 'cards' ? (
                <ComparisonResultComponent result={result} />
              ) : viewMode === 'table' ? (
                <ComparisonTable result={result} />
              ) : (
                <ComparisonChart result={result} />
              )}
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-16 text-gray-500 font-mono text-xs relative">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-4"></div>
            <p>BUILT WITH AMAZON KIRO • POWERED BY GROQ AI •</p>
            
            {/* GitHub Link - Bottom Right Corner */}
            <div className="absolute bottom-0 right-0 mb-2">
              <a
                href="https://github.com/gotoark/the-arbiter"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-3 py-2 cyber-card border-gray-500 rounded font-mono text-xs uppercase tracking-wider hover:bg-gray-500/10 transition-all hover:border-cyan-400 hover:text-cyan-400"
                title="View source code on GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>[ GITHUB ]</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}