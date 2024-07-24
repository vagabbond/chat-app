import { FC } from 'react';
import { IoSend } from 'react-icons/io5';

const ChatFooter: FC = () => {
  return (
    <footer className="h-fit bg-[#f5f5f5] border-t border-t-[#e9e8e9] p-5">
      <form>
        <div className="relative">
          <input
            type="search"
            id="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50"
            placeholder="Type your message"
            required
          />
          <button
            type="submit"
            className="text-gray-400 absolute end-2.5 bottom-2 font-medium  text-sm px-4 py-2 ">
            <IoSend size={25} />
          </button>
        </div>
      </form>
    </footer>
  );
};

export default ChatFooter;
