import { useContext } from 'react';
import { TextField, Button, FormControl, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { MyInfoData } from 'interfaces/myInfo';
import { AppContext } from 'state/context';
import TextFieldPersonIcon from 'components/common/textFieldPersonIcon';
import TextFieldHomeIcon from 'components/common/textFieldHomeIcon';

type MyInfoType = {
  postalCode: string;
  address1: string;
  address2: string;
  lastName: string;
  firstName1: string;
  firstName2: string;
};

const MyInfo = () => {
  const { myInfoStore, myInfoataDispatch, snackbarDispatch } = useContext(AppContext);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MyInfoType>();

  const onCancel = () => {
    myInfoataDispatch({ type: 'clear' });
    snackbarDispatch({ type: 'open', message: '無事クリア', severity: 'success' });
    reset();
  };

  const onSubmit = (data: MyInfoType) => {
    const postalCode = data.postalCode.split('-');
    const myInfoData: MyInfoData = {
      postalcode_left: postalCode[0],
      postalcode_right: postalCode[1],
      address1: data.address1,
      address2: data.address2,
      lastName: data.lastName,
      firstName1: data.firstName1,
      firstName2: data.firstName2,
    };
    myInfoataDispatch({ type: 'update', newState: myInfoData });
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
              myInfoStore.myInfoData.postalcode_left
                ? `${myInfoStore.myInfoData.postalcode_left}-${myInfoStore.myInfoData.postalcode_right}`
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
            defaultValue={myInfoStore.myInfoData.address1}
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
            defaultValue={myInfoStore.myInfoData.address2}
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
              defaultValue={myInfoStore.myInfoData.lastName}
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
                defaultValue={myInfoStore.myInfoData.firstName1}
                error={!!errors.firstName1}
                InputProps={{ startAdornment: <TextFieldPersonIcon /> }}
              />
              <TextField
                {...register('firstName2')}
                autoComplete="off"
                label="名前2"
                variant="standard"
                placeholder="もも子"
                defaultValue={myInfoStore.myInfoData.firstName2}
                error={!!errors.firstName2}
                InputProps={{ startAdornment: <TextFieldPersonIcon /> }}
              />
            </div>
          </div>
          <div css={ButtonGroup}>
            <Button fullWidth onClick={onCancel} variant="outlined">
              Clear
            </Button>
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
