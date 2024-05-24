import { useState, useEffect } from "react";
import { useAxiosPrivate } from "../hooks";
const PostGenreToComic = ({
  genreComic,
  setIsInsertGenreToComic,
  setIsSuccess,
  setNotificationMessage,
}) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [comics, setComics] = useState([]);
  const [comic, setComic] = useState("");
  const axiosPrivate = useAxiosPrivate();

  console.log(comics);
  console.log(comic);

  const fetchAllComics = async () => {
    try {
      const response = await axiosPrivate.get(
        "http://comic.pantech.vn:8080/api/comic/getAllComics"
      );
      setComics(response.data.result);
    } catch (error) {
      console.error("Error fetching comics:", error);
    }
  };

  const handleChange = (event) => {
    setComic(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivate.post(
        "http://comic.pantech.vn:8080/api/genre/addGenresToComic",
        {
          comicId: comic,
          genreIds: [genreComic.id],
        }
      );
      setSelectedGenre("");
      setIsInsertGenreToComic(false);
      setNotificationMessage("Genre added to comic successfully!");
      setIsSuccess(true);
    } catch (error) {
      console.error("Error inserting genre:", error);
      setIsSuccess(false);
      setNotificationMessage("Failed to add genre to comic.");
    }
  };

  useEffect(() => {
    fetchAllComics();
  }, []);
  return (
    <div className="py-12">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-5 rounded border-2 shadow-lg bg-white"
      >
        <h1 className="py-3 text-center text-2xl uppercase text-green-500">
          Add Genre To Comic
        </h1>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            name="name"
            value={genreComic.name}
            id="name"
            placeholder=""
            readOnly
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Genre Name
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <select
            name="comic"
            id="comic"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={comic}
            required
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a comic
            </option>
            {comics &&
              comics.map((comic) => (
                <option key={comic.id} value={comic.id}>
                  {comic.name}
                </option>
              ))}
          </select>
          <label
            htmlFor="comic"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Comic
          </label>
        </div>
        <div className="flex flex-row-reverse space-x-4 space-x-reverse">
          <button
            type="submit"
            className="text-black border-2 shadow-lg hover:bg-red-800 hover:text-white font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-white dark:hover:bg-red-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostGenreToComic;
