import { HagakiData } from '../interfaces/hagaki';

export type HagakiStore = {
  hagakiData: HagakiData[];
};

export type HagakiDataType =
  | {
      type: 'append';
      newState: HagakiData[];
    }
  | {
      type: 'update_by_id';
      data: Readonly<HagakiData>;
    }
  | {
      type: 'clear';
    };

export const hagakiDataReducer = (state: HagakiStore, action: HagakiDataType): HagakiStore => {
  switch (action.type) {
    case 'append':
      return { hagakiData: [...state.hagakiData, ...action.newState] };
    case 'update_by_id':
      return {
        hagakiData: [...state.hagakiData.map((data) => (data.id === action.data.id ? { ...action.data } : data))],
      };
    case 'clear':
      return { ...hagakiDataInitialState };
    default:
      return state;
  }
};

export const hagakiDataInitialState: HagakiStore = {
  hagakiData: [],
};
