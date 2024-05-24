import { useState, useEffect } from "react";
import { useAxiosPrivate } from "../hooks";
import axios from "../api/axios";

const PostChapter = ({
  comicId,
  setIsInsertChapter,
  fetchChapters,
  setIsSuccess,
  setNotificationMessage,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [chapter, setChapter] = useState({
    chapterTitle: "",
    chapterNumber: "",
    comicId: comicId,
  });
  const [latestChapter, setLatestChapter] = useState("");

  useEffect(() => {
    fetchLatestChapters();
  }, []);

  const fetchLatestChapters = async () => {
    try {
      const response = await axios.get(
        `http://comic.pantech.vn:8080/api/chapter/getLastChapter/${comicId}`
      );
      const data = response?.data?.result.chapterNumber;
      setLatestChapter(data);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        "http://comic.pantech.vn:8080/api/chapter/insertChapter",
        {
          title: chapter.chapterTitle,
          chapterNumber: latestChapter + 1,
          comicId: comicId,
        }
      );
      const data = response?.data?.result;
      console.log(data);
      setChapter({
        chapterTitle: "",
        chapterNumber: "",
        comicId: comicId,
      });
      setIsInsertChapter(false);
      fetchChapters();
      fetchLatestChapters();
      setIsSuccess(true);
      setNotificationMessage("Chapter inserted successfully!");
    } catch (error) {
      console.error("Error inserting chapter:", error);
      setIsSuccess(false);
      setNotificationMessage("Failed to insert chapter.");
    }
  };
  console.log(chapter);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChapter({
      ...chapter,
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
            Add Chapter
          </h1>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              name="chapterTitle"
              value={chapter.chapterTitle}
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
              type="text"
              name="chapterNumber"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={latestChapter + 1}
              id="chapterNumber"
              placeholder=""
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
              value={chapter.comicId}
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

export default PostChapter;
