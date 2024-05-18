import { useState, useEffect } from "react";
import axios from "../api/axios";
import { Notification } from "./index";
import { useAxiosPrivate } from "../hooks";
const PostComic = ({ setIsInsertComic }) => {
  const axiosPrivate = useAxiosPrivate();
  const [comic, setComic] = useState({
    name: "",
    author: "",
    description: "",
    imageData: null,
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    setIsSubmitted(true); // Set isSubmitted to true when the form is submitted
    const postComic = new FormData();
    e.preventDefault();
    {
      postComic.append("name", comic.name);
      postComic.append("author", comic.author);
      postComic.append("description", comic.description);
      postComic.append("imageData", comic.imageData);
    }
    try {
      await axiosPrivate.post(
        "http://comic.pantech.vn:8080/api/comic/insertComic",
        postComic,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        console.log(postComic)
      );
      setIsSuccess(true); // Set isSuccess to true when the comic is posted successfully
      console.log("Comic posted successfully!");
      setComic({
        name: "",
        author: "",
        description: "",
        imageData: null,
      });
      setIsInsertComic(false); // Close the form after successful insert
    } catch (error) {
      console.error(error);
      console.error(error.response.data);
      setIsSuccess(false);
    }
  };
  const handleChange = (e) => {
    const { name, type, value } = e.target;
    if (type === "file") {
      const file = e.target.files[0];
      setComic({
        ...comic,
        imageData: file,
      });
    } else {
      setComic({
        ...comic,
        [name]: value,
      });
    }
  };
  return (
    <>
      {isSubmitted &&
        (isSuccess ? (
          <Notification successMessage={"Insert comic successfully!"} />
        ) : (
          <Notification errorMessage={"Insert comic fail!"} />
        ))}
      <div className="py-12">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-5 rounded border-2 shadow-lg bg-white"
        >
          <h1 className="py-3 text-center text-2xl uppercase text-green-500">
            Add Comic
          </h1>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              name="name"
              value={comic.name}
              id="name"
              placeholder=""
              required
              onChange={handleChange}
            ></input>
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
              value={comic.author}
              id="author"
              placeholder=""
              required
              onChange={handleChange}
            ></input>
            <label
              htmlFor="author"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Author
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <textarea
              type="text"
              name="description"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={comic.description}
              id="description"
              placeholder=""
              required
              onChange={handleChange}
            ></textarea>
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
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="imageData"
              placeholder=""
              required
              accept="image/*"
              onChange={handleChange}
            ></input>
            <label
              htmlFor="imageData"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Image
            </label>
          </div>
          <div className="flex flex-row-reverse space-x-4 space-x-reverse">
            <button
              type="submit"
              className="text-black border-2 shadow-lg hover:bg-red-800 hover:text-white font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-white dark:hover:bg-red-800 "
            >
              Submit
            </button>
          </div>{" "}
        </form>
      </div>
    </>
  );
};

export default PostComic;
