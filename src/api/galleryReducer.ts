import BASE_DATA from "@/statics/BASE_DATA"
import baseDataType from "@/statics/baseData";
import { Reducer } from 'react';

export interface galleryStateProps {
    data: baseDataType[]
}
export interface galleryActionProps {
    type: "RATING_UPDATE",
    payload: {
        image: baseDataType,
        index: number
    }
}
export const galleryInitialState = {
    data: BASE_DATA
};

const galleryReducer: Reducer<galleryStateProps, galleryActionProps> = (state: galleryStateProps, action: galleryActionProps) => {
    const { type, payload } = action;
    switch (type) {
        case "RATING_UPDATE": {
            const galleryArrCopy = [...state.data];
            galleryArrCopy[payload.index] = payload.image
            return { ...state, data: galleryArrCopy }
        }
        default:
            return state;
    }
}

export default galleryReducer;