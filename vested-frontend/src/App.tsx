import "./App.css";
<<<<<<< Updated upstream
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Info from "./pages/Info";
import Portfolio from "./pages/Portfolio";
import Layout from "./components/Layout";
import { GlobalStateProvider } from "./GlobalState";
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Info from './pages/Info';
import Portfolio from './pages/Portfolio';
import Layout from './components/Layout';
import NotFound from "./pages/NotFound";
import { GlobalStateProvider } from './GlobalState';
>>>>>>> Stashed changes

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
<<<<<<< Updated upstream
            <Route path="info" element={<Info />} />
          </Route>
          <Route path="portfolio" element={<Portfolio />} />
=======
            <Route path="info/:ticker" element={<Info />} />
            <Route path="portfolio" element={<Portfolio />} />
          </Route>
          <Route path="*" element={<NotFound/>} />
>>>>>>> Stashed changes
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
