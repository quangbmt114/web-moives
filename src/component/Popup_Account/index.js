import * as React from 'react';
import Cookies from "js-cookie";
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { uiAction } from '@/store/store_login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
export default function PopupAccount({onRemove}) {
    const dispatch = useDispatch()
    const router = useRouter()
  const createHandleMenuClick = () => {
    Cookies.remove("token");
      dispatch(uiAction.toggleLogout())
      dispatch(uiAction.toggleInSideBar())
      localStorage.removeItem('id')
      localStorage.removeItem('token')
      onRemove()
      router.push('/')
  };
  const handleRoutingDashboard = (e)=>{
    router.push(`${e}`)
  }
  return (
    <div className='ml-2'>
      <Dropdown>
      <TriggerButton><FontAwesomeIcon icon={faUser} /></TriggerButton>
      <Menu slots={{ listbox: StyledListbox }}>
        <StyledMenuItem onClick={()=>handleRoutingDashboard('/dashboard')}>
          Profile
        </StyledMenuItem>
        <StyledMenuItem onClick={()=>handleRoutingDashboard('/dashboard/favorite')}>
          Favorite Movies
        </StyledMenuItem>
        <StyledMenuItem onClick={()=>handleRoutingDashboard('/dashboard/rating')}>
          Rate Movies
        </StyledMenuItem>
        <StyledMenuItem onClick={createHandleMenuClick}>
          Log out
        </StyledMenuItem>
      </Menu>
    </Dropdown>
    </div>
  );
}

const blue = {
  50: '#F0F7FF',
  100: '#DAECFF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 2px 16px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  z-index: 1;
  `,
);

const StyledMenuItem = styled(MenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const TriggerButton = styled(MenuButton)(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 8px 16px;
  line-height: 1.5;
  background: transparent;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? blue[300] : blue[500]};
  cursor: pointer;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:focus-visible {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }
  `,
);