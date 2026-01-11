'use client';

import { ComparisonResult } from '@/types/comparison';

interface ComparisonChartProps {
  result: ComparisonResult;
}

export const ComparisonChart = ({ result }: ComparisonChartProps) => {
  const { optionA, optionB, recommendation, useCase } = result;

  const RadarChart = () => {
    const metrics = [
      { name: 'Performance', scoreA: optionA.score * 0.9, scoreB: optionB.score * 0.85 },
      { name: 'Scalability', scoreA: optionA.score * 0.95, scoreB: optionB.score * 0.9 },
      { name: 'Developer Experience', scoreA: optionA.score * 0.8, scoreB: optionB.score * 1.1 },
      { name: 'Community Support', scoreA: optionA.score * 1.1, scoreB: optionB.score * 0.8 },
      { name: 'Learning Curve', scoreA: optionA.score * 0.7, scoreB: optionB.score * 1.2 },
      { name: 'Maintenance', scoreA: optionA.score * 1.0, scoreB: optionB.score * 0.95 }
    ];

    const centerX = 150;
    const centerY = 150;
    const radius = 100;
    const angleStep = (2 * Math.PI) / metrics.length;

    const getPoint = (value: number, index: number) => {
      const angle = index * angleStep - Math.PI / 2;
      const distance = (value / 10) * radius;
      return {
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance
      };
    };

    const pathA = metrics.map((metric, index) => {
      const point = getPoint(Math.min(metric.scoreA, 10), index);
      return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
    }).join(' ') + ' Z';

    const pathB = metrics.map((metric, index) => {
      const point = getPoint(Math.min(metric.scoreB, 10), index);
      return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
    }).join(' ') + ' Z';

    return (
      <div className="cyber-card p-6 rounded-lg border-green-400 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
        <h3 className="text-xl font-bold text-green-400 mb-4 uppercase tracking-wider text-center">
          [PERFORMANCE RADAR]
        </h3>
        
        <div className="flex justify-center">
          <svg width="300" height="300" className="overflow-visible">
            {/* Grid circles */}
            {[2, 4, 6, 8, 10].map(value => (
              <circle
                key={value}
                cx={centerX}
                cy={centerY}
                r={(value / 10) * radius}
                fill="none"
                stroke="rgba(0, 255, 255, 0.2)"
                strokeWidth="1"
              />
            ))}
            
            {/* Grid lines */}
            {metrics.map((_, index) => {
              const angle = index * angleStep - Math.PI / 2;
              const endX = centerX + Math.cos(angle) * radius;
              const endY = centerY + Math.sin(angle) * radius;
              return (
                <line
                  key={index}
                  x1={centerX}
                  y1={centerY}
                  x2={endX}
                  y2={endY}
                  stroke="rgba(0, 255, 255, 0.3)"
                  strokeWidth="1"
                />
              );
            })}
            
            {/* Option A polygon */}
            <path
              d={pathA}
              fill="rgba(0, 255, 255, 0.2)"
              stroke="#00ffff"
              strokeWidth="2"
              className="animate-pulse"
            />
            
            {/* Option B polygon */}
            <path
              d={pathB}
              fill="rgba(255, 0, 255, 0.2)"
              stroke="#ff00ff"
              strokeWidth="2"
              className="animate-pulse"
              style={{ animationDelay: '0.5s' }}
            />
            
            {/* Labels */}
            {metrics.map((metric, index) => {
              const angle = index * angleStep - Math.PI / 2;
              const labelX = centerX + Math.cos(angle) * (radius + 20);
              const labelY = centerY + Math.sin(angle) * (radius + 20);
              return (
                <text
                  key={metric.name}
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-gray-300 text-xs font-mono"
                >
                  {metric.name}
                </text>
              );
            })}
          </svg>
        </div>
        
        <div className="flex justify-center space-x-8 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-cyan-400 rounded"></div>
            <span className="text-cyan-400 font-mono text-sm">{optionA.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-pink-400 rounded"></div>
            <span className="text-pink-400 font-mono text-sm">{optionB.name}</span>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
      </div>
    );
  };

  const BarChart = () => {
    const categories = [
      { name: 'Strengths', countA: optionA.strengths.length, countB: optionB.strengths.length, color: 'green' },
      { name: 'Weaknesses', countA: optionA.weaknesses.length, countB: optionB.weaknesses.length, color: 'red' },
      { name: 'Trade-offs', countA: optionA.tradeOffs.length, countB: optionB.tradeOffs.length, color: 'orange' }
    ];

    const maxCount = Math.max(...categories.flatMap(cat => [cat.countA, cat.countB]));

    return (
      <div className="cyber-card p-6 rounded-lg border-orange-400 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
        <h3 className="text-xl font-bold text-orange-400 mb-4 uppercase tracking-wider text-center">
          [ANALYSIS BREAKDOWN]
        </h3>
        
        <div className="space-y-6">
          {categories.map((category, index) => (
            <div key={category.name} className="space-y-2">
              <h4 className={`text-${category.color}-400 font-bold uppercase tracking-wider text-sm`}>
                {category.name}
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Option A Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-cyan-400 font-mono">{optionA.name}</span>
                    <span className="text-white font-mono">{category.countA}</span>
                  </div>
                  <div className="h-4 bg-black border border-cyan-400/30 rounded overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${(category.countA / maxCount) * 100}%`,
                        boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
                      }}
                    />
                  </div>
                </div>
                
                {/* Option B Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-pink-400 font-mono">{optionB.name}</span>
                    <span className="text-white font-mono">{category.countB}</span>
                  </div>
                  <div className="h-4 bg-black border border-pink-400/30 rounded overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-400 to-pink-600 transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${(category.countB / maxCount) * 100}%`,
                        boxShadow: '0 0 10px rgba(255, 0, 255, 0.5)',
                        animationDelay: `${index * 0.2}s`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
      </div>
    );
  };

  const ScoreComparison = () => {
    const scoreDiff = Math.abs(optionA.score - optionB.score);
    const winner = optionA.score > optionB.score ? 'A' : optionB.score > optionA.score ? 'B' : 'TIE';
    
    return (
      <div className="cyber-card p-6 rounded-lg border-purple-400 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
        <h3 className="text-xl font-bold text-purple-400 mb-4 uppercase tracking-wider text-center">
          [SCORE ANALYSIS]
        </h3>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Option A Score */}
          <div className="text-center space-y-4">
            <h4 className="text-cyan-400 font-bold uppercase tracking-wider">ALPHA</h4>
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="rgba(0, 255, 255, 0.2)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#00ffff"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(optionA.score / 10) * 351.86} 351.86`}
                  className="transition-all duration-2000 ease-out"
                  style={{ 
                    filter: 'drop-shadow(0 0 10px #00ffff)',
                    strokeLinecap: 'round'
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-cyan-400 font-mono">{optionA.score}</span>
              </div>
            </div>
            <p className="text-cyan-400 font-mono text-sm">{optionA.name}</p>
          </div>
          
          {/* Option B Score */}
          <div className="text-center space-y-4">
            <h4 className="text-pink-400 font-bold uppercase tracking-wider">BETA</h4>
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="rgba(255, 0, 255, 0.2)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#ff00ff"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(optionB.score / 10) * 351.86} 351.86`}
                  className="transition-all duration-2000 ease-out"
                  style={{ 
                    filter: 'drop-shadow(0 0 10px #ff00ff)',
                    strokeLinecap: 'round',
                    animationDelay: '0.5s'
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-pink-400 font-mono">{optionB.score}</span>
              </div>
            </div>
            <p className="text-pink-400 font-mono text-sm">{optionB.name}</p>
          </div>
        </div>
        
        <div className="text-center mt-6 p-4 border border-purple-400/30 rounded">
          <p className="text-purple-400 font-mono text-sm">
            {winner === 'TIE' 
              ? 'SCORES ARE TIED - DECISION BASED ON USE CASE' 
              : `OPTION ${winner} LEADS BY ${scoreDiff.toFixed(1)} POINTS`
            }
          </p>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Use Case */}
      <div className="cyber-card p-4 rounded-lg border-blue-400 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
        <h3 className="font-bold text-blue-400 mb-2 uppercase tracking-wider text-sm">
          &gt; MISSION PARAMETERS
        </h3>
        <p className="text-gray-300 font-mono text-sm">{useCase}</p>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        <ScoreComparison />
        <BarChart />
      </div>
      
      <RadarChart />

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