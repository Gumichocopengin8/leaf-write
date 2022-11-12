import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { css } from '@emotion/react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';

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
      case '/tutorial':
        setTabValue(3);
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
      case 3:
        router.push({ pathname: `/tutorial` });
        break;
      default:
        break;
    }
    setTabValue(newValue);
  };

  return (
    <div css={NavContainer}>
      <Link href="/" css={MainTitle}>
        <Typography variant="h6" gutterBottom component="div">
          リーフライト
          <EnergySavingsLeafIcon color="success" />
        </Typography>
      </Link>
      <Box sx={{ display: 'flex', flexGrow: 1, bgcolor: 'background.paper' }}>
        <Tabs value={tabValue} onChange={onTabChange} orientation="vertical">
          <Tab label={'Home'} />
          <Tab label={'Address Book'} />
          <Tab label={'My Info'} />
          <Tab label={'Tutorial'} />
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

const MainTitle = css({
  cursor: 'pointer',
  color: 'inherit',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
});

export default NavBar;
