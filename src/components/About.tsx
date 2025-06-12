import React from 'react';
import { Brain, Database, Shield, Zap } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About NetworkAI
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cutting-edge machine learning technology that revolutionizes network monitoring
            and predictive maintenance for modern infrastructure.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              AI-Powered Network Intelligence
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Our advanced machine learning algorithms analyze key network metrics including latency, 
              packet loss, jitter, and bandwidth usage to predict potential issues before they impact 
              your operations.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Built on years of network data analysis and continuous learning, NetworkAI provides 
              enterprise-grade predictions with industry-leading accuracy rates.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Real-time network health monitoring</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                <span className="text-gray-700">Predictive issue detection</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                <span className="text-gray-700">Automated performance optimization</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
              <Brain className="h-12 w-12 text-blue-600 mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Machine Learning</h4>
              <p className="text-gray-600">Advanced neural networks trained on massive network datasets</p>
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-2xl">
              <Database className="h-12 w-12 text-teal-600 mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Big Data</h4>
              <p className="text-gray-600">Processing millions of network events for accurate predictions</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-2xl">
              <Shield className="h-12 w-12 text-amber-600 mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Security</h4>
              <p className="text-gray-600">Enterprise-grade security with encrypted data transmission</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
              <Zap className="h-12 w-12 text-purple-600 mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Performance</h4>
              <p className="text-gray-600">Sub-second response times with 99.9% uptime guarantee</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Meet the Developer
            </h3>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">AI</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Network AI Specialist</h4>
                <p className="text-lg text-gray-600 mb-6">
                  Machine Learning Engineer & Network Infrastructure Expert
                </p>
                <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  With over a decade of experience in network infrastructure and machine learning, 
                  I've dedicated my career to solving complex connectivity challenges through 
                  innovative AI solutions. NetworkAI represents the culmination of years of research 
                  and development in predictive network analytics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;