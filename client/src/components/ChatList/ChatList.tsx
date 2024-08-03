import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';

import { formatShortDate } from '../../utils/functions';
import { useAppSelector } from '../../redux/store';
import { IChat } from '../../types/state';

const ChatList: FC = () => {
  const navigate = useNavigate();
  const { chats } = useAppSelector((state) => state.user);
  const onClick = (id: string) => {
    navigate(`/${id}`);
  };
  return (
    <div className="pt-5">
      <h2 className="mb-5 px-4">Chats</h2>
      <ul className="flex flex-col gap-2">
        {chats &&
          chats.map((item: IChat) => (
            <li className="border-b border-b-gray-300 px-4 py-3" key={item._id}>
              <button
                type="button"
                className="w-full flex justify-between"
                onClick={() => onClick(item._id)}>
                <div className="flex items-center gap-2 ">
                  {item.partner.photo ? (
                    <img
                      src={item.partner.photo}
                      alt={item.partner.lastName}
                      className="rounded-full w-10 h-10"
                    />
                  ) : (
                    <FaRegUserCircle size={35} />
                  )}
                  <div className="flex flex-col items-start max-w-[180px] ">
                    <p>
                      {item.partner.firstName} {item.partner.lastName}
                    </p>
                    <p className=" text-gray-500 max-w-full overflow-x-hidden whitespace-nowrap text-ellipsis">
                      {item.messages[item.messages.length - 1]?.value
                        ? item.messages[item.messages.length - 1].value
                        : 'There is no messages!'}
                    </p>
                  </div>
                </div>
                <p className="text-gray-500">
                  {item.messages[0]?.date && formatShortDate(new Date(item.messages[0].date))}
                </p>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ChatList;
