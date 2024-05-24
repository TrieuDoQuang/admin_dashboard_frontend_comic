import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useAxiosPrivate } from "../../hooks";

const User = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosPrivate.get(
          "http://comic.pantech.vn:8080/api/user/getAllUsers"
        );
        const data = response?.data?.result;
        console.table(data);
        // console.table(response.data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="overflow-y: scroll">
      <div className="relative max-h-screen shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3 text-white">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                DoB
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Gender
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Username
              </th>
            </tr>
          </thead>

          <tbody>
            {users &&
              users.map((user) => (
                <tr
                  className="bg-white  border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={user.id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.fullName}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.dateOfBirth}</td>
                  <td className="px-6 py-4">{`${
                    user.male ? "Male" : "Female"
                  }`}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">{user.username}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default User;
