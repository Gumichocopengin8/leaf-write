import { createContext, ReactNode, useReducer, useMemo, Dispatch } from 'react';
import { HagakiStore, HagakiDataType, hagakiDataReducer, hagakiDataInitialState } from './hagakiContextReducer';
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
  stackbarStore: SnackbarStore;
  snackbarDispatch: Dispatch<SnackbarDataType>;
}>({
  hagakiStore: hagakiDataInitialState,
  hagakiDataDispatch: () => null,
  stackbarStore: snackbarDataInitialState,
  snackbarDispatch: () => null,
});

const AppProvider = ({ children }: Props) => {
  const [hagakiState, hagakiDispatch] = useReducer(hagakiDataReducer, hagakiDataInitialState);
  const [snackbarState, snackbarDispatch] = useReducer(snackbarDataReducer, snackbarDataInitialState);

  const value = useMemo(
    () => ({
      hagakiStore: hagakiState,
      hagakiDataDispatch: hagakiDispatch,
      stackbarStore: snackbarState,
      snackbarDispatch: snackbarDispatch,
    }),
    [hagakiState, snackbarState]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
