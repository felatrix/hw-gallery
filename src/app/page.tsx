'use client';
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import BASE_DATA from '@/statics/BASE_DATA';
import GridGallery from '@/components/gridGallery';
import baseDataType from '@/statics/baseData';
import SearchComponent from '@/components/autoSearch';
import { fuzzySearch } from '@/libs/fuzzySearch';

export default function Home() {
  const [value, setValue] = useLocalStorage<baseDataType[]>('base-data', []);
  const [filteredData, setFilteredData] = useState<baseDataType[]>([]);

  useEffect(() => {
    setValue((prevState) => {
      if (
        prevState.length === 0 ||
        prevState === null ||
        prevState === undefined
      ) {
        return BASE_DATA;
      } else {
        return prevState;
      }
    });
  }, []);

  useEffect(() => {
    setFilteredData(value);
  }, [value]);

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
      <GridGallery dataImages={filteredData} />
    </div>
  );
}
