import { useContext } from 'react';
import { parse } from 'csv-parse';
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from 'state/context';
import { HagakiData, HagakiCSVData } from 'interfaces/hagaki';

const CSVReader = () => {
  const { hagakiDataDispatch } = useContext(AppContext);

  const onUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        if (e && e.target) {
          if (typeof e.target.result === 'string') {
            const text = e.target.result;
            parse(
              text,
              {
                delimiter: ',',
                columns: true,
                skip_empty_lines: true,
              },
              (err, data: HagakiCSVData[]) => {
                if (err) {
                  return;
                }
                const hagakiData: HagakiData[] = data.map((d) => {
                  const postalCode = d.postal_code.split('-');
                  return {
                    id: uuidv4(),
                    postalcode_left: postalCode[0],
                    postalcode_right: postalCode[1],
                    address1: d.address1,
                    address2: d.address2,
                    lastName: d.last_name,
                    firstNameSuffixList: [
                      {
                        firstName: d.first_name1,
                        suffix: d.suffix1,
                      },
                      {
                        firstName: d.first_name2,
                        suffix: d.suffix2,
                      },
                      {
                        firstName: d.first_name3,
                        suffix: d.suffix3,
                      },
                      {
                        firstName: d.first_name4,
                        suffix: d.suffix4,
                      },
                    ],
                  };
                });
                hagakiDataDispatch({ type: 'append', newState: hagakiData });
              }
            );
          }
        }
      };
    }
  };

  return (
    <>
      <input type="file" accept=".csv" onChange={onUploadFile} />
    </>
  );
};

export default CSVReader;
