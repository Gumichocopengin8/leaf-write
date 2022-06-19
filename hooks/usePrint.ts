import { useRef, RefObject } from 'react';
import { useReactToPrint } from 'react-to-print';

export const usePrint = (): [RefObject<HTMLDivElement>, () => void] => {
  const componentRef = useRef<HTMLDivElement>(null);
  const onPrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return [componentRef, onPrint];
};
