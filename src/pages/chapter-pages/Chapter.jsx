import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, PostChapter, PostChapterImage } from "../../components";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import { useAxiosPrivate } from "../../hooks";
const Chapter = () => {
  const [chapters, setChapters] = useState([]);
  const [isInsertChapter, setIsInsertChapter] = useState(false);
  const [isInsertChapterImage, setIsInsertChapterImage] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState(null);

  const { comicId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const fetchChapters = async () => {
    try {
      const response = await axios.get(
        `/api/chapter/getComicChapters/${comicId}`
      );
      const data = response?.data?.result;
      console.log(data);
      setChapters(data);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(
        `http://comic.pantech.vn:8080/api/chapter/deleteChapter/${id}`
      );
      console.log("Chapter deleted successfully!");
      fetchChapters();
    } catch (error) {
      console.error("Error deleting chapter:", error);
    }
  };

  const handleInsertChapterImage = (chapterId) => {
    setSelectedChapterId(chapterId);
    setIsInsertChapterImage(true);
  };

  const handleDeleteChapterImage = async (chapterId) => {
    try {
      await axiosPrivate.delete(
        `http://comic.pantech.vn:8080/api/image/deleteChapterImages/${chapterId}`
      );
      console.log("Chapter image deleted successfully!");
      fetchChapters();
    } catch (error) {
      console.error("Error deleting chapter image:", error);
    }
  };

  return (
    <div>
      <Button
        content={"Add Chapter"}
        onClick={() => setIsInsertChapter(true)}
      />

      <div className="relative  max-h-screen shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold text-white">
                Title
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-white">
                Chapter Number
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-white">
                Image Urls
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-white">
                Created At
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-white">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {chapters &&
              chapters.map((chapter) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={chapter.id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {chapter.title}
                  </th>
                  {/* <td className="px-6 py-4">{chapter.title}</td> */}
                  <td className="px-6 py-4">{chapter.chapterNumber}</td>
                  <td className="px-6 py-4">{chapter.imageUrls}</td>
                  <td className="px-6 py-4">{chapter.createdAt}</td>
                  <td className="px-6 py-4 flex flex-col justify-between gap-4  text-right">
                    <button className="font-medium  hover:text-white text-green-400">
                      Edit
                    </button>

                    <button
                      className="font-medium hover:text-white text-green-400"
                      onClick={() => handleDelete(chapter.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="font-medium hover:text-white text-green-400"
                      onClick={() => handleInsertChapterImage(chapter.id)}
                    >
                      Insert chapter image
                    </button>
                    <button
                      className="font-medium hover:text-white text-green-400"
                      onClick={() => handleDeleteChapterImage(chapter.id)}
                    >
                      Delete chapter image
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {isInsertChapter && (
        <div className="fixed z-9999 inset-0 bg-opacity-50 bg-black">
          <PostChapter
            comicId={comicId}
            setIsInsertChapter={setIsInsertChapter}
            fetchChapters={fetchChapters}
          />
          <div
            className="fixed top-5 right-10 text-2xl font-bold text-[#fff] cursor-pointer hover:text-red-700"
            onClick={() => {
              setIsInsertChapter(false);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}

      {isInsertChapterImage && (
        <div className="fixed z-9999 inset-0 bg-opacity-50 bg-black">
          <PostChapterImage
            chapterId={selectedChapterId}
            setIsInsertChapterImage={setIsInsertChapterImage}
            fetchChapters={fetchChapters}
          />
          <div
            className="fixed top-5 right-10 text-2xl font-bold text-[#fff] cursor-pointer hover:text-red-700"
            onClick={() => {
              setIsInsertChapterImage(false);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chapter;
