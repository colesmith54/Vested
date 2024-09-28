import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Info from './pages/Info';
import Portfolio from './pages/Portfolio';
import { GlobalStateProvider } from './GlobalState';

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/info" element={<Info />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;