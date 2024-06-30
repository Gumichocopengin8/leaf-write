import { parse } from 'csv-parse';
import { HagakiData, HagakiCSVData } from 'interfaces/hagaki';
import { convertCSVtoHagakiData } from 'utils/converter';
import useBoundStore from 'state/store';

export const useUploadCSV = () => {
  const appendHagaki = useBoundStore((state) => state.appendHagaki);
  const openStackbar = useBoundStore((state) => state.openStackbar);

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
              appendHagaki(hagakiData);
              openStackbar(`${hagakiData.length}件のデータを読み込みました。`, 'success');
            } catch (err) {
              console.error(err);
              if (err instanceof Error) {
                openStackbar(
                  `${err.message}. CSVをインポートできませんでした。書式が正しいか確認してみてください。`,
                  'error'
                );
              }
            }
          });
        }
      }
    };
  };
  return { uploadCSV };
};
