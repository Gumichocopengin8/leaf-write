import { useContext } from 'react';
import { TextField, Button, FormGroup, FormControl, InputAdornment } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useForm } from 'react-hook-form';
import { MyInfoData } from 'interfaces/myInfo';
import { AppContext } from 'state/context';

type MyInfoType = {
  postalCode: string;
  address1: string;
  address2: string;
  lastName: string;
  firstName1: string;
  firstName2: string;
};

const MyInfo = () => {
  const { myInfoataDispatch } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MyInfoType>();

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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormGroup>
          <TextField
            {...register('postalCode', { required: true, pattern: /^\d{3}-\d{4}$/ })}
            label="Postal Code"
            variant="standard"
            error={!!errors.postalCode}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HomeIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            {...register('address1', { required: true })}
            label="Address1"
            variant="standard"
            error={!!errors.address1}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HomeIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            {...register('address2', { required: true })}
            label="Address2"
            variant="standard"
            error={!!errors.address2}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HomeIcon />
                </InputAdornment>
              ),
            }}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            {...register('lastName', { required: true })}
            label="Last Name"
            variant="filled"
            error={!!errors.lastName}
          />
          <TextField
            {...register('firstName1', { required: true })}
            label="First Name1"
            variant="filled"
            error={!!errors.firstName1}
          />
          <TextField
            {...register('firstName2', { required: true })}
            label="First Name2"
            variant="filled"
            error={!!errors.firstName2}
          />
        </FormGroup>
        <Button type="submit" variant="outlined">
          Save
        </Button>
      </FormControl>
    </form>
  );
};

export default MyInfo;
