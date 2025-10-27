import { useState, useEffect, useCallback } from 'react';
import { Box, Button } from '@mui/material';
import {
  DataGrid,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  GridActionsCellItem,
  type GridColDef,
  type GridRowParams,
  Toolbar,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import type { AddressRow } from 'interfaces/addressBook';
import NewAddressDialog from 'components/newAddressDialog';
import CSVReader from 'components/common/CSVReader';
import type { HagakiData } from 'interfaces/hagaki';
import { convertToHagakiData } from 'utils/converter';
import useBoundStore from 'state/store';

const POSTAL_CODE_REGEX = /^\d{3}-\d{4}$/;

const AddressBook = () => {
  const hagakiData = useBoundStore((state) => state.hagakiData);
  const updatHagakiById = useBoundStore((state) => state.updatHagakiById);
  const deleteHagakiById = useBoundStore((state) => state.deleteHagakiById);
  const openStackbar = useBoundStore((state) => state.openStackbar);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [rowMap, setRowMap] = useState<Map<string, AddressRow>>(new Map());

  const onOpenDialog = () => setOpenDialog(true);

  const onCloseDialog = () => setOpenDialog(false);

  useEffect(() => {
    const newRowMap: Map<string, AddressRow> = new Map<string, AddressRow>();
    hagakiData.forEach((d, index) => {
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
  }, [hagakiData]);

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
        const deleteItem = () => deleteHagakiById(params.id.toString());
        return [<GridActionsCellItem icon={<DeleteIcon />} key={params.id} label='Delete' onClick={deleteItem} />];
      },
    },
  ];

  const CustomToolbar = () => {
    return (
      <Toolbar>
        <GridToolbarExportContainer>
          <GridCsvExportMenuItem
            options={{
              fileName: 'leaf_write_address_list',
              utf8WithBom: true,
            }}
          />
        </GridToolbarExportContainer>
        <label htmlFor='csv-button-file'>
          <div style={{ display: 'none' }}>
            <CSVReader id='csv-button-file' />
          </div>
          <Button component='span' startIcon={<FileUploadOutlinedIcon />}>
            Import CSV
          </Button>
        </label>
        <Button onClick={onOpenDialog}>住所追加</Button>
      </Toolbar>
    );
  };

  const onCellEditCommit = (params: AddressRow) => {
    // onProcessRowUpdateError will capture thrown error
    const isValidated = POSTAL_CODE_REGEX.test(String(params.postal_code));
    if (!isValidated) {
      openStackbar('郵便番号がフォーマットが正しくありません', 'error');
      throw new Error('郵便番号がフォーマットが正しくありません');
    }
    try {
      const newHagakiData: HagakiData = convertToHagakiData(params);
      updatHagakiById(newHagakiData);
      openStackbar('編集完了', 'success');
    } catch (_e) {
      throw new Error('予期せぬエラーが起こりました');
    }
  };

  const handleProcessRowUpdateError = useCallback(
    (e: Error) => {
      openStackbar(e.message, 'error');
    },
    [openStackbar]
  );

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
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
        processRowUpdate={(updatedRow: AddressRow, originalRow: AddressRow): AddressRow => {
          try {
            onCellEditCommit(updatedRow);
            return updatedRow;
          } catch {
            return originalRow;
          }
        }}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        checkboxSelection
        disableRowSelectionOnClick
        isRowSelectable={(params: GridRowParams<AddressRow>) => !params.row.is_my_address}
        slots={{
          toolbar: CustomToolbar,
        }}
        showToolbar
      />
      <NewAddressDialog open={openDialog} onCloseDialog={onCloseDialog} />
    </Box>
  );
};

export default AddressBook;
