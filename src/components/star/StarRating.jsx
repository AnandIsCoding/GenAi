import React, { useState } from "react";

import StarIcon from "./StarIcon";

const NUMBER_OF_STARS = 5;

function StarRating({ value = 0, onChange, numberOfStars = NUMBER_OF_STARS }) {
  const [selectedIndex, setSelectedIndex] = useState(value - 1);
  const [hoveredIndex, setHoveredIndex] = useState(value - 1); // start with selected

  const handleClick = (index) => {
    setSelectedIndex(index);
    setHoveredIndex(index); // update hoveredIndex too so it stays consistent
    if (onChange) onChange(index + 1); // send 1-based value
  };

  return (
    <div>
      <div className="stars flex gap-2">
        {Array(numberOfStars)
          .fill("")
          .map((_, index) => {
            const active = index <= hoveredIndex;

            return (
              <button
                key={index}
                onClick={() => handleClick(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(selectedIndex)}
                className="focus:outline-none"
              >
                <StarIcon active={active} />
              </button>
            );
          })}
      </div>
    </div>
  );
}

export default StarRating;
