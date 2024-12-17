import { useEffect, useState } from "react";

// Nhận vào 3 props
const CustomDropdown = ({ options, selectedValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false); // đóng mở option
  const [selectedOption, setSelectedOption] = useState(
    selectedValue?.ten || "Select option",
  ); //set lable hiển thị

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.ten || "Select option");
    setIsOpen(false);
    onSelect(option);
  }; // thay đổi lable

  useEffect(() => {
    setSelectedOption(selectedValue?.ten || "Select option");
  }, [selectedValue]);

  return (
    <div className="relative inline-block w-[530px] text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:border-blue-500 hover:bg-gray-50"
      >
        {selectedOption}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 max-h-48 w-full overflow-auto rounded-md bg-white shadow-lg">
          <ul className="py-1 text-gray-700 hover:border-blue-400">
            <li
              onClick={() => handleOptionClick({ ten: "Tất cả", id: "" })}
              className="block cursor-pointer px-4 py-2 hover:bg-blue-500 hover:text-white"
            >
              Tất cả
            </li>
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                className="block cursor-pointer px-4 py-2 hover:bg-blue-500 hover:text-white"
              >
                {option.ten}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
