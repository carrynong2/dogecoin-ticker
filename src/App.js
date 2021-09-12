import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import PriceCard from "./components/PriceCard";
import logo from "./logo.png";

function App() {
  const [ticker, setTicker] = useState({
    low: 0,
    high: 0,
    last: 0,
  });

  useEffect(() => {
    async function getDogecoinPrice() {
      const { data } = await axios.get(
        "https://nitinr-cors.herokuapp.com/https://api.wazirx.com/api/v2/tickers/dogeusdt"
      );
      setTicker(data.ticker);
    }
    getDogecoinPrice();
    const interval = setInterval(() => getDogecoinPrice(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      <img src={logo} width={150} height={150} alt="Dogecoin Logo" />
      <h1 className="title">Live Dogecoin Price</h1>
      <h5 className="subtitle">Dogecoin To The Moon 🚀🌕</h5>
      <div className="prices-container">
        <PriceCard type="low" price={ticker.low} />
        <PriceCard type="high" price={ticker.high} />
        <PriceCard type="current" price={ticker.last} />
      </div>
      <p>
        Dogecoin price updated every 10 seconds seconds from{" "}
        <a href="https://wazirx.com/">WazirX API</a>
      </p>
    </div>
  );
}

export default App;
