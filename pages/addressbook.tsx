import { useContext, useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridColDef, GridToolbarExport } from '@mui/x-data-grid';
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
      postalCode: `${d.postalcode_left}-${d.postalcode_right}`,
      address1: d.address1,
      address2: d.address2,
      lastName: d.lastName,
      firstName1: d.firstNameSuffixList[0].firstName,
      firstName2: d.firstNameSuffixList[1].firstName,
      firstName3: d.firstNameSuffixList[2].firstName,
      firstName4: d.firstNameSuffixList[3].firstName,
      suffix1: d.firstNameSuffixList[0].suffix,
      suffix2: d.firstNameSuffixList[1].suffix,
      suffix3: d.firstNameSuffixList[2].suffix,
      suffix4: d.firstNameSuffixList[3].suffix,
    }));
    setRows(newRows);
  }, [hagakiStore]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, hideable: false },
    {
      field: 'postalCode',
      headerName: 'Postal Code',
      description: '郵便番号',
      width: 100,
      hideable: false,
      editable: true,
    },
    {
      field: 'address1',
      headerName: 'Address1',
      description: '住所１',
      width: 240,
      hideable: false,
      editable: true,
    },
    {
      field: 'address2',
      headerName: 'Address2',
      description: '住所２',
      width: 240,
      hideable: false,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      description: '名字',
      width: 100,
      hideable: false,
      editable: true,
    },
    {
      field: 'firstName1',
      headerName: 'First Name1',
      description: '名前１',
      width: 120,
      hideable: false,
      editable: true,
    },
    {
      field: 'suffix1',
      headerName: 'Suffix1',
      description: '敬称１',
      width: 80,
      hideable: false,
      editable: true,
    },
    {
      field: 'firstName2',
      headerName: 'First Name2',
      description: '名前２',
      width: 120,
      hideable: false,
      editable: true,
    },
    {
      field: 'suffix2',
      headerName: 'Suffix2',
      description: '敬称２',
      width: 80,
      hideable: false,
      editable: true,
    },
    {
      field: 'firstName3',
      headerName: 'First Name3',
      description: '名前３',
      width: 120,
      hideable: false,
      editable: true,
    },
    {
      field: 'suffix3',
      headerName: 'Suffix3',
      description: '敬称３',
      width: 80,
      hideable: false,
      editable: true,
    },
    {
      field: 'firstName4',
      headerName: 'First Name4',
      description: '名前４',
      width: 120,
      hideable: false,
      editable: true,
    },
    {
      field: 'suffix4',
      headerName: 'Suffix4',
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
        <GridToolbarExport />
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
        pageSize={10}
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
