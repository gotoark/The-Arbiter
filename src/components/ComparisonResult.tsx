'use client';

import { ComparisonResult } from '@/types/comparison';

interface ComparisonResultProps {
  result: ComparisonResult;
}

export const ComparisonResultComponent = ({ result }: ComparisonResultProps) => {
  const { optionA, optionB, recommendation, useCase } = result;

  const ScoreBar = ({ score, label }: { score: number; label: string }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{label}</span>
        <span className="text-lg font-bold text-white font-mono">{score}/10</span>
      </div>
      <div className="relative h-3 bg-black border border-cyan-400/30 rounded overflow-hidden">
        <div
          className="score-bar h-full transition-all duration-1000 ease-out"
          style={{ width: `${score * 10}%` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
      </div>
    </div>
  );

  const OptionCard = ({ option, label, color }: { 
    option: typeof optionA; 
    label: string; 
    color: 'cyan' | 'pink' 
  }) => {
    const colorClasses = {
      cyan: 'border-cyan-400 text-cyan-400',
      pink: 'border-pink-400 text-pink-400'
    };

    return (
      <div className={`cyber-card p-6 rounded-lg relative scan-lines ${colorClasses[color]}`}>
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${color}-400 to-transparent`}></div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold uppercase tracking-wider font-mono">[{label}]</h3>
          </div>
          <h4 className="text-2xl font-bold neon-text mb-4">{option.name}</h4>
          <ScoreBar score={option.score} label="SYSTEM RATING" />
        </div>
        
        <div className="space-y-6">
          <div>
            <h5 className="font-bold text-green-400 mb-3 uppercase tracking-wider text-sm">
              &gt; ADVANTAGES
            </h5>
            <div className="space-y-2">
              {option.strengths.map((strength, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-green-400 mt-1">▶</span>
                  <span className="text-sm text-gray-300 font-mono">{strength}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-bold text-red-400 mb-3 uppercase tracking-wider text-sm">
              &gt; VULNERABILITIES
            </h5>
            <div className="space-y-2">
              {option.weaknesses.map((weakness, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-red-400 mt-1">▶</span>
                  <span className="text-sm text-gray-300 font-mono">{weakness}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-bold text-orange-400 mb-3 uppercase tracking-wider text-sm">
              &gt; TRADE-OFFS
            </h5>
            <div className="space-y-2">
              {option.tradeOffs.map((tradeOff, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-orange-400 mt-1">▶</span>
                  <span className="text-sm text-gray-300 font-mono">{tradeOff}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${color}-400 to-transparent`}></div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="cyber-card p-6 rounded-lg border-blue-400 relative scan-lines">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
        <h3 className="font-bold text-blue-400 mb-4 uppercase tracking-wider text-sm">
          &gt; MISSION PARAMETERS
        </h3>
        <p className="text-gray-300 font-mono text-sm leading-relaxed">{useCase}</p>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <OptionCard option={optionA} label="ALPHA" color="cyan" />
        <OptionCard option={optionB} label="BETA" color="pink" />
      </div>

      <div className="cyber-card p-8 rounded-lg border-yellow-400 relative scan-lines">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
        <h3 className="text-2xl font-bold text-yellow-400 mb-6 uppercase tracking-wider neon-text">
          [ARBITER VERDICT]
        </h3>
        <div className="text-gray-300 font-mono leading-relaxed text-sm space-y-2">
          {recommendation.split('. ').map((sentence, index) => (
            <p key={index} className="border-l-2 border-yellow-400/30 pl-4">
              {sentence}{sentence.endsWith('.') ? '' : '.'}
            </p>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
      </div>
    </div>
  );
};