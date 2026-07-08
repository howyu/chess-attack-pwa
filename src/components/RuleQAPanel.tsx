import { FC, useState, useRef, useEffect } from 'react';
import { findBestMatch, getRelatedEntries, RuleEntry } from '../utils/chessRules';

interface RuleQAProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const RuleQAPanel: FC<RuleQAProps> = ({ isOpen, onToggle }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<RuleEntry | null>(null);
  const [relatedEntries, setRelatedEntries] = useState<RuleEntry[]>([]);
  const [history, setHistory] = useState<RuleEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSearch = (q?: string) => {
    const searchQuery = q || query;
    if (!searchQuery.trim()) return;

    const match = findBestMatch(searchQuery);
    if (match) {
      setResult(match.entry);
      setRelatedEntries(getRelatedEntries(match.entry.related));
      setHistory(prev => {
        const filtered = prev.filter(e => e.id !== match.entry.id);
        return [match.entry, ...filtered].slice(0, 10);
      });
    }
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleRelatedClick = (entry: RuleEntry) => {
    setResult(entry);
    setRelatedEntries(getRelatedEntries(entry.related));
    setHistory(prev => {
      const filtered = prev.filter(e => e.id !== entry.id);
      return [entry, ...filtered].slice(0, 10);
    });
  };

  // 预设的常见问题
  const quickQuestions = [
    '什么是吃过路兵',
    '王车易位怎么走',
    '怎么才算赢棋',
    '棋子走法有哪些',
    '什么是逼和',
  ];

  return (
    <div className="bg-gray-800 rounded-lg shadow-md text-gray-200 w-full lg:w-64">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-750 rounded-lg transition-colors"
      >
        <h3 className="font-bold text-sm flex items-center gap-1">
          <span>📖 规则问答</span>
        </h3>
        <span className="text-xs text-gray-400">{isOpen ? '收起 ▲' : '展开 ▼'}</span>
      </button>

      {isOpen && (
        <div className="px-3 pb-3 space-y-3">
          {/* 搜索框 */}
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入问题，如：什么是吃过路兵"
              className="w-full bg-gray-700 text-gray-200 text-xs rounded px-3 py-2 pr-10 border border-gray-600 focus:border-indigo-500 focus:outline-none transition-colors"
            />
            <button
              onClick={() => handleSearch()}
              disabled={!query.trim()}
              className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
            >
              🔍
            </button>
          </div>

          {/* 快速提问 */}
          {!result && (
            <div>
              <div className="text-xs text-gray-500 mb-2">💡 快速提问</div>
              <div className="flex flex-wrap gap-1">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setQuery(q);
                      handleSearch(q);
                    }}
                    className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition-colors text-gray-300"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 搜索结果 */}
          {result && (
            <div className="space-y-3 animate-fadeIn">
              {/* 关闭按钮 */}
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-indigo-400">{result.title}</span>
                <button
                  onClick={() => {
                    setResult(null);
                    setRelatedEntries([]);
                  }}
                  className="text-xs text-gray-500 hover:text-gray-300"
                >
                  ✕ 关闭
                </button>
              </div>

              {/* 内容 */}
              <div className="bg-gray-700/50 rounded p-3 text-xs leading-relaxed max-h-60 overflow-y-auto whitespace-pre-line">
                {result.content}
              </div>

              {/* 相关问题 */}
              {relatedEntries.length > 0 && (
                <div>
                  <div className="text-xs text-gray-500 mb-1">🔗 相关问题</div>
                  <div className="flex flex-wrap gap-1">
                    {relatedEntries.map((entry) => (
                      <button
                        key={entry.id}
                        onClick={() => handleRelatedClick(entry)}
                        className="text-xs bg-gray-700 hover:bg-indigo-800 px-2 py-1 rounded transition-colors text-gray-300"
                      >
                        {entry.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 历史记录 */}
          {!result && history.length > 0 && (
            <div>
              <div className="text-xs text-gray-500 mb-1">🕐 最近查看</div>
              <div className="flex flex-wrap gap-1">
                {history.slice(0, 5).map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => handleRelatedClick(entry)}
                    className="text-xs bg-gray-700/50 hover:bg-gray-700 px-2 py-1 rounded transition-colors text-gray-400"
                  >
                    {entry.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
