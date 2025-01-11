import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

function SuggestionSection() {
  const [cryptoData, setCryptoData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/search/trending")
      .then((response) => {
        setCryptoData(response.data.coins);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handlePrevClick = () => {
    setStartIndex((prev) => (prev - 5 >= 0 ? prev - 5 : 0));
  };

  const handleNextClick = () => {
    setStartIndex((prev) => (prev + 5 < cryptoData.length ? prev + 5 : prev));
  };

  return (
    <div className="bg-white h-max mt-10 lg:p-14 p-8">
      <div>
        <div className="text-[#202020] text-2xl font-semibold">
          You May Also Like
        </div>

        <div className="relative flex items-center">
          <button onClick={handlePrevClick} className="absolute left-0 z-10 bg-white rounded-full p-2 shadow-md">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div className="flex justify-between overflow-hidden w-full">
            {cryptoData.slice(startIndex, startIndex + 5).map((crypto, index) => (
              <CryptoCard key={index} cryptoData={crypto.item} />
            ))}
          </div>
          <button onClick={handleNextClick} className="absolute right-0 z-10 bg-white rounded-full p-2 shadow-md">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        <div className="text-[#202020] text-2xl font-semibold mt-6">
          Trending Coins
        </div>
        <div className="mt-4 flex justify-between overflow-x-auto">
          {cryptoData.slice(1, 6).map((crypto, index) => (
            <CryptoCard key={index} cryptoData={crypto.item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CryptoCard({ cryptoData }) {
  return (
    <div className="lg:w-[300px] rounded-2xl p-5 border-2 my-2 mr-2">
      <div className="flex items-center space-x-2">
        <img
          src={cryptoData.large}
          alt={cryptoData.name}
          className="w-6 h-6 rounded-full"
        />
        <span className="text-[16px] font-normal">{cryptoData.name}</span>
        <span
          className={`text-${
            cryptoData.data?.price_change_percentage_24h?.usd > 0
              ? "green"
              : "red"
          }-500 bg-${
            cryptoData.data?.price_change_percentage_24h?.usd > 0
              ? "#0AB27D"
              : "#FF0000"
          }/10 text-xs font-normal pr-10`}
        >
          {cryptoData.data?.price_change_percentage_24h?.usd?.toFixed(2)}%
        </span>
      </div>
      <div className="text-xl text-[#171717] font-medium mt-2">
        {cryptoData.data.price}
      </div>
      <img
        src={
          cryptoData && cryptoData.data.sparkline
            ? cryptoData.data.sparkline
            : "https://www.coingecko.com/coins/33566/sparkline.svg"
        }
        alt={cryptoData.name}
        className="w-full h-20"
      />
    </div>
  );
}

export default SuggestionSection;
