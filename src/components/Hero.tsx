import React from 'react';
import { Shield, Zap, TrendingUp } from 'lucide-react';

const Hero = () => {
  const scrollToPredictor = () => {
    const element = document.getElementById('predictor');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Predict Network
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              {' '}Issues
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Advanced AI-powered network monitoring that predicts issues before they impact your business.
            Stay ahead of connectivity problems with real-time analysis.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={scrollToPredictor}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Prediction
            </button>
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
            >
              Learn More
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
              <Shield className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Proactive Monitoring</h3>
              <p className="text-gray-600">Detect network issues before they cause downtime</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
              <Zap className="h-12 w-12 text-teal-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Analysis</h3>
              <p className="text-gray-600">Get instant predictions with our advanced AI models</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
              <TrendingUp className="h-12 w-12 text-amber-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance Insights</h3>
              <p className="text-gray-600">Understand network patterns and optimize performance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;