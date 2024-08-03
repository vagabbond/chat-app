import { FC, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { editChat } from '../../redux/user/userOperations';
import { IChat } from '../../types/state';

import ModalWrapper from './ModalWrapper';

interface IProps {
  open: boolean;
  toggleModal: () => void;
}
export const ModalEditChat: FC<IProps> = ({ open, toggleModal }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { id: chatId } = useParams();
  const { chats } = useAppSelector((state) => state.user);
  const chat = chats && chats.find((chat: IChat) => chat._id === chatId);

  const dispatch = useAppDispatch();
  useEffect(() => {
    setFirstName(chat.partner.firstName);
    setLastName(chat.partner.lastName);
    return () => {
      setFirstName('');
      setLastName('');
    };
  }, [chat]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (chatId) {
      dispatch(editChat({ chatId, partner: { firstName, lastName } }));
      toggleModal();
      setFirstName('');
      setLastName('');
    }
  };
  return (
    <ModalWrapper open={open} onClose={toggleModal}>
      <div className="w-[300px]">
        <form className="mx-auto my-4 w-48" onSubmit={handleSubmit}>
          <h3 className="text-lg font-black text-gray-800">Edit chat!</h3>
          <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">
              First name
            </label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter here first name"
              required
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 ">
              Last name
            </label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              id="last_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter here last name"
              required
            />
          </div>
          <div className="flex gap-4 mt-3">
            <button type="submit" className="btn btn-success w-full">
              Create
            </button>
            <button onClick={toggleModal} className="btn btn-light w-full">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
};
