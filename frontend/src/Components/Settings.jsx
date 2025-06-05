import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  CreditCard,
  Download,
  Upload,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Check,
  X,
  Settings as SettingsIcon,
  Moon,
  Sun,
  Smartphone,
  Mail,
  Lock,
  Key,
  AlertTriangle,
  Camera,
  FileText,
  CheckCircle,
  Clock,
  DollarSign,
  Target
} from 'lucide-react';

const Settings = ({ user, onNavigate, onSignOut }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    analysis: true,
    market: true,
    news: false
  });
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.displayName?.split(' ')[0] || '',
    lastName: user?.displayName?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    timezone: 'UTC-5',
    bio: ''
  });
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [saveStatus, setSaveStatus] = useState('');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'preferences', name: 'Preferences', icon: Palette },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'data', name: 'Data & Privacy', icon: Download }
  ];

  // Save functions
  const saveProfile = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };

  const saveNotifications = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };

  const savePreferences = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
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
            <SettingsIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-gray-400 text-sm">Manage your account preferences</p>
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

  // Profile Tab
  const ProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-white mb-6">Profile Information</h3>
        
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-white">
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'T'}
            </span>
          </div>
          <div className="space-y-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
              <Camera className="w-4 h-4" />
              <span>Upload Photo</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 border border-gray-600 text-white rounded-lg hover:bg-gray-700/50 transition-colors">
              <Trash2 className="w-4 h-4" />
              <span>Remove Photo</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
            <select
              value={formData.timezone}
              onChange={(e) => setFormData({...formData, timezone: e.target.value})}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
            >
              <option value="UTC-12">UTC-12 (Baker Island)</option>
              <option value="UTC-8">UTC-8 (Pacific Time)</option>
              <option value="UTC-5">UTC-5 (Eastern Time)</option>
              <option value="UTC+0">UTC+0 (London)</option>
              <option value="UTC+1">UTC+1 (Central Europe)</option>
              <option value="UTC+8">UTC+8 (Singapore)</option>
              <option value="UTC+9">UTC+9 (Tokyo)</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            rows={4}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="flex justify-end mt-6">
          <button 
            onClick={saveProfile}
            disabled={saveStatus === 'saving'}
            className="flex items-center space-x-2 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
          >
            {saveStatus === 'saving' ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : saveStatus === 'saved' ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>
              {saveStatus === 'saving' ? 'Saving...' : 
               saveStatus === 'saved' ? 'Saved!' : 'Save Changes'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  // Notifications Tab
  const NotificationsTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-white mb-6">Notification Preferences</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Delivery Methods</h4>
            <div className="space-y-4">
              {Object.entries({
                email: { label: 'Email Notifications', icon: Mail, description: 'Receive notifications via email' },
                push: { label: 'Push Notifications', icon: Smartphone, description: 'Browser and mobile push notifications' },
                sms: { label: 'SMS Notifications', icon: Smartphone, description: 'Text message alerts (Premium feature)' }
              }).map(([key, {label, icon: Icon, description}]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-600/50">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-white font-medium">{label}</div>
                      <div className="text-gray-400 text-sm">{description}</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications[key]}
                      onChange={(e) => setNotifications({...notifications, [key]: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-white mb-4">Notification Types</h4>
            <div className="space-y-4">
              {Object.entries({
                analysis: { label: 'Analysis Complete', description: 'When your chart analysis is ready', icon: CheckCircle },
                market: { label: 'Market Alerts', description: 'Important market movements and opportunities', icon: Target },
                news: { label: 'News Updates', description: 'Forex market news and announcements', icon: FileText }
              }).map(([key, {label, description, icon: Icon}]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-600/50">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-white font-medium">{label}</div>
                      <div className="text-gray-400 text-sm">{description}</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications[key]}
                      onChange={(e) => setNotifications({...notifications, [key]: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button 
            onClick={saveNotifications}
            disabled={saveStatus === 'saving'}
            className="flex items-center space-x-2 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
          >
            {saveStatus === 'saving' ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : saveStatus === 'saved' ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>
              {saveStatus === 'saving' ? 'Saving...' : 
               saveStatus === 'saved' ? 'Saved!' : 'Save Preferences'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  // Security Tab
  const SecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-white mb-6">Security Settings</h3>
        
        <div className="space-y-8">
          {/* Change Password */}
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Change Password</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={securityData.currentPassword}
                    onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
                    className="w-full px-4 py-3 pr-12 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                <input
                  type="password"
                  value={securityData.newPassword}
                  onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={securityData.confirmPassword}
                  onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Confirm new password"
                />
              </div>
              <button className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors">
                Update Password
              </button>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="border-t border-gray-700 pt-8">
            <h4 className="text-lg font-medium text-white mb-4">Two-Factor Authentication</h4>
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600/50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Key className="w-5 h-5 text-gray-400" />
                    <span className="text-white font-medium">Authenticator App</span>
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">Not Setup</span>
                  </div>
                  <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                </div>
                <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="border-t border-gray-700 pt-8">
            <h4 className="text-lg font-medium text-white mb-4">Active Sessions</h4>
            <div className="space-y-3">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Current Session</div>
                    <div className="text-gray-400 text-sm">Chrome on macOS • New York, NY</div>
                    <div className="text-gray-400 text-xs">Last active: Now</div>
                  </div>
                  <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded">Current</div>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Mobile App</div>
                    <div className="text-gray-400 text-sm">iPhone • New York, NY</div>
                    <div className="text-gray-400 text-xs">Last active: 2 hours ago</div>
                  </div>
                  <button className="px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded hover:bg-red-500/30 transition-colors">
                    Revoke
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Preferences Tab
  const PreferencesTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-white mb-6">App Preferences</h3>
        
        <div className="space-y-8">
          {/* Theme */}
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Theme</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'dark', name: 'Dark', icon: Moon, description: 'Dark mode interface' },
                { id: 'light', name: 'Light', icon: Sun, description: 'Light mode interface' },
                { id: 'auto', name: 'Auto', icon: Smartphone, description: 'Follow system preference' }
              ].map((themeOption) => (
                <div
                  key={themeOption.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    theme === themeOption.id
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-gray-600 bg-gray-800/50 hover:border-emerald-500/50'
                  }`}
                  onClick={() => setTheme(themeOption.id)}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <themeOption.icon className={`w-5 h-5 ${
                      theme === themeOption.id ? 'text-emerald-400' : 'text-gray-400'
                    }`} />
                    <span className="text-white font-medium">{themeOption.name}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{themeOption.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Language & Region */}
          <div className="border-t border-gray-700 pt-8">
            <h4 className="text-lg font-medium text-white mb-4">Language & Region</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="ja">日本語</option>
                  <option value="zh">中文</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>
            </div>
          </div>

          {/* Trading Preferences */}
          <div className="border-t border-gray-700 pt-8">
            <h4 className="text-lg font-medium text-white mb-4">Trading Preferences</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-600/50">
                <div>
                  <div className="text-white font-medium">Auto-save Analysis</div>
                  <div className="text-gray-400 text-sm">Automatically save completed analyses</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-600/50">
                <div>
                  <div className="text-white font-medium">Show Advanced Metrics</div>
                  <div className="text-gray-400 text-sm">Display detailed technical indicators</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-600/50">
                <div>
                  <div className="text-white font-medium">Real-time Alerts</div>
                  <div className="text-gray-400 text-sm">Get instant notifications for price movements</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button 
            onClick={savePreferences}
            disabled={saveStatus === 'saving'}
            className="flex items-center space-x-2 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
          >
            {saveStatus === 'saving' ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : saveStatus === 'saved' ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>
              {saveStatus === 'saving' ? 'Saving...' : 
               saveStatus === 'saved' ? 'Saved!' : 'Save Preferences'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  // Billing Tab
  const BillingTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-white mb-6">Billing & Subscription</h3>
        
        {/* Current Plan */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl p-6 border border-emerald-500/20 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-bold text-white mb-2">Pro Plan</h4>
              <p className="text-gray-300">Unlimited analyses • Advanced AI • Priority support</p>
              <p className="text-emerald-400 font-semibold mt-2">$29.99/month</p>
              <p className="text-gray-400 text-sm mt-1">Next billing: January 15, 2025</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center mb-2">
                <Check className="w-8 h-8 text-white" />
              </div>
              <span className="text-emerald-400 text-sm font-medium">Active</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-8">
          <h4 className="text-lg font-medium text-white mb-4">Payment Method</h4>
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div>
                  <div className="text-white font-medium">•••• •••• •••• 4242</div>
                  <div className="text-gray-400 text-sm">Expires 12/25</div>
                </div>
              </div>
              <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                Update
              </button>
            </div>
          </div>
          <button className="mt-3 text-emerald-400 hover:text-emerald-300 text-sm transition-colors">
            + Add new payment method
          </button>
        </div>

        {/* Usage Stats */}
        <div className="mb-8">
          <h4 className="text-lg font-medium text-white mb-4">Current Usage</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/50">
              <div className="text-gray-400 text-sm">Analyses This Month</div>
              <div className="text-2xl font-bold text-white">47</div>
              <div className="text-emerald-400 text-sm">Unlimited plan</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/50">
              <div className="text-gray-400 text-sm">Storage Used</div>
              <div className="text-2xl font-bold text-white">2.3 GB</div>
              <div className="text-emerald-400 text-sm">of 10 GB</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/50">
              <div className="text-gray-400 text-sm">API Calls</div>
              <div className="text-2xl font-bold text-white">1,247</div>
              <div className="text-emerald-400 text-sm">Unlimited plan</div>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div className="mb-8">
          <h4 className="text-lg font-medium text-white mb-4">Billing History</h4>
          <div className="space-y-3">
            {[
              { date: 'Dec 15, 2024', amount: '$29.99', status: 'Paid', invoice: 'INV-001', description: 'Pro Plan - Monthly' },
              { date: 'Nov 15, 2024', amount: '$29.99', status: 'Paid', invoice: 'INV-002', description: 'Pro Plan - Monthly' },
              { date: 'Oct 15, 2024', amount: '$29.99', status: 'Paid', invoice: 'INV-003', description: 'Pro Plan - Monthly' },
              { date: 'Sep 15, 2024', amount: '$29.99', status: 'Paid', invoice: 'INV-004', description: 'Pro Plan - Monthly' }
            ].map((bill, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-600/50">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="text-white font-medium">{bill.date}</div>
                    <div className="text-gray-400 text-sm">{bill.description}</div>
                    <div className="text-gray-500 text-xs">{bill.invoice}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-white font-semibold">{bill.amount}</span>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded">{bill.status}</span>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors" title="Download Invoice">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Plan Management */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-700">
          <button className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors">
            Upgrade to Annual
          </button>
          <button className="px-6 py-3 bg-gray-800/50 border border-gray-600 text-white rounded-lg hover:bg-gray-700/50 transition-colors">
            Change Plan
          </button>
          <button className="px-6 py-3 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  );

  // Data & Privacy Tab
  const DataTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-white mb-6">Data & Privacy</h3>
        
        <div className="space-y-8">
          {/* Data Export */}
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Export Your Data</h4>
            <p className="text-gray-400 mb-4">Download a copy of your trading data and analysis history in JSON format.</p>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/50 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Complete Data Export</div>
                  <div className="text-gray-400 text-sm">Includes all analyses, settings, and account data</div>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Request Export</span>
                </button>
              </div>
            </div>
            <p className="text-gray-500 text-sm">Export requests are processed within 24 hours. You'll receive an email when ready.</p>
          </div>

          {/* Data Retention */}
          <div className="border-t border-gray-700 pt-8">
            <h4 className="text-lg font-medium text-white mb-4">Data Retention</h4>
            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Analysis History</div>
                    <div className="text-gray-400 text-sm">Keep analysis records for</div>
                  </div>
                  <select className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm">
                    <option value="1year">1 Year</option>
                    <option value="2years">2 Years</option>
                    <option value="5years">5 Years</option>
                    <option value="forever">Forever</option>
                  </select>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Chart Images</div>
                    <div className="text-gray-400 text-sm">Automatically delete uploaded charts after</div>
                  </div>
                  <select className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm">
                    <option value="30days">30 Days</option>
                    <option value="90days">90 Days</option>
                    <option value="1year">1 Year</option>
                    <option value="never">Never</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="border-t border-gray-700 pt-8">
            <h4 className="text-lg font-medium text-white mb-4">Privacy Settings</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-600/50">
                <div>
                  <div className="text-white font-medium">Analytics & Usage Data</div>
                  <div className="text-gray-400 text-sm">Help improve our service by sharing anonymous usage data</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-600/50">
                <div>
                  <div className="text-white font-medium">Marketing Communications</div>
                  <div className="text-gray-400 text-sm">Receive updates about new features and promotions</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-600/50">
                <div>
                  <div className="text-white font-medium">Third-party Integrations</div>
                  <div className="text-gray-400 text-sm">Allow connections with external trading platforms</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Account Management */}
          <div className="border-t border-gray-700 pt-8">
            <h4 className="text-lg font-medium text-white mb-4">Account Management</h4>
            <div className="space-y-4">
              <button className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Deactivate Account</div>
                    <div className="text-gray-400 text-sm">Temporarily disable your account</div>
                  </div>
                  <div className="text-gray-400">→</div>
                </div>
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="border-t border-gray-700 pt-8">
            <h4 className="text-lg font-medium text-red-400 mb-4 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Danger Zone</span>
            </h4>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
              <div className="mb-4">
                <h5 className="text-white font-medium mb-2">Delete Account</h5>
                <p className="text-gray-400 text-sm mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <ul className="text-gray-400 text-sm space-y-1 mb-4">
                  <li>• All analysis history will be permanently deleted</li>
                  <li>• Chart uploads and saved data will be removed</li>
                  <li>• Your subscription will be cancelled immediately</li>
                  <li>• This action cannot be reversed</li>
                </ul>
              </div>
              <button className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return <ProfileTab />;
      case 'notifications': return <NotificationsTab />;
      case 'security': return <SecurityTab />;
      case 'preferences': return <PreferencesTab />;
      case 'billing': return <BillingTab />;
      case 'data': return <DataTab />;
      default: return <ProfileTab />;
    }
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
              Account Settings
            </h2>
            <p className="text-gray-400">
              Manage your account preferences and security settings
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-64">
              <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50 sticky top-6">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                          activeTab === tab.id
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.name}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Quick Actions */}
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <h4 className="text-gray-400 text-sm font-medium mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => onNavigate('dashboard')}
                      className="w-full text-left px-3 py-2 text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      Back to Dashboard
                    </button>
                    <button
                      onClick={() => onNavigate('upload')}
                      className="w-full text-left px-3 py-2 text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      New Analysis
                    </button>
                    <button
                      onClick={() => onNavigate('history')}
                      className="w-full text-left px-3 py-2 text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      View History
                    </button>
                    <button
                      onClick={onSignOut}
                      className="w-full text-left px-3 py-2 text-red-400 hover:text-red-300 transition-colors text-sm"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {renderTabContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;