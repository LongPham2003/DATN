import { useState, useEffect } from "react";

// CustomDropdown là một component nhận vào một prop là options
const DropdownDetail = ({ options, onSelect, selectedValue }) => {
  // Sử dụng useState để quản lý trạng thái của dropdown
  const [isOpen, setIsOpen] = useState(false);
  // Quản lý giá trị của option được chọn
  const [selectedOption, setSelectedOption] = useState("Select an option");

  // Cập nhật selectedOption khi selectedValue thay đổi
  useEffect(() => {
    const selectedOption = options.find(
      (option) => option.id === selectedValue,
    );
    if (selectedOption) {
      setSelectedOption(selectedOption.ten);
    } else {
      setSelectedOption("Select an option");
    }
  }, [selectedValue, options]);

  // Hàm để toggle trạng thái của dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // Hàm để xử lý khi một option được click
  const handleOptionClick = (option) => {
    console.log(`Option clicked: ${option.id}`);

    setSelectedOption(option.ten);
    setIsOpen(false);
    onSelect(option);
  };

  // Thêm lựa chọn giá trị rỗng
  // const optionsWithEmpty = [{ id: "", ten: "Select an option" }, ...options];

  // Thêm props để reset dropdown
  const resetDropdown = () => {
    setSelectedOption("Select an option"); // Đặt lại giá trị đã chọn về mặc định
  };

  return (
    <div className="relative inline-block w-96 text-left">
      <button
        type="button" // Thêm dòng này để ngăn chặn việc submit form
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
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                className="block cursor-pointer px-4 py-2 hover:bg-blue-500 hover:text-white"
                value={option.id}
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

// Xuất khẩu CustomDropdown với prop options
export default DropdownDetail;
