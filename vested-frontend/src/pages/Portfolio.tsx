import Header from "../components/Header";
import StockGraph from "../components/StockGraph";

const Portfolio: React.FC = () => {
  return (
    <div>
      <Header />
      <h1>Portfolio</h1>
      <StockGraph ticker="AAPL" />
    </div>
  );
};

export default Portfolio;
