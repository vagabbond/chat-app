import { FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <form className="relative w-full" onSubmit={onSubmit}>
      <button
        type="submit"
        className="absolute inset-y-0 start-0 flex items-center ps-3.5 text-gray-400 hover:text-gray-500">
        <FaSearch className="w-4 h-4 text-inherit " />
      </button>
      <input
        type="text"
        id="input-group-1"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
        placeholder="Search for chats"
      />
    </form>
  );
};

export default Search;
