import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Survey from './pages/Survey';
import Result from './pages/Result';
import './App.css';

function App() {
  return (
    <Router basename="/busanbank">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/result/:personaId" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
