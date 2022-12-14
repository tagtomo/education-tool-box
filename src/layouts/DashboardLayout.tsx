import React, { ReactNode } from 'react';

import { styled } from '@mui/material/styles';

import Navi from '../components/Navi';

const APP_BAR_MOBILE = 48;
const APP_BAR_DESKTOP = 48;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

type Props = {
  children: ReactNode;
};

const DashboardLayout = (props: Props) => {
  return (
    <RootStyle>
      <Navi title="教育ツールボックス" />
      <MainStyle>
        {props.children}
      </MainStyle>
    </RootStyle>
  )
};

export default DashboardLayout;
