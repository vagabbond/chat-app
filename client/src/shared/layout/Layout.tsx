import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { ModalAddChat } from '../../components/Modal/ModalAddChat';

import Search from '../../components/Search/Search';
import ChatList from '../../components/ChatList/ChatList';
import Notification from '../../components/Notification/Notification';

const Layout: FC = () => {
  const [open, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!open);
  return (
    <div className="w-full flex">
      <div className="w-1/3 h-screen border-r border-r-gray-300">
        <div className="bg-[#f5f5f5] px-5 py-4 border-b border-b-gray-300">
          <div className="flex justify-center items-center flex-col">
            <Search />
            <div className="w-full">
              <p className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-neutral-400 before:me-6 after:flex-1 after:border-t after:border-neutral-400 after:ms-6 ">
                Or
              </p>
            </div>
            <button
              type="button"
              onClick={toggleModal}
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100">
              Add New Chat
            </button>
          </div>
        </div>
        <ChatList />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
      <Notification />
      <ModalAddChat open={open} toggleModal={toggleModal} />
    </div>
  );
};
export default Layout;
