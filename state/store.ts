import { create, StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { HagakiData } from 'interfaces/hagaki';
import { Severity, SNACKBAR_DATA_INITIAL_STATE, StackbarData } from 'interfaces/stackbar';

interface HagakiSlice {
  hagakiData: HagakiData[];
  appendHagaki: (hagakiList: HagakiData[]) => void;
  updatHagakiById: (data: Readonly<HagakiData>) => void;
  deleteHagakiById: (id: HagakiData['id']) => void;
  clearHagaki: () => void;
}

interface StackbarSlice {
  stackbar: StackbarData;
  openStackbar: (message: string, severity: Severity) => void;
  closeStackbar: () => void;
}

type AllSlices = HagakiSlice & StackbarSlice;

const createHagakiSlice: StateCreator<AllSlices, [], [['zustand/immer', never]], HagakiSlice> = immer((set) => ({
  hagakiData: [],
  appendHagaki: (hagakiList: HagakiData[]) =>
    set((state) => {
      state.hagakiData.push(...hagakiList);
    }),
  updatHagakiById: (data: Readonly<HagakiData>) =>
    set((state) => {
      state.hagakiData = [...state.hagakiData.map((d) => (d.id === data.id ? { ...data } : d))];
    }),
  deleteHagakiById: (id: HagakiData['id']) =>
    set((state) => {
      state.hagakiData = [...state.hagakiData.filter((data) => data.id !== id)];
    }),
  clearHagaki: () =>
    set((state) => {
      state.hagakiData = [];
    }),
}));

const createStackbarSlice: StateCreator<AllSlices, [], [['zustand/immer', never]], StackbarSlice> = immer((set) => ({
  stackbar: SNACKBAR_DATA_INITIAL_STATE,
  openStackbar: (message: string, severity: Severity) =>
    set((state) => {
      state.stackbar = { isOpen: true, message, severity };
    }),
  closeStackbar: () =>
    set((state) => {
      state.stackbar = SNACKBAR_DATA_INITIAL_STATE;
    }),
}));

const useBoundStore = create<AllSlices>()((...a) => ({
  ...createHagakiSlice(...a),
  ...createStackbarSlice(...a),
}));

export default useBoundStore;
