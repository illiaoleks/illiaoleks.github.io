import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

import Header from './components/Header';
import Navigation from './components/Navigation';
import PremiumPlanSection from './components/PremiumPlanSection';
import Some from './components/Some';
import Footer from './components/Footer';

import LessonsPage from './pages/LessonsPage';
import ProgressPage from './pages/ProgressPage'; import PracticePage from './pages/PracticePage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navigation />
        <main className="container my-4">
          <Routes>
            <Route path="/" element={<Navigate to="/lessons" replace />} />
            <Route path="/lessons" element={<LessonsPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/practice" element={<PracticePage />} />
          </Routes>
        </main>
        <PremiumPlanSection />
        <Some />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
