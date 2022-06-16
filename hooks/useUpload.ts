import { useContext } from 'react';
import { parse } from 'csv-parse';
import { AppContext } from 'state/context';
import { HagakiData, HagakiCSVData } from 'interfaces/hagaki';
import { convertCSVtoHagakiData } from 'utils/converter';

export const useUploadCSV = () => {
  const { hagakiDataDispatch, snackbarDispatch } = useContext(AppContext);

  const uploadCSV = (file: File) => {
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      if (e && e.target) {
        if (typeof e.target.result === 'string') {
          const text = e.target.result;
          parse(text, { delimiter: ',', columns: true, skip_empty_lines: true }, (err, data: HagakiCSVData[]) => {
            if (err) {
              return;
            }
            try {
              const hagakiData: HagakiData[] = convertCSVtoHagakiData(data);
              hagakiDataDispatch({ type: 'append', newState: hagakiData });
            } catch (err) {
              console.error(err);
              if (err instanceof Error) {
                snackbarDispatch({
                  type: 'open',
                  message: `${err.message}. CSVをインポートできませんでした。書式が正しいか確認してみてください。`,
                  severity: 'error',
                });
              }
            }
          });
        }
      }
    };
  };
  return { uploadCSV };
};
