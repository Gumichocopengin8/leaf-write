import { createContext, ReactNode, useReducer, useMemo, Dispatch } from 'react';
import { HagakiStore, HagakiDataType, hagakiDataReducer, hagakiDataInitialState } from './hagakiContextReducer';
import { MyInfoStore, MyInfoDataType, myInfoDataReducer, myInfoDataInitialState } from './myInfoContextReducer';
import {
  SnackbarStore,
  SnackbarDataType,
  snackbarDataReducer,
  snackbarDataInitialState,
} from './stackbarContextReducer';

type Props = {
  children: ReactNode;
};

const AppContext = createContext<{
  hagakiStore: HagakiStore;
  hagakiDataDispatch: Dispatch<HagakiDataType>;
  myInfoStore: MyInfoStore;
  myInfoataDispatch: Dispatch<MyInfoDataType>;
  stackbarStore: SnackbarStore;
  snackbarDispatch: Dispatch<SnackbarDataType>;
}>({
  hagakiStore: hagakiDataInitialState,
  hagakiDataDispatch: () => null,
  myInfoStore: myInfoDataInitialState,
  myInfoataDispatch: () => null,
  stackbarStore: snackbarDataInitialState,
  snackbarDispatch: () => null,
});

const AppProvider = ({ children }: Props) => {
  const [hagakiState, hagakiDispatch] = useReducer(hagakiDataReducer, hagakiDataInitialState);
  const [myInfoState, myInfoDispatch] = useReducer(myInfoDataReducer, myInfoDataInitialState);
  const [snackbarState, snackbarDispatch] = useReducer(snackbarDataReducer, snackbarDataInitialState);

  const value = useMemo(
    () => ({
      hagakiStore: hagakiState,
      hagakiDataDispatch: hagakiDispatch,
      myInfoStore: myInfoState,
      myInfoataDispatch: myInfoDispatch,
      stackbarStore: snackbarState,
      snackbarDispatch: snackbarDispatch,
    }),
    [hagakiState, myInfoState, snackbarState]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
