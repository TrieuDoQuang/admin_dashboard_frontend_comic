import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ content, onClick }) => {
  return (
    <div className="flex p-3 justify-end items-end border-b-4 shadow-sm font-bold right-0">
      <button
        className="flex flex-row items-center gap-3 bg-gradient-to-r rounded-lg from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white hover:text-black cursor-pointer hover:font-bold p-3"
        onClick={onClick}
      >
        <div>{content}</div>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default Button;
