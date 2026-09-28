import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Service from './Service';
import Components from './Components';
import Contact from './Contact';
import Seo from './Seo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Seo path="/" /><Home /></>} />
        <Route path="/about" element={<><Seo path="/about" /><About /></>} />
        <Route path="/service" element={<><Seo path="/service" /><Service /></>} />
        <Route path="/components" element={<><Seo path="/components" /><Components /></>} />
        <Route path="/contact" element={<><Seo path="/contact" /><Contact /></>} />
      </Routes>
    </Router>
  );
}

export default App;
