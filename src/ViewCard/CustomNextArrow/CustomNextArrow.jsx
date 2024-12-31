import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow custom-next" onClick={onClick}>
      <FaArrowRight/>
    </div>
  );
};

export default CustomNextArrow;
