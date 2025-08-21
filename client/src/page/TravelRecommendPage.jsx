import TravelCard from "../components/TravelCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";

function TravelRecommendPage() {
  const [travelData, setTravelData] = useState([]);
  const [travel, setTravel] = useState("");

  async function getTravelData() {
    try {
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${travel}`
      );
      console.log(response.data.data);
      setTravelData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function handleTagClick(tag) {
    setTravel((prev) => {
      const words = prev
        .trim()
        .split(" ")
        .filter((word) => word !== "");
      if (!words.includes(tag)) {
        return prev ? prev + " " + tag : tag;
      }
      return prev;
    });
  }

  useEffect(() => {
    getTravelData();
  }, [travel]);

  return (
    <div className="flex flex-col items-center h-screen mt-10">
      <h1 className="text-5xl font-bold text-blue-400">เที่ยวไหนดี</h1>
      <div className="flex flex-col items-start w-4/5 max-w-5xl">
        <p className="text-2xl text-gray-800 mt-2">ค้นหาที่เที่ยว</p>
        <DebounceInput
          debounceTimeout={500}
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกับ..."
          className="p-2 border-b-4 border-gray-300 rounded-md w-full placeholder:text-center"
          value={travel}
          onChange={(e) => setTravel(e.target.value)}
        />
      </div>
      {travelData.map((item) => (
        <TravelCard
          key={item.eid}
          title={item.title}
          description={item.description}
          imageUrl={item.photos}
          url={item.url}
          tags={item.tags}
          onTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}

export default TravelRecommendPage;
