import { FC } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';

interface IProps {
  firstName: string;
  lastName: string;
}
const ChatHeader: FC<IProps> = ({ firstName, lastName }) => {
  return (
    <header className="h-fit bg-[#f5f5f5] flex items-center p-5 border-b border-b-[#e9e8e9]">
      <FaRegUserCircle size={35} />
      <p className="ml-3">
        {firstName} {lastName}
      </p>
    </header>
  );
};

export default ChatHeader;
