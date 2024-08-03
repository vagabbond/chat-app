import { FC } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';

import { formatFullDate } from '../../../../utils/functions';
import { IMessage } from '../../../../types/state';
import { useAppSelector } from '../../../../redux/store';

interface IProps {
  message: IMessage;
  photo: string;
}

const UserMessage: FC<IProps> = ({ message, photo }) => {
  const { _id: currentUserId } = useAppSelector((state) => state.user);
  const isUserSender = message.userId === currentUserId;
  const date = formatFullDate(new Date(message.date));
  return (
    <li className={`flex w-full items-center ${isUserSender ? 'justify-end' : 'gap-2'}`}>
      {!isUserSender &&
        (photo ? (
          <img src={photo} className="rounded-full w-10 h-10" />
        ) : (
          <FaRegUserCircle size={35} />
        ))}
      <div>
        <p
          className={`p-3 rounded-3xl  min-w-fit max-w-[300px]  ${
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
