import React, { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import baseDataType from '@/statics/baseData';
import BASE_DATA from '@/statics/BASE_DATA';
import { useGallery } from '@/api/galleryContext';
interface StarRatingProps {
  data: baseDataType;
}

const StarRating: React.FC<StarRatingProps> = ({
  data,
}) => {
  const rating = data.rating;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [value, setValue] = useLocalStorage<baseDataType[]>('base-data', []);
  const { changeRating } = useGallery();

  const handlerPickRating: (star: number) => void = (star) => {
    const index = value.findIndex((obj) => obj.title == data.title);
    const newValueObj = { ...value[index], rating: star + 1 };
    changeRating({
      image:newValueObj,
      index:index
    })
  };
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
              onClick={() => handlerPickRating(index)}
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
