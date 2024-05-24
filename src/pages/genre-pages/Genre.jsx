import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Button } from "../../components";
import { useAxiosPrivate } from "../../hooks";
import { PostGenre, PostGenreToComic } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Notification } from "../../components";

const Genre = () => {
  const [genres, setGenres] = useState([]);
  const [isInsertGenre, setIsInsertGenre] = useState(false);
  const [isInsertGenreToComic, setIsInsertGenreToComic] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [isSuccess, setIsSuccess] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");

  const [genreComic, setGenreComic] = useState({});
  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        "http://comic.pantech.vn:8080/api/genre/getAllGenres"
      );
      const data = response?.data?.result;
      console.table(data);
      setGenres(data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };
  useEffect(() => {
    fetchGenres();
  }, []);

  const handleInsertGenre = () => {
    setIsInsertGenre(true);
  };

  const handleInsertGenreToComic = (genreId, genreName) => {
    setIsInsertGenreToComic(true);
    setGenreComic({ id: genreId, name: genreName });
  };

  useEffect(() => {
    if (notificationMessage) {
      const timer = setTimeout(() => {
        setNotificationMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notificationMessage]);

  return (
    <div>
      <Button content={"Add Genre"} onClick={handleInsertGenre} />
      <div className="relative  max-h-screen shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3 text-white">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Genre Description
              </th>

              <th scope="col" className="px-6 py-3 text-white">
                <span className="sr-only">Add genre to comic</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {genres &&
              genres.map((genre) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={genre.id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {genre.name}
                  </th>
                  <td className="px-6 py-4 text-white font-bold">
                    {genre.genreDescription}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="font-medium hover:text-white text-green-400"
                      onClick={() =>
                        handleInsertGenreToComic(genre.id, genre.name)
                      }
                    >
                      Add genre to comic
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {isInsertGenre && (
        <div className="fixed z-1000 inset-0 bg-opacity-50 bg-black">
          <PostGenre
            setIsInsertGenre={setIsInsertGenre}
            fetchGenres={fetchGenres}
            setIsSuccess={setIsSuccess}
            setNotificationMessage={setNotificationMessage}
          />
          <div
            className="fixed top-5 right-10 text-2xl font-bold text-[#fff] cursor-pointer hover:text-red-700"
            onClick={() => {
              setIsInsertGenre(false);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}

      {isInsertGenreToComic && (
        <div className="fixed z-1000 inset-0 bg-opacity-50 bg-black">
          <PostGenreToComic
            setIsInsertGenreToComic={setIsInsertGenreToComic}
            setIsSuccess={setIsSuccess}
            genreComic={genreComic}
            setNotificationMessage={setNotificationMessage}
          />
          <div
            className="fixed top-5 right-10 text-2xl font-bold text-[#fff] cursor-pointer hover:text-red-700"
            onClick={() => {
              setIsInsertGenreToComic(false);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
      {notificationMessage && (
        <Notification
          successMessage={isSuccess ? notificationMessage : null}
          errorMessage={!isSuccess ? notificationMessage : null}
        />
      )}
    </div>
  );
};

export default Genre;
