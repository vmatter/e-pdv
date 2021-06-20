import { useState, MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { FlexGrow, LogoImg, LogoWrapper } from './styles';
import { DesktopSection, MobileSection } from '../Layout/styles';
import { setAccessToken } from '../../utils/token';

const HeaderBar = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUsers = () => {
    handleMenuClose();
    router.push('/users');
  };

  const handleLogout = () => {
    handleMenuClose();
    setAccessToken('');
    router.push('/login');
  };

  const hendleProducts = () => {
    handleMenuClose();
    router.push('/products');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleUsers}>Usuários</MenuItem>
      <MenuItem onClick={hendleProducts}>Produtos</MenuItem>
      <MenuItem onClick={handleLogout}>Sair</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <FlexGrow>
      <AppBar position="static">
        <Toolbar>
          {/* <MenuButton edge="start" color="inherit" aria-label="open drawer">
            <MenuIcon />
          </MenuButton> */}
          <Link href="/">
            <LogoWrapper>
              <LogoImg src="/pdv-logo-white.png" />
            </LogoWrapper>
          </Link>
          <FlexGrow />
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <CustomInput
              placeholder="Buscar..."
              inputProps={{ 'aria-label': 'buscar' }}
            />
          </Search> */}
          <DesktopSection>
            <IconButton
              edge="end"
              aria-label="conta do usuário"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </DesktopSection>
          <MobileSection>
            <IconButton
              aria-label="mostrar mais"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </MobileSection>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </FlexGrow>
  );
};

export default HeaderBar;
