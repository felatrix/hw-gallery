"use client"
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import BASE_DATA from '@/statics/BASE_DATA';
import GridGallery from '@/components/gridGallery';
import AutocompleteSearch from '@/components/autoCompleteSearch';
import baseDataType from '@/statics/baseData';

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

  const handleSearch = (searchTerm: string) => {
    const filteredData = BASE_DATA.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      {/* <AutocompleteSearch
        options={BASE_DATA.map((item) => item.title)}
        onSelect={handleSearch}
      /> */}
      <GridGallery dataImages={filteredData} />
    </div>
  );
}
