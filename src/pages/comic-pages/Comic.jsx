import { useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import { useAxiosPrivate } from "../../hooks";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Notification, PostComic, UpdateComic } from "../../components";
import { Link } from "react-router-dom";
import { SearchContext } from "../../contexts";

const Comic = () => {
  const axiosPrivate = useAxiosPrivate();
  const [comics, setComics] = useState([]);
  const [comicUpdate, setComicUpdate] = useState(null);
  const [isInsertComic, setIsInsertComic] = useState(false);
  const [isUpdateComic, setIsUpdateComic] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");

  const { searchValue } = useContext(SearchContext);

  const fetchComics = async () => {
    try {
      const response = await axios.get(
        "http://comic.pantech.vn:8080/api/comic/getAllComics"
      );
      const data = response?.data?.result;
      console.log(data);
      setComics(data);
    } catch (error) {
      console.error("Error fetching comics:", error);
    }
  };

  useEffect(() => {
    fetchComics();
  }, []);

  const handleInsertComic = () => {
    setIsInsertComic(true);
    fetchComics();
  };

  const handleUpdate = (comic) => {
    setIsUpdateComic(true);
    setComicUpdate(comic);
  };

  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(
        `http://comic.pantech.vn:8080/api/comic/deleteComic/${id}`
      );
      setIsSuccess(true);
      setNotificationMessage("Comic deleted successfully!");
      fetchComics();
      // resetNotification();
    } catch (error) {
      setIsSuccess(false);
      setNotificationMessage("Failed to delete comic.");
      console.error("Error deleting comic:", error);
      // resetNotification();
    }
  };

  const handleChangeFinished = async (id) => {
    try {
      await axiosPrivate.put(
        `http://comic.pantech.vn:8080/api/comic/setIsFinished/${id}`
      );
      setIsSuccess(true);
      setNotificationMessage("Changed status of comic successfully!");
      fetchComics();
    } catch (error) {
      setIsSuccess(false);
      setNotificationMessage("Failed to set finish comic.");
      console.error("Error finishing comic:", error);
    }
  };

  useEffect(() => {
    if (notificationMessage) {
      const timer = setTimeout(() => {
        setNotificationMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notificationMessage]);

  const filteredComics =
    searchValue && searchValue.length > 0 ? searchValue : comics;

  return (
    <div>
      <Button content={"Add Comic"} onClick={handleInsertComic} />

      <div className="relative max-h-screen shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold text-white">
                Name
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-white">
                Author
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-white">
                Description
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-white">
                Genre
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-white">
                Thumbnail
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-white">
                View
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-white">
                Deleted
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-white">
                Finished
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-white">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredComics.map((comic) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={comic.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {comic.name}
                </th>
                <td className="px-6 py-4">{comic.author}</td>
                <td className="px-6 py-4">{comic.description}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    {comic.genres.map((genre) => (
                      <div key={genre.id}>{genre.name}</div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div
                    className="w-20 h-20 bg-contain bg-no-repeat bg-center rounded-sm"
                    style={{ backgroundImage: `url(${comic.thumbnailUrl})` }}
                  ></div>
                </td>
                <td className="px-6 py-4">{comic.view}</td>
                <td className="px-6 py-4">
                  {comic.deleted ? "Deleted" : "Not Deleted"}
                </td>
                <td className="px-6 py-4">
                  {comic.finished ? "Finished" : "Not Finished"}
                  <button
                    className="font-medium hover:text-white text-green-400"
                    onClick={() => handleChangeFinished(comic.id)}
                  >
                    Change
                  </button>
                </td>

                <td className="px-6 py-4 flex flex-col justify-between gap-4 text-right">
                  <button
                    className="font-medium hover:text-white text-green-400"
                    onClick={() => handleUpdate(comic)}
                  >
                    Edit
                  </button>
                  <Link to={`/comic/${comic.name}/chapter/${comic.id}`}>
                    <button className="font-medium hover:text-white text-green-400">
                      Go to chapter
                    </button>
                  </Link>
                  <button
                    className="font-medium hover:text-white text-green-400"
                    onClick={() => handleDelete(comic.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isInsertComic && (
        <div className="fixed z-1000 inset-0 bg-opacity-50 bg-black">
          <PostComic
            setIsInsertComic={setIsInsertComic}
            setIsSuccess={setIsSuccess}
            setNotificationMessage={setNotificationMessage}
            fetchComics={fetchComics}
          />
          <div
            className="fixed top-5 right-10 text-2xl font-bold text-[#fff] cursor-pointer hover:text-red-700"
            onClick={() => {
              setIsInsertComic(false);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}

      {isUpdateComic && (
        <div className="fixed z-1000 inset-0 bg-opacity-50 bg-black">
          <UpdateComic
            setIsUpdateComic={setIsUpdateComic}
            setIsSuccess={setIsSuccess}
            setNotificationMessage={setNotificationMessage}
            comic={comicUpdate}
            fetchComics={fetchComics}
          />
          <div
            className="fixed top-5 right-10 text-2xl font-bold text-[#fff] cursor-pointer hover:text-red-700"
            onClick={() => {
              setIsUpdateComic(false);
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

export default Comic;
