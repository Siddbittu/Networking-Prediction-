import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, CheckCircle, Loader, Info, Server } from 'lucide-react';

interface PredictionData {
  latency_ms: number;
  packet_loss_pct: number;
  jitter_ms: number;
  bandwidth_usage_pct: number;
}

interface PredictionResult {
  prediction: number[];
}

interface FormatResponse {
  expected_format: {
    latency_ms: string;
    packet_loss_pct: string;
    jitter_ms: string;
    bandwidth_usage_pct: string;
  };
}

const NetworkPredictor = () => {
  const [formData, setFormData] = useState<PredictionData>({
    latency_ms: 0,
    packet_loss_pct: 0,
    jitter_ms: 0,
    bandwidth_usage_pct: 0,
  });
  
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [format, setFormat] = useState<FormatResponse['expected_format'] | null>(null);

  // Wake up server on component mount
  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        setServerStatus('checking');
        const response = await fetch('https://netwok-api.onrender.com/', {
          method: 'GET',
        });
        
        if (response.ok) {
          setServerStatus('online');
          // Also fetch the format
          const formatResponse = await fetch('https://netwok-api.onrender.com/format');
          if (formatResponse.ok) {
            const formatData: FormatResponse = await formatResponse.json();
            setFormat(formatData.expected_format);
          }
        } else {
          setServerStatus('offline');
        }
      } catch (err) {
        setServerStatus('offline');
        console.error('Server wake-up failed:', err);
      }
    };

    wakeUpServer();
  }, []);

  const handleInputChange = (field: keyof PredictionData, value: string) => {
    const numericValue = parseFloat(value) || 0;
    setFormData(prev => ({
      ...prev,
      [field]: numericValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    // If server is offline, try to wake it up first
    if (serverStatus === 'offline') {
      try {
        setServerStatus('checking');
        const wakeUpResponse = await fetch('https://netwok-api.onrender.com/', {
          method: 'GET',
        });
        
        if (wakeUpResponse.ok) {
          setServerStatus('online');
        } else {
          throw new Error('Server is not responding');
        }
      } catch (err) {
        setServerStatus('offline');
        setError('Server is currently offline. Please try again in a moment.');
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch('https://netwok-api.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: PredictionResult = await response.json();
      setPrediction(result.prediction[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while making the prediction');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      latency_ms: 0,
      packet_loss_pct: 0,
      jitter_ms: 0,
      bandwidth_usage_pct: 0,
    });
    setPrediction(null);
    setError(null);
  };

  const getServerStatusColor = () => {
    switch (serverStatus) {
      case 'online': return 'text-green-600';
      case 'offline': return 'text-red-600';
      case 'checking': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getServerStatusText = () => {
    switch (serverStatus) {
      case 'online': return 'Server Online';
      case 'offline': return 'Server Offline';
      case 'checking': return 'Connecting to Server...';
      default: return 'Unknown';
    }
  };

  return (
    <section id="predictor" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Network Health Predictor
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Enter your network metrics to get an AI-powered prediction of potential issues
          </p>
          
          {/* Server Status */}
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white shadow-sm ${getServerStatusColor()}`}>
            <Server className="h-4 w-4" />
            <span className="text-sm font-medium">{getServerStatusText()}</span>
            {serverStatus === 'checking' && <Loader className="h-4 w-4 animate-spin" />}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Expected Format Display */}
          {format && (
            <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Expected Input Format</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-blue-800">Latency:</span>
                      <span className="text-blue-700 ml-2">{format.latency_ms}</span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">Packet Loss:</span>
                      <span className="text-blue-700 ml-2">{format.packet_loss_pct}</span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">Jitter:</span>
                      <span className="text-blue-700 ml-2">{format.jitter_ms}</span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">Bandwidth Usage:</span>
                      <span className="text-blue-700 ml-2">{format.bandwidth_usage_pct}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="latency" className="block text-sm font-semibold text-gray-700 mb-2">
                  Latency (milliseconds)
                </label>
                <input
                  id="latency"
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.latency_ms || ''}
                  onChange={(e) => handleInputChange('latency_ms', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
                  placeholder="45.2"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Network response time in milliseconds</p>
              </div>

              <div>
                <label htmlFor="packet-loss" className="block text-sm font-semibold text-gray-700 mb-2">
                  Packet Loss (percentage)
                </label>
                <input
                  id="packet-loss"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.packet_loss_pct || ''}
                  onChange={(e) => handleInputChange('packet_loss_pct', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
                  placeholder="0.3"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Percentage of packets lost during transmission</p>
              </div>

              <div>
                <label htmlFor="jitter" className="block text-sm font-semibold text-gray-700 mb-2">
                  Jitter (milliseconds)
                </label>
                <input
                  id="jitter"
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.jitter_ms || ''}
                  onChange={(e) => handleInputChange('jitter_ms', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
                  placeholder="4.5"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Variation in packet arrival times</p>
              </div>

              <div>
                <label htmlFor="bandwidth" className="block text-sm font-semibold text-gray-700 mb-2">
                  Bandwidth Usage (percentage)
                </label>
                <input
                  id="bandwidth"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={formData.bandwidth_usage_pct || ''}
                  onChange={(e) => handleInputChange('bandwidth_usage_pct', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
                  placeholder="68.0"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Current bandwidth utilization percentage</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={loading || serverStatus === 'offline'}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Analyzing Network...</span>
                  </>
                ) : serverStatus === 'checking' ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Connecting to Server...</span>
                  </>
                ) : (
                  <>
                    <Activity className="h-5 w-5" />
                    <span>Predict Network Health</span>
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                className="px-8 py-4 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg font-semibold transition-colors"
              >
                Reset Form
              </button>
            </div>
          </form>

          {/* Results Section */}
          {(prediction !== null || error) && (
            <div className="mt-8 p-6 rounded-xl border-2 border-dashed">
              {error ? (
                <div className="flex items-center space-x-3 text-red-600">
                  <AlertTriangle className="h-6 w-6" />
                  <div>
                    <h3 className="font-semibold">Prediction Error</h3>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              ) : prediction !== null ? (
                <div className={`flex items-center space-x-3 ${prediction === 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {prediction === 0 ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <AlertTriangle className="h-6 w-6" />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">
                      {prediction === 0 ? 'Network Healthy ✅' : 'Network Issue Detected ⚠️'}
                    </h3>
                    <p className="text-sm opacity-80">
                      {prediction === 0 
                        ? 'Your network metrics indicate normal operation with no predicted issues. All systems are functioning optimally.'
                        : 'Your network metrics suggest potential connectivity or performance issues that may require immediate attention to prevent service disruption.'
                      }
                    </p>
                    <div className="mt-2 text-xs opacity-70">
                      Prediction Result: {prediction === 0 ? 'No Issue (0)' : 'Issue Detected (1)'}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NetworkPredictor;