import React, { useContext, useState, useEffect } from 'react';
import { Drawer, Grid, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import SignIn from './SignIn';
import SignUp from './SignUp';
import UserLogged from './UserLogged';

import { USER_STATE } from '../../../../constants/userpanel';

import { UserContext } from '../../../../contexts/UserContext';
import useStyles from './styles';
import { AuthService } from '../../../../services/auth.service';

const UserPanel = ({ type, ...props }) => {
  const { callBack, onClose, onSignIn, user, handleLogout } = props;
  const commonProps = { callBack, onClose, onSignIn }
  if (type === 'signIn') return <SignIn {...commonProps} />;
  if (type === 'signUp') return <SignUp {...commonProps} />;
  return <UserLogged {...{user, handleLogout}} />
};

export default function UserArea({closeMenu}) {
  const [user, setUser] = useContext(UserContext);
  const panelType = (user) ? USER_STATE.userLogged : USER_STATE.signIn;
  const [type, setType] = useState(panelType);
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const classes = useStyles();

  const handleSetType = (newType) => (event) => setType(newType);
  const toggleDrawer = (open) => (event) => setIsDrawerOpened(open);
  const closeDrawer = (event) =>{
    if(closeMenu) closeMenu(event);
    setIsDrawerOpened(false);
  }

  useEffect(() => {
    const checkAuthorization = async () => {
      const userData = await AuthService.checkAuthorization();
      if (userData && !(userData instanceof Error)) {
        setUser(userData.data);
        setType('userLogged');
      }
    };
    checkAuthorization();
  }, [setUser]);

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    setType('signIn');
  }

  const handleSignIn = (userData) => {
    setUser(userData);
    setType('userLogged');
  }

  return (
    <Grid>
      <IconButton onClick={toggleDrawer(true)}>
        {user ? <img className={classes.avatarIcon} src={user.avatar} width={40} height={40} alt="avatar" /> : <AccountCircleIcon />}
      </IconButton>
      <Drawer width="30%" anchor="right" open={isDrawerOpened} onClose={closeDrawer}>
        <UserPanel
          type={type}
          callBack={handleSetType}
          onSignIn={handleSignIn}
          onClose={toggleDrawer(false)}
          user={user}
          handleLogout={handleLogout}
        />
      </Drawer>
    </Grid>
  );
}
