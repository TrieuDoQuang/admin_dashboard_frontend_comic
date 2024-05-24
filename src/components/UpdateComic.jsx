import { useState, useEffect } from "react";
import { useAxiosPrivate } from "../hooks";

const UpdateComic = ({
  setIsUpdateComic,
  comic,
  fetchComics,
  setIsSuccess,
  setNotificationMessage,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [comicUpdate, setComicUpdate] = useState({
    ...comic,
    imageData: comic.thumbnailUrl,
  });
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateComic = new FormData();
    updateComic.append("name", comicUpdate.name);
    updateComic.append("author", comicUpdate.author);
    updateComic.append("description", comicUpdate.description);
    if (comicUpdate.imageData instanceof File) {
      updateComic.append("imageData", comicUpdate.imageData);
    }
    try {
      await axiosPrivate.put(
        `http://comic.pantech.vn:8080/api/comic/editComic/${comicUpdate.id}`,
        updateComic,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsSuccess(true);
      setNotificationMessage("Comic updated successfully!");
      setIsUpdateComic(false);
      fetchComics();
    } catch (error) {
      setIsSuccess(false);
      setNotificationMessage("Failed to update comic.");
      console.error("Error updating comic:", error);
    }
  };
  console.log(comicUpdate);
  const handleChange = (e) => {
    const { name, type, value } = e.target;
    if (type === "file") {
      const file = e.target.files[0];
      setComicUpdate({
        ...comicUpdate,
        imageData: file ? file : comicUpdate.imageData,
      });
    } else {
      setComicUpdate({
        ...comicUpdate,
        [name]: value,
      });
    }
  };
  return (
    <>
      <div className="py-12">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-5 rounded border-2 shadow-lg bg-white"
        >
          <h1 className="py-3 text-center text-2xl uppercase text-green-500">
            Edit Comic
          </h1>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              name="name"
              value={comicUpdate.name}
              id="name"
              placeholder=""
              required
              onChange={handleChange}
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Comic Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="author"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={comicUpdate.author}
              id="author"
              placeholder=""
              required
              onChange={handleChange}
            />
            <label
              htmlFor="author"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Author
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <textarea
              name="description"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={comicUpdate.description}
              id="description"
              placeholder=""
              required
              onChange={handleChange}
            />
            <label
              htmlFor="description"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Description
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="file"
              name="imageData"
              id="imageData"
              placeholder=""
              // required
              accept="image/*"
              onChange={handleChange}
            />
            <label
              htmlFor="imageData"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Image
            </label>
          </div>
          <p>Last image: {comicUpdate.thumbnailUrl}</p>

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
    </>
  );
};

export default UpdateComic;
