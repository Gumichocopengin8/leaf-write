import { useContext, useState, useEffect } from 'react';
import { Button } from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridColDef,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
} from '@mui/x-data-grid';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { AppContext } from 'state/context';
import { AddressList } from 'interfaces/addressBook';
import NewAddressDialog from 'components/newAddressDialog';
import CSVReader from 'components/common/CSVReader';

const AddressBook = () => {
  const { hagakiStore } = useContext(AppContext);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [rows, setRows] = useState<AddressList[]>([]);

  const onOpenDialog = () => setOpenDialog(true);

  const onCloseDialog = () => setOpenDialog(false);

  useEffect(() => {
    const newRows: AddressList[] = hagakiStore.hagakiData.map((d) => ({
      id: d.id,
      postal_code: `${d.postalcode_left}-${d.postalcode_right}`,
      address1: d.address1,
      address2: d.address2,
      last_name: d.lastName,
      first_name1: d.firstNameSuffixList[0].firstName,
      first_name2: d.firstNameSuffixList[1].firstName,
      first_name3: d.firstNameSuffixList[2].firstName,
      first_name4: d.firstNameSuffixList[3].firstName,
      suffix1: d.firstNameSuffixList[0].suffix,
      suffix2: d.firstNameSuffixList[1].suffix,
      suffix3: d.firstNameSuffixList[2].suffix,
      suffix4: d.firstNameSuffixList[3].suffix,
    }));
    setRows(newRows);
  }, [hagakiStore]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, hideable: false, disableExport: true },
    {
      field: 'postal_code',
      headerName: 'postal_code',
      description: '郵便番号',
      width: 100,
      hideable: false,
      editable: true,
    },
    {
      field: 'address1',
      headerName: 'address1',
      description: '住所１',
      width: 240,
      hideable: false,
      editable: true,
    },
    {
      field: 'address2',
      headerName: 'address2',
      description: '住所２',
      width: 240,
      hideable: false,
      editable: true,
    },
    {
      field: 'last_name',
      headerName: 'last_name',
      description: '名字',
      width: 100,
      hideable: false,
      editable: true,
    },
    {
      field: 'first_name1',
      headerName: 'first_name1',
      description: '名前１',
      width: 120,
      hideable: false,
      editable: true,
    },
    {
      field: 'suffix1',
      headerName: 'suffix1',
      description: '敬称１',
      width: 80,
      hideable: false,
      editable: true,
    },
    {
      field: 'first_name2',
      headerName: 'first_name2',
      description: '名前２',
      width: 120,
      hideable: false,
      editable: true,
    },
    {
      field: 'suffix2',
      headerName: 'suffix2',
      description: '敬称２',
      width: 80,
      hideable: false,
      editable: true,
    },
    {
      field: 'first_name3',
      headerName: 'first_name3',
      description: '名前３',
      width: 120,
      hideable: false,
      editable: true,
    },
    {
      field: 'suffix3',
      headerName: 'suffix3',
      description: '敬称３',
      width: 80,
      hideable: false,
      editable: true,
    },
    {
      field: 'first_name4',
      headerName: 'first_name4',
      description: '名前４',
      width: 120,
      hideable: false,
      editable: true,
    },
    {
      field: 'suffix4',
      headerName: 'suffix4',
      description: '敬称４',
      width: 80,
      hideable: false,
      editable: true,
    },
  ];

  const addNewAddress = (newRow: AddressList) => {
    setRows([...rows, newRow]);
  };

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarExportContainer>
          <GridCsvExportMenuItem
            options={{
              fileName: 'leaf_write_address_list',
              utf8WithBom: true,
            }}
          />
        </GridToolbarExportContainer>
        <label htmlFor="csv-button-file">
          <div style={{ display: 'none' }}>
            <CSVReader id="csv-button-file" />
          </div>
          <Button component="span" startIcon={<FileUploadOutlinedIcon />}>
            Import CSV
          </Button>
        </label>
        <Button onClick={onOpenDialog}>住所追加</Button>
      </GridToolbarContainer>
    );
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[10, 20, 25, 50, 100]}
        checkboxSelection
        disableSelectionOnClick
        components={{
          Toolbar: CustomToolbar,
        }}
      />
      <NewAddressDialog open={openDialog} addNewRow={addNewAddress} onCloseDialog={onCloseDialog} />
    </div>
  );
};

export default AddressBook;
