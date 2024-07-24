import { FC } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { formatShortDate } from '../../utils/functions';

interface IChats {
  id: string;
  firstName: string;
  lastName: string;
  message: {
    value: string;
    date: Date;
  };
}
const ChatList: FC = () => {
  const navigate = useNavigate();
  const chats: IChats[] = [
    {
      id: 'sd233f2fasdf',
      firstName: 'Maks',
      lastName: 'Thimbarov',
      message: {
        value: 'Hey, how you do?',
        date: new Date()
      }
    },
    {
      id: 'asdga3333qew4qew',
      firstName: 'Rob',
      lastName: 'Wiliams',
      message: {
        value: 'Normal,but hard!',
        date: new Date()
      }
    }
  ];
  const onClick = (id: string) => {
    navigate(`/${id}`);
  };
  return (
    <div className="pt-5">
      <h2 className="mb-5 px-4">Chats</h2>
      <ul className="flex flex-col gap-2">
        {chats.map((item) => (
          <li className="border-b border-b-gray-300 px-4 py-3" key={item.id}>
            <button
              type="button"
              className="w-full flex justify-between"
              onClick={() => onClick(item.id)}>
              <div className="flex items-center gap-2">
                {/* <img src="" alt="" /> */}
                <FaRegUserCircle size={35} />
                <div className="flex flex-col items-start">
                  <p>
                    {item.firstName} {item.lastName}
                  </p>
                  <p>{item.message.value}</p>
                </div>
              </div>
              <p>{formatShortDate(item.message.date)}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
