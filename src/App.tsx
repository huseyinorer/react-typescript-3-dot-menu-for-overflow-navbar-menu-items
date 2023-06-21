import React, { useLayoutEffect, useRef, useState } from 'react';
import { ReactDOM } from 'react';
import './App.css';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Tabs,
  FormGroup,
  FormControlLabel,
  Switch
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Adb';
import menuItems, { IMenuItemModel } from './Menu/menuItems';
import { AccountCircle, MoreVert } from '@mui/icons-material';

const currentMenuItems: IMenuItemModel[] = menuItems.CurrentMenuItems();
const App = () => {
  const sizeRef = useRef<HTMLDivElement | null>(null);

  function getOverflowItemsList() {
    const [overflowItemsList, setOverflowItemsList] = useState<IMenuItemModel[] | undefined | null>();
    useLayoutEffect(() => {
      function updateSize() {
        var sizeRefC = sizeRef?.current!;
        setOverflowItemsList(getOverflowItems(sizeRefC));
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, [sizeRef]);
    return overflowItemsList;
  }
  const getOverflowItems = (navbar: HTMLDivElement) => {
    if (navbar == null || navbar.children.length == 0) return null;
    let overflowItems: IMenuItemModel[] = [];
    const navbarWidth = navbar.offsetWidth;
    const menuItemsWidth = Array.from(navbar.children).reduce((acc, child) => acc + child.clientWidth, 0);

    if (menuItemsWidth > navbarWidth) {
      let totalWidth = 0;
      let index = 0;
      while (index < navbar.children.length) {
        totalWidth += navbar.children[index].clientWidth;
        if (totalWidth > navbarWidth) {
          overflowItems = currentMenuItems.slice(index);
          break;
        }
        index++;
      }
    }

    return overflowItems;
  };
  function NavbarMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    var overflowItems = getOverflowItemsList();
    return (
      <AppBar position="static">
        <Toolbar>
          <AdbIcon sx={{ display: 'flex', mr: 1, my: 2 }} />
          <Box
            ref={sizeRef}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              overflowY: 'hidden',
              maxHeight: '64px',
              width: '100%'
            }}
          >
            {currentMenuItems.map((page) => (
              <Button key={page.id} sx={{ my: 2, color: 'white', display: 'block' }}>
                {page.name}
              </Button>
            ))}
          </Box>
          {overflowItems != undefined && overflowItems.length > 0 && (
            <Box>
              <IconButton
                size="large"
                aria-label="overFlow menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MoreVert />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                keepMounted
              >
                {overflowItems?.map((page) => (
                  <MenuItem key={page.id} onClick={handleClose}>
                    {page.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <Tabs variant="standard" sx={{ alignItems: 'center', display: { mobile: 'none', laptop: 'flex' } }} value={false}>
      <NavbarMenu />
    </Tabs>
  );
};

export default App;
