import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar, Cell } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Upload, 
  BarChart3, 
  DollarSign, 
  Activity, 
  Eye, 
  Calendar,
  Clock,
  Target,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Settings,
  LogOut,
  Bell,
  Maximize2,
  Minimize2,
  RefreshCw,
  Sun,
  Moon,
  EyeOff,
  History,
  Download,
  Share2,
  BarChart,
  TrendingDown as TrendDown,
  Filter,
  Search,
  Info
} from 'lucide-react';

const STOCK_SYMBOLS = ['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'NVDA', 'AMZN'];

const CandlestickBar = React.memo((props) => {
  const { payload, x, y, width, height } = props;
  if (!payload) return null;

  const { open, high, low, close, isGreen } = payload;
  const fillColor = isGreen ? '#10b981' : '#ef4444';
  const strokeColor = isGreen ? '#059669' : '#dc2626';
  const bodyWidth = Math.max(width * 0.7, 3);
  const bodyX = x + (width - bodyWidth) / 2;
  const highY = y;
  const lowY = y + height;
  const priceRange = Math.max(high - low, 1e-9);
  const openY = y + ((high - open) / priceRange) * height;
  const closeY = y + ((high - close) / priceRange) * height;
  const bodyTop = Math.min(openY, closeY);
  const bodyBottom = Math.max(openY, closeY);
  const bodyHeight = Math.max(Math.abs(bodyBottom - bodyTop), 1);
  const wickX = x + width / 2;

  return (
    <g>
      <line x1={wickX} y1={highY} x2={wickX} y2={lowY} stroke={strokeColor} strokeWidth={1} />
      <rect x={bodyX} y={bodyTop} width={bodyWidth} height={bodyHeight} fill={fillColor} stroke={strokeColor} strokeWidth={1} opacity={isGreen ? 0.8 : 1} />
    </g>
  );
});

const Dashboard = ({ user = { displayName: 'Demo Trader', email: 'demo@trader.com' }, onSignOut = () => {}, onNavigate = () => {} }) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Chart display states
  const [isChartMaximized, setIsChartMaximized] = useState(false);
  const [showVolume, setShowVolume] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'EUR/USD hit resistance level', time: '2 min ago', type: 'warning' },
    { id: 2, message: 'AAPL breakout detected', time: '5 min ago', type: 'success' },
    { id: 3, message: 'Market volatility increased', time: '10 min ago', type: 'info' }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Watchlist state
  const [watchlist, setWatchlist] = useState(['EUR/USD', 'GBP/USD', 'AAPL']);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [marketData, setMarketData] = useState([
    { pair: 'EUR/USD', price: '1.0847', change: '+0.0023', percentage: '+0.21%', trend: 'up' },
    { pair: 'GBP/USD', price: '1.2634', change: '-0.0015', percentage: '-0.12%', trend: 'down' },
    { pair: 'USD/JPY', price: '149.85', change: '+0.47', percentage: '+0.31%', trend: 'up' },
    { pair: 'AUD/USD', price: '0.6523', change: '+0.0008', percentage: '+0.12%', trend: 'up' },
    { pair: 'USD/CAD', price: '1.3456', change: '-0.0012', percentage: '-0.09%', trend: 'down' },
    { pair: 'EUR/GBP', price: '0.8591', change: '+0.0034', percentage: '+0.40%', trend: 'up' },
    { pair: 'AAPL', price: '185.50', change: '+2.30', percentage: '+1.26%', trend: 'up' },
    { pair: 'TSLA', price: '248.75', change: '-3.45', percentage: '-1.37%', trend: 'down' },
    { pair: 'GOOGL', price: '142.80', change: '+1.85', percentage: '+1.31%', trend: 'up' },
    { pair: 'MSFT', price: '378.90', change: '+4.20', percentage: '+1.12%', trend: 'up' },
    { pair: 'NVDA', price: '469.30', change: '+8.75', percentage: '+1.90%', trend: 'up' },
    { pair: 'AMZN', price: '151.25', change: '-1.20', percentage: '-0.79%', trend: 'down' }
  ]);

  const [selectedChart, setSelectedChart] = useState('EUR/USD');
  const [timeframe, setTimeframe] = useState('1H');

  // Generate realistic OHLC candlestick data
  function generateCandlestickData(startPrice, points) {
    const data = [];
    let currentPrice = parseFloat(startPrice);
    let time = new Date();
    time.setHours(time.getHours() - points);

    for (let i = 0; i < points; i++) {
      const open = currentPrice;
      const volatility = 0.005;
      const changePercent = (Math.random() - 0.5) * volatility;
      const priceMove = open * changePercent;
      
      const close = open + priceMove;
      const rangeFactor = Math.random() * 0.003;
      const high = Math.max(open, close) + (Math.random() * rangeFactor * open);
      const low = Math.min(open, close) - (Math.random() * rangeFactor * open);
      
      const baseVolume = 500000;
      const volume = Math.floor(baseVolume + (Math.random() * baseVolume));
      
      const isGreen = close >= open;
      const bodyHeight = Math.abs(close - open);
      const upperWick = high - Math.max(open, close);
      const lowerWick = Math.min(open, close) - low;
      
      data.push({
        time: time.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        open: parseFloat(open.toFixed(4)),
        high: parseFloat(high.toFixed(4)),
        low: parseFloat(low.toFixed(4)),
        close: parseFloat(close.toFixed(4)),
        volume: volume,
        isGreen: isGreen,
        bodyHeight: bodyHeight,
        upperWick: upperWick,
        lowerWick: lowerWick,
        candleTop: Math.max(open, close),
        candleBottom: Math.min(open, close),
        wickTop: high,
        wickBottom: low,
        fill: isGreen ? '#10b981' : '#ef4444',
        stroke: isGreen ? '#059669' : '#dc2626'
      });
      
      currentPrice = close;
      time.setMinutes(time.getMinutes() + (timeframe === '1H' ? 60 : timeframe === '15M' ? 15 : 5));
    }
    
    return data;
  }

  function generateStockCandlestickData(startPrice, points) {
    const data = [];
    let currentPrice = parseFloat(startPrice);
    let time = new Date();
    time.setHours(time.getHours() - points);

    for (let i = 0; i < points; i++) {
      const open = currentPrice;
      const volatility = 0.025;
      const changePercent = (Math.random() - 0.5) * volatility;
      const priceMove = open * changePercent;
      
      const close = open + priceMove;
      const rangeFactor = Math.random() * 0.015;
      const high = Math.max(open, close) + (Math.random() * rangeFactor * open);
      const low = Math.min(open, close) - (Math.random() * rangeFactor * open);
      
      const baseVolume = 1000000;
      const volume = Math.floor(baseVolume + (Math.random() * baseVolume * 2));
      
      const isGreen = close >= open;
      
      data.push({
        time: time.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
        volume: volume,
        isGreen: isGreen,
        candleTop: Math.max(open, close),
        candleBottom: Math.min(open, close),
        wickTop: high,
        wickBottom: low,
        fill: isGreen ? '#10b981' : '#ef4444',
        stroke: isGreen ? '#059669' : '#dc2626'
      });
      
      currentPrice = close;
      time.setMinutes(time.getMinutes() + (timeframe === '1H' ? 60 : timeframe === '15M' ? 15 : 5));
    }
    
    return data;
  }

  const [chartData, setChartData] = useState(() => {
    const initialData = {};
    marketData.forEach(item => {
      const isStock = ['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'NVDA', 'AMZN'].includes(item.pair);
      const candleCount = isChartMaximized ? 100 : 50; // More candles when maximized
      initialData[item.pair] = isStock 
        ? generateStockCandlestickData(item.price, candleCount)
        : generateCandlestickData(item.price, candleCount);
    });
    return initialData;
  });

  const [recentAnalyses, setRecentAnalyses] = useState([
    {
      id: 1,
      pair: 'EUR/USD',
      timestamp: '2 hours ago',
      status: 'completed',
      confidence: 87,
      recommendation: 'BUY',
      entry: '1.0820',
      target: '1.0890',
      stopLoss: '1.0780'
    },
    {
      id: 2,
      pair: 'GBP/USD',
      timestamp: '5 hours ago',
      status: 'completed',
      confidence: 92,
      recommendation: 'SELL',
      entry: '1.2650',
      target: '1.2580',
      stopLoss: '1.2720'
    },
    {
      id: 3,
      pair: 'USD/JPY',
      timestamp: '1 day ago',
      status: 'completed',
      confidence: 78,
      recommendation: 'BUY',
      entry: '149.20',
      target: '150.80',
      stopLoss: '148.40'
    }
  ]);

  const [stats, setStats] = useState({
    totalAnalyses: 47,
    successRate: 84,
    avgConfidence: 89,
    profitableTrades: 12,
    totalProfit: '+2,340',
    winStreak: 7
  });

  // Theme classes
  const themeClasses = {
    bg: isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
    cardBg: isDarkMode ? 'bg-gray-900/60' : 'bg-white/80',
    cardBorder: isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    hover: isDarkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50',
    headerBg: isDarkMode ? 'bg-gray-900/60' : 'bg-white/80',
    inputBg: isDarkMode ? 'bg-gray-800' : 'bg-gray-100',
    buttonSecondary: isDarkMode ? 'bg-gray-800/50 border-gray-600' : 'bg-gray-100 border-gray-300'
  };

  // Functions for all interactive elements
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleChartSize = () => {
    setIsChartMaximized(!isChartMaximized);
    // Regenerate data with more/fewer candles
    const newData = {};
    marketData.forEach(item => {
      const isStock = ['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'NVDA', 'AMZN'].includes(item.pair);
      const candleCount = !isChartMaximized ? 100 : 50; // Toggle the count
      newData[item.pair] = isStock 
        ? generateStockCandlestickData(item.price, candleCount)
        : generateCandlestickData(item.price, candleCount);
    });
    setChartData(prev => ({ ...prev, ...newData }));
  };

  const refreshAllData = () => {
    const newData = {};
    marketData.forEach(item => {
      const isStock = ['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'NVDA', 'AMZN'].includes(item.pair);
      const candleCount = isChartMaximized ? 100 : 50;
      newData[item.pair] = isStock 
        ? generateStockCandlestickData(item.price, candleCount)
        : generateCandlestickData(item.price, candleCount);
    });
    setChartData(prev => ({ ...prev, ...newData }));
    
    // Update market data with new random prices
    setMarketData(prev => prev.map(item => ({
      ...item,
      price: (parseFloat(item.price) + (Math.random() - 0.5) * 0.01).toFixed(['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'NVDA', 'AMZN'].includes(item.pair) ? 2 : 4),
      change: (Math.random() - 0.5 > 0 ? '+' : '-') + (Math.random() * 0.02).toFixed(['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'NVDA', 'AMZN'].includes(item.pair) ? 2 : 4),
      trend: Math.random() > 0.5 ? 'up' : 'down'
    })));
  };

  const addToWatchlist = (pair) => {
    if (!watchlist.includes(pair)) {
      setWatchlist([...watchlist, pair]);
    }
  };

  const removeFromWatchlist = (pair) => {
    setWatchlist(watchlist.filter(item => item !== pair));
  };

  const exportData = () => {
    const dataToExport = {
      marketData,
      chartData: chartData[selectedChart],
      recentAnalyses,
      stats,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trading_data_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareChart = () => {
    if (navigator.share) {
      navigator.share({
        title: `${selectedChart} Chart Analysis`,
        text: `Check out this ${selectedChart} candlestick analysis from ForexAI Pro`,
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${selectedChart} Chart Analysis - ${window.location.href}`);
      alert('Chart link copied to clipboard!');
    }
  };

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => prev.map(item => ({
        ...item,
        price: (parseFloat(item.price) + (Math.random() - 0.5) * 0.001).toFixed(['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'NVDA', 'AMZN'].includes(item.pair) ? 2 : 4),
        change: (Math.random() - 0.5 > 0 ? '+' : '-') + (Math.random() * 0.01).toFixed(['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'NVDA', 'AMZN'].includes(item.pair) ? 2 : 4),
        trend: Math.random() > 0.5 ? 'up' : 'down'
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Update candlestick data
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const updated = { ...prev };
        
        marketData.forEach(item => {
          if (updated[item.pair]) {
            const lastCandle = updated[item.pair][updated[item.pair].length - 1];
            const isStock = ['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'NVDA', 'AMZN'].includes(item.pair);
            
            const open = lastCandle.close;
            const volatility = isStock ? 0.025 : 0.005;
            const changePercent = (Math.random() - 0.5) * volatility;
            const priceMove = open * changePercent;
            const close = open + priceMove;
            const rangeFactor = Math.random() * (isStock ? 0.015 : 0.003);
            const high = Math.max(open, close) + (Math.random() * rangeFactor * open);
            const low = Math.min(open, close) - (Math.random() * rangeFactor * open);
            
            const isGreen = close >= open;
            
            const newTime = new Date();
            const newCandle = {
              time: newTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
              }),
              open: parseFloat(open.toFixed(isStock ? 2 : 4)),
              high: parseFloat(high.toFixed(isStock ? 2 : 4)),
              low: parseFloat(low.toFixed(isStock ? 2 : 4)),
              close: parseFloat(close.toFixed(isStock ? 2 : 4)),
              volume: Math.floor(Math.random() * (isStock ? 2000000 : 1000000)) + (isStock ? 1000000 : 500000),
              isGreen: isGreen,
              candleTop: Math.max(open, close),
              candleBottom: Math.min(open, close),
              wickTop: high,
              wickBottom: low,
              fill: isGreen ? '#10b981' : '#ef4444',
              stroke: isGreen ? '#059669' : '#dc2626'
            };
            
            updated[item.pair] = [...updated[item.pair].slice(1), newCandle];
          }
        });
        
        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [timeframe, marketData]);

  // Custom Candlestick Component
  const CandlestickBar = (props) => {
    const { payload, x, y, width, height } = props;
    if (!payload) return null;

    const { open, high, low, close, isGreen } = payload;
    const fillColor = isGreen ? '#10b981' : '#ef4444';
    const strokeColor = isGreen ? '#059669' : '#dc2626';
    
    const yRange = height;
    const priceRange = high - low;
    
    const wickX = x + width / 2;
    const bodyWidth = Math.max(width * 0.7, 3);
    const bodyX = x + (width - bodyWidth) / 2;
    
    const highY = y;
    const lowY = y + height;
    const openY = y + ((high - open) / priceRange) * height;
    const closeY = y + ((high - close) / priceRange) * height;
    
    const bodyTop = Math.min(openY, closeY);
    const bodyBottom = Math.max(openY, closeY);
    const bodyHeight = Math.max(Math.abs(bodyBottom - bodyTop), 1);
    
    return (
      <g>
        <line
          x1={wickX}
          y1={highY}
          x2={wickX}
          y2={lowY}
          stroke={strokeColor}
          strokeWidth={1}
        />
        <rect
          x={bodyX}
          y={bodyTop}
          width={bodyWidth}
          height={bodyHeight}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={1}
          opacity={isGreen ? 0.8 : 1}
        />
      </g>
    );
  };

  // Header Component
  const Header = () => (
    <header className={`${themeClasses.headerBg} backdrop-blur-xl border-b ${themeClasses.cardBorder} p-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              ForexAI Pro
            </h1>
            <p className={`${themeClasses.textSecondary} text-sm`}>Advanced Candlestick Dashboard</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className={`p-2 ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors relative`}
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"></span>
              )}
            </button>
            
            {showNotifications && (
              <div className={`absolute right-0 mt-2 w-80 ${themeClasses.cardBg} backdrop-blur-xl rounded-xl border ${themeClasses.cardBorder} p-4 shadow-lg z-50`}>
                <h3 className={`${themeClasses.text} font-semibold mb-3`}>Notifications</h3>
                {notifications.length === 0 ? (
                  <p className={themeClasses.textSecondary}>No new notifications</p>
                ) : (
                  <div className="space-y-2">
                    {notifications.map(notif => (
                      <div key={notif.id} className={`p-3 ${themeClasses.inputBg} rounded-lg flex items-center justify-between`}>
                        <div>
                          <p className={`${themeClasses.text} text-sm`}>{notif.message}</p>
                          <p className={`${themeClasses.textSecondary} text-xs`}>{notif.time}</p>
                        </div>
                        <button 
                          onClick={() => dismissNotification(notif.id)}
                          className={`${themeClasses.textSecondary} hover:text-red-400`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className={`${themeClasses.text} font-medium`}>{user?.displayName || 'Trader'}</p>
              <p className={`${themeClasses.textSecondary} text-sm`}>{user?.email}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'T'}
              </span>
            </div>
          </div>

          <button
            onClick={onSignOut}
            className={`p-2 ${themeClasses.textSecondary} hover:text-red-400 transition-colors`}
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );

  // Stats Grid Component
  const StatsGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-xl p-6 border border-emerald-500/20`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`${themeClasses.textSecondary} text-sm`}>Total Analyses</p>
            <p className={`text-3xl font-bold ${themeClasses.text}`}>{stats.totalAnalyses}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
      </div>

      <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-xl p-6 border border-blue-500/20`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`${themeClasses.textSecondary} text-sm`}>Success Rate</p>
            <p className={`text-3xl font-bold ${themeClasses.text}`}>{stats.successRate}%</p>
          </div>
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>

      <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-xl p-6 border border-purple-500/20`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`${themeClasses.textSecondary} text-sm`}>Avg Confidence</p>
            <p className={`text-3xl font-bold ${themeClasses.text}`}>{stats.avgConfidence}%</p>
          </div>
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
            <Activity className="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </div>

      <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-xl p-6 border border-green-500/20`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`${themeClasses.textSecondary} text-sm`}>Total Profit</p>
            <p className="text-3xl font-bold text-emerald-400">${stats.totalProfit}</p>
          </div>
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-green-400" />
          </div>
        </div>
      </div>
    </div>
  );

  // Quick Actions Component
  const QuickActions = () => (
    <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-xl p-6 border ${themeClasses.cardBorder} mb-8`}>
      <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button 
          onClick={() => onNavigate && onNavigate('upload')}
          className="flex items-center space-x-4 p-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
        >
          <Upload className="w-6 h-6 text-white" />
          <div className="text-left">
            <p className="text-white font-semibold">Upload Chart</p>
            <p className="text-emerald-100 text-sm">AI analysis</p>
          </div>
        </button>

        <button 
          onClick={() => onNavigate && onNavigate('history')}
          className={`flex items-center space-x-4 p-4 ${themeClasses.buttonSecondary} border rounded-xl ${themeClasses.hover} transition-colors`}
        >
          <History className="w-6 h-6 text-gray-400" />
          <div className="text-left">
            <p className={`${themeClasses.text} font-semibold`}>History</p>
            <p className={`${themeClasses.textSecondary} text-sm`}>Past analyses</p>
          </div>
        </button>

        <button 
          onClick={exportData}
          className={`flex items-center space-x-4 p-4 ${themeClasses.buttonSecondary} border rounded-xl ${themeClasses.hover} transition-colors`}
        >
          <Download className="w-6 h-6 text-gray-400" />
          <div className="text-left">
            <p className={`${themeClasses.text} font-semibold`}>Export</p>
            <p className={`${themeClasses.textSecondary} text-sm`}>Download data</p>
          </div>
        </button>

        <button 
          onClick={() => onNavigate && onNavigate('settings')}
          className={`flex items-center space-x-4 p-4 ${themeClasses.buttonSecondary} border rounded-xl ${themeClasses.hover} transition-colors`}
        >
          <Settings className="w-6 h-6 text-gray-400" />
          <div className="text-left">
            <p className={`${themeClasses.text} font-semibold`}>Settings</p>
            <p className={`${themeClasses.textSecondary} text-sm`}>Preferences</p>
          </div>
        </button>
      </div>
    </div>
  );

  // Trading Chart Component
  const TradingChart = () => {
    const currentData = chartData[selectedChart] || [];
    const isStock = ['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'NVDA', 'AMZN'].includes(selectedChart);
    const latestCandle = currentData[currentData.length - 1];
    const previousCandle = currentData[currentData.length - 2];
    
    if (!latestCandle || !previousCandle) return null;
    
    const priceChange = latestCandle.close - previousCandle.close;
    const isPositive = priceChange >= 0;

    return (
      <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-xl p-6 border ${themeClasses.cardBorder} mb-8`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h3 className={`text-xl font-semibold ${themeClasses.text}`}>
              {isChartMaximized ? 'Maximized' : 'Live'} Candlestick Charts
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 text-sm">
                {currentData.length} Candlesticks
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={selectedChart}
              onChange={(e) => setSelectedChart(e.target.value)}
              className={`${themeClasses.inputBg} ${themeClasses.text} border ${themeClasses.cardBorder} rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
            >
              <optgroup label="Forex Pairs">
                <option value="EUR/USD">EUR/USD</option>
                <option value="GBP/USD">GBP/USD</option>
                <option value="USD/JPY">USD/JPY</option>
                <option value="AUD/USD">AUD/USD</option>
                <option value="USD/CAD">USD/CAD</option>
                <option value="EUR/GBP">EUR/GBP</option>
              </optgroup>
              <optgroup label="Stocks">
                <option value="AAPL">AAPL - Apple</option>
                <option value="TSLA">TSLA - Tesla</option>
                <option value="GOOGL">GOOGL - Google</option>
                <option value="MSFT">MSFT - Microsoft</option>
                <option value="NVDA">NVDA - Nvidia</option>
                <option value="AMZN">AMZN - Amazon</option>
              </optgroup>
            </select>
            
            <div className={`flex ${themeClasses.inputBg} rounded-lg p-1`}>
              {['5M', '15M', '1H'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 text-sm rounded transition-all ${
                    timeframe === tf
                      ? 'bg-emerald-500 text-white'
                      : `${themeClasses.textSecondary} hover:${themeClasses.text}`
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setShowVolume(!showVolume)}
              className={`p-2 ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
              title={showVolume ? 'Hide Volume' : 'Show Volume'}
            >
              {showVolume ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            
            <button 
              onClick={refreshAllData}
              className={`p-2 ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button 
              onClick={shareChart}
              className={`p-2 ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
              title="Share Chart"
            >
              <Share2 className="w-4 h-4" />
            </button>
            
            <button 
              onClick={toggleChartSize}
              className={`p-2 ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
              title={isChartMaximized ? 'Minimize Chart' : 'Maximize Chart'}
            >
              {isChartMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* OHLC Price Info */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className={`text-2xl font-bold ${themeClasses.text}`}>
              {selectedChart} - ${latestCandle.close?.toFixed(isStock ? 2 : 4)}
            </h4>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium flex items-center ${
                  isPositive ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {isPositive ? '+' : ''}{priceChange?.toFixed(isStock ? 2 : 4)} 
                  ({((priceChange / previousCandle.close) * 100)?.toFixed(2)}%)
                </span>
                <span className={`${themeClasses.textSecondary} text-sm`}>
                  • {isChartMaximized ? 'Extended View' : 'Standard View'}
                </span>
              </div>
            </div>
          </div>
          
          {/* OHLC Display */}
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <p className={themeClasses.textSecondary}>Open</p>
              <p className={`${themeClasses.text} font-semibold`}>{latestCandle.open?.toFixed(isStock ? 2 : 4)}</p>
            </div>
            <div className="text-center">
              <p className={themeClasses.textSecondary}>High</p>
              <p className="text-emerald-400 font-semibold">{latestCandle.high?.toFixed(isStock ? 2 : 4)}</p>
            </div>
            <div className="text-center">
              <p className={themeClasses.textSecondary}>Low</p>
              <p className="text-red-400 font-semibold">{latestCandle.low?.toFixed(isStock ? 2 : 4)}</p>
            </div>
            <div className="text-center">
              <p className={themeClasses.textSecondary}>Close</p>
              <p className={`${themeClasses.text} font-semibold`}>{latestCandle.close?.toFixed(isStock ? 2 : 4)}</p>
            </div>
          </div>
        </div>

        {/* Real Candlestick Chart */}
        <div className={isChartMaximized ? "h-[600px]" : "h-96"}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDarkMode ? "#374151" : "#e5e7eb"} 
                strokeOpacity={0.3} 
              />
              <XAxis 
                dataKey="time" 
                stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
                fontSize={12}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
                fontSize={12}
                domain={['dataMin - 0.01', 'dataMax + 0.01']}
                tickFormatter={(value) => value?.toFixed(isStock ? 0 : 4)}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: isDarkMode ? '#ffffff' : '#000000'
                }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    const isGreen = data.isGreen;
                    return (
                      <div className={`${themeClasses.cardBg} border ${themeClasses.cardBorder} rounded-lg p-4`}>
                        <p className={`${themeClasses.textSecondary} text-sm mb-2`}>Time: {label}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className={themeClasses.textSecondary}>Open: </span>
                            <span className={themeClasses.text}>${data.open?.toFixed(isStock ? 2 : 4)}</span>
                          </div>
                          <div>
                            <span className={themeClasses.textSecondary}>High: </span>
                            <span className="text-emerald-400">${data.high?.toFixed(isStock ? 2 : 4)}</span>
                          </div>
                          <div>
                            <span className={themeClasses.textSecondary}>Low: </span>
                            <span className="text-red-400">${data.low?.toFixed(isStock ? 2 : 4)}</span>
                          </div>
                          <div>
                            <span className={themeClasses.textSecondary}>Close: </span>
                            <span className={isGreen ? 'text-emerald-400' : 'text-red-400'}>
                              ${data.close?.toFixed(isStock ? 2 : 4)}
                            </span>
                          </div>
                        </div>
                        <div className={`mt-2 pt-2 border-t ${themeClasses.cardBorder}`}>
                          <span className={themeClasses.textSecondary}>Volume: </span>
                          <span className={themeClasses.text}>{data.volume?.toLocaleString()}</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="wickTop" shape={<CandlestickBar />} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Volume Chart */}
        {showVolume && (
          <div className={`${isChartMaximized ? "h-24" : "h-20"} mt-4 border-t ${themeClasses.cardBorder} pt-4`}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData}>
                <defs>
                  <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="#6366f1"
                  strokeWidth={1}
                  fill="url(#volumeGradient)"
                  isAnimationActive={false}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className={`text-center text-xs ${themeClasses.textSecondary} mt-1`}>Volume</div>
          </div>
        )}

        {/* Chart Controls */}
        <div className={`flex items-center justify-between mt-4 pt-4 border-t ${themeClasses.cardBorder}`}>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => addToWatchlist(selectedChart)}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Analyze</span>
            </button>
            
            <button 
              onClick={() => watchlist.includes(selectedChart) ? removeFromWatchlist(selectedChart) : addToWatchlist(selectedChart)}
              className={`flex items-center space-x-2 px-4 py-2 ${themeClasses.buttonSecondary} border rounded-lg ${themeClasses.hover} transition-colors`}
            >
              {watchlist.includes(selectedChart) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="text-sm">
                {watchlist.includes(selectedChart) ? 'Remove from Watchlist' : 'Add to Watchlist'}
              </span>
            </button>
          </div>
          
          <div className={`text-right text-xs ${themeClasses.textSecondary}`}>
            <p>24h Volume: {latestCandle?.volume?.toLocaleString()}</p>
            <p>Range: ${Math.min(...currentData.map(d => d.low))?.toFixed(isStock ? 2 : 4)} - ${Math.max(...currentData.map(d => d.high))?.toFixed(isStock ? 2 : 4)}</p>
          </div>
        </div>
      </div>
    );
  };

  // Mini Candlestick Chart Component
  const MiniCandlestickChart = ({ pair, data, trend, price, change, percentage }) => {
    const isStock = ['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'NVDA', 'AMZN'].includes(pair);
    const chartData = data.slice(-15);
    const isInWatchlist = watchlist.includes(pair);
    
    return (
      <div className={`p-4 ${themeClasses.inputBg} rounded-lg border ${themeClasses.cardBorder} hover:border-emerald-500/30 transition-all duration-200 hover:scale-[1.02]`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className={`${themeClasses.text} font-semibold`}>{pair}</span>
            {trend === 'up' ? (
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-400" />
            )}
            {isInWatchlist && <Eye className="w-3 h-3 text-blue-400" />}
          </div>
          <div className="flex space-x-1">
            <button 
              onClick={() => setSelectedChart(pair)}
              className={`text-xs ${themeClasses.textSecondary} hover:text-emerald-400 transition-colors`}
            >
              <BarChart className="w-4 h-4" />
            </button>
            <button 
              onClick={() => isInWatchlist ? removeFromWatchlist(pair) : addToWatchlist(pair)}
              className={`text-xs ${themeClasses.textSecondary} hover:text-blue-400 transition-colors`}
            >
              {isInWatchlist ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="mb-3">
          <span className={`text-xl font-bold ${themeClasses.text}`}>{price}</span>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`text-sm font-medium ${
              trend === 'up' ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {change}
            </span>
            <span className={`text-xs ${
              trend === 'up' ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {percentage}
            </span>
          </div>
        </div>

        <div className="h-24 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <YAxis hide domain={['dataMin - 0.01', 'dataMax + 0.01']} />
              <XAxis dataKey="time" hide />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '6px',
                  color: isDarkMode ? '#ffffff' : '#000000',
                  fontSize: '12px'
                }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="text-xs">
                        <p>{label}</p>
                        <p>O: {data.open?.toFixed(isStock ? 2 : 4)}</p>
                        <p>H: {data.high?.toFixed(isStock ? 2 : 4)}</p>
                        <p>L: {data.low?.toFixed(isStock ? 2 : 4)}</p>
                        <p>C: {data.close?.toFixed(isStock ? 2 : 4)}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="wickTop" shape={<CandlestickBar />} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  // Market Data Component
  const MarketData = () => {
    const filteredData = marketData.filter(item => 
      item.pair.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-xl p-6 border ${themeClasses.cardBorder} mb-8`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Live Market Data</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 text-sm">Real Candlesticks</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${themeClasses.textSecondary}`} />
              <input
                type="text"
                placeholder="Search instruments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`${themeClasses.inputBg} ${themeClasses.text} border ${themeClasses.cardBorder} rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
              />
            </div>
            
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className={`${themeClasses.inputBg} ${themeClasses.text} border ${themeClasses.cardBorder} rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
            >
              <option value="5M">5 Minutes</option>
              <option value="15M">15 Minutes</option>
              <option value="1H">1 Hour</option>
            </select>
            
            <button 
              onClick={refreshAllData}
              className={`p-2 ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
              title="Refresh All Charts"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((item, index) => (
            <MiniCandlestickChart
              key={index}
              pair={item.pair}
              data={chartData[item.pair] || []}
              trend={item.trend}
              price={item.price}
              change={item.change}
              percentage={item.percentage}
            />
          ))}
        </div>

        {/* Quick Stats Summary */}
        <div className={`mt-6 pt-4 border-t ${themeClasses.cardBorder}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className={`${themeClasses.textSecondary} text-xs`}>Green Candles</p>
              <p className="text-emerald-400 font-semibold">
                {filteredData.filter(item => item.trend === 'up').length}/{filteredData.length}
              </p>
            </div>
            <div>
              <p className={`${themeClasses.textSecondary} text-xs`}>Watchlist</p>
              <p className="text-blue-400 font-semibold">{watchlist.length}</p>
            </div>
            <div>
              <p className={`${themeClasses.textSecondary} text-xs`}>Most Active</p>
              <p className={`${themeClasses.text} font-semibold`}>EUR/USD</p>
            </div>
            <div>
              <p className={`${themeClasses.textSecondary} text-xs`}>Market Status</p>
              <div className="flex items-center justify-center space-x-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <p className="text-emerald-400 font-semibold">Open</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Recent Analyses Component
  const RecentAnalyses = () => (
    <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-xl p-6 border ${themeClasses.cardBorder}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Recent AI Analyses</h3>
        <button 
          onClick={() => onNavigate && onNavigate('history')}
          className="text-emerald-400 hover:text-emerald-300 text-sm"
        >
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {recentAnalyses.map((analysis) => (
          <div key={analysis.id} className={`p-4 ${themeClasses.inputBg} rounded-lg border ${themeClasses.cardBorder} hover:border-emerald-500/30 transition-colors`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  analysis.status === 'completed' ? 'bg-emerald-500' : 'bg-yellow-500'
                }`}></div>
                <span className={`${themeClasses.text} font-semibold`}>{analysis.pair}</span>
                <span className={`${themeClasses.textSecondary} text-sm`}>{analysis.timestamp}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs ${themeClasses.textSecondary}`}>Confidence:</span>
                <span className="text-emerald-400 font-semibold">{analysis.confidence}%</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className={themeClasses.textSecondary}>Action</p>
                <p className={`font-semibold ${
                  analysis.recommendation === 'BUY' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {analysis.recommendation}
                </p>
              </div>
              <div>
                <p className={themeClasses.textSecondary}>Entry</p>
                <p className={themeClasses.text}>{analysis.entry}</p>
              </div>
              <div>
                <p className={themeClasses.textSecondary}>Target</p>
                <p className="text-emerald-400">{analysis.target}</p>
              </div>
              <div>
                <p className={themeClasses.textSecondary}>Stop Loss</p>
                <p className="text-red-400">{analysis.stopLoss}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={() => onNavigate && onNavigate('upload')}
        className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <Plus className="w-5 h-5" />
        <span>New Analysis</span>
      </button>
    </div>
  );

  return (
    <div className={themeClasses.bg}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 ${isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-500/5'} rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 ${isDarkMode ? 'bg-blue-500/10' : 'bg-blue-500/5'} rounded-full blur-3xl animate-pulse delay-1000`}></div>
      </div>

      <div className="relative z-10">
        <Header />
        
        <main className="p-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className={`text-3xl font-bold ${themeClasses.text} mb-2`}>
              Welcome back, {user?.displayName?.split(' ')[0] || 'Trader'}! 
              {isDarkMode ? ' 🌙' : ' ☀️'}
            </h2>
            <p className={themeClasses.textSecondary}>
              Your fully interactive candlestick dashboard with {isDarkMode ? 'dark' : 'light'} mode, 
              real-time updates, and maximize/minimize functionality!
            </p>
          </div>

          <StatsGrid />
          <QuickActions />
          <TradingChart />
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2">
              <MarketData />
            </div>
            <div>
              <RecentAnalyses />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;