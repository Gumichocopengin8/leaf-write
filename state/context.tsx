import { createContext, ReactNode, useReducer, useMemo, Dispatch } from 'react';
import { HagakiStore, HagakiDataType, hagakiDataReducer, hagakiDataInitialState } from './hagakiContextReducer';

type Props = {
  children: ReactNode;
};

const AppContext = createContext<{
  hagakiStore: HagakiStore;
  hagakiDataDispatch: Dispatch<HagakiDataType>;
}>({
  hagakiStore: hagakiDataInitialState,
  hagakiDataDispatch: () => null,
});

const AppProvider = ({ children }: Props) => {
  const [hagakiState, hagakiDispatch] = useReducer(hagakiDataReducer, hagakiDataInitialState);

  const value = useMemo(
    () => ({
      hagakiStore: hagakiState,
      hagakiDataDispatch: hagakiDispatch,
    }),
    [hagakiState]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
