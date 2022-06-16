import { useContext } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { css } from '@emotion/react';
import { AddressRow } from 'interfaces/addressBook';
import { AppContext } from 'state/context';
import { convertToHagakiData } from 'utils/converter';
import TextFieldPersonIcon from 'components/common/textFieldPersonIcon';
import TextFieldHomeIcon from 'components/common/textFieldHomeIcon';

type NewAddressType = {
  postalCode: string;
  address1: string;
  address2: string;
  lastName: string;
  firstName1: string;
  firstName2: string;
  firstName3: string;
  firstName4: string;
  suffix1: string;
  suffix2: string;
  suffix3: string;
  suffix4: string;
};

interface Props {
  open: boolean;
  onCloseDialog: () => void;
}

const NewAddressDialog = ({ open, onCloseDialog }: Props) => {
  const { hagakiDataDispatch, snackbarDispatch } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewAddressType>();

  const onSubmit = (data: NewAddressType) => {
    const newRow: AddressRow = {
      id: uuidv4(),
      postal_code: data.postalCode,
      address1: data.address1,
      address2: data.address2,
      last_name: data.lastName,
      first_name1: data.firstName1,
      first_name2: data.firstName2,
      first_name3: data.firstName3,
      first_name4: data.firstName4,
      suffix1: data.suffix1,
      suffix2: data.suffix2,
      suffix3: data.suffix3,
      suffix4: data.suffix4,
    };
    hagakiDataDispatch({ type: 'append', newState: [convertToHagakiData(newRow)] });
    snackbarDispatch({ type: 'open', message: '新しい住所の追加成功', severity: 'success' });
    onCloseDialog();
  };

  return (
    <Dialog open={open} onClose={onCloseDialog}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>新しい住所を追加</DialogTitle>
        <DialogContent css={Content}>
          <TextField
            {...register('postalCode', { required: true, pattern: /^\d{3}-\d{4}$/ })}
            autoFocus
            autoComplete="off"
            label="郵便番号"
            variant="standard"
            placeholder="123-4567"
            error={!!errors.postalCode}
            InputProps={{ startAdornment: <TextFieldHomeIcon /> }}
          />
          <TextField
            {...register('address1', { required: true })}
            autoComplete="off"
            label="住所1"
            fullWidth
            variant="standard"
            placeholder="東京都新宿区"
            error={!!errors.address1}
            InputProps={{ startAdornment: <TextFieldHomeIcon /> }}
          />
          <TextField
            {...register('address2')}
            autoComplete="off"
            label="住所2"
            fullWidth
            variant="standard"
            placeholder="おうちアパートメント１号室"
            error={!!errors.address2}
            InputProps={{ startAdornment: <TextFieldHomeIcon /> }}
          />
          <TextField
            {...register('lastName', { required: true })}
            autoComplete="off"
            label="名字"
            fullWidth
            variant="standard"
            placeholder="神風"
            error={!!errors.lastName}
            InputProps={{ startAdornment: <TextFieldPersonIcon /> }}
          />
          <div css={FirstNameSuffix}>
            <TextField
              {...register('firstName1', { required: true })}
              autoComplete="off"
              label="名前1"
              fullWidth
              variant="standard"
              placeholder="太郎"
              error={!!errors.firstName1}
              InputProps={{ startAdornment: <TextFieldPersonIcon /> }}
            />
            <TextField
              {...register('suffix1', { required: true })}
              autoComplete="off"
              label="敬称1"
              fullWidth
              variant="standard"
              placeholder="様"
              error={!!errors.suffix1}
              InputProps={{ startAdornment: <TextFieldPersonIcon /> }}
            />
          </div>
          <div css={FirstNameSuffix}>
            <TextField
              {...register('firstName2')}
              autoComplete="off"
              label="名前2"
              fullWidth
              variant="standard"
              placeholder="たろ子"
              error={!!errors.firstName2}
              InputProps={{ startAdornment: <TextFieldPersonIcon /> }}
            />
            <TextField
              {...register('suffix2')}
              autoComplete="off"
              label="敬称2"
              fullWidth
              variant="standard"
              placeholder="様"
              error={!!errors.suffix2}
              InputProps={{ startAdornment: <TextFieldPersonIcon /> }}
            />
          </div>
          <div css={FirstNameSuffix}>
            <TextField
              {...register('firstName3')}
              autoComplete="off"
              label="名前3"
              fullWidth
              variant="standard"
              placeholder="たろ助"
              error={!!errors.firstName3}
              InputProps={{
                startAdornment: <TextFieldPersonIcon />,
              }}
            />
            <TextField
              {...register('suffix3')}
              autoComplete="off"
              label="敬称3"
              fullWidth
              variant="standard"
              placeholder="様"
              error={!!errors.suffix3}
              InputProps={{ startAdornment: <TextFieldPersonIcon /> }}
            />
          </div>
          <div css={FirstNameSuffix}>
            <TextField
              {...register('firstName4')}
              autoComplete="off"
              label="名前4"
              fullWidth
              variant="standard"
              placeholder="たろいも"
              error={!!errors.firstName4}
              InputProps={{ startAdornment: <TextFieldPersonIcon /> }}
            />
            <TextField
              {...register('suffix4')}
              autoComplete="off"
              label="敬称4"
              fullWidth
              variant="standard"
              placeholder="様"
              error={!!errors.suffix4}
              InputProps={{ startAdornment: <TextFieldPersonIcon /> }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog}>キャンセル</Button>
          <Button type="submit">追加</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const Content = css`
  display: flex;
  flex-direction: column;
  gap: 1rem; ;
`;

const FirstNameSuffix = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

export default NewAddressDialog;
