import { useState, useEffect } from "react";
import { useAxiosPrivate } from "../hooks";
const UpdateChapter = ({
  chapter,
  setIsUpdateChapter,
  fetchChapters,
  comicId,
  setIsSuccess,
  setNotificationMessage,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [chapterUpdate, setChapterUpdate] = useState(chapter);
  console.log(chapterUpdate);
  console.log(comicId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivate.put(
        `http://comic.pantech.vn:8080/api/chapter/editChapter/${chapterUpdate.id}`,
        {
          title: chapterUpdate.title,
          chapterNumber: chapterUpdate.chapterNumber,
        }
      );
      setIsUpdateChapter(false);
      fetchChapters();
      setIsSuccess(true);
      setNotificationMessage("Chapter updated successfully!");
    } catch (error) {
      console.error("Error updating chapter:", error);
      setIsSuccess(false);
      setNotificationMessage("Failed to update chapter.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChapterUpdate({
      ...chapterUpdate,
      [name]: value,
    });
  };
  return (
    <>
      <div className="py-12">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-5 rounded border-2 shadow-lg bg-white"
        >
          <h1 className="py-3 text-center text-2xl uppercase text-green-500">
            Update Chapter
          </h1>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              name="title"
              value={chapterUpdate.title}
              id="chapterTitle"
              placeholder=""
              required
              onChange={handleChange}
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Chapter Title
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="chapterNumber"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={chapterUpdate.chapterNumber}
              id="chapterNumber"
              placeholder=""
              min={1}
              required
              onChange={handleChange}
            />
            <label
              htmlFor="author"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Chapter Number
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="comicId"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={comicId}
              id="comicId"
              placeholder=""
              readOnly
            />
            <label
              htmlFor="author"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Comic Id
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
    </>
  );
};

export default UpdateChapter;
