import React, { useState } from 'react';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const isFilled =
          hoveredIndex === null ? index < rating : index <= hoveredIndex;
        const iconCode: number = isFilled
          ? [128532, 128528, 128522, 128517, 128513][index] 
          : 128566;

        return (
          <>
            <span
              key={index}
              className={`text-2xl cursor-pointer ${isFilled ? 'hover:grayscale-0' : 'grayscale'}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {String.fromCodePoint(iconCode)}
            </span>
          </>
        );
      })}
    </div>
  );
};

export default StarRating;
