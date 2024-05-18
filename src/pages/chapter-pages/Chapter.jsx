import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components";
import axios from "../../api/axios";
const Chapter = () => {
  const [chapters, setChapters] = useState([]);
  const { comicId } = useParams();
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

  return (
    <div>
      <Button content={"Add Chapter"} />

      <div className="relative overflow-x-auto overflow-auto max-h-screen shadow-md sm:rounded-lg">
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
                    <button className="font-medium hover:text-white text-green-400">
                      Insert chapter image
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
    </div>
  );
};

export default Chapter;
