import { useState, useEffect, useContext } from "react";
import { ComicItem } from "../components";
import axios from "../api/axios";
import { SearchContext } from "../contexts";
const DashBoard = () => {
  const { searchValue } = useContext(SearchContext);

  const [comics, setComics] = useState([]);

  const filteredComics =
    searchValue && searchValue.length > 0 ? searchValue : comics;
  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get("/api/comic/get3MostViewComics");
        const data = response?.data?.result;
        console.log(data);
        setComics(data);
      } catch (error) {
        console.error("Error fetching comics:", error);
      }
    };
    fetchComics();
  }, []);
  return (
    <div className="max-h-screen">
      <div className="text-2xl text-center mt-5 font-bold text-green-400">
        TOP 3 COMIC ON A MONTH
      </div>
      <div>
        <ComicItem comics={filteredComics} />
      </div>
    </div>
  );
};

export default DashBoard;
