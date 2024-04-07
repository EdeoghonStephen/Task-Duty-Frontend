import React, { useState } from "react";
import dropdownIcon from "../assets/images/dropdown-icon.png";

const Dropdown = ({ setTag }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Urgent");

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleChangeOption = () => {
    const newOption = selectedOption === "Urgent" ? "Important" : "Urgent";
    setSelectedOption(newOption);
    setShowDropdown(false);
    setTag(newOption);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center border p-3 rounded-3 ps-4">
        <p className="mb-0 text-secondary">{selectedOption}</p>
        <img
          style={{ cursor: "pointer" }}
          onClick={handleToggleDropdown}
          src={dropdownIcon}
          alt=""
        />
      </div>

      {showDropdown ? (
        <div
          style={{ cursor: "pointer" }}
          onClick={handleChangeOption}
          className="border p-3 rounded-3 ps-4 mt-3 text-start"
        >
          <p className="mb-0">{selectedOption === "Urgent" ? "Important" : "Urgent"}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;