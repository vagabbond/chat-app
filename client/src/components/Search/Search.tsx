import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import { useFindChat } from '../../hooks/useFindChat';
import { useAppSelector } from '../../redux/store';

const Search = () => {
  const [value, setValue] = useState('');
  const { _id: userId } = useAppSelector((state) => state.user);
  const findChat = useFindChat({
    search: value,
    userId
  });

  useEffect(() => {
    findChat();
  }, [value]);
  return (
    <div className="relative w-full">
      <button
        type="submit"
        className="absolute inset-y-0 start-0 flex items-center ps-3.5 text-gray-400 hover:text-gray-500">
        <FaSearch className="w-4 h-4 text-inherit " />
      </button>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        id="input-group-1"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
        placeholder="Search for chats"
      />
    </div>
  );
};

export default Search;
