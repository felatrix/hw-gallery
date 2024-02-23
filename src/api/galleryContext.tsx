import React, { useContext, createContext, useReducer, ReactNode } from 'react';
import galleryReducer, {
  galleryInitialState,
  galleryActionProps,
  galleryStateProps,
} from './galleryReducer';
import baseDataType from '@/statics/baseData';

interface GalleryContextProps {
  state: galleryStateProps;
  dispatch: React.Dispatch<galleryActionProps>;
  changeRating: (galeryItem: galleryActionProps['payload']) => void;
}

const GalleryContext = createContext<GalleryContextProps>({
  state: galleryInitialState,
  dispatch: () => null,
  changeRating: () => null,
});

interface GalleryProviderProps {
  children: ReactNode;
}

const GalleryProvider: React.FC<GalleryProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(galleryReducer, galleryInitialState);

  const changeRating = (galeryItem: galleryActionProps['payload']) => {
    console.log('invoke change retings reducer',galeryItem)
    dispatch({
      type: 'RATING_UPDATE',
      payload: galeryItem,
    });
  };

  return (
    <GalleryContext.Provider value={{ state, dispatch, changeRating }}>
      {children}
    </GalleryContext.Provider>
  );
};
const useGallery = () => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error('useGallery must be used within shopcontext');
  }
  return context;
};
export { GalleryProvider, GalleryContext, useGallery };
