import { ReactNode } from 'react';
import { css } from '@emotion/react';
import { Alert, Snackbar } from '@mui/material';
import useBoundStore from 'state/store';

interface Props {
  children: ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }: Props) => {
  const stackbarStore = useBoundStore((state) => state.stackbar);
  const closeStackbar = useBoundStore((state) => state.closeStackbar);

  return (
    <>
      <main css={[MainContainer, Main]}>{children}</main>
      <Snackbar
        open={stackbarStore.isOpen}
        autoHideDuration={5000}
        onClose={closeStackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={closeStackbar} variant="filled" severity={stackbarStore.severity}>
          {stackbarStore.message}
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
