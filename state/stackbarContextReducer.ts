type Severity = 'error' | 'info' | 'success' | 'warning';

export type SnackbarStore = {
  data: {
    isOpen: boolean;
    message: string;
    severity: Severity;
  };
};

export type SnackbarDataType =
  | {
      type: 'open';
      message: string;
      severity: Severity;
    }
  | {
      type: 'close';
    };

export const snackbarDataReducer = (state: SnackbarStore, action: SnackbarDataType): SnackbarStore => {
  switch (action.type) {
    case 'open':
      return { data: { isOpen: true, message: action.message, severity: action.severity } };
    case 'close':
      return { ...snackbarDataInitialState };
    default:
      return state;
  }
};

export const snackbarDataInitialState: SnackbarStore = {
  data: {
    isOpen: false,
    message: '',
    severity: 'info',
  },
};
