import { MyInfoData } from '../interfaces/myInfo';

export type MyInfoStore = {
  myInfoData: MyInfoData;
};

export type MyInfoDataType =
  | {
      type: 'update';
      newState: MyInfoData;
    }
  | {
      type: 'clear';
    };

export const myInfoDataReducer = (state: MyInfoStore, action: MyInfoDataType): MyInfoStore => {
  switch (action.type) {
    case 'update':
      return { myInfoData: action.newState };
    case 'clear':
      return { ...myInfoDataInitialState };
    default:
      return state;
  }
};

export const myInfoDataInitialState: MyInfoStore = {
  myInfoData: {
    postalcode_left: '',
    postalcode_right: '',
    address1: '',
    address2: '',
    lastName: '',
    firstName1: '',
    firstName2: '',
  },
};
