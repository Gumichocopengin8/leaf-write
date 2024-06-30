export type Severity = 'error' | 'info' | 'success' | 'warning';

export type StackbarData = {
  isOpen: boolean;
  message: string;
  severity: Severity;
};

export const SNACKBAR_DATA_INITIAL_STATE: StackbarData = {
  isOpen: false,
  message: '',
  severity: 'info',
} as const;
