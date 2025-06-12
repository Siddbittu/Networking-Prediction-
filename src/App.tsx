import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NetworkPredictor from './components/NetworkPredictor';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <NetworkPredictor />
      <About />
      <Footer />
    </div>
  );
}

export default App;