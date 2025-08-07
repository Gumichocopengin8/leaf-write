import { useEffect, useRef, useState, type RefObject } from 'react';
import { useReactToPrint } from 'react-to-print';

export const usePrint = (): [RefObject<HTMLDivElement | null>, () => void, boolean] => {
  const componentRef = useRef<HTMLDivElement>(null);
  const promiseResolveRef = useRef<((value: void | PromiseLike<void>) => void) | null>(null);
  const [isPrintMode, setIsPrintMode] = useState<boolean>(false);
  const [isPrinting, setIsPrinting] = useState<boolean>(false);

  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  const onPrint = useReactToPrint({
    contentRef: componentRef,
    // pageStyle: '@page { size: 10cm 14.8cm; }',
    onBeforePrint: () => {
      return new Promise((resolve) => {
        promiseResolveRef.current = resolve;
        setIsPrintMode(true);
        setIsPrinting(true);
      });
    },
    onAfterPrint: () => {
      promiseResolveRef.current = null;
      setIsPrintMode(false);
      setIsPrinting(false);
    },
  });
  return [componentRef, onPrint, isPrintMode];
};
