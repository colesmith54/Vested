import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Info from './pages/Info';
import Portfolio from './pages/Portfolio';
import Layout from './components/Layout';
import { GlobalStateProvider } from './GlobalState';

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <Routes>
          {/* Define a parent route with Layout */}
          <Route path="/" element={<Layout />}>
            {/* Nested routes */}
            <Route index element={<Dashboard />} />
            <Route path="info" element={<Info />} />
            <Route path="portfolio" element={<Portfolio />} />
          </Route>
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;