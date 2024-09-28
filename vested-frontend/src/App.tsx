import "./App.css";
import Dashboard from "./pages/Dashboard.tsx";
import { GlobalStateProvider } from './GlobalState';


function App() {
  // Use state
  // const [count, setCount] = useState(0)

  return (
    <GlobalStateProvider>
      <h1>Vested</h1>
      <Dashboard />
    </GlobalStateProvider>
  );
}

export default App;
