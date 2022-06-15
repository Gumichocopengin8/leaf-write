import { createContext, ReactNode, useReducer, useMemo, Dispatch } from 'react';
import { HagakiStore, HagakiDataType, hagakiDataReducer, hagakiDataInitialState } from './hagakiContextReducer';
import { MyInfoStore, MyInfoDataType, myInfoDataReducer, myInfoDataInitialState } from './myInfoContextReducer';

type Props = {
  children: ReactNode;
};

const AppContext = createContext<{
  hagakiStore: HagakiStore;
  hagakiDataDispatch: Dispatch<HagakiDataType>;
  myInfoStore: MyInfoStore;
  myInfoataDispatch: Dispatch<MyInfoDataType>;
}>({
  hagakiStore: hagakiDataInitialState,
  hagakiDataDispatch: () => null,
  myInfoStore: myInfoDataInitialState,
  myInfoataDispatch: () => null,
});

const AppProvider = ({ children }: Props) => {
  const [hagakiState, hagakiDispatch] = useReducer(hagakiDataReducer, hagakiDataInitialState);
  const [myInfoState, myInfoDispatch] = useReducer(myInfoDataReducer, myInfoDataInitialState);

  const value = useMemo(
    () => ({
      hagakiStore: hagakiState,
      hagakiDataDispatch: hagakiDispatch,
      myInfoStore: myInfoState,
      myInfoataDispatch: myInfoDispatch,
    }),
    [hagakiState, myInfoState]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
