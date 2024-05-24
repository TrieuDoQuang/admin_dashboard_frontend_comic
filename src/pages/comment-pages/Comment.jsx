import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { Button } from "../../components";
import { useAxiosPrivate, useDebounce } from "../../hooks";
import { Notification } from "../../components";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [isSuccessComment, setIsSuccessComment] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const fetchComments = async () => {
    try {
      const response = await axiosPrivate.get(
        "http://comic.pantech.vn:8080/api/comment/getAllComments"
      );
      const data = response?.data?.result;

      console.table(data);
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(
        `http://comic.pantech.vn:8080/api/comment/deleteComment/${id}`
      );
      console.log("Comment deleted successfully!");
      fetchComments();
      setIsSuccessComment(true);
    } catch (error) {
      console.error("Error deleting comment:", error);
      setIsSuccessComment(false);
    }
  };

  return (
    <div>
      <div className="relative  max-h-screen shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3 text-white">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Content
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Create At
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Chapter
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {comments &&
              comments.map((comment) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={comment.id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {comment.fullName}
                  </th>
                  <td className="px-6 py-4 text-white font-bold">
                    {comment.content}
                  </td>
                  <td className="px-6 py-4">{comment.createdAt}</td>
                  <td className="px-6 py-4">{comment.chapterId}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="font-medium hover:text-white text-green-400"
                      onClick={() => handleDelete(comment.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {isSuccessComment === true ? (
        <Notification successMessage="Comment deleted successfully!" />
      ) : isSuccessComment === false ? (
        <Notification errorMessage="Error deleting comment!" />
      ) : null}
    </div>
  );
};

export default Comment;
