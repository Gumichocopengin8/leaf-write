import { useContext, useState, useEffect } from 'react';
import { Button } from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridColDef,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  GridCellEditCommitParams,
  GridPreProcessEditCellProps,
} from '@mui/x-data-grid';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { AppContext } from 'state/context';
import { AddressRow } from 'interfaces/addressBook';
import NewAddressDialog from 'components/newAddressDialog';
import CSVReader from 'components/common/CSVReader';
import { HagakiData } from 'interfaces/hagaki';

const AddressBook = () => {
  const { hagakiStore, hagakiDataDispatch, stackbarDispatch } = useContext(AppContext);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [rowMap, setRowMap] = useState<Map<string, AddressRow>>(new Map());

  const onOpenDialog = () => setOpenDialog(true);

  const onCloseDialog = () => setOpenDialog(false);

  useEffect(() => {
    const newRowMap: Map<string, AddressRow> = new Map();
    for (const d of hagakiStore.hagakiData) {
      const addressRow = {
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
      };
      newRowMap.set(d.id, addressRow);
    }
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
      preProcessEditCellProps(params: GridPreProcessEditCellProps) {
        const isValidated = /^\d{3}-\d{4}$/.test(String(params.props.value));
        stackbarDispatch({ type: 'open', message: '郵便番号がフォーマットが正しくありません', severity: 'error' });
        return { ...params.props, error: !isValidated };
      },
    },
    { field: 'address1', description: '住所１', width: 240, hideable: false, editable: true },
    { field: 'address2', description: '住所２', width: 240, hideable: false, editable: true },
    { field: 'last_name', description: '名字', width: 100, hideable: false, editable: true },
    { field: 'first_name1', description: '名前１', width: 120, hideable: false, editable: true },
    { field: 'suffix1', description: '敬称１', width: 80, hideable: false, editable: true },
    { field: 'first_name2', description: '名前２', width: 120, hideable: false, editable: true },
    { field: 'suffix2', description: '敬称２', width: 80, hideable: false, editable: true },
    { field: 'first_name3', description: '名前３', width: 120, hideable: false, editable: true },
    { field: 'suffix3', description: '敬称３', width: 80, hideable: false, editable: true },
    { field: 'first_name4', description: '名前４', width: 120, hideable: false, editable: true },
    { field: 'suffix4', description: '敬称４', width: 80, hideable: false, editable: true },
  ];

  const addNewAddress = (newRow: AddressRow) => {
    setRowMap(new Map(rowMap.set(newRow.id, newRow)));
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

  const onCellEditCommit = (params: GridCellEditCommitParams) => {
    const id = String(params.id);
    const editedField = params.field;
    const newValue = params.value;
    const row = rowMap.get(id);
    if (row && editedField in row) {
      row[editedField as keyof AddressRow] = newValue;
      const postalCode = row.postal_code.split('-');
      const newHagakiData: HagakiData = {
        id: row.id,
        postalcode_left: postalCode[0],
        postalcode_right: postalCode[1],
        address1: row.address1,
        address2: row.address2,
        lastName: row.last_name,
        firstNameSuffixList: [
          { firstName: row.first_name1, suffix: row.suffix1 },
          { firstName: row.first_name2, suffix: row.suffix2 },
          { firstName: row.first_name3, suffix: row.suffix3 },
          { firstName: row.first_name4, suffix: row.suffix4 },
        ],
      };
      hagakiDataDispatch({ type: 'update_by_id', data: newHagakiData });
    }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={Array.from(rowMap.values())}
        columns={columns}
        rowsPerPageOptions={[10, 20, 25, 50, 100]}
        checkboxSelection
        disableSelectionOnClick
        // experimentalFeatures={{ newEditingApi: true }}
        components={{
          Toolbar: CustomToolbar,
        }}
        onCellEditCommit={onCellEditCommit}
      />
      <NewAddressDialog open={openDialog} addNewRow={addNewAddress} onCloseDialog={onCloseDialog} />
    </div>
  );
};

export default AddressBook;
