import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Info from './pages/Info';
import Portfolio from './pages/Portfolio';
import Layout from './components/Layout';
import NotFound from "./pages/NotFound";
import { GlobalStateProvider } from './GlobalState';

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="info/:ticker" element={<Info />} />
          </Route>
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
