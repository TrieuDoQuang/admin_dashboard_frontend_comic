import { useState, useEffect } from "react";
import { useAxiosPrivate } from "../hooks";
const PostChapterImage = ({
  chapterId,
  setIsInsertChapterImage,
  setIsSuccess,
  setNotificationMessage,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [files, setFiles] = useState([]);
  const handleChange = (e) => {
    const files = e.target.files;
    let newFiles = [];
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      newFiles.push(files[i]);
    }
    setFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("imageData", files[i]);
    }
    try {
      const response = await axiosPrivate.post(
        `http://comic.pantech.vn:8080/api/image/insertChapterImages/${chapterId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = response?.data?.result;
      console.log(data);
      setFiles([]);
      setIsInsertChapterImage(false);
      setIsSuccess(true);
      setNotificationMessage("Chapter image inserted successfully!");
      console.log("Chapter image inserted successfully!");
    } catch (error) {
      console.error("Error inserting chapter image:", error);
      setIsSuccess(false);
      setNotificationMessage("Failed to insert chapter image.");
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
            Add Image Chapter
          </h1>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="chapterId"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={chapterId}
              id="chapterId"
              placeholder=""
              readOnly
            />
            <label
              htmlFor="author"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Chapter Id
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="file"
              name="imageData"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="imageData"
              placeholder=""
              required
              accept="image/*"
              multiple
              onChange={handleChange}
            />
            <label
              htmlFor="imageData"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Image Chapter
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

export default PostChapterImage;
