import React, { useState } from 'react';
import Image from 'next/image';
import StarRating from './starRating';
import DetailImage from './detailImage';
import baseDataType from '@/statics/baseData';
import { useGallery } from '@/api/galleryContext';

interface GridGalleryProps {
  dataImages: baseDataType[];
}

const GridGallery: React.FC<GridGalleryProps> = ({ dataImages }) => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const { state } = useGallery();

  const openModal = (image: any) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-black overflow-scroll">
      <div className="flex flex-wrap">
        {dataImages.map((data, index) => (
          <div
            key={data.title.split(' ').join('-')}
            className="px-1 my-1 w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3 h-[300px] sm:h-[330px] md:h-[260px] lg:h-[240px] xl:h-[250px]"
            onClick={() => openModal(data)}
          >
            <div className="w-full h-full bg-white rounded-md cursor-pointer relative">
              <div className="w-full h-full absolute bg-[#ffffff9c] t-0 r-0 transition opacity-0 hover:opacity-100 p-5 flex flex-col justify-center items-center">
                <p className="text-md">{data.title}</p>
                <div className="flex flex-col items-center">
                  <p className="text-md font-bold">Rate This Pic !!!</p>
                  <StarRating data={state.data[index]} />
                </div>
              </div>
              <Image
                src={`${data.image_url}`}
                alt={`${data.title.split(' ').join('-')}-img`}
                width={400}
                height={300}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                priority
              />
            </div>
          </div>
        ))}
      </div>
      {selectedImage && (
        <DetailImage
          images={dataImages}
          selectedImage={selectedImage}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default GridGallery;
