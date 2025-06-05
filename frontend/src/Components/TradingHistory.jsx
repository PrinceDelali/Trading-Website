import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Eye,
  Trash2,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  DollarSign,
  BarChart3,
  FileText
} from 'lucide-react';

const TradingHistory = ({ user, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  // Mock trading history data
  const [analysisHistory] = useState([
    {
      id: 1,
      pair: 'EUR/USD',
      date: '2024-12-10',
      time: '14:30',
      recommendation: 'BUY',
      confidence: 87,
      entryPrice: '1.0820',
      targetPrice: '1.0890',
      stopLoss: '1.0780',
      status: 'completed',
      outcome: 'profit',
      profit: '+245',
      riskReward: '2.1',
      patterns: ['Double Bottom', 'Support Bounce'],
      image: '/chart1.jpg'
    },
    {
      id: 2,
      pair: 'GBP/USD',
      date: '2024-12-09',
      time: '09:15',
      recommendation: 'SELL',
      confidence: 92,
      entryPrice: '1.2650',
      targetPrice: '1.2580',
      stopLoss: '1.2720',
      status: 'completed',
      outcome: 'profit',
      profit: '+320',
      riskReward: '1.8',
      patterns: ['Head and Shoulders', 'Resistance Break'],
      image: '/chart2.jpg'
    },
    {
      id: 3,
      pair: 'USD/JPY',
      date: '2024-12-08',
      time: '16:45',
      recommendation: 'BUY',
      confidence: 78,
      entryPrice: '149.20',
      targetPrice: '150.80',
      stopLoss: '148.40',
      status: 'completed',
      outcome: 'loss',
      profit: '-180',
      riskReward: '1.5',
      patterns: ['Flag Pattern', 'Volume Spike'],
      image: '/chart3.jpg'
    },
    {
      id: 4,
      pair: 'AUD/USD',
      date: '2024-12-07',
      time: '11:20',
      recommendation: 'BUY',
      confidence: 85,
      entryPrice: '0.6520',
      targetPrice: '0.6580',
      stopLoss: '0.6480',
      status: 'active',
      outcome: 'pending',
      profit: '+45',
      riskReward: '2.0',
      patterns: ['Ascending Triangle', 'Moving Average Cross'],
      image: '/chart4.jpg'
    },
    {
      id: 5,
      pair: 'EUR/GBP',
      date: '2024-12-06',
      time: '13:10',
      recommendation: 'SELL',
      confidence: 89,
      entryPrice: '0.8591',
      targetPrice: '0.8520',
      stopLoss: '0.8640',
      status: 'completed',
      outcome: 'profit',
      profit: '+275',
      riskReward: '1.9',
      patterns: ['Bearish Engulfing', 'Trend Reversal'],
      image: '/chart5.jpg'
    },
    {
      id: 6,
      pair: 'USD/CAD',
      date: '2024-12-05',
      time: '08:30',
      recommendation: 'BUY',
      confidence: 73,
      entryPrice: '1.3456',
      targetPrice: '1.3520',
      stopLoss: '1.3400',
      status: 'stopped',
      outcome: 'loss',
      profit: '-150',
      riskReward: '1.6',
      patterns: ['Wedge Pattern', 'Oversold RSI'],
      image: '/chart6.jpg'
    }
  ]);

  // Filter and sort analyses
  const filteredAnalyses = analysisHistory
    .filter(analysis => {
      const matchesSearch = analysis.pair.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          analysis.recommendation.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || analysis.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'confidence':
          return b.confidence - a.confidence;
        case 'profit':
          return parseFloat(b.profit) - parseFloat(a.profit);
        default:
          return 0;
      }
    });

  // Calculate statistics
  const stats = {
    total: analysisHistory.length,
    completed: analysisHistory.filter(a => a.status === 'completed').length,
    active: analysisHistory.filter(a => a.status === 'active').length,
    totalProfit: analysisHistory
      .filter(a => a.status === 'completed')
      .reduce((sum, a) => sum + parseFloat(a.profit), 0),
    winRate: Math.round((analysisHistory.filter(a => a.outcome === 'profit').length / 
             analysisHistory.filter(a => a.status === 'completed').length) * 100)
  };

  // Header Component
  const Header = () => (
    <header className="bg-gray-900/60 backdrop-blur-xl border-b border-gray-700/50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Trading History
            </h1>
            <p className="text-gray-400 text-sm">Your complete analysis records</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-white font-medium">{user?.displayName || 'Trader'}</p>
            <p className="text-gray-400 text-sm">{user?.email}</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'T'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );

  // Stats Cards
  const StatsSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-6 border border-emerald-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Analyses</p>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </div>
          <FileText className="w-8 h-8 text-emerald-400" />
        </div>
      </div>

      <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-6 border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Completed</p>
            <p className="text-3xl font-bold text-white">{stats.completed}</p>
          </div>
          <CheckCircle className="w-8 h-8 text-blue-400" />
        </div>
      </div>

      <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-6 border border-yellow-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Active Trades</p>
            <p className="text-3xl font-bold text-white">{stats.active}</p>
          </div>
          <Clock className="w-8 h-8 text-yellow-400" />
        </div>
      </div>

      <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-6 border border-green-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Profit</p>
            <p className="text-3xl font-bold text-emerald-400">${stats.totalProfit}</p>
          </div>
          <DollarSign className="w-8 h-8 text-green-400" />
        </div>
      </div>

      <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Win Rate</p>
            <p className="text-3xl font-bold text-white">{stats.winRate}%</p>
          </div>
          <Target className="w-8 h-8 text-purple-400" />
        </div>
      </div>
    </div>
  );

  // Filters and Search
  const FiltersSection = () => (
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search analyses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
            <option value="stopped">Stopped</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
          >
            <option value="date">Sort by Date</option>
            <option value="confidence">Sort by Confidence</option>
            <option value="profit">Sort by Profit</option>
          </select>
        </div>

        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors text-white">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors text-white">
            <Filter className="w-4 h-4" />
            <span>Advanced Filters</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Analysis Card Component
  const AnalysisCard = ({ analysis }) => (
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm">{analysis.pair.split('/')[0]}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{analysis.pair}</h3>
            <p className="text-gray-400 text-sm">{analysis.date} at {analysis.time}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            analysis.status === 'completed' 
              ? 'bg-emerald-500/20 text-emerald-400' 
              : analysis.status === 'active'
              ? 'bg-yellow-500/20 text-yellow-400'
              : 'bg-red-500/20 text-red-400'
          }`}>
            {analysis.status.toUpperCase()}
          </div>
          <button className="p-1 text-gray-400 hover:text-white transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <p className="text-gray-400 text-xs mb-1">Recommendation</p>
          <p className={`font-semibold ${
            analysis.recommendation === 'BUY' ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {analysis.recommendation}
          </p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Confidence</p>
          <p className="text-white font-semibold">{analysis.confidence}%</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Entry Price</p>
          <p className="text-white font-semibold">{analysis.entryPrice}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Profit/Loss</p>
          <p className={`font-semibold ${
            parseFloat(analysis.profit) >= 0 ? 'text-emerald-400' : 'text-red-400'
          }`}>
            ${analysis.profit}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-gray-400 text-xs mb-1">Target</p>
          <p className="text-emerald-400 font-semibold">{analysis.targetPrice}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Stop Loss</p>
          <p className="text-red-400 font-semibold">{analysis.stopLoss}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Risk/Reward</p>
          <p className="text-white font-semibold">{analysis.riskReward}:1</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-400 text-xs mb-2">Detected Patterns</p>
        <div className="flex flex-wrap gap-2">
          {analysis.patterns.map((pattern, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-lg"
            >
              {pattern}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {analysis.outcome === 'profit' && (
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          )}
          {analysis.outcome === 'loss' && (
            <XCircle className="w-5 h-5 text-red-400" />
          )}
          {analysis.outcome === 'pending' && (
            <Clock className="w-5 h-5 text-yellow-400" />
          )}
          <span className="text-gray-400 text-sm capitalize">{analysis.outcome}</span>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedAnalysis(analysis)}
            className="flex items-center space-x-1 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors text-sm"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </button>
          <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // Analysis Detail Modal
  const AnalysisDetailModal = () => {
    if (!selectedAnalysis) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {selectedAnalysis.pair} Analysis Details
              </h2>
              <button
                onClick={() => setSelectedAnalysis(null)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Trade Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date & Time:</span>
                    <span className="text-white">{selectedAnalysis.date} {selectedAnalysis.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Currency Pair:</span>
                    <span className="text-white">{selectedAnalysis.pair}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Recommendation:</span>
                    <span className={selectedAnalysis.recommendation === 'BUY' ? 'text-emerald-400' : 'text-red-400'}>
                      {selectedAnalysis.recommendation}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Confidence:</span>
                    <span className="text-white">{selectedAnalysis.confidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-white capitalize">{selectedAnalysis.status}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Price Levels</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Entry Price:</span>
                    <span className="text-white">{selectedAnalysis.entryPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Target Price:</span>
                    <span className="text-emerald-400">{selectedAnalysis.targetPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Stop Loss:</span>
                    <span className="text-red-400">{selectedAnalysis.stopLoss}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Risk/Reward:</span>
                    <span className="text-white">{selectedAnalysis.riskReward}:1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current P&L:</span>
                    <span className={parseFloat(selectedAnalysis.profit) >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                      ${selectedAnalysis.profit}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Patterns */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Detected Patterns</h3>
              <div className="flex flex-wrap gap-3">
                {selectedAnalysis.patterns.map((pattern, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30"
                  >
                    {pattern}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4 pt-4 border-t border-gray-700">
              <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                Duplicate Analysis
              </button>
              <button className="px-6 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                Export Report
              </button>
              <button className="px-6 py-3 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                Delete Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        <Header />
        
        <main className="p-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Your Trading History
            </h2>
            <p className="text-gray-400">
              Track and analyze your trading performance over time
            </p>
          </div>

          <StatsSection />
          <FiltersSection />

          {/* Analysis Grid */}
          <div className="space-y-6">
            {filteredAnalyses.length > 0 ? (
              filteredAnalyses.map((analysis) => (
                <AnalysisCard key={analysis.id} analysis={analysis} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No analyses found</h3>
                <p className="text-gray-400 mb-6">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Try adjusting your search or filters' 
                    : 'Start by uploading your first chart for analysis'}
                </p>
                <button
                  onClick={() => onNavigate('upload')}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-200"
                >
                  Upload New Chart
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      <AnalysisDetailModal />
    </div>
  );
};

export default TradingHistory;