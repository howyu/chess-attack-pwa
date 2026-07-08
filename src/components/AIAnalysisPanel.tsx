import { FC } from 'react';

interface AIAnalysisResult {
  summary: string;
  materialAdvantage: string;
  controlAnalysis: string;
  keySquares: string[];
  suggestion: string;
  score: number;
}

interface AIAnalysisPanelProps {
  analysis: AIAnalysisResult | null;
  isLoading: boolean;
  error: string | null;
  onAnalyze: () => void;
  onClear: () => void;
}

export const AIAnalysisPanel: FC<AIAnalysisPanelProps> = ({
  analysis,
  isLoading,
  error,
  onAnalyze,
  onClear,
}) => {
  const getScoreColor = (score: number) => {
    if (score > 3) return 'text-blue-400';
    if (score > 0) return 'text-blue-300';
    if (score < -3) return 'text-red-400';
    if (score < 0) return 'text-red-300';
    return 'text-gray-400';
  };

  const getScoreBar = (score: number) => {
    // Map score (-10 to 10) to bar width and direction
    const pct = Math.abs(score) * 5; // 0-50%
    const isWhite = score >= 0;
    return (
      <div className="h-2 bg-gray-700 rounded overflow-hidden flex">
        <div
          className="h-full bg-blue-500 transition-all duration-500"
          style={{ width: isWhite ? `${pct}%` : '0%' }}
        />
        <div className="h-full bg-gray-600 flex-1" />
        <div
          className="h-full bg-red-500 transition-all duration-500"
          style={{ width: !isWhite ? `${pct}%` : '0%' }}
        />
      </div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 text-gray-200 w-full lg:w-64">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm flex items-center gap-1">
          <span>🤖 AI 局面点评</span>
        </h3>
        <div className="flex gap-1">
          {!analysis && !isLoading && (
            <button
              onClick={onAnalyze}
              className="px-3 py-1 text-xs bg-indigo-600 hover:bg-indigo-500 rounded transition-colors"
            >
              分析
            </button>
          )}
          {analysis && (
            <button
              onClick={onClear}
              className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-500 border-t-transparent mb-2" />
          <span className="text-xs text-gray-400">AI 分析中...</span>
        </div>
      )}

      {error && (
        <div className="text-red-400 text-xs py-2">
          {error}
          <button
            onClick={onAnalyze}
            className="ml-2 underline hover:text-red-300"
          >
            重试
          </button>
        </div>
      )}

      {analysis && !isLoading && (
        <div className="space-y-3 text-xs">
          {/* Score bar */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-blue-400">白方</span>
              <span className={`font-bold ${getScoreColor(analysis.score)}`}>
                {analysis.score > 0 ? '+' : ''}{analysis.score.toFixed(1)}
              </span>
              <span className="text-red-400">黑方</span>
            </div>
            {getScoreBar(analysis.score)}
          </div>

          {/* Summary */}
          <div className="bg-gray-700/50 rounded p-2 border-l-2 border-indigo-500">
            <p className="leading-relaxed">{analysis.summary}</p>
          </div>

          {/* Material */}
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-gray-400">
              <span>♟️</span>
              <span>{analysis.materialAdvantage}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <span>🎯</span>
              <span>{analysis.controlAnalysis}</span>
            </div>
          </div>

          {/* Key squares */}
          {analysis.keySquares.length > 0 && (
            <div>
              <div className="text-gray-500 mb-1">📍 关键格</div>
              {analysis.keySquares.map((sq, i) => (
                <div key={i} className="text-gray-300 pl-2 border-l border-gray-600 mb-1">
                  {sq}
                </div>
              ))}
            </div>
          )}

          {/* Suggestion */}
          <div className="bg-indigo-900/30 rounded p-2 border border-indigo-800/50">
            <p className="leading-relaxed text-indigo-200">{analysis.suggestion}</p>
          </div>
        </div>
      )}

      {!analysis && !isLoading && !error && (
        <div className="text-center py-4 text-gray-500 text-xs">
          点击「分析」获取 AI 对当前局面的点评
        </div>
      )}
    </div>
  );
};
