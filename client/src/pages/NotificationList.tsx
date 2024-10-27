import { useDispatch, useSelector } from 'react-redux';
import { markNotificationAsRead } from '../store/slicers/authSlicer';
import axios from 'axios';
import { notifyError } from '../utils/helper';

let baseURL = import.meta.env.VITE_BASE_URL;

const NotificationPage = () => {
  const { notification } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const handleMarkAsRead = async(notificationId: any) => {
    try {
        const response = await axios.post(
          `${baseURL}/user/notification/markAsRead`,
          { notificationId },
          { withCredentials: true }
        );
        dispatch(markNotificationAsRead(notificationId));
      } catch (error) {
        notifyError("Something went wrong!");
      }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Notifications
      </h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        {notification?.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {notification.map((notify: any) => (
              <li
                key={notify._id}
                className={`flex justify-between items-start p-4 rounded-md hover:bg-blue-50 transition-all duration-200 ${
                  notify.read ? 'bg-gray-100' : 'bg-blue-100'
                }`}
              >
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    {notify.message}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-semibold">Role:</span> {notify.role}
                  </p>
                  <p className="text-sm text-gray-400">
                    <span className="font-semibold">Created At:</span>{' '}
                    {new Date(notify.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      notify.read
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {notify.read ? 'Read' : 'Unread'}
                  </span>
                  {!notify.read && (
                    <button
                      onClick={() => handleMarkAsRead(notify._id)}
                      className="text-blue-600 font-semibold hover:text-blue-800"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No notification available.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
