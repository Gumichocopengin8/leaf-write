import { ReactNode, useContext } from 'react';
import { css } from '@emotion/react';
import { Alert, Snackbar } from '@mui/material';
import { AppContext } from 'state/context';

interface Props {
  children: ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }: Props) => {
  const { stackbarStore, stackbarDispatch } = useContext(AppContext);

  const onCloseStackbar = () => {
    stackbarDispatch({ type: 'close' });
  };

  return (
    <>
      <main css={[MainContainer, Main]}>{children}</main>
      <Snackbar
        open={stackbarStore.data.isOpen}
        autoHideDuration={5000}
        onClose={onCloseStackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={onCloseStackbar} variant="filled" severity={stackbarStore.data.severity}>
          {stackbarStore.data.message}
        </Alert>
      </Snackbar>
    </>
  );
};

const MainContainer = css`
  grid-area: content;
  min-width: 860px;
  height: 100vh;
  overflow-y: hidden;
  box-sizing: border-box;
`;

const Main = css`
  overflow-y: scroll;
`;

export default MainLayout;
