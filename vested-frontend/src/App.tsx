import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import { GlobalStateProvider } from "./GlobalState";
import About from "./pages/About";
import Info from "./pages/Info";
import "./fonts/font.css"; // Import the fonts CSS file

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
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
