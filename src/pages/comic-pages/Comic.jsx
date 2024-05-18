import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../components";
import { PostComic } from "../../components";
const Comic = () => {
  const [comics, setComics] = useState([]);
  const [isInsertComic, setIsInsertComic] = useState(false);
  const [isEditComic, setIsEditComic] = useState(false);
  console.log(isInsertComic);
  const fetchComics = async () => {
    try {
      const response = await axios.get("/api/comic/getAllComics");
      const data = response?.data?.result;
      console.log(data);
      setComics(data);
    } catch (error) {
      console.error("Error fetching comics:", error);
    }
  };

  const handleInsertComic = () => {
    setIsInsertComic(true);
    fetchComics();
  };
  useEffect(() => {
    fetchComics();
  }, []);

  return (
    <div className="">
      <Button content={"Add Comic"} onClick={() => handleInsertComic()} />
      <div className="relative overflow-x-auto overflow-auto max-h-screen shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
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
            {comics &&
              comics.map((comic) => (
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
                  </td>
                  <td className="px-6 py-4 flex flex-col justify-between gap-4  text-right">
                    <button className="font-medium  hover:text-white text-green-400">
                      Edit
                    </button>
                    <button className="font-medium hover:text-white text-green-400">
                      Go to chapter
                    </button>
                    <button className="font-medium hover:text-white text-green-400">
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
          <PostComic setIsInsertComic={setIsInsertComic} />
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
    </div>
  );
};

export default Comic;
