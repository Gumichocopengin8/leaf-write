import { useContext, useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridCellEditStopParams,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { AppContext } from 'state/context';
import { AddressRow } from 'interfaces/addressBook';
import NewAddressDialog from 'components/newAddressDialog';
import CSVReader from 'components/common/CSVReader';
import { HagakiData } from 'interfaces/hagaki';
import { convertToHagakiData } from 'utils/converter';

const AddressBook = () => {
  const { hagakiStore, hagakiDataDispatch, snackbarDispatch } = useContext(AppContext);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [rowMap, setRowMap] = useState<Map<string, AddressRow>>(new Map());

  const onOpenDialog = () => setOpenDialog(true);

  const onCloseDialog = () => setOpenDialog(false);

  useEffect(() => {
    const newRowMap: Map<string, AddressRow> = new Map<string, AddressRow>();
    hagakiStore.hagakiData.forEach((d, index) => {
      const addressRow = {
        id: d.id,
        postal_code: `${d.postalcode_left}-${d.postalcode_right}`,
        address1: d.address1,
        address2: d.address2,
        last_name: d.lastName,
        first_name1: d.firstNameSuffixList[0]?.firstName ?? '',
        first_name2: d.firstNameSuffixList[1]?.firstName ?? '',
        first_name3: d.firstNameSuffixList[2]?.firstName ?? '',
        first_name4: d.firstNameSuffixList[3]?.firstName ?? '',
        suffix1: d.firstNameSuffixList[0]?.suffix ?? '',
        suffix2: d.firstNameSuffixList[1]?.suffix ?? '',
        suffix3: d.firstNameSuffixList[2]?.suffix ?? '',
        suffix4: d.firstNameSuffixList[3]?.suffix ?? '',
        is_my_address: index === 0, // first row is `my address`
      };
      newRowMap.set(d.id, addressRow);
    });
    setRowMap(newRowMap);
  }, [hagakiStore.hagakiData]);

  const columns: GridColDef[] = [
    { field: 'id', width: 90, hideable: false, disableExport: true },
    {
      field: 'postal_code',
      description: '郵便番号',
      width: 100,
      hideable: false,
      editable: true,
    },
    { field: 'address1', description: '住所１', width: 300, hideable: false, editable: true },
    { field: 'address2', description: '住所２', width: 300, hideable: false, editable: true },
    { field: 'last_name', description: '名字', width: 100, hideable: false, editable: true },
    { field: 'first_name1', description: '名前１', width: 120, hideable: false, editable: true },
    { field: 'suffix1', description: '敬称１', width: 80, hideable: false, editable: true },
    { field: 'first_name2', description: '名前２', width: 120, hideable: false, editable: true },
    { field: 'suffix2', description: '敬称２', width: 80, hideable: false, editable: true },
    { field: 'first_name3', description: '名前３', width: 120, hideable: false, editable: true },
    { field: 'suffix3', description: '敬称３', width: 80, hideable: false, editable: true },
    { field: 'first_name4', description: '名前４', width: 120, hideable: false, editable: true },
    { field: 'suffix4', description: '敬称４', width: 80, hideable: false, editable: true },
    {
      field: 'is_my_address',
      type: 'boolean',
      width: 120,
      hideable: true,
      editable: false,
      disableExport: true,
    },
    {
      field: 'action',
      type: 'actions',
      width: 80,
      getActions: (params: GridRowParams) => {
        const deleteItem = () => hagakiDataDispatch({ type: 'delete_by_id', id: params.id.toString() });
        return [<GridActionsCellItem icon={<DeleteIcon />} key={params.id} label="Delete" onClick={deleteItem} />];
      },
    },
  ];

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

  const onCellEditStop = (params: GridCellEditStopParams) => {
    const id = String(params.id);
    const editedField = params.field as keyof AddressRow;
    const newValue: AddressRow[keyof AddressRow] = params.value;
    const row = rowMap.get(id);
    if (row && editedField in row && editedField !== 'is_my_address' && typeof newValue === 'string') {
      if (editedField === 'postal_code') {
        const isValidated = /^\d{3}-\d{4}$/.test(String(newValue));
        if (!isValidated) {
          snackbarDispatch({ type: 'open', message: '郵便番号がフォーマットが正しくありません', severity: 'error' });
          return;
        }
      }
      row[editedField] = newValue;
      try {
        const newHagakiData: HagakiData = convertToHagakiData(row);
        hagakiDataDispatch({ type: 'update_by_id', data: newHagakiData });
        snackbarDispatch({ type: 'open', message: '編集完了', severity: 'success' });
      } catch (e) {
        console.error(e);
        snackbarDispatch({ type: 'open', message: '郵便番号がフォーマットが正しくありません', severity: 'error' });
      }
    } else {
      snackbarDispatch({ type: 'open', message: '予期せぬエラーが起こりました', severity: 'error' });
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        '.MuiDataGrid-row:first-of-type, .MuiDataGrid-row:first-of-type:hover': {
          bgcolor: 'lightgray',
          color: 'gray',
          cursor: 'not-allowed',
        },
      }}
    >
      <DataGrid
        rows={Array.from(rowMap.values())}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        isCellEditable={(params) => !params.row.is_my_address}
        pageSizeOptions={[10, 20, 25, 50, 100]}
        pagination
        // checkboxSelection
        disableRowSelectionOnClick
        onCellEditStop={onCellEditStop}
        slots={{
          toolbar: CustomToolbar,
        }}
      />
      <NewAddressDialog open={openDialog} onCloseDialog={onCloseDialog} />
    </Box>
  );
};

export default AddressBook;
