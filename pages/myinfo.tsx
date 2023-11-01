import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, FormControl, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { AppContext } from 'state/context';
import TextFieldPersonIcon from 'components/common/textFieldPersonIcon';
import TextFieldHomeIcon from 'components/common/textFieldHomeIcon';
import type { HagakiData } from 'interfaces/hagaki';

type MyInfoType = {
  postalCode: string;
  address1: string;
  address2: string;
  lastName: string;
  firstName1: string;
  firstName2: string;
};

const MyInfo = () => {
  const { hagakiDataDispatch, snackbarDispatch, hagakiStore } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MyInfoType>();

  const onSubmit = (data: MyInfoType) => {
    const postalCode = data.postalCode.split('-');
    const postalcodeLeft = postalCode[0];
    const postalcode_right = postalCode[1];
    if (postalcodeLeft === undefined || postalcode_right === undefined) {
      snackbarDispatch({ type: 'open', message: '郵便番号パースエラー', severity: 'error' });
      return;
    }

    const myInfoData: HagakiData = {
      id: hagakiStore.hagakiData?.[0]?.id ?? uuidv4(),
      postalcode_left: postalcodeLeft,
      postalcode_right: postalcode_right,
      address1: data.address1,
      address2: data.address2,
      lastName: data.lastName,
      firstNameSuffixList: [
        { firstName: data.firstName1, suffix: '' },
        { firstName: data.firstName2, suffix: '' },
      ],
    };
    hagakiDataDispatch({ type: 'update_by_id', data: myInfoData });
    snackbarDispatch({ type: 'open', message: '保存成功', severity: 'success' });
  };

  return (
    <div css={Container}>
      <Typography gutterBottom>差出人住所</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl css={FormContainer}>
          <TextField
            {...register('postalCode', { required: true, pattern: /^\d{3}-\d{4}$/ })}
            autoComplete="off"
            label="郵便番号"
            variant="standard"
            placeholder="123-4567"
            defaultValue={
              (hagakiStore.hagakiData?.[0]?.postalcode_left ?? '') &&
              (hagakiStore.hagakiData?.[0]?.postalcode_right ?? '')
                ? `${hagakiStore.hagakiData?.[0]?.postalcode_left ?? ''}-${
                    hagakiStore.hagakiData?.[0]?.postalcode_right ?? 0
                  }`
                : ''
            }
            error={!!errors.postalCode}
            InputProps={{ startAdornment: <TextFieldHomeIcon /> }}
          />
          <TextField
            {...register('address1', { required: true })}
            autoComplete="off"
            label="住所1"
            variant="standard"
            placeholder="東京都新宿区"
            fullWidth
            defaultValue={hagakiStore.hagakiData?.[0]?.address1 ?? ''}
            error={!!errors.address1}
            InputProps={{ startAdornment: <TextFieldHomeIcon /> }}
          />
          <TextField
            {...register('address2')}
            autoComplete="off"
            label="住所2"
            variant="standard"
            placeholder="おうちアパートメント１号室"
            fullWidth
            defaultValue={hagakiStore.hagakiData?.[0]?.address2 ?? ''}
            error={!!errors.address2}
            InputProps={{ startAdornment: <TextFieldHomeIcon /> }}
          />
          <div css={NameContainer}>
            <TextField
              {...register('lastName', { required: true })}
              autoComplete="off"
              label="名字"
              variant="standard"
              placeholder="神風"
              defaultValue={hagakiStore.hagakiData?.[0]?.lastName}
              error={!!errors.lastName}
              InputProps={{ startAdornment: <TextFieldPersonIcon /> }}
            />
            <div css={FirstNameSuffixContainer}>
              <TextField
                {...register('firstName1', { required: true })}
                autoComplete="off"
                label="名前1"
                variant="standard"
                placeholder="太郎"
                defaultValue={hagakiStore.hagakiData?.[0]?.firstNameSuffixList?.[0]?.firstName ?? ''}
                error={!!errors.firstName1}
                InputProps={{ startAdornment: <TextFieldPersonIcon /> }}
              />
              <TextField
                {...register('firstName2')}
                autoComplete="off"
                label="名前2"
                variant="standard"
                placeholder="もも子"
                defaultValue={hagakiStore.hagakiData?.[0]?.firstNameSuffixList?.[1]?.firstName ?? ''}
                error={!!errors.firstName2}
                InputProps={{ startAdornment: <TextFieldPersonIcon /> }}
              />
            </div>
          </div>
          <div css={ButtonGroup}>
            <Button fullWidth type="submit" variant="contained">
              Save
            </Button>
          </div>
        </FormControl>
      </form>
    </div>
  );
};

const Container = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const NameContainer = css`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const FirstNameSuffixContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

const ButtonGroup = css`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export default MyInfo;
