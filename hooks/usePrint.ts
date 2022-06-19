import { useRef, useState, RefObject } from 'react';
import { useReactToPrint } from 'react-to-print';

export const usePrint = (): [RefObject<HTMLDivElement>, () => void, boolean] => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [isPrintMode, setIsPrintMode] = useState<boolean>(false);
  const onPrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: '@page { size: 10cm 14.8cm; }',
    onBeforeGetContent: () => {
      setIsPrintMode(true);
      // wait till the page is changed https://github.com/gregnb/react-to-print/issues/169
      return Promise.resolve();
    },
    onAfterPrint: () => setIsPrintMode(false),
  });
  return [componentRef, onPrint, isPrintMode];
};
