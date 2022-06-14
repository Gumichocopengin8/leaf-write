import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { Box, Tabs, Tab, Typography } from '@mui/material';

const NavBar = () => {
  const router = useRouter();
  const [tabValue, setTabValue] = useState<number>(0);

  useEffect(() => {
    switch (router.pathname) {
      case `/`:
        setTabValue(0);
        break;
      case `/addressbook`:
        setTabValue(1);
        break;
      case `/myinfo`:
        setTabValue(2);
        break;
      default: // 404 page
        setTabValue(100);
        break;
    }
  }, [router]);

  const onTabChange = (e: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0:
        router.push({ pathname: `/` });
        break;
      case 1:
        router.push({ pathname: `/addressbook` });
        break;
      case 2:
        router.push({ pathname: `/myinfo` });
        break;
      default:
        break;
    }
    setTabValue(newValue);
  };

  return (
    <div css={NavContainer}>
      <Typography variant="h6" gutterBottom component="div">
        Nengajo Kit
      </Typography>
      <Box sx={{ display: 'flex', flexGrow: 1, bgcolor: 'background.paper' }}>
        <Tabs
          value={tabValue}
          onChange={onTabChange}
          textColor={'secondary'}
          indicatorColor={'secondary'}
          orientation="vertical"
        >
          <Tab label={'Home'} />
          <Tab label={'Address Book'} />
          <Tab label={'My Info'} />
        </Tabs>
      </Box>
    </div>
  );
};

const NavContainer = css({
  padding: '0 2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export default NavBar;
