import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Info from './pages/Info';
import Portfolio from './pages/Portfolio';
import Search from './pages/Search';
import { GlobalStateProvider } from './GlobalState';

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/info" element={<Info />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/search" element={<Search />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;