import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export const usePrint = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const onPrint = useReactToPrint({
    pageStyle: '@page { size: 10cm 14.8cm; }',
    content: () => componentRef.current,
  });
  return { componentRef, onPrint };
};
