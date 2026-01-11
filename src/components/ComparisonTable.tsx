'use client';

import { ComparisonResult } from '@/types/comparison';

interface ComparisonTableProps {
  result: ComparisonResult;
}

export const ComparisonTable = ({ result }: ComparisonTableProps) => {
  const { optionA, optionB, recommendation, useCase } = result;

  const ScoreCell = ({ score }: { score: number }) => (
    <div className="flex items-center space-x-2">
      <div className="w-16 bg-black border border-cyan-400/30 rounded overflow-hidden h-2">
        <div
          className="score-bar h-full transition-all duration-1000 ease-out"
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <span className="text-white font-mono font-bold">{score}/10</span>
    </div>
  );

  const ListCell = ({ items, color }: { items: string[]; color: string }) => (
    <div className="space-y-1 max-h-32 overflow-y-auto">
      {items.map((item, index) => (
        <div key={index} className="flex items-start space-x-2">
          <span className={`text-${color}-400 mt-1 text-xs`}>▶</span>
          <span className="text-gray-300 text-xs font-mono leading-relaxed">{item}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Use Case */}
      <div className="cyber-card p-4 rounded-lg border-blue-400 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
        <h3 className="font-bold text-blue-400 mb-2 uppercase tracking-wider text-sm">
          &gt; MISSION PARAMETERS
        </h3>
        <p className="text-gray-300 font-mono text-sm">{useCase}</p>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
      </div>

      {/* Comparison Table */}
      <div className="cyber-card rounded-lg border-cyan-400 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cyan-400/30">
                <th className="text-left p-4 text-cyan-400 font-bold uppercase tracking-wider text-sm">
                  METRIC
                </th>
                <th className="text-left p-4 text-cyan-400 font-bold uppercase tracking-wider text-sm border-l border-cyan-400/30">
                  ALPHA: {optionA.name}
                </th>
                <th className="text-left p-4 text-pink-400 font-bold uppercase tracking-wider text-sm border-l border-pink-400/30">
                  BETA: {optionB.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Score Row */}
              <tr className="border-b border-gray-600/30 hover:bg-gray-800/20 transition-colors">
                <td className="p-4 text-yellow-400 font-bold uppercase tracking-wider text-sm">
                  SYSTEM RATING
                </td>
                <td className="p-4 border-l border-cyan-400/30">
                  <ScoreCell score={optionA.score} />
                </td>
                <td className="p-4 border-l border-pink-400/30">
                  <ScoreCell score={optionB.score} />
                </td>
              </tr>

              {/* Strengths Row */}
              <tr className="border-b border-gray-600/30 hover:bg-gray-800/20 transition-colors">
                <td className="p-4 text-green-400 font-bold uppercase tracking-wider text-sm align-top">
                  ADVANTAGES
                </td>
                <td className="p-4 border-l border-cyan-400/30 align-top">
                  <ListCell items={optionA.strengths} color="green" />
                </td>
                <td className="p-4 border-l border-pink-400/30 align-top">
                  <ListCell items={optionB.strengths} color="green" />
                </td>
              </tr>

              {/* Weaknesses Row */}
              <tr className="border-b border-gray-600/30 hover:bg-gray-800/20 transition-colors">
                <td className="p-4 text-red-400 font-bold uppercase tracking-wider text-sm align-top">
                  VULNERABILITIES
                </td>
                <td className="p-4 border-l border-cyan-400/30 align-top">
                  <ListCell items={optionA.weaknesses} color="red" />
                </td>
                <td className="p-4 border-l border-pink-400/30 align-top">
                  <ListCell items={optionB.weaknesses} color="red" />
                </td>
              </tr>

              {/* Trade-offs Row */}
              <tr className="hover:bg-gray-800/20 transition-colors">
                <td className="p-4 text-orange-400 font-bold uppercase tracking-wider text-sm align-top">
                  TRADE-OFFS
                </td>
                <td className="p-4 border-l border-cyan-400/30 align-top">
                  <ListCell items={optionA.tradeOffs} color="orange" />
                </td>
                <td className="p-4 border-l border-pink-400/30 align-top">
                  <ListCell items={optionB.tradeOffs} color="orange" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
      </div>

      {/* Recommendation */}
      <div className="cyber-card p-6 rounded-lg border-yellow-400 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
        <h3 className="text-xl font-bold text-yellow-400 mb-4 uppercase tracking-wider neon-text">
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