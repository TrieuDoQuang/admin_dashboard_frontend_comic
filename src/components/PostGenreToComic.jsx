import { useState, useEffect } from "react";

const PostGenreToComic = () => {
  const [genres, setGenres] = useState([]);
  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        "http://comic.pantech.vn:8080/api/genre/getAllGenres"
      );
      const data = response?.data?.result;
      console.log(data);
      setGenres(data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);
  return <div></div>;
};

export default PostGenreToComic;
