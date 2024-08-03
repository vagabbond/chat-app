import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegUserCircle, FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

import { ModalEditChat } from '../../Modal/ModalEditChat';
import { useAppDispatch } from '../../../redux/store';
import { deleteChat } from '../../../redux/user/userOperations';


interface IProps {
  firstName: string;
  lastName: string;
  photo: string;
}
const ChatHeader: FC<IProps> = ({ firstName, lastName, photo }) => {
  const [open, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!open);

  const { id } = useParams();
  const dispatch = useAppDispatch();

  const onDeleteClick = () => {
    if (id) {
      dispatch(deleteChat(id));
    }
  };

  return (
    <>
      <header className="h-fit bg-[#f5f5f5] flex items-center justify-between p-5 border-b border-b-[#e9e8e9]">
        <div className="flex items-center">
          {photo ? (
            <img src={photo} alt={lastName} className="rounded-full w-10 h-10" />
          ) : (
            <FaRegUserCircle size={35} />
          )}
          <p className="ml-3">
            {firstName} {lastName}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleModal}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 ">
            <MdEdit className="w-4 h-4" />
          </button>
          <button
            onClick={onDeleteClick}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 ">
            <FaTrash className="w-4 h-4" />
          </button>
        </div>
      </header>
      <ModalEditChat open={open} toggleModal={toggleModal} />
    </>
  );
};

export default ChatHeader;
