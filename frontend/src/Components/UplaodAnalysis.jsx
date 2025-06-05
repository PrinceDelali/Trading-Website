import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Image, 
  X, 
  FileImage, 
  Zap, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Camera,
  Sparkles,
  Brain,
  Target,
  Clock,
  BarChart3
} from 'lucide-react';

const UploadAnalysis = ({ user, onNavigate, onSignOut }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [selectedPair, setSelectedPair] = useState('EUR/USD');
  const [analysisType, setAnalysisType] = useState('comprehensive');
  const fileInputRef = useRef(null);

  const forexPairs = [
    'EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 
    'USD/CAD', 'EUR/GBP', 'GBP/JPY', 'EUR/JPY',
    'NZD/USD', 'USD/CHF', 'AUD/JPY', 'CAD/JPY'
  ];

  const analysisTypes = [
    { 
      id: 'quick', 
      name: 'Quick Analysis', 
      description: 'Basic trend and support/resistance',
      time: '~30 seconds',
      icon: <Zap className="w-5 h-5" />
    },
    { 
      id: 'comprehensive', 
      name: 'Comprehensive Analysis', 
      description: 'Complete technical analysis with entry/exit points',
      time: '~2 minutes',
      icon: <Brain className="w-5 h-5" />
    },
    { 
      id: 'advanced', 
      name: 'Advanced AI Analysis', 
      description: 'Deep learning pattern recognition with risk assessment',
      time: '~5 minutes',
      icon: <Sparkles className="w-5 h-5" />
    }
  ];

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Handle file selection
  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  // Remove file
  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setAnalysisComplete(false);
    setAnalysisResults(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Simulate AI analysis
  const performAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    
    // Simulate different analysis times based on type
    const analysisTime = analysisType === 'quick' ? 3000 : 
                        analysisType === 'comprehensive' ? 8000 : 15000;
    
    await new Promise(resolve => setTimeout(resolve, analysisTime));
    
    // Generate mock analysis results
    const mockResults = {
      pair: selectedPair,
      confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
      trend: Math.random() > 0.5 ? 'BULLISH' : 'BEARISH',
      recommendation: Math.random() > 0.5 ? 'BUY' : 'SELL',
      entryPrice: (1.0800 + (Math.random() - 0.5) * 0.01).toFixed(4),
      targetPrice: (1.0850 + (Math.random() - 0.5) * 0.01).toFixed(4),
      stopLoss: (1.0750 + (Math.random() - 0.5) * 0.01).toFixed(4),
      riskReward: (Math.random() * 2 + 1).toFixed(2),
      timeframe: '1H',
      patterns: [
        'Double Bottom Pattern',
        'Support Level Bounce',
        'Moving Average Crossover'
      ],
      technicalIndicators: {
        rsi: Math.floor(Math.random() * 40) + 30,
        macd: Math.random() > 0.5 ? 'Bullish' : 'Bearish',
        bollinger: 'Within bands',
        volume: 'Above average'
      },
      marketSentiment: Math.random() > 0.5 ? 'Positive' : 'Neutral',
      newsImpact: 'Low to Medium'
    };
    
    setAnalysisResults(mockResults);
    setIsAnalyzing(false);
    setAnalysisComplete(true);
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
            <Upload className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Chart Analysis
            </h1>
            <p className="text-gray-400 text-sm">AI-powered trading insights</p>
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

  // Analysis Results Component
  const AnalysisResults = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Analysis Results</h3>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
            <span className="text-emerald-400 font-semibold">Analysis Complete</span>
          </div>
        </div>

        {/* Main Recommendation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-600/50">
            <div className="flex items-center justify-center mb-3">
              <Target className="w-8 h-8 text-emerald-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Recommendation</h4>
            <p className={`text-2xl font-bold ${
              analysisResults.recommendation === 'BUY' ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {analysisResults.recommendation}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Confidence: {analysisResults.confidence}%
            </p>
          </div>

          <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-600/50">
            <div className="flex items-center justify-center mb-3">
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Market Trend</h4>
            <p className={`text-2xl font-bold ${
              analysisResults.trend === 'BULLISH' ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {analysisResults.trend}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              {analysisResults.timeframe} Timeframe
            </p>
          </div>

          <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-600/50">
            <div className="flex items-center justify-center mb-3">
              <BarChart3 className="w-8 h-8 text-purple-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Risk/Reward</h4>
            <p className="text-2xl font-bold text-white">{analysisResults.riskReward}:1</p>
            <p className="text-gray-400 text-sm mt-2">
              Favorable Ratio
            </p>
          </div>
        </div>

        {/* Trading Levels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <h5 className="text-emerald-400 font-semibold mb-2">Entry Price</h5>
            <p className="text-2xl font-bold text-white">{analysisResults.entryPrice}</p>
          </div>
          
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <h5 className="text-blue-400 font-semibold mb-2">Target Price</h5>
            <p className="text-2xl font-bold text-white">{analysisResults.targetPrice}</p>
          </div>
          
          <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
            <h5 className="text-red-400 font-semibold mb-2">Stop Loss</h5>
            <p className="text-2xl font-bold text-white">{analysisResults.stopLoss}</p>
          </div>
        </div>

        {/* Technical Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-600/50">
            <h5 className="text-lg font-semibold text-white mb-4">Detected Patterns</h5>
            <div className="space-y-3">
              {analysisResults.patterns.map((pattern, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300">{pattern}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-600/50">
            <h5 className="text-lg font-semibold text-white mb-4">Technical Indicators</h5>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">RSI:</span>
                <span className="text-white">{analysisResults.technicalIndicators.rsi}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">MACD:</span>
                <span className="text-white">{analysisResults.technicalIndicators.macd}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Bollinger Bands:</span>
                <span className="text-white">{analysisResults.technicalIndicators.bollinger}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Volume:</span>
                <span className="text-white">{analysisResults.technicalIndicators.volume}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={() => {
              // Save analysis logic
              alert('Analysis saved to history!');
              onNavigate('dashboard');
            }}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-200"
          >
            Save Analysis
          </button>
          <button
            onClick={removeFile}
            className="flex-1 py-3 px-6 bg-gray-800/50 border border-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            New Analysis
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex-1 py-3 px-6 bg-gray-800/50 border border-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        <Header />
        
        <main className="p-6 max-w-6xl mx-auto">
          {analysisComplete ? (
            <AnalysisResults />
          ) : (
            <div className="space-y-8">
              {/* Upload Section */}
              <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-8 border border-gray-700/50">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Upload Trading Chart for AI Analysis
                  </h2>
                  <p className="text-gray-400 text-lg">
                    Get instant professional insights powered by advanced AI
                  </p>
                </div>

                {!selectedFile ? (
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
                      dragActive 
                        ? 'border-emerald-500 bg-emerald-500/10' 
                        : 'border-gray-600 hover:border-emerald-500/50 hover:bg-emerald-500/5'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    
                    <div className="space-y-6">
                      <div className="flex justify-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                          <FileImage className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Drop your chart here or click to browse
                        </h3>
                        <p className="text-gray-400">
                          Supports JPG, PNG, GIF up to 10MB
                        </p>
                      </div>
                      
                      <button className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-200">
                        <Camera className="w-5 h-5" />
                        <span>Choose File</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* File Preview */}
                    <div className="relative">
                      <img
                        src={preview}
                        alt="Chart preview"
                        className="w-full max-h-96 object-contain rounded-lg bg-gray-800"
                      />
                      <button
                        onClick={removeFile}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Analysis Configuration */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Currency Pair
                        </label>
                        <select
                          value={selectedPair}
                          onChange={(e) => setSelectedPair(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                        >
                          {forexPairs.map(pair => (
                            <option key={pair} value={pair}>{pair}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Analysis Type
                        </label>
                        <div className="space-y-2">
                          {analysisTypes.map(type => (
                            <div
                              key={type.id}
                              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                analysisType === type.id
                                  ? 'border-emerald-500 bg-emerald-500/10'
                                  : 'border-gray-600 bg-gray-800/50 hover:border-emerald-500/50'
                              }`}
                              onClick={() => setAnalysisType(type.id)}
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`${
                                  analysisType === type.id ? 'text-emerald-400' : 'text-gray-400'
                                }`}>
                                  {type.icon}
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-white font-medium">{type.name}</h4>
                                  <p className="text-gray-400 text-sm">{type.description}</p>
                                </div>
                                <div className="text-gray-400 text-xs">{type.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Analyze Button */}
                    <button
                      onClick={performAnalysis}
                      disabled={isAnalyzing}
                      className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                          <span>Analyzing Chart...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-6 h-6" />
                          <span>Start AI Analysis</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Analysis Progress */}
              {isAnalyzing && (
                <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      AI Analysis in Progress
                    </h3>
                    <p className="text-gray-400">
                      Our advanced algorithms are analyzing your chart...
                    </p>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UploadAnalysis;