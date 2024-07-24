import { FC } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { formatFullDate } from '../../../../utils/functions';

interface IProps {
  message: {
    value: string;
    date: Date;
  };
  id: string;
}

const UserMessage: FC<IProps> = ({ message, id }) => {
  const currentUser = { id: '2' };
  const isUserSender = id === currentUser.id;
  const date = formatFullDate(message.date);
  return (
    <li className={`flex w-full items-center ${isUserSender ? 'justify-end' : 'gap-2'}`}>
      {!isUserSender && <FaRegUserCircle size={35} />}
      <div className="">
        <p
          className={`p-3 rounded-3xl max-w-[300px] ${
            isUserSender ? 'bg-[#dfdfdf] text-[#424242]' : 'bg-[#3e4057] text-white'
          }`}>
          {message.value}
        </p>
        <p>{date}</p>
      </div>
    </li>
  );
};

export default UserMessage;
