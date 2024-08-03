import { FC, useEffect, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setNotification } from '../../redux/user/userSlice';
import { formatFullDate } from '../../utils/functions';

const Notification: FC = () => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const { notification } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const tempTimer = setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);
    setTimer(tempTimer);
    return () => {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }
    };
  }, [notification]);
  const clearNotification = () => {
    dispatch(setNotification(null));
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  };
  return (
    notification && (
      <div className="fixed flex items-center flex-col w-full right-5 bottom-5 max-w-xs p-4 text-gray-900 bg-white rounded-lg shadow">
        <div className="flex items-center mb-3 justify-between w-full">
          <span className="mb-1 text-sm font-semibold text-gray-900 ">New message</span>
          <button
            onClick={clearNotification}
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8">
            <IoIosClose />
          </button>
        </div>
        <div className="flex items-center">
          <div className="inline-block shrink-0">
            {notification.user.photo ? (
              <img src={notification.user.photo} className="w-12 h-12 rounded-full" />
            ) : (
              <FaRegUserCircle className="w-12 h-12 rounded-full" />
            )}
          </div>
          <div className="ms-3 text-sm font-normal">
            <div className="text-sm font-semibold text-gray-900 ">
              {notification.user.firstName} {notification.user.lastName}
            </div>
            <div className="text-sm font-normal">{notification.message}</div>
            <span className="text-xs font-medium text-blue-600 ">
              {formatFullDate(new Date(notification.date))}
            </span>
          </div>
        </div>
      </div>
    )
  );
};

export default Notification;
