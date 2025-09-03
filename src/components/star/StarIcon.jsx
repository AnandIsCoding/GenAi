import React from "react";

const StarIcon = ({ size = 34, active}) => {
  return (
    <svg
      width={size}
      height={size}
      className="cursor-pointer "
      viewBox="0 0 24 24"
      fill={active ? "gold" : "white"} // Dynamic color
      xmlns="http://www.w3.org/2000/svg"

    >
      <path d="M12 2L14.09 8.26L20.97 8.91L15.64 13.14L17.18 20L12 16.77L6.82 20L8.36 13.14L3.03 8.91L9.91 8.26L12 2Z" />
    </svg>
  );
};

export default StarIcon;
