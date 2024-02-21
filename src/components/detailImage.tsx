import React, { useState } from 'react';
import Image from 'next/image';
import StarRating from './starRating';
import baseDataType from '@/statics/baseData';

interface DetailImageProps {
  images: baseDataType[]; // Array of images
  selectedImage: baseDataType; // Selected image
  closeModal: () => void;
}

const DetailImage: React.FC<DetailImageProps> = ({
  images,
  selectedImage,
  closeModal,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    images.findIndex((img) => img === selectedImage)
  );

  const setSelectedImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const nextSlide = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setSelectedImage(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    setSelectedImage(prevIndex);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg p-8 relative">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={closeModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex items-center justify-center relative">
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
            onClick={prevSlide}
          >
            Prev
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
            onClick={nextSlide}
          >
            Next
          </button>
          <div className="flex flex-col">
            <Image
              src={images[currentImageIndex].image_url}
              alt={
                images[currentImageIndex].title.split(' ').join('-') + '-img'
              }
              width={600}
              height={400}
              className="rounded-lg"
            />
            <div className="flex items-center justify-center mb-4">
              {images
                .slice(currentImageIndex, currentImageIndex + 8)
                .map((image, index) => (
                  <div
                    key={image.title.split(' ').join('-')}
                    className={`mx-1 cursor-pointer ${index === 0 ? 'border-blue-500 border-2' : ''}`}
                    onClick={() => setSelectedImage(currentImageIndex + index)}
                  >
                    <Image
                      src={image.image_url}
                      alt={image.title.split(' ').join('-') + '-img'}
                      width={80}
                      height={60}
                      className="rounded-lg"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <p className="text-lg font-bold mt-4">
          {images[currentImageIndex].title}
        </p>
        <div className="flex items-center mt-2">
          <p className="text-md font-bold">Rate This Pic !!!</p>
          <StarRating rating={images[currentImageIndex].rating} />
        </div>
      </div>
    </div>
  );
};

export default DetailImage;
