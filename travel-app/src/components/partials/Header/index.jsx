import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import UserArea from './UserArea';
import useStyles from './styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from '@material-ui/core/Drawer';
import { ReactComponent as Logo } from "../../../assets/icons/travel.svg";
import { useTranslation } from 'react-i18next';

import LanguageSwitcher from '../LanguageSwitcher';

export default function Header(props) {
  const { homePage, onSearch, recorder, toggleRecorder } = props;
  const [value, setValue] = useState('');
  const [state, setState] = useState({right: false});
  const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({right: open });
    if (toggleRecorder) toggleRecorder(false);
  };
  const { t } = useTranslation();

  const pageName = t('PAGE_NAME.TRAVEL_APP');

  return (
    <div>
      <AppBar>
        <Toolbar>
          <IconButton color="inherit" aria-label="start page">
            <Link to="/">
            <SvgIcon fontSize="large">
              <Logo />
            </SvgIcon>
            </Link>
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {pageName}
          </Typography>
          <Grid className={classes.collapse}>
            {homePage && <Search value={value} onChange={setValue} onSearch={onSearch} recorder={recorder} toggleRecorder={toggleRecorder}/>}
            <LanguageSwitcher />
            <UserArea />
          </Grid>
          <Grid className={classes.smallScreen}>
            <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer(false)} >
              <div className={classes.drawer}>
                { homePage && <Search value={value} onChange={setValue} onSearch={onSearch} closeMenu={toggleDrawer(false)} recorder={recorder} toggleRecorder={toggleRecorder}/>}
                <LanguageSwitcher />
                <div className={classes.iconButton}>
                  <UserArea closeMenu={toggleDrawer(false)} />
                </div>
              </div>
            </Drawer>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
