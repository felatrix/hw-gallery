import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import StarRating from './starRating';
import baseDataType from '@/statics/baseData';
import { useGallery } from '@/api/galleryContext';

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
  const { state } = useGallery();
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
    >
      <div className="bg-transparent rounded-lg p-8 relative">
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
          <div className="flex flex-col">
            <div className="w-full bg-white rounded-md cursor-pointer relative">
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 px-4 py-1 font-bold rounded-md z-10"
                onClick={prevSlide}
              >
                Prev
              </button>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 px-4 py-1 font-bold rounded-md z-10"
                onClick={nextSlide}
              >
                Next
              </button>
              <Image
                src={images[currentImageIndex].image_url}
                alt={
                  images[currentImageIndex].title.split(' ').join('-') + '-img'
                }
                width={600}
                height={400}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '50vh',
                  objectFit: 'cover',
                }}
                className="rounded-lg"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full h-full absolute bg-[#ffffff9c] top-0 r-0 transition p-5 
              flex flex-col justify-between items-center"
              >
                <p className="text-lg font-bold">
                  {images[currentImageIndex].title}
                </p>
                <div className="w-full h-max flex flex-col justify-end">
                  <div className="flex flex-col items-center">
                    <p className="text-md font-bold">Rate This Pic !!!</p>
                    <StarRating data={state.data[currentImageIndex]} />
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="flex items-center justify-center mb-4">
              {images
                .slice(currentImageIndex, currentImageIndex + 8)
                .map((image, index) => (
                  <motion.div
                    key={image.title.split(' ').join('-')}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`mx-1 cursor-pointer ${
                      index === 0 ? '' : 'grayscale'
                    }`}
                    onClick={() => setSelectedImage(currentImageIndex + index)}
                  >
                    <Image
                      src={image.image_url}
                      alt={image.title.split(' ').join('-') + '-img'}
                      width={80}
                      height={60}
                      className="rounded-lg"
                    />
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DetailImage;
