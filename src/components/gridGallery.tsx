import BASE_DATA from '@/statics/BASE_DATA';
import Image from 'next/image';
import StarRating from './starRating';

const GridGallery = () => (
  <div className="w-[100vw] h-[100vh] bg-black overflow-scroll">
    <div className="flex flex-wrap">
      {BASE_DATA.map((data, index) => (
        <div
          key={data.title.split(' ').join('-')}
          className="px-1 my-1 w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3 h-[300px] sm:h-[330px] md:h-[260px] lg:h-[240px] xl:h-[250px]"
        >
          <div className="w-full h-full bg-white rounded-md cursor-pointer relative">
            <div className="w-full h-full absolute bg-[#ffffff9c] t-0 r-0 transition opacity-0 hover:opacity-100 p-5 flex flex-col justify-center items-center">
              <p className="text-md">{data.title}</p>
              <div className='flex flex-col items-center'>
                <p className='text-md font-bold'>Rate This Pic !!!</p>
                <StarRating rating={data.rating} />
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
  </div>
);

export default GridGallery;
