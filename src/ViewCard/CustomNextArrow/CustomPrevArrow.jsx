import { FaArrowLeft } from "react-icons/fa6";

const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-arrow custom-prev" onClick={onClick}>
        <FaArrowLeft />

      </div>
    );
  };

  export default CustomPrevArrow;