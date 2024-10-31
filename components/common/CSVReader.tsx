import { useUploadCSV } from 'hooks/useUpload';

interface Props {
  id?: string; // id for label
}

const CSVReader = ({ id }: Props) => {
  const { uploadCSV } = useUploadCSV();

  const onUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      uploadCSV(file);
    }
  };

  return <input id={id} type="file" accept=".csv" onChange={onUploadFile} />;
};

export default CSVReader;
