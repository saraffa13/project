import { useSelector, useDispatch } from "react-redux";
import { FaUser, FaEnvelope, FaPhone, FaUserShield, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { deleteUser } from "../store/slicers/authSlicer";
import { notify } from "../utils/helper";
// import { deleteUser } from "../store/slicers/userSlicer"; // Assuming deleteUser is an action


let baseURL = import.meta.env.VITE_BASE_URL;

interface User {
  _id: string;
  name: string;
  gender: string;
  email: string;
  phoneNumber: number;
  role: string;
}

const UserCard = ({ user }: { user: User }) => {
  const dispatch = useDispatch();

  const handleDelete = async (id: string) => {
    try {
        const response = await axios.post(`${baseURL}/user/delete`, {
            userId:id
        }, { withCredentials: true });
        dispatch(deleteUser(id));
        notify("User deleted Successfully!")
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <FaUser className="text-blue-600 dark:text-blue-300 text-3xl" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h2>
        </div>
        <button
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-300"
          onClick={() => handleDelete(user._id)}
        >
          <FaTrashAlt className="text-white" />
        </button>
      </div>

      <p className="text-gray-600 dark:text-gray-300 flex items-center mb-2">
        <FaEnvelope className="mr-2 text-gray-500 dark:text-gray-400" />
        Email: <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">{user.email}</span>
      </p>

      <p className="text-gray-600 dark:text-gray-300 flex items-center mb-2">
        <FaPhone className="mr-2 text-gray-500 dark:text-gray-400" />
        Phone: <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">{user.phoneNumber}</span>
      </p>

      <p className="text-gray-600 dark:text-gray-300 flex items-center">
        <FaUserShield className="mr-2 text-gray-500 dark:text-gray-400" />
        Role: <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">{user.role}</span>
      </p>
    </div>
  );
};

const UsersList = () => {
  const { users } = useSelector((state: any) => state.auth);

  return (
    <section className="p-8 bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-900 dark:text-white tracking-tight">
        Users List
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.length > 0 ? (
          users.map((user: User) => (
            <UserCard key={user._id} user={user} />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-300 text-center text-lg">No users found.</p>
        )}
      </div>
    </section>
  );
};

export default UsersList;
