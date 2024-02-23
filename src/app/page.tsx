'use client';
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import BASE_DATA from '@/statics/BASE_DATA';
import GridGallery from '@/components/gridGallery';
import baseDataType from '@/statics/baseData';
import SearchComponent from '@/components/autoSearch';
import { fuzzySearch } from '@/libs/fuzzySearch';
import { GalleryProvider } from '@/api/galleryContext';
import { useGallery } from '@/api/galleryContext';

const HomePageWithoutProvider = () => {
  const { state: globalGalleryState } = useGallery();
  const [value, setValue] = useLocalStorage<baseDataType[]>('base-data', []);
  const [filteredData, setFilteredData] = useState<baseDataType[]>([]);

  useEffect(() => {
    setValue((prevState) => {
      if (
        prevState.length === 0 ||
        prevState === null ||
        prevState === undefined
      ) {
        return globalGalleryState.data;
      } else {
        return prevState;
      }
    });
  }, []);

  useEffect(() => {
    console.log('invoke at the top');
    setValue(globalGalleryState.data);
  }, [globalGalleryState]);

  type HandlerSearchType = (data: string) => void;

  const handlerSearch: HandlerSearchType = (data) => {
    const filteredSuggestions = BASE_DATA.filter((item) =>
      fuzzySearch(data, item.title)
    );
    setFilteredData(filteredSuggestions);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <SearchComponent handlerSearch={handlerSearch} />
      <GridGallery
        dataImages={filteredData}
      />
    </div>
  );
};

export default function Home() {
  return (
    <>
      <GalleryProvider>
        <HomePageWithoutProvider />
      </GalleryProvider>
    </>
  );
}
