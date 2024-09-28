import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StockGraph from "../components/StockGraph";

const Info: React.FC = () => {
  return (
    <div>
      <StockGraph ticker="AAPL" />
    </div>
  );
};

export default Info;
